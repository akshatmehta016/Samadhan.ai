import type { Issue } from "@/lib/akshat-types";

export type Translate = (key: string, fallback?: string) => string;

export const CATEGORY_KEYS: Record<string, string> = {
  // Water
  "water resources": "catWater",
  water: "catWater",
  "water & sanitation": "catWater",
  "water & sewage": "catWater",
  "water body revival": "catWater",
  "drainage & safety": "catWater",
  // Sanitation & Waste
  sanitation: "catGarbage",
  "garbage & cleanliness": "catGarbage",
  "garbage & sanitation": "catGarbage",
  "garbage management": "catGarbage",
  "sanitation & waste": "catGarbage",
  // Roads & Infrastructure (urban slug in backend maps to Road & Infrastructure)
  infrastructure: "catRoad",
  roads: "catRoad",
  "road & infrastructure": "catRoad",
  "roads & infrastructure": "catRoad",
  "roads & potholes": "catRoad",
  urban: "catRoad",
  "urban development": "catRoad",
  "public amenities": "catRoad",
  "illegal hoardings": "catRoad",
  encroachment: "catRoad",
  // Electricity & Energy
  electricity: "catElectricity",
  "electricity & street light": "catElectricity",
  "street lighting": "catElectricity",
  energy: "catEnergy",
  // Transport
  transport: "catTransport",
  "public transport": "catTransport",
  // Healthcare
  healthcare: "catHealthcare",
  health: "catHealthcare",
  // Education
  education: "catEducation",
  // Agriculture
  agriculture: "catAgriculture",
  // Environment
  environment: "catEnvironment",
  "trees & parks": "catEnvironment",
  "green cover": "catEnvironment",
  "zero-waste & green space": "catEnvironment",
  // Accessibility & Livelihoods
  accessibility: "catAccessibility",
  livelihoods: "catLivelihoods",
  // Other
  other: "catOther",
  "stray animals": "catOther",
  "public safety": "catOther",
  "disaster relief": "catOther",
};

export const STATUS_KEYS: Record<string, string> = {
  new: "statusNew",
  reported: "statusNew",
  "under review": "statusUnderReview",
  ai_validated: "statusUnderReview",
  "in progress": "statusInProgress",
  team_formed: "statusInProgress",
  proposed: "statusInProgress",
  funded: "statusInProgress",
  deployed: "statusInProgress",
  resolved: "statusResolved",
  pending: "metricPending",
};

export function categoryText(t: Translate, category: string): string {
  if (!category) return "";
  const trimmed = category.trim();
  const key = CATEGORY_KEYS[trimmed.toLowerCase()] || CATEGORY_KEYS[trimmed];
  return key ? t(key, category) : category;
}

export function statusText(t: Translate, status: string): string {
  if (!status) return "";
  const trimmed = status.trim();
  const key = STATUS_KEYS[trimmed.toLowerCase()] || STATUS_KEYS[trimmed];
  return key ? t(key, status) : status;
}

const TITLE_TRANSLATIONS: Record<string, Record<string, string>> = {
  "road is broken near the street area": {
    hi: "सड़क क्षेत्र के पास सड़क टूटी हुई है",
    gu: "શેરી વિસ્તાર નજીક રસ્તો તૂટેલો છે",
    mr: "रस्त्याच्या परिसराजवळ रस्ता तुटलेला आहे",
    bn: "রাস্তার এলাকার কাছে রাস্তা ভেঙে গেছে",
    ta: "தெரு பகுதி அருகே சாலை உடைந்துள்ளது",
    te: "వీధి ప్రాంతం సమీపంలో రోడ్డు దెబ్బతింది",
  },
  "damaged highway road.": {
    hi: "क्षतिग्रस्त राजमार्ग सड़क।",
    gu: "ક્ષતિગ્રસ્ત હાઇવે રોડ.",
    mr: "खराब झालेला महामार्ग रस्ता.",
    bn: "ক্ষতিগ্রস্ত মহাসড়ক রাস্তা।",
    ta: "சேதமடைந்த நெடுஞ்சாலை.",
    te: "దెబ్బతిన్న రహదారి.",
  },
  "damaged highway road": {
    hi: "क्षतिग्रस्त राजमार्ग सड़क",
    gu: "ક્ષતિગ્રસ્ત હાઇવે રોડ",
    mr: "खराब झालेला महामार्ग रस्ता",
    bn: "ক্ষতিগ্রস্ত মহাসড়ক রাস্তা",
    ta: "சேதமடைந்த நெடுஞ்சாலை",
    te: "దెబ్బతిన్న రహదారి",
  },
};

