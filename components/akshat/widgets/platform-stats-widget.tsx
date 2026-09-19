"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  IndianRupee,
  Loader2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useAkshat } from "@/components/akshat/akshat-context";
import { useApiGet } from "@/lib/api/client";
import type { ApiStatsLive } from "@/lib/api/models";

interface PlatformStatsWidgetProps {
  compact?: boolean;
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export function PlatformStatsWidget({
  compact = false,
  columns,
  className = "",
}: PlatformStatsWidgetProps) {
  const { t } = useAkshat();
  const { data: live } = useApiGet<ApiStatsLive>("/api/stats/live");

  const n = (v: number | undefined) => (v != null ? String(v) : undefined);

  const stats = [
    {
      id: "total",
      title: t("metricTotalIssues", "Total Issues"),
      value: n(live?.issuesReported) ?? "48",
      growth: "+12%",
      subtext: t("metricVsLast7Days", "vs last 7 days"),
      icon: <FileText className="h-4 w-4 text-emerald-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-emerald-100 text-emerald-800",
      badgeBg: "bg-emerald-100 text-emerald-900 font-bold border border-emerald-300",
      accentColor: "text-emerald-700",
    },
    {
      id: "high_priority",
      title: t("metricHighPriority", "High Priority"),
      value: n(live?.validated) ?? "7",
      growth: "+2%",
      subtext: t("metricNeedAttention", "needs attention"),
      icon: <AlertTriangle className="h-4 w-4 text-rose-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-rose-100 text-rose-800",
      badgeBg: "bg-rose-100 text-rose-900 font-bold border border-rose-300",
      accentColor: "text-rose-700",
    },
    {
      id: "pending",
      title: t("metricPending", "Pending"),
      value: live ? String(Math.max(0, live.issuesReported - live.validated)) : "18",
      growth: "+5%",
      subtext: t("metricNeedAssignment", "need assignment"),
      icon: <Clock className="h-4 w-4 text-amber-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-amber-100 text-amber-800",
      badgeBg: "bg-amber-100 text-amber-950 font-bold border border-amber-300",
      accentColor: "text-amber-700",
    },
    {
      id: "in_progress",
      title: t("metricInProgress", "In Progress"),
      value: n(live?.workedOn) ?? "14",
      growth: "+8%",
      subtext: t("metricOnGoing", "ongoing work"),
      icon: <Loader2 className="h-4 w-4 animate-spin text-sky-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-blue-100 text-blue-800",
      badgeBg: "bg-blue-100 text-blue-900 font-bold border border-blue-300",
      accentColor: "text-sky-700",
    },
    {
      id: "resolved",
      title: t("metricResolved", "Resolved"),
      value: n(live?.deployed) ?? "16",
      growth: "+20%",
      subtext: t("metricThisWeek", "this week"),
      icon: <CheckCircle2 className="h-4 w-4 text-teal-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-teal-100 text-teal-800",
      badgeBg: "bg-teal-100 text-teal-900 font-bold border border-teal-300",
      accentColor: "text-teal-700",
    },
    {
      id: "impact",
      title: t("metricRevenueImpact", "Community Impact"),
      value: live ? `₹${(live.universities * 2800).toLocaleString("en-IN")}` : "₹24,500",
      growth: "+18%",
      subtext: t("metricThisMonth", "this month"),
      icon: <IndianRupee className="h-4 w-4 text-purple-600" />,
      bgCard: "bg-white border border-slate-200 shadow-sm",
      iconBg: "bg-purple-100 text-purple-800",
      badgeBg: "bg-purple-100 text-purple-900 font-bold border border-purple-300",
      accentColor: "text-purple-700",
    },
  ];

  if (compact) {
    const gridCols =
      columns === 2
        ? "grid-cols-2 gap-2.5 sm:gap-3"
        : columns === 3
          ? "grid-cols-3 gap-2 sm:gap-2.5"
          : columns === 4
            ? "grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5"
            : columns === 6
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5"
              : "grid-cols-3 gap-2 sm:gap-2.5";

    return (
      <div className={cn("grid", gridCols, className)}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.04 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex flex-col justify-between rounded-2xl border p-2.5 backdrop-blur-sm transition-all sm:p-3",
              stat.bgCard,
            )}
          >
            <div className="mb-1.5 flex items-center justify-between gap-2 overflow-hidden w-full">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl sm:h-8 sm:w-8",
                  stat.iconBg,
                )}
              >
                {stat.icon}
              </div>
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] sm:text-[9.5px]",
                  stat.badgeBg,
                )}
              >
                {stat.growth}
              </span>
            </div>

            <div className="mb-1 text-base font-extrabold leading-none text-slate-950 sm:text-lg">
              {stat.value}
            </div>

            <div
              title={stat.title}
              className="truncate text-xs font-bold tracking-wider text-slate-700"
            >
              {stat.title}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6",
        className,
      )}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          whileHover={{ scale: 1.03, boxShadow: "0 8px 24px -4px rgba(15, 23, 42, 0.08)" }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border p-3.5 sm:p-4 transition-all duration-200",
            stat.bgCard,
          )}
        >
          <div className="relative z-10 mb-2 flex w-full min-w-0 items-start justify-between gap-1.5">
            <span
              title={stat.title}
              className="min-w-0 flex-1 truncate text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700 leading-snug"
            >
              {stat.title}
            </span>
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-xl",
                stat.iconBg,
              )}
            >
              {stat.icon}
            </div>
          </div>

          <div className="my-1 min-w-0">
            <div className="truncate text-xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-2xl">
              {stat.value}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1.5 min-w-0">
              <span
                className={cn(
                  "shrink-0 rounded-full px-1.5 py-0.5 text-[10px]",
                  stat.badgeBg,
                )}
              >
                {stat.growth}
              </span>
              <span className="truncate text-xs font-medium text-slate-700">{stat.subtext}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}