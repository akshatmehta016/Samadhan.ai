import type {
  CitizenNotification,
  DiscussionComment,
  GovMetrics,
  Issue,
  UniversityMatch,
  Volunteer,
} from "@/lib/akshat-types";

export const PRIMARY_ISSUE: Issue = {
  id: "lok-001",
  title: "Water supply not available in Sardarpura, Jodhpur",
  category: "Water Resources",
  description:
    "The main pipeline feeding the community water tap has been fractured for 3 weeks, leaving over 50 families without clean municipal drinking water. Residents currently commute 4 km to fetch untreated pond water.",
  location: "Sardarpura, Jodhpur, Rajasthan",
  distance: "2.4 km",
  peopleAffected: 50,
  severity: "High",
  status: "In progress",
  reportedBy: "Priya Sharma",
  reportedDaysAgo: 3,
  imageUrl:
    "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800",
  upvotes: 48,
  commentsCount: 14,
  updatesCount: 3,
  assignedUniversity: "IIT Jodhpur",
  matchScore: 94,
};

export const NEARBY_ISSUES: Issue[] = [
  {
    id: "lok-002",
    title: "Water pipeline fractured at Sector 12",
    category: "Water Resources",
    description:
      "Pipe leakage causing zero pressure at community standposts in Sector 12.",
    location: "Sector 12, Ward 5",
    distance: "2.4 km",
    peopleAffected: 28,
    severity: "High",
    status: "In progress",
    reportedBy: "Ravi Kumar",
    reportedDaysAgo: 5,
    imageUrl:
      "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800",
    upvotes: 32,
    commentsCount: 9,
    updatesCount: 2,
  },
  {
    id: "lok-003",
    title: "Garbage not collected near playground",
    category: "Sanitation",
    description:
      "Municipal waste has accumulated for 10 days near the children playground.",
    location: "Near Green Park Area",
    distance: "1.2 km",
    peopleAffected: 17,
    severity: "Medium",
    status: "Under review",
    reportedBy: "Anita Roy",
    reportedDaysAgo: 2,
    imageUrl:
      "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800",
    upvotes: 21,
    commentsCount: 4,
    updatesCount: 1,
  },
  {
    id: "lok-004",
    title: "Streetlights not working on Maple Road",
    category: "Infrastructure",
    description:
      "Entire 800m stretch is completely dark, safety hazard for pedestrians at night.",
    location: "Maple Road, Phase 2",
    distance: "3.1 km",
    peopleAffected: 12,
    severity: "Low",
    status: "New",
    reportedBy: "Aman Verma",
    reportedDaysAgo: 1,
    imageUrl:
      "https://images.pexels.com/photos/4857606/pexels-photo-4857606.jpeg?auto=compress&cs=tinysrgb&w=800",
    upvotes: 15,
    commentsCount: 3,
    updatesCount: 0,
  },
];

export const RELATED_DUPLICATE_ISSUES: Issue[] = [
  {
    id: "lok-rel-1",
    title: "Water tap broken in Ward 5, Sector 12",
    category: "Water Resources",
    description:
      "Community brass tap snapped off, continuous water wastage for two weeks.",
    location: "Ward 5, Sector 12",
    distance: "2.1 km",
    peopleAffected: 30,
    severity: "Medium",
    status: "In progress",
    reportedBy: "Gopal Mehra",
    reportedDaysAgo: 12,
    imageUrl:
      "https://images.pexels.com/photos/5294114/pexels-photo-5294114.jpeg?auto=compress&cs=tinysrgb&w=500",
    upvotes: 42,
    commentsCount: 8,
    updatesCount: 2,
  },
  {
    id: "lok-rel-2",
    title: "No water supply for 2 weeks in nearby village",
    category: "Water Resources",
    description:
      "Distribution borewell motor burned out due to voltage fluctuations.",
    location: "Bariatu Sub-division",
    distance: "3.4 km",
    peopleAffected: 65,
    severity: "High",
    status: "Under review",
    reportedBy: "Kavita Soren",
    reportedDaysAgo: 15,
    imageUrl:
      "https://images.pexels.com/photos/35290675/pexels-photo-35290675.jpeg?auto=compress&cs=tinysrgb&w=500",
    upvotes: 56,
    commentsCount: 17,
    updatesCount: 3,
  },
  {
    id: "lok-rel-3",
    title: "Hand pump not working near school",
    category: "Water Resources",
    description:
      "Primary school handpump handle broken, students have no drinking source.",
    location: "Govt Primary School, Ward 9",
    distance: "4.8 km",
    peopleAffected: 120,
    severity: "High",
    status: "In progress",
    reportedBy: "Headmaster S. K. Jha",
    reportedDaysAgo: 20,
    imageUrl:
      "https://images.pexels.com/photos/8481931/pexels-photo-8481931.jpeg?auto=compress&cs=tinysrgb&w=500",
    upvotes: 78,
    commentsCount: 23,
    updatesCount: 4,
  },
];

