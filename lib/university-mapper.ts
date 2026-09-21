import type {
  ReportTimelineItem,
  UniversityReport,
  UniversityReportStatus,
} from "@/lib/data/university-mock";
import type { ApiIssue, ApiIssueDetail, ApiTimelineEntry } from "@/lib/api/models";
import { ISSUE_STATUS_ORDER } from "@/lib/types";
import { timeAgoFromIso } from "@/lib/akshat-mapper";

const STATUS_MAP: Record<
  string,
  { status: UniversityReportStatus; statusColor: UniversityReport["statusColor"] }
> = {
  reported: { status: "Pending", statusColor: "gray" },
  ai_validated: { status: "Pending", statusColor: "gray" },
  team_formed: { status: "Assigned", statusColor: "blue" },
  proposed: { status: "Assigned", statusColor: "blue" },
  funded: { status: "In Progress", statusColor: "amber" },
  deployed: { status: "In Progress", statusColor: "amber" },
  resolved: { status: "Resolved", statusColor: "emerald" },
};

import { getIssueImageByTitleAndCategory } from "@/lib/issue-images";


const STEPS_COUNT = 4;

function rankOf(status: string): number {
  return ISSUE_STATUS_ORDER.indexOf(status as (typeof ISSUE_STATUS_ORDER)[number]);
}

function progressStepFor(status: string): number {
  const rank = rankOf(status);
  if (rank < 0) return 0;
  return Math.min(rank, STEPS_COUNT);
}

function shortTimeline(status: string, createdAt: string): ReportTimelineItem[] {
  const rank = rankOf(status);
  const items: ReportTimelineItem[] = [
    { title: "Issue registered & AI verified", time: timeAgoFromIso(createdAt), done: rank >= 0 },
  ];
  if (rank >= 2) {
    items.push({ title: "Team assigned to university", time: "Assigned", done: true });
  }
  if (rank >= 6) {
    items.push({ title: "Issue resolved on workboard", time: "Resolved", done: true });
  }
  return items;
}

function detailTimeline(timeline: ApiTimelineEntry[] | undefined): ReportTimelineItem[] {
  if (!timeline || timeline.length === 0) {
    return [{ title: "Issue registered", time: "Registered", done: true }];
  }
  return timeline.map((entry) => ({
    title: entry.note || entry.action,
    time: timeAgoFromIso(entry.createdAt),
    done: true,
  }));
}

const LEGACY_DISTRICT_MAP: Record<string, string> = {
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

function normalizeLocation(label?: string, district?: string): string {
  let cleanDistrict = district ? (LEGACY_DISTRICT_MAP[district] || district) : "Jodhpur";
  let cleanLabel = label || cleanDistrict;

  for (const [legacy, modern] of Object.entries(LEGACY_DISTRICT_MAP)) {
    cleanLabel = cleanLabel.replace(new RegExp(`\\b${legacy}\\b`, "gi"), modern);
  }

  if (cleanLabel.toLowerCase().includes(cleanDistrict.toLowerCase())) {
    return cleanLabel;
  }
  return `${cleanLabel}, ${cleanDistrict}`;
}

export function universityReportFromApiIssue(issue: ApiIssue, index = 0): UniversityReport {
  const meta = STATUS_MAP[issue.status] ?? STATUS_MAP.reported;
  const image =
    issue.photo ||
    getIssueImageByTitleAndCategory(
      issue.title,
      issue.categoryLabel || issue.category,
      issue.description
    );

  return {
    id: issue.id,
    title: issue.title,
    location: normalizeLocation(issue.location?.label, issue.location?.district),
    category: issue.categoryLabel || issue.category,
    status: meta.status,
    statusColor: meta.statusColor,
    assignedTo: issue.assignedUniversity?.name ?? "Not assigned",
    assignedTeam: issue.assignedUniversity?.shortName ?? "Awaiting team match",
    updatedAgo: `Updated ${timeAgoFromIso(issue.createdAt)}`,
    thumbnail: image,
    banner: image,
    description: issue.description,
    urgency:
      issue.severity === "Critical" || issue.severity === "High"
        ? "High"
        : issue.severity === "Medium"
          ? "Medium"
          : "Low",
    progressStep: progressStepFor(issue.status),
    timeline: shortTimeline(issue.status, issue.createdAt),
    sitePhotos: [image],
  };
}

export function universityReportFromDetail(detail: ApiIssueDetail, index = 0): UniversityReport {
  const report = universityReportFromApiIssue(detail.issue, index);
  return {
    ...report,
    timeline: detailTimeline(detail.timeline),
    sitePhotos: detail.issue.photo
      ? [detail.issue.photo]
      : (detail.evidences as { url?: string }[])
          .map((evidence) => evidence.url)
          .filter((url): url is string => Boolean(url))
          .slice(0, 3),
  };
}