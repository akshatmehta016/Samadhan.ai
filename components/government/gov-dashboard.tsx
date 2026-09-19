"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  Frown,
  MapPinned,
  RefreshCw,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DistrictMap, type DistrictDatum } from "@/components/government/district-map";
import { PortalKpi, PortalPageHeader } from "@/components/portal/kpi-card";
import { useNotificationPoll } from "@/lib/use-notification-poll";
import type { ApiStatsLive } from "@/lib/api/models";
import {
  DISTRICTS,
  LEADERBOARD_DATA,
  MONTHLY_TREND,
  SECTOR_SHARE,
} from "@/lib/data/gov-mock";

interface TrendShape {
  month: string;
  reported: number;
  resolved: number;
}

interface LeaderShape {
  name: string;
  value: number;
}

interface CategoryShape {
  name: string;
  label: string;
  total: number;
  pct: number;
}

const CATEGORY_ORDER = ["water", "health", "agriculture", "sanitation", "accessibility"];

export function GovernmentDashboard({ allowReset = false }: { allowReset?: boolean }) {
  const { unread, refresh } = useNotificationPoll(15000);

  const [stats, setStats] = useState<ApiStatsLive | null>(null);
  const [districts, setDistricts] = useState<DistrictDatum[]>(DISTRICTS);
  const [categories, setCategories] = useState<CategoryShape[]>(SECTOR_SHARE);
  const [trend, setTrend] = useState<TrendShape[]>(MONTHLY_TREND);
  const [leaderboards, setLeaderboards] = useState<{
    universities: LeaderShape[];
    districts: LeaderShape[];
  }>(LEADERBOARD_DATA);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [syncState, setSyncState] = useState("All systems live");
  const [resetToast, setResetToast] = useState<string | null>(null);

  const refreshAll = useCallback(async () => {
    setRefreshing(true);
    try {
      const [statsRes, districtRes, catRes, trendRes, leaderRes] = await Promise.all([
        fetch("/api/stats/live"),
        fetch("/api/analytics/districts"),
        fetch("/api/analytics/categories"),
        fetch("/api/analytics/trends"),
        fetch("/api/analytics/leaderboard"),
      ]);

      if (statsRes.ok) {
        const data = (await statsRes.json()) as ApiStatsLive;
        setStats(data);
      }
      if (districtRes.ok) {
        const data = (await districtRes.json()) as { districts: DistrictDatum[] };
        if (data.districts?.length) setDistricts(data.districts);
      }
      if (catRes.ok) {
        const data = (await catRes.json()) as {
          categories: { category: string; categoryLabel: string; count: number }[];
        };
        if (data.categories?.length) {
          const total = data.categories.reduce((acc, c) => acc + c.count, 0);
          const sorted = [...data.categories].sort((a, b) => b.count - a.count);
          const ordered = [
            ...sorted.filter((c) => CATEGORY_ORDER.includes(c.category)),
            ...sorted.filter((c) => !CATEGORY_ORDER.includes(c.category)),
          ];
          setCategories(
            ordered.map((c) => ({
              name: c.categoryLabel,
              label: c.category,
              total: c.count,
              pct: total ? Math.round((c.count / total) * 100) : 0,
            })),
          );
        }
      }
      if (trendRes.ok) {
        const data = (await trendRes.json()) as {
          trends: { month: string; submitted: number; resolved: number }[];
        };
        if (data.trends?.length) {
          setTrend(
            data.trends.map((t) => ({
              month: t.month.replace(/^\d{4}-/, ""),
              reported: t.submitted,
              resolved: t.resolved,
            })),
          );
        }
      }
      if (leaderRes.ok) {
        const data = (await leaderRes.json()) as {
          universities: { name: string; shortName: string; active: number }[];
          districts: { district: string; reports: number }[];
        };
        if ((data.universities?.length ?? 0) > 0 || (data.districts?.length ?? 0) > 0) {
          setLeaderboards({
            universities: (data.universities ?? []).map((u) => ({
              name: u.shortName ?? u.name,
              value: u.active,
            })),
            districts: (data.districts ?? []).map((d) => ({
              name: d.district,
              value: d.reports,
            })),
          });
        }
      }

      setSyncState("All systems live");
    } catch {
      setSyncState("Using cached snapshot");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleReset = useCallback(async () => {
    if (!window.confirm("Reset the demo database to seeded state? This erases all demo changes.")) return;
    setResetToast("Resetting demo data…");
    try {
      const res = await fetch("/api/dev/reset", { method: "POST" });
      const data = (await res.json()) as { counts?: Record<string, number> };
      if (res.ok && data.counts) {
        setResetToast(
          `DB reset — ${(data.counts.issues ?? 0).toLocaleString()} issues, ${(data.counts.users ?? 0).toLocaleString()} users`,
        );
      } else {
        setResetToast("Reset failed — check server logs");
      }
      void refreshAll();
      refresh();
    } catch {
      setResetToast("Reset failed — server unreachable");
    }
  }, [refreshAll, refresh]);

  useEffect(() => {
    const initialFetch = setTimeout(() => void refreshAll(), 0);
    return () => clearTimeout(initialFetch);
  }, [refreshAll]);

  const maxCategoryCount = Math.max(1, ...categories.map((c) => c.total));
  const maxUniValue = Math.max(1, ...leaderboards.universities.map((u) => u.value));

  const kpis = [
    {
      label: "Issues Reported",
      value: stats ? stats.issuesReported.toLocaleString() : "14,234",
      icon: FileText,
      tone: "sky",
      sub: "All priorites",
    },
    {
      label: "AI-Validated",
      value: stats ? stats.validated.toLocaleString() : "1,221",
      icon: Sparkles,
      tone: "teal",
      sub: "Sanity checked",
    },
    {
      label: "In-Work",
      value: stats ? stats.workedOn.toLocaleString() : "492",
      icon: Wrench,
      tone: "amber",
      sub: "Uni teams pending",
    },
    {
      label: "Deployed",
      value: stats ? stats.deployed.toLocaleString() : "118",
      icon: CheckCircle2,
      tone: "emerald",
      sub: "Verified on ground",
    },
  ];

  return (
    <div className="space-y-5">
      <PortalPageHeader
        icon={<MapPinned size={20} />}
        iconBg="bg-gradient-to-br from-sky-600 to-indigo-800 text-white"
        title="District Collector — Civic Operations Overview"
        subtitle="Policy worldview for every citizen-reported issue across the district."
        action={
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
              </span>
              {syncState}
            </span>
            {allowReset && (
              <button
                type="button"
                onClick={() => void handleReset()}
                title="Reset demo data (dev only)"
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-95"
              >
                <RotateCcw size={14} className={resetToast?.startsWith("Resetting") ? "animate-spin" : ""} />
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                void refreshAll();
                refresh();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-bold text-white shadow-md transition hover:bg-slate-800 active:scale-95"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        }
      />

      <section className="glass rounded-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Headline — Live Counters</h2>
            <p className="text-xs text-slate-700">Total citizen-reported issues, sanitized to verified pipeline</p>
          </div>
          <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-extrabold text-white">
            {unread > 0 ? `${unread} NEW ALERTS` : "SYNCED"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {kpis.map((k) => (
            <PortalKpi key={k.label} icon={<k.icon size={18} />} tone={k.tone} label={k.label} value={k.value} sub={k.sub} />
          ))}
        </div>
      </section>

      <section className="glass rounded-2xl p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">Jodhpur & Regional Civic Heatmap</h2>
            <p className="text-xs text-slate-700">Per-zone and ward issue distribution across Jodhpur, in-work vs resolved</p>
          </div>
          <span className="rounded-full bg-primary-50 px-2.5 py-1 text-[10px] font-extrabold text-primary-700">
            {(stats?.districts ?? 0) || districts.length} ZONES & WARDS
          </span>
        </div>
        {loading ? (
          <div className="flex h-[380px] sm:h-[460px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60">
            <p className="text-xs font-bold text-slate-500">Loading district map…</p>
          </div>
        ) : (
          <DistrictMap districts={districts} />
        )}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="glass rounded-2xl p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Sector Strike Rate</h2>
              <p className="text-xs text-slate-700">Citizen-issue volumes by category (log scale)</p>
            </div>
            <BarChart3 size={17} className="text-slate-400" />
          </div>
          <div className="space-y-3">
            {categories.map((cat) => {
              const width = Math.max(6, (Math.log10(cat.total + 1) / Math.log10(maxCategoryCount + 1)) * 100);
              return (
                <div key={cat.name} className="group">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span className="h-2 w-2 rounded-full bg-primary-500" />
                      {cat.name}
                      {cat.label === "water" && (
                        <span className="rounded-full bg-sky-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-sky-800">
                          #1
                        </span>
                      )}
                      {cat.label === "health" && (
                        <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-rose-800">
                          #2
                        </span>
                      )}
                      {cat.label === "agriculture" && (
                        <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold uppercase text-amber-800">
                          #3
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">
                      {cat.total.toLocaleString()}
                      <span className="ml-1.5 text-[10px] font-semibold text-slate-500">
                        {cat.pct}% of all
                      </span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-teal-500 transition-all duration-700"
                      style={{ width: `${width}%` }}
                      title={`${cat.total} reports`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Submission vs Resolution Trend</h2>
              <p className="text-xs text-slate-700">Monthly reported vs grounded deliverables</p>
            </div>
            <TrendingUp size={17} className="text-slate-400" />
          </div>
          <div className="h-[230px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trend} margin={{ top: 6, right: 6, bottom: 0, left: -22 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    fontSize: 12,
                    fontFamily: "inherit",
                  }}
                  labelStyle={{ fontWeight: 700 }}
                />
                <Bar dataKey="reported" name="Reported" fill="#0ea5e9" radius={[5, 5, 0, 0]} barSize={16} />
                <Line
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#0d9488"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#0d9488" }}
                  activeDot={{ r: 5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 flex items-center gap-4 text-[11px] font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" /> Reported
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4 rounded bg-teal-600" /> Resolved
            </span>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <Leaderboard
          icon={<Award size={18} />}
          title="Top Universities (Worked)"
          subtitle="Justice Dept, engineering HQ"
          emptySlot={unresolvedPipelinesUnis(leaderboards.universities)}
          rows={leaderboards.universities.slice(0, 6)}
          maxValue={maxUniValue}
        />
        <Leaderboard
          icon={<MapPinned size={18} />}
          title="Issue-Dense Districts"
          subtitle="Full civic under-job pipeline"
          emptySlot={
            <p className="text-xs italic text-slate-500">
              No district data yet. Submit a citizen report to unlock pipeline analytics.
            </p>
          }
          rows={leaderboards.districts.slice(0, 6)}
          maxValue={Math.max(1, ...leaderboards.districts.map((d) => d.value))}
        />
      </section>

      <footer className="pt-1 text-center text-[10px] font-medium text-slate-500">
        Samadhan.ai · Government Command Center · policy data refreshed in real time from Mumbai HQ
      </footer>

      {resetToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xl">
            {resetToast}
          </div>
        </div>
      )}
    </div>
  );
}

function unresolvedPipelinesUnis(rows: LeaderShape[]): React.ReactNode {
  return (
    <p className="text-xs italic text-slate-500">
      {rows.length === 0
        ? "No university pipelines yet. Assign a team to your first issue to start."
        : "Showing only jurisdictions with active pipelines."}
    </p>
  );
}

function Leaderboard({
  icon,
  title,
  subtitle,
  emptySlot,
  rows,
  maxValue,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  emptySlot: React.ReactNode;
  rows: LeaderShape[];
  maxValue: number;
}) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-700 text-white shadow-sm">
            {icon}
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
            <p className="text-[11px] text-slate-700">{subtitle}</p>
          </div>
        </div>
      </div>
      {rows.length === 0 ? (
        <div className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-xs font-bold text-slate-500">
          <Frown size={14} /> {emptySlot}
        </div>
      ) : (
        <div className="space-y-2.5">
          {rows.map((row, i) => (
            <div
              key={`${row.name}-${i}`}
              className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/70 p-2.5 transition hover:bg-white"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                  i === 0
                    ? "bg-amber-100 text-amber-700"
                    : i === 1
                      ? "bg-slate-200 text-slate-700"
                      : i === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-slate-100 text-slate-500"
                }`}
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-slate-900">{row.name}</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      i === 0 ? "bg-gradient-to-r from-amber-400 to-amber-500" : "bg-gradient-to-r from-primary-400 to-teal-500"
                    }`}
                    style={{ width: `${Math.max(4, (row.value / maxValue) * 100)}%` }}
                  />
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-extrabold text-white">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}