export const INITIAL_COMMENTS: DiscussionComment[] = [
  {
    id: "c1",
    authorName: "Ravi Kumar",
    authorRole: "Resident, Sector 12",
    avatarUrl:
      "https://images.pexels.com/photos/30133734/pexels-photo-30133734.jpeg?auto=compress&cs=tinysrgb&w=150",
    daysAgo: "3 days ago",
    text: "We are facing the same issue in Sector 12. No water since Monday. Is anyone else from this area affected?",
    upvotes: 12,
    hasUpvoted: false,
    repliesCount: 5,
  },
  {
    id: "c2",
    authorName: "Anita Singh",
    authorRole: "Community Representative",
    avatarUrl:
      "https://images.pexels.com/photos/7959806/pexels-photo-7959806.jpeg?auto=compress&cs=tinysrgb&w=150",
    daysAgo: "2 days ago",
    text: "Yes, same here. We've also raised a complaint at the local sub-divisional office. They cited pipe maintenance but gave no estimated date.",
    imageUrl:
      "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400",
    upvotes: 8,
    hasUpvoted: true,
    repliesCount: 2,
  },
  {
    id: "c3",
    authorName: "Suresh Patel",
    authorRole: "Local Plumber / Volunteer",
    avatarUrl:
      "https://images.pexels.com/photos/13111211/pexels-photo-13111211.jpeg?auto=compress&cs=tinysrgb&w=150",
    daysAgo: "1 day ago",
    text: "I've inspected the main manifold junction. The PVC flange is completely cracked. We need a 4-inch heavy grade replacement pipe to bypass the damaged valve.",
    upvotes: 19,
    hasUpvoted: false,
    repliesCount: 7,
  },
];

export const BIT_MESRA_MATCH: UniversityMatch = {
  institution: "BIT Mesra",
  department: "Environmental Engineering Department",
  matchScore: 94,
  rationale: [
    "Recognized regional leaders in rural water purification & hydraulics",
    "3 similar decentralized community filtration projects completed in Jharkhand",
    "Certified ISO water quality testing laboratories and field sensor kits available",
    "Active student engineering chapter ready for field pilot deployment",
  ],
  completedProjectsCount: 3,
  activeResearchers: 14,
  leadContact: "Dr. Alok Mukherjee (Head of Environmental Tech)",
};

export const GOV_METRICS: GovMetrics = {
  totalReports: 1247,
  validated: 892,
  inProgress: 345,
  deployed: 89,
  categories: [
    { name: "Water", percentage: 42, count: 524, color: "#0284c7" },
    { name: "Healthcare", percentage: 22, count: 274, color: "#16a34a" },
    { name: "Agriculture", percentage: 15, count: 187, color: "#eab308" },
    { name: "Roads", percentage: 10, count: 125, color: "#f97316" },
    { name: "Others", percentage: 11, count: 137, color: "#8b5cf6" },
  ],
  monthlyTrends: [
    { month: "Apr", submissions: 110, resolved: 70 },
    { month: "May", submissions: 145, resolved: 95 },
    { month: "Jun", submissions: 190, resolved: 120 },
    { month: "Jul", submissions: 230, resolved: 165 },
    { month: "Aug", submissions: 280, resolved: 210 },
    { month: "Sep", submissions: 345, resolved: 280 },
  ],
  districtBreakdown: [
    { district: "Ranchi", reports: 412, status: "urgent" },
    { district: "Dhanbad", reports: 285, status: "urgent" },
    { district: "Jamshedpur", reports: 210, status: "moderate" },
    { district: "Bokaro", reports: 148, status: "moderate" },
    { district: "Hazaribagh", reports: 104, status: "stable" },
    { district: "Deoghar", reports: 88, status: "stable" },
  ],
};

