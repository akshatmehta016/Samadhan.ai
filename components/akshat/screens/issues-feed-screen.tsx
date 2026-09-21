"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  MapPin,
  MessageSquare,
  Plus,
  Share2,
  ThumbsUp,
} from "lucide-react";

import type { Issue, ScreenId } from "@/lib/akshat-types";
import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { api } from "@/lib/api/client";
import {
  categoryText,
  issueField,
  statusText,
} from "@/components/akshat/localize-helpers";
import { SafeIssueImage } from "@/components/akshat/safe-issue-image";
import { PlatformStatsWidget } from "@/components/akshat/widgets/platform-stats-widget";

interface IssuesFeedScreenProps {
  setScreen: (screen: ScreenId) => void;
  setSelectedIssue: (issue: Issue) => void;
  feedIssues?: Issue[];
}

export const IssuesFeedScreen = ({
  setScreen,
  setSelectedIssue,
  feedIssues,
}: IssuesFeedScreenProps) => {
  const { t } = useAkshat();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const allIssues = feedIssues && feedIssues.length > 0 ? feedIssues : [];

  const [upvotesState, setUpvotesState] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    allIssues.forEach((issue) => {
      map[issue.id] = issue.upvotes;
    });
    return map;
  });

  const [userUpvoted, setUserUpvoted] = useState<Record<string, boolean>>({});

  const handleToggleUpvote = (e: React.MouseEvent, issueId: string) => {
    e.stopPropagation();
    const isCurrentlyUpvoted = !!userUpvoted[issueId];

    setUserUpvoted(prev => ({
      ...prev,
      [issueId]: !isCurrentlyUpvoted,
    }));

    setUpvotesState(prev => ({
      ...prev,
      [issueId]: (prev[issueId] ?? 0) + (isCurrentlyUpvoted ? -1 : 1),
    }));

    void api.post(`/api/issues/${encodeURIComponent(issueId)}/upvote`).catch(() => {});
  };

  const categories = [
    { key: "All", label: t("catAll", "All"), color: "bg-slate-100 text-slate-800 border-slate-300" },
    { key: "Water Resources", label: t("catWater", "Water & Sanitation"), color: "bg-sky-50 text-sky-800 border-sky-300" },
    { key: "Road", label: t("catRoad", "Road & Infrastructure"), color: "bg-emerald-50 text-emerald-800 border-emerald-300" },
    { key: "Electricity", label: t("catElectricity", "Electricity & Lights"), color: "bg-amber-50 text-amber-800 border-amber-300" },
    { key: "Sanitation", label: t("catGarbage", "Garbage & Cleanliness"), color: "bg-teal-50 text-teal-800 border-teal-300" },
    { key: "Transport", label: t("catTransport", "Public Transport"), color: "bg-purple-50 text-purple-800 border-purple-300" },
  ];

  const filteredIssues =
    selectedCategory === "All"
      ? allIssues
      : allIssues.filter(
          i =>
            i.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            selectedCategory.toLowerCase().includes(i.category.toLowerCase()),
        );

  return (
    <div className="relative z-10 mx-auto max-w-7xl bg-transparent p-3.5 pb-36 sm:p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {t("navFeed", "Civic Issues Feed")}
            </h2>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-700 shadow-2xs">
              {filteredIssues.length} {t("feedActiveShort", "Active")}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-700 sm:text-sm">
            {t("feedSubtitle", "Real community challenges submitted with GPS coordinates and photographic evidence")}
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(13, 148, 136, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat.key)}
              className={cn(
                "whitespace-nowrap rounded-xl border px-3.5 py-1.5 text-xs font-bold transition-all",
                selectedCategory === cat.key
                  ? "border-teal-600 bg-teal-600 text-white shadow-xs ring-2 ring-teal-300"
                  : `${cat.color} hover:shadow-2xs`,
              )}
            >
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-16 text-center shadow-sm">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-3xl border border-teal-200 bg-teal-50 text-teal-700">
            <MapPin className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            {t("noIssuesYet", "No issues reported yet")}
          </h3>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-700">
            {t("noIssuesYetHintFull", "The public feed is empty. Your uploaded reports will appear here with GPS evidence, AI verification and live community support.")}
          </p>
          <button
            onClick={() => setScreen("report")}
            className="btn-breathing mt-5 flex items-center gap-2 rounded-2xl bg-teal-600 px-6 py-3 text-sm font-extrabold text-white shadow-md transition-all hover:bg-teal-700"
          >
            <Plus className="h-4 w-4 stroke-[2.5]" />
            <span>{t("reportFirstIssue", "Report the First Issue")}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredIssues.map((issue, index) => {
          const currentUpvotes = upvotesState[issue.id] ?? issue.upvotes;
          const isUpvoted = !!userUpvoted[issue.id];

          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 28px -6px rgba(15, 23, 42, 0.12)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedIssue(issue);
                setScreen("issue_details");
              }}
              className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:border-slate-300"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <SafeIssueImage
                  src={issue.imageUrl}
                  alt={issueField(t, issue, "title", issue.title)}
                  category={issue.category}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-orange-500 px-3 py-1 text-xs font-bold text-white shadow-xs">
                  <AlertTriangle className="h-3.5 w-3.5 text-white" />
                  {t("urgencyHigh", "High Urgency")}
                </div>

                <div className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white/90 px-2.5 py-0.5 text-[11px] font-bold text-slate-800 shadow-xs backdrop-blur-md">
                  {statusText(t, issue.status)}
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5 text-teal-400" />
                  <span>{issue.distance || `1.2 ${t("kmAway", "km away")}`}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal-700">
                    {categoryText(t, issue.category)}
                  </div>
                  <h3 className="mb-2 line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700">
                    {issueField(t, issue, "title", issue.title)}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-slate-700">
                    {issueField(t, issue, "description", issue.description)}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                    <motion.button
                      whileHover={{ scale: 1.08, boxShadow: "0 4px 14px rgba(13, 148, 136, 0.25)" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={e => handleToggleUpvote(e, issue.id)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-xl border px-2.5 py-1 transition-all",
                        isUpvoted
                          ? "border-teal-600 bg-teal-600 text-white shadow-xs"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-700",
                      )}
                      title={t(isUpvoted ? "removeUpvote" : "upvoteThisIssue", isUpvoted ? "Remove upvote" : "Upvote this issue")}
                    >
                      <ThumbsUp className={cn("h-3.5 w-3.5", isUpvoted && "fill-white stroke-white")} />
                      <div className="relative flex h-4 min-w-[20px] items-center justify-center overflow-hidden text-center font-mono text-xs font-bold">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={currentUpvotes}
                            initial={{ y: isUpvoted ? 10 : -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: isUpvoted ? -10 : 10, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="block"
                          >
                            {currentUpvotes}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </motion.button>

                    <div className="flex items-center gap-1 px-2 py-1 text-slate-700">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{issue.commentsCount}</span>
                    </div>

                    <motion.button
                      title={t("shareIssue", "Share Issue")}
                      whileHover={{ scale: 1.15, color: "#0D9488" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                      className="rounded-lg p-1 text-slate-700 transition-colors hover:bg-slate-100 hover:text-teal-600"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </motion.button>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
                    <Clock className="h-3 w-3 text-slate-700" />
                    <span>{issue.reportedDaysAgo} {t("daysAgoShort", "d ago")}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        </div>
      )}

      <div className="mt-6">
        <PlatformStatsWidget compact={true} columns={6} />
      </div>
    </div>
  );
};