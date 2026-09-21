import {
  Accessibility,
  Briefcase,
  Building2,
  Droplets,
  GraduationCap,
  HeartPulse,
  Leaf,
  Trash2,
  Wheat,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  CategoryId,
  Funder,
  Issue,
  IssueStatus,
  Team,
  University,
} from "@/lib/types";

export const BRAND = {
  name: "Samadhan.AI",
  tagline: "One citizen. One problem. One platform. Real change.",
};

export const CATEGORIES: { id: CategoryId; label: string; icon: LucideIcon; color: string; bar: string }[] = [
  { id: "water", label: "Water Resources", icon: Droplets, color: "bg-sky-50 text-sky-700", bar: "bg-sky-500" },
  { id: "sanitation", label: "Sanitation", icon: Trash2, color: "bg-emerald-50 text-emerald-700", bar: "bg-emerald-500" },
  { id: "health", label: "Healthcare", icon: HeartPulse, color: "bg-rose-50 text-rose-700", bar: "bg-rose-500" },
  { id: "education", label: "Education", icon: GraduationCap, color: "bg-indigo-50 text-indigo-700", bar: "bg-indigo-500" },
  { id: "agriculture", label: "Agriculture", icon: Wheat, color: "bg-amber-50 text-amber-700", bar: "bg-amber-500" },
  { id: "environment", label: "Environment", icon: Leaf, color: "bg-lime-50 text-lime-700", bar: "bg-lime-500" },
  { id: "energy", label: "Energy", icon: Zap, color: "bg-yellow-50 text-yellow-700", bar: "bg-yellow-500" },
  { id: "urban", label: "Urban", icon: Building2, color: "bg-violet-50 text-violet-700", bar: "bg-violet-500" },
  { id: "accessibility", label: "Accessibility", icon: Accessibility, color: "bg-cyan-50 text-cyan-700", bar: "bg-cyan-500" },
  { id: "livelihoods", label: "Livelihoods", icon: Briefcase, color: "bg-teal-50 text-teal-700", bar: "bg-teal-500" },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  CategoryId,
  (typeof CATEGORIES)[number]
>;

export const UNIVERSITIES: University[] = [
  {
    id: "bit-mesra",
    name: "MBM University, Jodhpur",
    shortName: "MBM Jodhpur",
    state: "Rajasthan",
    focus: "Environmental Engineering · Water Systems",
    priorProjects: 24,
    labs: "Water Quality Lab · GIS Lab",
    bestCategories: ["water", "environment"],
  },
  {
    id: "iit-jodhpur",
    name: "IIT Jodhpur",
    shortName: "IIT Jodhpur",
    state: "Rajasthan",
    focus: "Civil & Sustainable Infrastructure",
    priorProjects: 18,
    labs: "Smart Infrastructure Lab",
    bestCategories: ["sanitation", "urban"],
  },
  {
    id: "mody-university",
    name: "Mody University",
    shortName: "Mody",
    state: "Rajasthan",
    focus: "Computer Science & Applied Tech",
    priorProjects: 12,
    labs: "AI / IoT Lab",
    bestCategories: ["education", "energy"],
  },
  {
    id: "gpc-jodhpur",
    name: "Govt. Polytechnic Jodhpur",
    shortName: "Polytechnic",
    state: "Rajasthan",
    focus: "Civil & Mechanical Engineering",
    priorProjects: 9,
    labs: "Survey & Drafting Lab",
    bestCategories: ["agriculture", "urban"],
  },
  {
    id: "aiims-jodhpur",
    name: "AIIMS Jodhpur",
    shortName: "AIIMS",
    state: "Rajasthan",
    focus: "Public Health & Hospital Management",
    priorProjects: 15,
    labs: "Community Health Unit",
    bestCategories: ["health"],
  },
  {
    id: "ravi-uni",
    name: "Dr. S. R. Rajasthan University",
    shortName: "Rajasthan Univ.",
    state: "Rajasthan",
    focus: "Rural Development & Sociology",
    priorProjects: 8,
    labs: "Rural Field Station",
    bestCategories: ["livelihoods", "accessibility"],
  },
];

export const FUNDERS: Funder[] = [
  {
    id: "datar-trusts",
    name: "Datar Trusts",
    kind: "Charitable Trust",
    fundedProjects: 15,
    focus: "Clean water & rural infrastructure",
  },
  {
    id: "piramal",
    name: "Piramal Foundation",
    kind: "CSR Foundation",
    fundedProjects: 22,
    focus: "Healthcare & water in Rajasthan",
  },
  {
    id: "lokpump",
    name: "LokPump Industries",
    kind: "Corporate Partner",
    fundedProjects: 6,
    focus: "Water pumps & equipment at cost",
  },
];

const DAY = 86_400_000;
const now = Date.now();

export const FLAGSHIP_ISSUE: Issue = {
  id: "LOK-1042",
  title: "4-inch fractured PVC community drinking water pipe",
  category: "water",
  description:
    "The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water. Villagers currently commute 4 km to fetch untreated pond water.",
  severity: "High",
  location: {
    lat: 26.2842,
    lng: 73.0305,
    label: "Sardarpura, near Main Circle",
    ward: "Ward 1",
    district: "Jodhpur",
  },
  reportedBy: "Sakshi Verma",
  reportedDaysAgo: 3,
  upvotes: 48,
  commentsCount: 14,
  status: "proposed",
  peopleAffected: 200,
  trustScore: 97,
  matchScore: 97,
  assignedUniversityId: "bit-mesra",
  imageUrl:
    "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
  createdAt: now - 3 * DAY,
};

const seeded = (
  id: string,
  title: string,
  category: CategoryId,
  severity: Issue["severity"],
  status: IssueStatus,
  label: string,
  ward: string,
  district: string,
  desc: string,
  extra: Partial<Issue> = {},
): Issue => ({
  id,
  title,
  category,
  description: desc,
  severity,
  location: { lat: 26.24, lng: 72.98, label, ward, district },
  reportedBy: "Citizen",
  reportedDaysAgo: 2,
  upvotes: 0,
  commentsCount: 0,
  status,
  peopleAffected: 120,
  createdAt: now - 2 * DAY,
  ...extra,
});

export const SEED_ISSUES: Issue[] = [
  FLAGSHIP_ISSUE,
  seeded(
    "LOK-1026",
    "Open drain overflowing near Govt. Girls School",
    "sanitation",
    "High",
    "funded",
    "Sector 12 main road",
    "Ward 5",
    "Jodhpur",
    "Overflowing open drains on the main road to the school are a daily health hazard for students.",
    {
      reportedBy: "Ravi Kumar",
      upvotes: 32,
      commentsCount: 9,
      status: "funded",
      matchScore: 94,
      assignedUniversityId: "iit-jodhpur",
      imageUrl: "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
  seeded(
    "LOK-1011",
    "Streetlights dead on Maple Road for 8 months",
    "urban",
    "Medium",
    "team_formed",
    "Ratanada, near Circuit House",
    "Ward 14",
    "Jodhpur",
    "Nine streetlights along Maple Road have been non-functional for over eight months, creating unsafe conditions after dark.",
    {
      reportedBy: "Anita Roy",
      upvotes: 21,
      commentsCount: 4,
      status: "team_formed",
      matchScore: 88,
      assignedUniversityId: "mody-university",
      imageUrl: "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
  seeded(
    "LOK-0990",
    "PHC shortage: no free medicines for 6 villages",
    "health",
    "Critical",
    "proposed",
    "Rural PHC Block",
    "Ward 2",
    "Jodhpur",
    "Primary health centre routinely runs out of essential medicines; six adjoining villages share one doctor.",
    {
      reportedBy: "Dr. Meena Kumari",
      upvotes: 57,
      commentsCount: 21,
      status: "proposed",
      matchScore: 95,
      assignedUniversityId: "aiims-jodhpur",
      imageUrl: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
  seeded(
    "LOK-0987",
    "Farm borewell dry — 40 acres rain-fed only",
    "agriculture",
    "High",
    "ai_validated",
    "Osian Farm Belt",
    "Ward 11",
    "Jodhpur",
    "The shared borewell for the farm belt has dried up; 40 acres currently depend entirely on monsoon.",
    {
      reportedBy: "Sunil Mahto",
      upvotes: 18,
      commentsCount: 3,
      status: "ai_validated",
      matchScore: 82,
      assignedUniversityId: "gpc-jodhpur",
      imageUrl: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
  seeded(
    "LOK-0974",
    "No ramp access at district court & bus stand",
    "accessibility",
    "Medium",
    "reported",
    "District Court Complex",
    "Ward 9",
    "Jodhpur",
    "Public buildings lack accessible ramps for wheelchair users; elders are forced to navigate steps.",
    {
      reportedBy: "Kiran Gopal",
      upvotes: 12,
      commentsCount: 2,
      status: "reported",
      imageUrl: "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
  seeded(
    "LOK-0902",
    "Community water kiosk: clean drinking water for 800 households",
    "water",
    "Medium",
    "resolved",
    "Luni Block, Near CHC",
    "Ward 3",
    "Jodhpur",
    "Flagship pilot delivered: solar-chlorinated kiosk now serves 800 households with verified clean water. Evidence from 210 post-install samples.",
    {
      reportedBy: "Sakshi Verma",
      upvotes: 94,
      commentsCount: 27,
      status: "resolved",
      matchScore: 97,
      assignedUniversityId: "bit-mesra",
      peopleAffected: 800,
      imageUrl:
        "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ),
];

/** Predicted ranking of universities for a category — used by the mock AI router. */
export function universityHits(category: CategoryId): number {
  const weights: Record<CategoryId, number[]> = {
    water: [0.97, 0.9, 0.93, 0.85, 0.8, 0.74],
    sanitation: [0.88, 0.96, 0.84, 0.8, 0.82, 0.7],
    health: [0.82, 0.86, 0.8, 0.76, 0.97, 0.72],
    education: [0.78, 0.84, 0.96, 0.72, 0.74, 0.68],
    agriculture: [0.83, 0.86, 0.78, 0.9, 0.72, 0.8],
    environment: [0.95, 0.88, 0.76, 0.7, 0.72, 0.78],
    energy: [0.74, 0.82, 0.92, 0.7, 0.68, 0.66],
    urban: [0.8, 0.95, 0.86, 0.88, 0.78, 0.76],
    accessibility: [0.7, 0.78, 0.72, 0.74, 0.76, 0.92],
    livelihoods: [0.76, 0.8, 0.7, 0.72, 0.74, 0.94],
  };
  const w = weights[category];
  return Math.round((w?.[0] ?? 0.8) * 100);
}

export function matchFor(
  issue: Issue,
  universities: University[],
): { university: University; score: number }[] {
  const weights: Record<CategoryId, number[]> = {
    water: [0.97, 0.9, 0.93, 0.85, 0.8, 0.74],
    sanitation: [0.88, 0.96, 0.84, 0.8, 0.82, 0.7],
    health: [0.82, 0.86, 0.8, 0.76, 0.97, 0.72],
    education: [0.78, 0.84, 0.96, 0.72, 0.74, 0.68],
    agriculture: [0.83, 0.86, 0.78, 0.9, 0.72, 0.8],
    environment: [0.95, 0.88, 0.76, 0.7, 0.72, 0.78],
    energy: [0.74, 0.82, 0.92, 0.7, 0.68, 0.66],
    urban: [0.8, 0.95, 0.86, 0.88, 0.78, 0.76],
    accessibility: [0.7, 0.78, 0.72, 0.74, 0.76, 0.92],
    livelihoods: [0.76, 0.8, 0.7, 0.72, 0.74, 0.94],
  };
  const w = weights[issue.category] ?? [0.8, 0.8, 0.8, 0.8, 0.8, 0.8];
  return universities
    .map((u, i) => ({ university: u, score: Math.round(w[i] * 100) }))
    .sort((a, b) => b.score - a.score);
}

export const PLATFORM_STATS = {
  issuesReported: 14234,
  validated: 203,
  workedOn: 148,
  deployed: 23,
  districts: 12,
  universities: 40,
  funders: 3,
};

export const IMPACT_SERIES = [
  { month: "Jan", submitted: 620, verified: 88 },
  { month: "Feb", submitted: 810, verified: 121 },
  { month: "Mar", submitted: 940, verified: 152 },
  { month: "Apr", submitted: 1120, verified: 178 },
  { month: "May", submitted: 1310, verified: 205 },
  { month: "Jun", submitted: 1495, verified: 232 },
];

export const DISTRICT_SERIES = [
  { district: "Jodhpur", count: 1250 },
  { district: "Sardarpura", count: 893 },
  { district: "Ratanada", count: 646 },
  { district: "Basni", count: 489 },
  { district: "Mandore", count: 346 },
  { district: "Mogra Kalan", count: 290 },
  { district: "Shastri Nagar", count: 240 },
  { district: "Paota", count: 180 },
  { district: "Jaipur", count: 1652 },
  { district: "Udaipur", count: 1874 },
  { district: "Kota", count: 1211 },
];

export const SECTOR_SHARE = [
  { name: "Water", value: 31 },
  { name: "Healthcare", value: 22 },
  { name: "Sanitation", value: 18 },
  { name: "Agriculture", value: 12 },
  { name: "Other", value: 17 },
];

export const VOLUNTEERS = [
  { name: "Priya Sharma", xp: 2480, level: "Gold", role: "Water" },
  { name: "Arjun Mehta", xp: 2190, level: "Gold", role: "Sanitation" },
  { name: "Sahil Ansari", xp: 1840, level: "Silver", role: "Health" },
  { name: "Divya Nair", xp: 1650, level: "Silver", role: "Education" },
  { name: "Rohit Yadav", xp: 1410, level: "Bronze", role: "Urban" },
];

export const OPS = {
  companyName: "Datar Trusts",
  contact: "partners@datartrusts.in",
  password: "demo1234",
};

export const SEED_TEAMS: Record<string, Team> = {
  "LOK-1042": {
    issueId: "LOK-1042",
    universityId: "bit-mesra",
    members: [
      { name: "Aditi Sharma", role: "Team Lead · Env. Engg.", year: "B.Tech 3rd" },
      { name: "Vikram Singh", role: "Hydro Modelling", year: "B.Tech 3rd" },
      { name: "Nidhi Gupta", role: "Field Sampling", year: "B.Tech 2nd" },
      { name: "Rohan Sinha", role: "Civil Drafting", year: "B.Tech 2nd" },
    ],
    faculty: "Dr. Meera Iyer",
    message: "HDPE retrofit designed; ready to pilot at community tap with pressure control.",
    formedAt: now - DAY,
    milestones: [
      { label: "Field survey & water lab tests", desc: "12 samples; pH / chlorine baseline", due: "Week 2", done: true },
      { label: "Pipe retrofit design", desc: "HDPE replacement + valve scheme drafted", due: "Week 4", done: true },
      { label: "Pilot install", desc: "Community tap prototype install", due: "Week 8", done: false },
      { label: "Impact report", desc: "Households served + water quality summary", due: "Week 10", done: false },
    ],
  },
  "LOK-1026": {
    issueId: "LOK-1026",
    universityId: "iit-jodhpur",
    members: [
      { name: "Ananya Rao", role: "Team Lead · Civil", year: "B.Tech 4th" },
      { name: "Karthik Nair", role: "Drainage Design", year: "B.Tech 4th" },
      { name: "Simran Kaur", role: "Community Liason", year: "MTech 1st" },
      { name: "Arjun Patil", role: "GIS Survey", year: "B.Tech 3rd" },
    ],
    faculty: "Dr. S. Raghavan",
    message: "Corridor drain re-profiled and school-side footpath restored.",
    formedAt: now - 12 * DAY,
    milestones: [
      { label: "Drain survey & load mapping", desc: "Surveyed 1.2 km school corridor", due: "Week 3", done: true },
      { label: "Drain re-profiling", desc: "Improved gradient + silt trap", due: "Week 7", done: true },
      { label: "Footpath & safety railing", desc: "School-side walkway restored", due: "Week 10", done: true },
      { label: "Monsoon monitoring", desc: "Post-monsoon overflow data collected", due: "Week 12", done: false },
    ],
  },
  "LOK-1011": {
    issueId: "LOK-1011",
    universityId: "mody-university",
    members: [
      { name: "Prerna Jain", role: "Team Lead · ECE", year: "B.Tech 3rd" },
      { name: "Dev Khanna", role: "IoT Sensing", year: "B.Tech 3rd" },
      { name: "Faraz Ali", role: "Solar Power", year: "B.Tech 2nd" },
      { name: "Ishita Bansal", role: "Data & Controls", year: "B.Tech 2nd" },
    ],
    faculty: "Dr. R. Menon",
    message: "Solar-hybrid LED streetlight scheme with IoT fault detection proposed.",
    formedAt: now - 4 * DAY,
    milestones: [
      { label: "Dark-spot audit", desc: "Mapped 9 dead poles on Maple Road", due: "Week 2", done: true },
      { label: "Solar hybrid design", desc: "Li-ion + grid hybrid LED scheme", due: "Week 5", done: false },
      { label: "Pilot install", desc: "3-pole pilot before full roll-out", due: "Week 9", done: false },
    ],
  },
  "LOK-0990": {
    issueId: "LOK-0990",
    universityId: "aiims-jodhpur",
    members: [
      { name: "Dr. Priyanka Joshi", role: "Team Lead · Public Health", year: "Resident" },
      { name: "Manav Desai", role: "Field Epidemiology", year: "BDS" },
      { name: "Tanya Shah", role: "Data & Records", year: "MBBS" },
      { name: "Rahul Bhatt", role: "Supply Chain", year: "MBA (Health)" },
    ],
    faculty: "Dr. A. Reddy",
    message: "Essential-medicine supply model drafted; 6-village clinic rota proposed.",
    formedAt: now - 6 * DAY,
    milestones: [
      { label: "Stockout audit", desc: "3 months of PHC stock records reviewed", due: "Week 2", done: true },
      { label: "Supply model design", desc: "Buffer-stock + sharing model", due: "Week 6", done: false },
      { label: "Pilot clinics", desc: "Shared-doctor rota for 6 villages", due: "Week 10", done: false },
    ],
  },
  "LOK-0902": {
    issueId: "LOK-0902",
    universityId: "bit-mesra",
    members: [
      { name: "Aditi Sharma", role: "Team Lead · Env. Engg.", year: "B.Tech 4th" },
      { name: "Vikram Singh", role: "Hydro Modelling", year: "B.Tech 4th" },
      { name: "Nidhi Gupta", role: "Water Quality", year: "B.Tech 3rd" },
      { name: "Rohan Sinha", role: "Solar Install", year: "B.Tech 3rd" },
    ],
    faculty: "Dr. Meera Iyer",
    message: "800 households served; 210 clean-water samples; fully handed over to community.",
    formedAt: now - 70 * DAY,
    milestones: [
      { label: "Feasibility & design", desc: "Kiosk + solar chlorination design", due: "Week 2", done: true },
      { label: "Install", desc: "Kiosk, pump & storage commissioned", due: "Week 8", done: true },
      { label: "Community training", desc: "Local operator trained on O&M", due: "Week 9", done: true },
      { label: "Impact verification", desc: "210 samples verified; report published", due: "Week 14", done: true },
    ],
  },
};

export type SeededFunding = { funderId: string; amount: number; note: string; date: number };

export const SEED_FUNDINGS: Record<string, SeededFunding> = {
  "LOK-1026": {
    funderId: "datar-trusts",
    amount: 1500000,
    note: "School-corridor sanitation + drainage funding",
    date: now - 5 * DAY,
  },
  "LOK-0902": {
    funderId: "piramal",
    amount: 1200000,
    note: "Clean-water kiosk pilot — 800 households",
    date: now - 50 * DAY,
  },
};

export interface AnalysisBundle {
  summary: string;
  causes: string[];
  recommendations: string[];
  cost: string;
  timeline: string;
}

export const ANALYSIS: Record<CategoryId, AnalysisBundle> = {
  water: {
    summary:
      "Fractured distribution pipework near the community tap. Pressure loss plus backflow risk pulls untreated pond water into the drinking line.",
    causes: [
      "Aged 4-inch PVC under road load",
      "No routine pressure / chlorine checks",
      "Community tap lacks a drainage apron",
    ],
    recommendations: [
      "Replace damaged segment with HDPE + flanged joints",
      "Install a pressure gauge and auto-sampler at the tap",
      "Add a solar chlorinator before the community tap",
      "Engage local operator for weekly depth / chlorine log",
    ],
    cost: "₹8–12 L",
    timeline: "10 weeks",
  },
  sanitation: {
    summary:
      "Open drain overflows onto the school corridor daily. Silt load high; gradient inadequate; no silt trap at junction.",
    causes: [
      "Flat gradient + undersized segments",
      "Blocked silt trap at main junction",
      "Informal dumping near school gate",
    ],
    recommendations: [
      "Re-profile drain with improved gradient",
      "Install periodic silt traps and vents",
      "Add rainwater harvesting outfall",
      "Community clean-up drive + signage",
    ],
    cost: "₹6–9 L",
    timeline: "12 weeks",
  },
  health: {
    summary:
      "PHC routinely stocks out of essential medicines; 6 villages share a single doctor. Service gaps peak post-monsoon.",
    causes: [
      "No buffer stock at PHC level",
      "Single-doctor coverage for 6 villages",
      "Weak referral links to district hospital",
    ],
    recommendations: [
      "Buffer-stock + inter-PHC sharing model",
      "Shared-doctor rota with telehealth slots",
      "Refill reminders via SMS to village volunteers",
      "Maternal-child screening camps quarterly",
    ],
    cost: "₹15–20 L",
    timeline: "12 weeks",
  },
  education: {
    summary:
      "School infrastructure gaps limit attendance; students miss classes in heavy rain. Community wants repair-first approach.",
    causes: [
      "Richardson roof leaks in monsoon",
      "Toilets out of service",
      "No covered play/assembly area",
    ],
    recommendations: [
      "Roof retrofit with rain-safe cladding",
      "Restore water + sanitation block",
      "Covered assembly area doubling as study hall",
      "Local material sourcing to cut costs",
    ],
    cost: "₹10–14 L",
    timeline: "14 weeks",
  },
  agriculture: {
    summary:
      "Shared borewell dry; 40 acres depend on monsoon. Aquifer recharge and drip precision are the levers.",
    causes: [
      "Falling water table from over-extraction",
      "Open, unlined irrigation channels leak",
      "No rainwater recharge structures",
    ],
    recommendations: [
      "Farm-pond + recharge well network",
      "Drip conversion for vegetable belts",
      "Soil-moisture IoT for irrigation timing",
      "Farmer co-op for equipment sharing",
    ],
    cost: "₹12–18 L",
    timeline: "12 weeks",
  },
  environment: {
    summary:
      "Local ecosystem stress — waste dumping near water body and shoreline erosion require combined civic + university intervention.",
    causes: [
      "Open dumping into the water body",
      "Shoreline erosion from run-off",
      "No community waste segregation",
    ],
    recommendations: [
      "Bio-fence and native planting along shore",
      "Segregation bins at 6 collection points",
      "Water-quality baseline + monthly samples",
      "School awareness program",
    ],
    cost: "₹5–8 L",
    timeline: "10 weeks",
  },
  energy: {
    summary:
      "Streetlight outages and high grid usage; solar-hybrid retrofits cut both downtime and energy cost.",
    causes: [
      "Aged wiring and ballast failures",
      "No fault telemetry",
      "Grid tariff rising",
    ],
    recommendations: [
      "Solar-hybrid LED retrofits",
      "IoT fault detection panels",
      "Community solar for the ward",
      "Demand-shift to off-peak hours",
    ],
    cost: "₹9–13 L",
    timeline: "11 weeks",
  },
  urban: {
    summary:
      "Public infrastructure gap — streetlights dead, footpaths missing. Dense ward; night-safety concern.",
    causes: [
      "Outdated lighting stock",
      "Footpath encroachment",
      "No maintenance contract",
    ],
    recommendations: [
      "LED + sensor streetlight scheme",
      "Pedestrian-first footpath redesign",
      "Slip-free tactile paving",
      "Night-safety lighting at junctions",
    ],
    cost: "₹7–11 L",
    timeline: "9 weeks",
  },
  accessibility: {
    summary:
      "Public buildings lack accessible ramps; elders and wheelchair users are blocked by steps at court and bus stand.",
    causes: [
      "No ramps in original design",
      "Handrails and tactile guides absent",
      "Signage missing for accessible routes",
    ],
    recommendations: [
      "Ramp retrofit with 1:12 gradient",
      "Tactile paving + high-contrast signage",
      "Priority drop-off zones at entrances",
      "Accessibility audit of civic buildings",
    ],
    cost: "₹4–6 L",
    timeline: "7 weeks",
  },
  livelihoods: {
    summary:
      "Skill-training demand high; artisans lack market linkage. Local livelihood groups need structured upskilling.",
    causes: [
      "Seasonal agricultural income",
      "No formal skill certification",
      "Weak market linkage for village craft",
    ],
    recommendations: [
      "Skill certification in solar / plumbing trades",
      "Digital market platform for crafts",
      "Enterprise loans via partner NGO",
      "Apprenticeship with local firms",
    ],
    cost: "₹8–12 L",
    timeline: "16 weeks",
  },
};

export function analysisFor(category: CategoryId): AnalysisBundle {
  return ANALYSIS[category] ?? ANALYSIS.water;
}

export const REPORT_PHOTOS = [
  "https://images.pexels.com/photos/12002262/pexels-photo-12002262.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/15085131/pexels-photo-15085131.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/18865287/pexels-photo-18865287.jpeg?auto=compress&cs=tinysrgb&w=800",
];