export const TOP_VOLUNTEERS: Volunteer[] = [
  {
    id: "vol-1",
    name: "Aarav Mehta",
    avatar:
      "https://images.pexels.com/photos/36292200/pexels-photo-36292200.jpeg?auto=compress&cs=tinysrgb&w=120",
    role: "Civic Engineer",
    solvedCount: 38,
    xp: 4850,
    badge: "Champion",
    rank: 1,
  },
  {
    id: "vol-2",
    name: "Dr. Sunita Rao",
    avatar:
      "https://images.pexels.com/photos/7581115/pexels-photo-7581115.jpeg?auto=compress&cs=tinysrgb&w=120",
    role: "Biochemist / Lead",
    solvedCount: 29,
    xp: 3920,
    badge: "Gold Contributor",
    rank: 2,
  },
  {
    id: "vol-3",
    name: "Vikramaditya S.",
    avatar:
      "https://images.pexels.com/photos/29204802/pexels-photo-29204802.jpeg?auto=compress&cs=tinysrgb&w=120",
    role: "Urban Planner",
    solvedCount: 24,
    xp: 3140,
    badge: "Guardian",
    rank: 3,
  },
  {
    id: "vol-4",
    name: "Pooja Bhatt",
    avatar:
      "https://images.pexels.com/photos/18890524/pexels-photo-18890524.jpeg?auto=compress&cs=tinysrgb&w=120",
    role: "Community Activist",
    solvedCount: 19,
    xp: 2600,
    badge: "Rising Star",
    rank: 4,
  },
];

export const PLATFORM_STATS = {
  totalResolved: "2,500",
  resolvedGrowth: "+14.5%",
  activeVolunteers: "1,120",
  volunteersGrowth: "+8.2%",
  csrFundsMobilized: "₹8,42,200",
  fundsGrowth: "+22.4%",
  aiAccuracy: "96.8%",
  accuracyGrowth: "+3.1%",
};

export const CITIZEN_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: "ntf-1",
    type: "update",
    title: "Water issue update in Sector 12",
    body: "IIT Jodhpur team started a field assessment for the fractured pipeline you upvoted.",
    timeAgo: "12 min ago",
  },
  {
    id: "ntf-2",
    type: "ai",
    title: "AI verified your neighbourhood report",
    body: "Streetlight outage on Maple Road was cross-checked against 2 similar reports with 96.8% confidence.",
    timeAgo: "1 hr ago",
  },
  {
    id: "ntf-3",
    type: "resolution",
    title: "Stray cattle issue marked resolved",
    body: "The highway flyover cluster you reported reached 420 upvotes and got municipal action.",
    timeAgo: "3 hrs ago",
  },
  {
    id: "ntf-4",
    type: "volunteer",
    title: "12 new volunteers joined your district",
    body: "Jodhpur gained 12 civic volunteers this week — 3 issues already solved by them.",
    timeAgo: "5 hrs ago",
  },
  {
    id: "ntf-5",
    type: "system",
    title: "CSR fund approved for pump repairs",
    body: "₹6.2L sanctioned to restore 14 handpumps across Ward 9.",
    timeAgo: "Yesterday",
  },
  {
    id: "ntf-6",
    type: "update",
    title: "New comment on your upvoted issue",
    body: "Ravi Kumar replied on \u201CWater supply not available in Sardarpura\u201D — 7 replies so far.",
    timeAgo: "2 days ago",
  },
];