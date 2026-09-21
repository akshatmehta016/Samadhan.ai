import type { CitizenNotification, DiscussionComment, Issue as AkshatIssue } from "@/lib/akshat-types";
import type { ApiComment, ApiIssue, ApiNotification } from "@/lib/api/models";
import { CATEGORY_MAP } from "@/lib/data/mock-data";

export const DEFAULT_REPORT_LOCATION = {
  lat: 26.2459,
  lng: 73.0249,
  label: "Mogra Kalan",
  ward: "Mogra Kalan",
  district: "Jodhpur",
};

export function daysAgoFromIso(iso: string): number {
  const time = new Date(iso).getTime();
  if (!Number.isFinite(time)) return 0;
  return Math.max(0, Math.floor((Date.now() - time) / 86_400_000));
}

export function timeAgoFromIso(iso: string): string {
  const time = new Date(iso).getTime();
  if (!Number.isFinite(time)) return "just now";
  const seconds = Math.max(0, (Date.now() - time) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3_600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86_400) return `${Math.floor(seconds / 3_600)} hr ago`;
  const days = Math.floor(seconds / 86_400);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return `${Math.floor(days / 7)} wk ago`;
}

import { getIssueImageByTitleAndCategory, isValidIssueImage } from "@/lib/issue-images";

const STATUS_MAP: Record<string, AkshatIssue["status"]> = {
  reported: "New",
  ai_validated: "Under review",
  team_formed: "In progress",
  proposed: "In progress",
  funded: "In progress",
  deployed: "In progress",
  resolved: "Resolved",
};

export function akshatIssueStatus(status: string): AkshatIssue["status"] {
  return STATUS_MAP[status] ?? "New";
}

export function apiIssueToAkshat(issue: ApiIssue): AkshatIssue {
  const label = issue.location.label?.trim();
  const district = issue.location.district?.trim();
  const place = district && label && label !== district ? `${label}, ${district}` : label || district || "";

  const photo = isValidIssueImage(issue.photo) ? issue.photo : undefined;
  const imageUrl = photo ?? getIssueImageByTitleAndCategory(issue.title, issue.categoryLabel || issue.category, issue.description);

  return {
    id: issue.id,
    title: issue.title,
    category: issue.categoryLabel || CATEGORY_MAP[issue.category as keyof typeof CATEGORY_MAP]?.label || issue.category,
    description: issue.description,
    location: place,
    peopleAffected: issue.peopleAffected ?? 0,
    severity: issue.severity as AkshatIssue["severity"],
    status: akshatIssueStatus(issue.status),
    reportedBy: issue.reportedBy || issue.postedBy || "Citizen",
    reportedDaysAgo: daysAgoFromIso(issue.createdAt),
    imageUrl,
    upvotes: issue.upvotes ?? 0,
    commentsCount: issue.commentsCount ?? 0,
    updatesCount: 0,
    coordinates: { lat: issue.location.lat, lng: issue.location.lng },
    assignedUniversity: issue.assignedUniversity?.name,
    matchScore: issue.matchScore ?? undefined,
  };
}

export function apiCommentToAkshat(comment: ApiComment): DiscussionComment {
  return {
    id: comment.id,
    authorName: comment.authorName || "Citizen",
    authorRole: "Community member",
    daysAgo: timeAgoFromIso(comment.createdAt),
    text: comment.text,
    upvotes: comment.upvotes ?? 0,
    repliesCount: 0,
  };
}

export function apiNotificationToCitizen(notification: ApiNotification): CitizenNotification {
  let type: CitizenNotification["type"] = "system";
  if (notification.type === "issue-status") {
    type = /resolved/i.test(notification.title) ? "resolution" : "update";
  }
  return {
    id: notification.id,
    type,
    title: notification.title,
    body: notification.body,
    timeAgo: timeAgoFromIso(notification.createdAt),
  };
}

export const CATEGORY_LABEL_TO_SLUG: Record<string, string> = {
  "Water Resources": "water",
  Sanitation: "sanitation",
  Roads: "urban",
  Electricity: "energy",
  Transport: "urban",
  Healthcare: "health",
};

export function categoryLabelToSlug(label: string): string {
  const direct = CATEGORY_LABEL_TO_SLUG[label];
  if (direct) return direct;
  const categorySlug = CATEGORY_MAP[label as keyof typeof CATEGORY_MAP] as unknown;
  if (categorySlug) return label;
  for (const [slug, meta] of Object.entries(CATEGORY_MAP)) {
    if ((meta as { label: string }).label === label) return slug;
  }
  return "urban";
}

export function slugToCategoryLabel(slug: string): string {
  return CATEGORY_MAP[slug as keyof typeof CATEGORY_MAP]?.label ?? slug;
}

export function storeIssueToAkshat(issue: {
  id: string;
  title: string;
  category: string;
  description: string;
  severity: string;
  location: { lat: number; lng: number; label: string; ward?: string; district?: string };
  reportedBy: string;
  reportedDaysAgo: number;
  upvotes: number;
  commentsCount: number;
  status: string;
  peopleAffected: number;
  trustScore?: number | null;
  matchScore?: number | null;
  assignedUniversityId?: string | null;
  imageUrl?: string | null;
  photo?: string | null;
}): AkshatIssue {
  const label = issue.location?.label?.trim() ?? "";
  const district = issue.location?.district?.trim() ?? "";
  const place = district && label && label !== district ? `${label}, ${district}` : label || district || "";

  const photo = (isValidIssueImage(issue.imageUrl) ? issue.imageUrl : null) || (isValidIssueImage(issue.photo) ? issue.photo : null);
  const imageUrl = photo ?? getIssueImageByTitleAndCategory(issue.title, issue.category, issue.description);

  return {
    id: issue.id,
    title: issue.title,
    category: CATEGORY_MAP[issue.category as keyof typeof CATEGORY_MAP]?.label || issue.category,
    description: issue.description,
    location: place,
    peopleAffected: issue.peopleAffected ?? 0,
    severity: issue.severity as AkshatIssue["severity"],
    status: akshatIssueStatus(issue.status),
    reportedBy: issue.reportedBy || "Citizen",
    reportedDaysAgo: issue.reportedDaysAgo ?? 0,
    imageUrl,
    upvotes: issue.upvotes ?? 0,
    commentsCount: issue.commentsCount ?? 0,
    updatesCount: 0,
    coordinates: { lat: issue.location.lat, lng: issue.location.lng },
    assignedUniversity: undefined,
    matchScore: issue.matchScore ?? undefined,
  };
}