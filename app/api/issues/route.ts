import { NextResponse } from "next/server";

import { isValidCategory } from "@/server/ai/classify";
import { computeSeverity } from "@/server/ai/severity";
import { computeTrustScore } from "@/server/ai/trust";
import { requireAuth } from "@/server/auth";
import { connectToDb } from "@/server/db";
import {
  buildIssueLookupContext,
  getCategoryLabel,
  issueToJson,
  nextIssueId,
  trackIssueAction,
} from "@/server/lib";
import {
  Analysis,
  Issue,
  User,
  type IIssue,
  type IIssueLocation,
  type Severity,
} from "@/server/models";
import { analysisFor } from "@/lib/data/mock-data";
import { ISSUE_STATUS_ORDER } from "@/lib/types";
import { getIssueImageByTitleAndCategory, isValidIssueImage } from "@/lib/issue-images";

export const runtime = "nodejs";

const SEVERITIES: Severity[] = ["Low", "Medium", "High", "Critical"];

const CREATE_STATUSES = ["reported", "ai_validated"] as const;

const isSeverity = (value: unknown): value is Severity =>
  typeof value === "string" && SEVERITIES.includes(value as Severity);

const STATUSES = ISSUE_STATUS_ORDER as readonly string[];

function normalizeLocation(raw: unknown): IIssueLocation | null {
  if (!raw || typeof raw !== "object") return null;
  const loc = raw as Record<string, unknown>;
  const lat = Number(loc.lat);
  const lng = Number(loc.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  const label = typeof loc.label === "string" ? loc.label.trim() : "";
  const district = typeof loc.district === "string" ? loc.district.trim() : "";
  if (!label || !district) return null;
  return {
    lat,
    lng,
    label,
    ward: typeof loc.ward === "string" ? loc.ward.trim() : "",
    district,
  };
}

export async function POST(request: Request) {
  const auth = await requireAuth("citizen");
  if (!auth.ok) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const input = (body ?? {}) as Record<string, unknown>;
  const title = typeof input.title === "string" ? input.title.trim() : "";
  const description = typeof input.description === "string" ? input.description.trim() : "";
  const category = typeof input.category === "string" ? input.category.trim() : "";
  const severity = input.severity;
  const location = normalizeLocation(input.location);
  const peopleAffected = Number(input.peopleAffected);
  const photo = typeof input.photo === "string" && input.photo.trim() ? input.photo.trim() : undefined;

  const createStatus =
    typeof input.status === "string" && CREATE_STATUSES.includes(input.status.trim() as (typeof CREATE_STATUSES)[number])
      ? (input.status.trim() as (typeof CREATE_STATUSES)[number])
      : "reported";

  const assignedUniversityId =
    typeof input.assignedUniversityId === "string" && input.assignedUniversityId.trim()
      ? input.assignedUniversityId.trim()
      : undefined;

  const matchScore =
    typeof input.matchScore === "number" && Number.isFinite(input.matchScore)
      ? Math.min(100, Math.max(0, Math.round(input.matchScore)))
      : undefined;

  if (title.length < 3) {
    return NextResponse.json({ error: "Title is required (min 3 characters)" }, { status: 400 });
  }
  if (description.length < 8) {
    return NextResponse.json(
      { error: "Description is required (min 8 characters)" },
      { status: 400 },
    );
  }
  if (!isValidCategory(category)) {
    return NextResponse.json(
      { error: `Unknown category "${category}". Try one of: ${Object.getOwnPropertyNames(
        {},
      )}water, sanitation, health, education, agriculture, environment, energy, urban, accessibility, livelihoods` },
      { status: 400 },
    );
  }
  if (!isSeverity(severity)) {
    return NextResponse.json(
      { error: "Severity must be one of: Low, Medium, High, Critical" },
      { status: 400 },
    );
  }
  if (!location) {
    return NextResponse.json(
      { error: "Location with lat, lng, label and district is required" },
      { status: 400 },
    );
  }

  try {
    await connectToDb();

    const id = await nextIssueId();

    const reporter = await User.findById(auth.user.id).select("karma").lean();
    const reporterKarma = typeof reporter?.karma === "number" ? reporter.karma : undefined;

    const trustScore =
      typeof input.trustScore === "number"
        ? Math.min(100, Math.max(0, Math.round(input.trustScore)))
        : computeTrustScore({
            description,
            location,
            photo,
            reporterKarma,
            similarPriorCount: 0,
          }).score;

    const severityResult = computeSeverity(description, Number.isFinite(peopleAffected) ? peopleAffected : 0);

    const finalPhoto =
      typeof photo === "string" && isValidIssueImage(photo)
        ? photo
        : getIssueImageByTitleAndCategory(title, category, description);

    const doc = await Issue.create({
      _id: id,
      title,
      description,
      category,
      severity: isSeverity(severity) ? severity : severityResult.severity,
      location,
      reportedBy: auth.user.id,
      peopleAffected: Number.isFinite(peopleAffected) ? Math.max(0, peopleAffected) : 0,
      trustScore,
      photo: finalPhoto,
      status: createStatus,
      ...(assignedUniversityId ? { assignedUniversityId } : {}),
      ...(matchScore !== undefined ? { matchScore } : {}),
    });

    const validBundle = analysisFor(category);

    await Analysis.create({
      _id: `${id}-analysis`,
      issueId: id,
      summary: validBundle.summary,
      causes: validBundle.causes,
      recommendations: validBundle.recommendations,
      cost: validBundle.cost,
      timeline: validBundle.timeline,
      classificationConfidence: 0.9,
    });

    await trackIssueAction(id, {
      actor: auth.user.name,
      action: "reported",
      note: "Issue reported",
      issue: { reportedBy: doc.reportedBy, assignedUniversityId: doc.assignedUniversityId, _id: doc._id },
    });

    const json = await buildIssueLookupContext([doc as IIssue]);
    const categoryLabel = await getCategoryLabel(doc.category);

    return NextResponse.json(
      {
        ...issueToJson(doc as IIssue, json),
        categoryLabel,
        severity: doc.severity,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/issues failed", error);
    return NextResponse.json({ error: "Failed to create issue" }, { status: 500 });
  }
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const district = searchParams.get("district");
  const category = searchParams.get("category");
  const q = searchParams.get("q");
  const assigned = searchParams.get("assigned");
  const limitRaw = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitRaw) && limitRaw > 0 ? Math.min(Math.floor(limitRaw), 500) : 100;

  try {
    await connectToDb();

    const filter: Record<string, unknown> = {};
    if (status) {
      const values = status
        .split(",")
        .map((s) => s.trim())
        .filter((s) => STATUSES.includes(s));
      if (values.length > 0) filter.status = values.length === 1 ? values[0] : { $in: values };
    }
    if (district) filter["location.district"] = district.trim();
    if (category && isValidCategory(category.trim())) filter.category = category.trim();
    if (assigned) filter.assignedUniversityId = assigned.trim();
    if (q) {
      const pattern = new RegExp(escapeRegex(q.trim()), "i");
      filter.$or = [{ title: { $regex: pattern } }, { description: { $regex: pattern } }];
    }

    const docs = await Issue.find(filter).sort({ createdAt: -1 }).limit(limit).lean<IIssue[]>();

    const ctx = await buildIssueLookupContext(docs);
    const issues = docs.map((doc) => issueToJson(doc, ctx));

    return NextResponse.json({ issues, count: issues.length });
  } catch (error) {
    console.error("GET /api/issues failed", error);
    return NextResponse.json({ error: "Failed to load issues" }, { status: 500 });
  }
}