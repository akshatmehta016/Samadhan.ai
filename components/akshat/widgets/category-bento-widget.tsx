"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bus, Droplet, MoreHorizontal, Navigation, Trash2, Zap } from "lucide-react";

import type { ScreenId } from "@/lib/akshat-types";
import { useAkshat } from "@/components/akshat/akshat-context";

interface ColorfulCategoryBentoWidgetProps {
  onSelectCategory?: (category: string) => void;
  setScreen: (screen: ScreenId) => void;
}

export const ColorfulCategoryBentoWidget = ({
  onSelectCategory,
  setScreen,
}: ColorfulCategoryBentoWidgetProps) => {
  const { t } = useAkshat();

  const categories = [
    {
      id: "water",
      name: t("catWater", "Water & Sanitation"),
      count: 12,
      icon: <Droplet className="h-5 w-5 text-sky-600" />,
      bgCard: "bg-sky-50/80 border-sky-200/90 hover:border-sky-300",
      iconBg: "bg-sky-100 text-sky-700",
      badgeColor: "text-sky-700 bg-sky-100/80 border-sky-200",
      catQuery: "Water Resources",
    },
    {
      id: "road",
      name: t("catRoad", "Road & Infrastructure"),
      count: 10,
      icon: <Navigation className="h-5 w-5 text-emerald-600" />,
      bgCard: "bg-emerald-50/80 border-emerald-200/90 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-700",
      badgeColor: "text-emerald-700 bg-emerald-100/80 border-emerald-200",
      catQuery: "Infrastructure",
    },
    {
      id: "electricity",
      name: t("catElectricity", "Electricity & Street Light"),
      count: 8,
      icon: <Zap className="h-5 w-5 text-amber-600" />,
      bgCard: "bg-amber-50/80 border-amber-200/90 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-700",
      badgeColor: "text-amber-700 bg-amber-100/80 border-amber-200",
      catQuery: "Electricity",
    },
    {
      id: "garbage",
      name: t("catGarbage", "Garbage & Cleanliness"),
      count: 6,
      icon: <Trash2 className="h-5 w-5 text-teal-600" />,
      bgCard: "bg-teal-50/80 border-teal-200/90 hover:border-teal-300",
      iconBg: "bg-teal-100 text-teal-700",
      badgeColor: "text-teal-700 bg-teal-100/80 border-teal-200",
      catQuery: "Sanitation",
    },
    {
      id: "transport",
      name: t("catTransport", "Public Transport"),
      count: 5,
      icon: <Bus className="h-5 w-5 text-purple-600" />,
      bgCard: "bg-purple-50/80 border-purple-200/90 hover:border-purple-300",
      iconBg: "bg-purple-100 text-purple-700",
      badgeColor: "text-purple-700 bg-purple-100/80 border-purple-200",
      catQuery: "Transport",
    },
    {
      id: "other",
      name: t("catOther", "Other"),
      count: 7,
      icon: <MoreHorizontal className="h-5 w-5 text-slate-700" />,
      bgCard: "bg-slate-50 border-slate-200 hover:border-slate-300",
      iconBg: "bg-slate-200 text-slate-700",
      badgeColor: "text-slate-700 bg-slate-200/80 border-slate-300",
      catQuery: "All",
    },
  ];

  const handleCardClick = (catQuery: string) => {
    if (onSelectCategory) {
      onSelectCategory(catQuery);
    }
    setScreen("issues_feed");
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-black text-slate-900 sm:text-lg">
            {t("issueCategories", "Issue Categories")}
          </h3>
          <p className="text-xs text-slate-700">
            {t("issueCategoriesSub", "Select a department domain to filter civic challenges")}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen("issues_feed")}
          className="flex flex-shrink-0 items-center gap-1 rounded-xl border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-bold text-teal-700 hover:text-teal-800"
        >
          <span>{t("viewAll", "View All")}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 20px -4px rgba(15, 23, 42, 0.08)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleCardClick(cat.catQuery)}
            className={`flex min-h-[110px] cursor-pointer flex-col justify-between rounded-2xl border p-3.5 shadow-2xs transition-all ${cat.bgCard}`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl shadow-2xs sm:h-9 sm:w-9 ${cat.iconBg}`}
              >
                {cat.icon}
              </div>
              <span
                className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold sm:text-[11px] ${cat.badgeColor}`}
              >
                {cat.count} {t("issuesLabel", "Issues")}
              </span>
            </div>

            <div className="mt-auto">
              <div className="line-clamp-2 text-xs font-black leading-snug text-slate-900 sm:text-[13px]">
                {cat.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
