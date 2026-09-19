import {
  ActivityLog,
  Funder,
  Issue,
  University,
  type IssueStatus,
} from "@/server/models";
import { CATEGORY_MAP } from "@/lib/data/mock-data";

const WORKED_ON: IssueStatus[] = ["team_formed", "proposed", "funded", "deployed"];
const VALIDATED: IssueStatus[] = ["ai_validated", "team_formed", "proposed", "funded", "deployed", "resolved"];
const DEPLOYED: IssueStatus[] = ["deployed", "resolved"];

export async function getLiveStats(): Promise<{
  issuesReported: number;
  validated: number;
  workedOn: number;
  deployed: number;
  districts: number;
  universities: number;
  funders: number;
}> {
  const [issuesReported, validated, workedOn, deployed, districtDocs, universities, funders] =
    await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: { $in: VALIDATED } }),
      Issue.countDocuments({ status: { $in: WORKED_ON } }),
      Issue.countDocuments({ status: { $in: DEPLOYED } }),
      Issue.aggregate<{ _id: string | null }>([
        { $group: { _id: "$location.district" } },
      ]),
      University.countDocuments(),
      Funder.countDocuments(),
    ]);

  return {
    issuesReported,
    validated,
    workedOn,
    deployed,
    districts: districtDocs.filter((d) => d._id).length,
    universities,
    funders,
  };
}

export interface DistrictCount {
  district: string;
  count: number;
  active: number;
  resolved: number;
}

const DISTRICT_ALIASES: Record<string, string> = {
  Ranchi: "Jodhpur",
  Bokaro: "Sardarpura",
  Dhanbad: "Ratanada",
  Pakur: "Basni",
  Jamshedpur: "Mandore",
  Giridih: "Mogra Kalan",
  Hazaribagh: "Shastri Nagar",
  Deoghar: "Paota",
  "East Singhbhum": "Jaipur",
  Palamu: "Udaipur",
};

export async function getDistrictCounts(): Promise<DistrictCount[]> {
  const rows = await Issue.aggregate<{
    _id: string | null;
    count: number;
    statuses: string[];
  }>([
    { $match: { "location.district": { $exists: true, $ne: null } } },
    { $group: { _id: "$location.district", count: { $sum: 1 }, statuses: { $push: "$status" } } },
  ]);

  const mapped = new Map<string, DistrictCount>();
  for (const r of rows) {
    if (!r._id) continue;
    const name = DISTRICT_ALIASES[r._id] || r._id;
    const active = r.statuses.filter((s) => WORKED_ON.includes(s as IssueStatus)).length;
    const resolved = r.statuses.filter((s) => s === "resolved").length;
    const existing = mapped.get(name);
    if (existing) {
      existing.count += r.count;
      existing.active += active;
      existing.resolved += resolved;
    } else {
      mapped.set(name, { district: name, count: r.count, active, resolved });
    }
  }

  return Array.from(mapped.values()).sort((a, b) => b.count - a.count);
}

export interface TrendPoint {
  month: string;
  submitted: number;
  resolved: number;
}

export async function getTrends(): Promise<TrendPoint[]> {
  const [submittedRows, resolvedRows] = await Promise.all([
    Issue.aggregate<{ _id: string; count: number }>([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]),
    ActivityLog.aggregate<{ _id: string; count: number }>([
      { $match: { action: "resolved" } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const submitted = new Map(submittedRows.map((r) => [r._id, r.count]));
  const resolved = new Map(resolvedRows.map((r) => [r._id, r.count]));

  const months = Array.from(new Set([...submitted.keys(), ...resolved.keys()])).sort();
  const window = months.slice(-12);

  return window.map((month) => ({
    month,
    submitted: submitted.get(month) ?? 0,
    resolved: resolved.get(month) ?? 0,
  }));
}

export interface UniversityLeaderboardRow {
  universityId: string;
  name: string;
  shortName: string;
  active: number;
}

export interface DistrictLeaderboardRow {
  district: string;
  reports: number;
}

export async function getLeaderboards(): Promise<{
  universities: UniversityLeaderboardRow[];
  districts: DistrictLeaderboardRow[];
}> {
  const [universityRows, districtRows] = await Promise.all([
    Issue.aggregate<{ _id: string | null; active: number }>([
      {
        $match: {
          assignedUniversityId: { $exists: true, $ne: null },
          status: { $in: WORKED_ON },
        },
      },
      { $group: { _id: "$assignedUniversityId", active: { $sum: 1 } } },
    ]),
    Issue.aggregate<{ _id: string | null; reports: number }>([
      { $match: { "location.district": { $exists: true, $ne: null } } },
      { $group: { _id: "$location.district", reports: { $sum: 1 } } },
    ]),
  ]);

  const universities = await Promise.all(
    universityRows
      .filter((r) => r._id)
      .map(async (r) => {
        const uni = await University.findById(r._id).select("name shortName").lean();
        return {
          universityId: r._id as string,
          name: uni?.name ?? (r._id as string),
          shortName: uni?.shortName ?? (r._id as string),
          active: r.active,
        };
      }),
  );
  universities.sort((a, b) => b.active - a.active);

  const districts = districtRows
    .filter((r) => r._id)
    .map((r) => ({ district: r._id as string, reports: r.reports }))
    .sort((a, b) => b.reports - a.reports);

  return { universities, districts };
}

export interface CategoryShareRow {
  category: string;
  categoryLabel: string;
  count: number;
}

export async function getCategoryShare(): Promise<CategoryShareRow[]> {
  const rows = await Issue.aggregate<{ _id: string | null; count: number }>([
    { $match: { category: { $exists: true, $ne: null } } },
    { $group: { _id: "$category", count: { $sum: 1 } } },
  ]);

  return rows
    .filter((r) => r._id)
    .map((r) => {
      const slug = r._id as string;
      const label = CATEGORY_MAP[slug as keyof typeof CATEGORY_MAP]?.label ?? slug;
      return { category: slug, categoryLabel: label, count: r.count };
    })
    .sort((a, b) => b.count - a.count);
}