const LOCATION_TERMS: Record<string, Record<string, string>> = {
  hi: {
    "Mogra Kalan": "मोगरा कलां",
    "Sardarpura": "सरदारपुरा",
    "Main Circle": "मुख्य चौराहा",
    "Jodhpur": "जोधपुर",
    "Ranchi": "रांची",
    "Village X": "ग्राम X",
    "Village": "ग्राम",
    "near": "के पास",
    "Rajasthan": "राजस्थान",
    "Ward": "वार्ड",
    "Sector": "सेक्टर",
    "Phase": "फेज",
    "Road": "रोड",
    "Street Area": "सड़क क्षेत्र",
    "Area": "इलाका",
  },
  gu: {
    "Mogra Kalan": "મોગરા કલાં",
    "Sardarpura": "સરદારપુરા",
    "Main Circle": "મુખ્ય સર્કલ",
    "Jodhpur": "જોધપુર",
    "Ranchi": "રાંચી",
    "Village X": "ગામ X",
    "Village": "ગામ",
    "near": "નજીક",
    "Rajasthan": "રાજસ્થાન",
    "Ward": "વોર્ડ",
    "Sector": "સેક્ટર",
    "Phase": "ફેઝ",
    "Road": "રોડ",
  },
  mr: {
    "Mogra Kalan": "मोगरा कलान",
    "Sardarpura": "सरदारपुरा",
    "Main Circle": "मुख्य चौक",
    "Jodhpur": "जोधपूर",
    "Ranchi": "रांची",
    "Village X": "गाव X",
    "Village": "गाव",
    "near": "जवळ",
    "Rajasthan": "राजस्थान",
    "Ward": "वॉर्ड",
    "Sector": "सेक्टर",
    "Phase": "टप्पा",
    "Road": "रस्ता",
  },
  bn: {
    "Mogra Kalan": "মোগরা কালান",
    "Sardarpura": "সরদারপুরা",
    "Main Circle": "প্রধান চত্বর",
    "Jodhpur": "যোধপুর",
    "Ranchi": "রাঁচি",
    "Village X": "গ্রাম X",
    "Village": "গ্রাম",
    "near": "কাছে",
    "Rajasthan": "রাজস্থান",
    "Ward": "ওয়ার্ড",
    "Sector": "সেক্টর",
    "Phase": "পর্যায়",
    "Road": "রাস্তা",
  },
  ta: {
    "Mogra Kalan": "மோக்ரா கலான்",
    "Sardarpura": "சர்தார்புரா",
    "Main Circle": "மெயின் சர்க்கிள்",
    "Jodhpur": "ஜோத்பூர்",
    "Ranchi": "ராஞ்சி",
    "Village X": "கிராமம் X",
    "Village": "கிராமம்",
    "near": "அருகில்",
    "Rajasthan": "ராஜஸ்தான்",
    "Ward": "வார்டு",
    "Sector": "செக்டார்",
    "Phase": "பகுதி",
    "Road": "சாலை",
  },
  te: {
    "Mogra Kalan": "మోగ్రా కలాన్",
    "Sardarpura": "సర్దార్‌పురా",
    "Main Circle": "మెయిన్ సర్కిల్",
    "Jodhpur": "జోధ్‌పూర్",
    "Ranchi": "రాంచీ",
    "Village X": "గ్రామం X",
    "Village": "గ్రామం",
    "near": "సమీపంలో",
    "Rajasthan": "రాజస్థాన్",
    "Ward": "వార్డు",
    "Sector": "సెక్టార్",
    "Phase": "దశ",
    "Road": "రోడ్డు",
  },
};

function getActiveLanguage(t: Translate): string {
  const allText = t("catAll", "All");
  if (allText === "બધા") return "gu";
  if (allText === "सर्व") return "mr";
  if (allText === "সব") return "bn";
  if (allText === "அனைத்தும்") return "ta";
  if (allText === "అన్నీ") return "te";
  if (allText === "All") return "en";
  return "hi";
}

export function translateLocation(loc: string, langCode: string): string {
  if (!loc || langCode === "en") return loc;
  const terms = LOCATION_TERMS[langCode] || LOCATION_TERMS.hi;
  if (!terms) return loc;

  let result = loc;
  for (const [eng, local] of Object.entries(terms)) {
    const escaped = eng.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    result = result.replace(regex, local);
  }
  return result;
}

export function issueField(
  t: Translate,
  issue: Pick<Issue, "id">,
  field: "title" | "description" | "location" | "assignedUniversity",
  fallback: string,
): string {
  if (!fallback) return "";

  // 1. Direct issue ID translation check
  const idKey = `issue.${issue.id}.${field}`;
  const translatedById = t(idKey, "");
  if (translatedById && translatedById !== idKey) return translatedById;

  // 2. Direct text dictionary check
  const trimmed = fallback.trim();
  const textKey = `text.${trimmed}`;
  const translatedByText = t(textKey, "");
  if (translatedByText && translatedByText !== textKey) return translatedByText;

  const currentLang = getActiveLanguage(t);
  if (currentLang === "en") return fallback;

  // 3. Dynamic Title Translation
  if (field === "title") {
    // Pattern: "[Category] Issue - Community Reported"
    const patternMatch = /^(.*?)\s*Issue\s*-\s*Community\s+Reported$/i.exec(trimmed);
    if (patternMatch) {
      const catPart = patternMatch[1].trim();
      const catTrans = categoryText(t, catPart);
      const suffix = t("issueCommunityReportedSuffix", "समस्या - नागरिक द्वारा दर्ज");
      return `${catTrans} ${suffix}`;
    }

    // Known titles dictionary
    const lower = trimmed.toLowerCase();
    const known = TITLE_TRANSLATIONS[lower];
    if (known) {
      const trans = known[currentLang] || known.hi;
      if (trans) return trans;
    }
  }

  // 4. Dynamic Location Translation
  if (field === "location") {
    return translateLocation(trimmed, currentLang);
  }

  return fallback;
}

export function notifField(
  t: Translate,
  id: string,
  field: "title" | "body" | "timeAgo",
  fallback: string,
): string {
  return t(`notif.${id}.${field}`, fallback);
}

export function volunteerField(
  t: Translate,
  id: string,
  field: "name" | "role" | "badge",
  fallback: string,
): string {
  return t(`volunteer.${id}.${field}`, fallback);
}

export function commentField(
  t: Translate,
  id: string,
  field: "text" | "authorRole" | "daysAgo",
  fallback: string,
): string {
  return t(`comment.${id}.${field}`, fallback);
}