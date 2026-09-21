/**
 * Verified, high-quality Pexels photography collection organized by civic issue topics.
 * All URLs have been verified to return 200 OK.
 */

export interface TopicImages {
  primary: string;
  alternatives: string[];
}

export const ISSUE_TOPIC_IMAGES: Record<string, TopicImages> = {
  // Hospital & Healthcare & Medical Facilities
  hospital: {
    primary: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=800", // Hospital building / medical entrance
    alternatives: [
      "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800", // Hospital ward / patient care
      "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800", // Hospital clinic examination room
      "https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=800", // Hospital corridor & medical facilities
      "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800", // Clinic & doctor consultations
      "https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=800", // Medical equipment / clinic
    ],
  },

  // Damaged highway, potholes, broken roads & street infrastructure
  road_damaged: {
    primary: "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=800", // Damaged cracked highway road
    alternatives: [
      "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800", // Potholes and damaged asphalt
      "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=800", // Road cracks and construction repair
      "https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg?auto=compress&cs=tinysrgb&w=800", // Broken rough road surface
      "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800", // Highway road
    ],
  },

  // Water resources, leaks, taps, pipelines & handpumps
  water: {
    primary: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800", // Water pipeline & leakage
    alternatives: [
      "https://images.pexels.com/photos/5294114/pexels-photo-5294114.jpeg?auto=compress&cs=tinysrgb&w=800", // Leaking public water tap
      "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=800", // Community water kiosk / clean tap
      "https://images.pexels.com/photos/8481931/pexels-photo-8481931.jpeg?auto=compress&cs=tinysrgb&w=800", // Village hand pump & borewell
      "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800", // Water pipeline infrastructure
      "https://images.pexels.com/photos/35290675/pexels-photo-35290675.jpeg?auto=compress&cs=tinysrgb&w=800", // Flowing water supply
    ],
  },

  // Sanitation, garbage disposal, waste dump & drainage
  sanitation: {
    primary: "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800", // Garbage accumulation / waste dump
    alternatives: [
      "https://images.pexels.com/photos/3850587/pexels-photo-3850587.jpeg?auto=compress&cs=tinysrgb&w=800", // Plastic waste & trash pile
      "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800", // Municipal drainage & street cleaning
      "https://images.pexels.com/photos/19156793/pexels-photo-19156793.jpeg?auto=compress&cs=tinysrgb&w=800", // Waste collection bin
    ],
  },

  // Electricity, streetlights, power lines & transformers
  electricity: {
    primary: "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800", // Streetlights on dark road
    alternatives: [
      "https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&w=800", // Power lines & electrical grid
      "https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&w=800", // Electric utility pole
    ],
  },

  // Public transport, buses, bus stops, traffic & parking
  transport: {
    primary: "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=800", // City public bus
    alternatives: [
      "https://images.pexels.com/photos/208559/pexels-photo-208559.jpeg?auto=compress&cs=tinysrgb&w=800", // Bus stop shelter
      "https://images.pexels.com/photos/1009922/pexels-photo-1009922.jpeg?auto=compress&cs=tinysrgb&w=800", // City traffic congestion & parking
    ],
  },

  // Agriculture, crops, irrigation & drought
  agriculture: {
    primary: "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800", // Dry cracked soil / irrigation drought
    alternatives: [
      "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800", // Agricultural fields & crops
      "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=800", // Farm harvest & rural farming
      "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800", // Farmland
    ],
  },

  // Education, schools, classrooms & libraries
  education: {
    primary: "https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg?auto=compress&cs=tinysrgb&w=800", // School classroom desks
    alternatives: [
      "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800", // School campus & building
      "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800", // Books and school library
    ],
  },

  // Accessibility, ramps & mobility
  accessibility: {
    primary: "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800", // Wheelchair access ramp
    alternatives: [
      "https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=800", // Mobility aid & accessibility
    ],
  },

  // Environment, water bodies, plantation & forestry
  environment: {
    primary: "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800", // River & pond water body
    alternatives: [
      "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800", // Tree plantation & environment
    ],
  },
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Checks if a given image URL is valid and displayable (not a temporary blob: or invalid URL).
 */
export function isValidIssueImage(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("blob:")) return false;
  if (trimmed.startsWith("data:")) return false;
  return true;
}

/**
 * Intelligent topic classifier based on issue title, category, and description.
 * Evaluates the actual civic problem described in the title and maps to an authentic Pexels photograph.
 */
export function getIssueImageByTitleAndCategory(
  title?: string | null,
  category?: string | null,
  description?: string | null,
): string {
  const titleText = (title ?? "").toLowerCase().trim();
  const catText = (category ?? "").toLowerCase().trim();
  const descText = (description ?? "").toLowerCase().trim();
  const hash = hashString(titleText || catText || "samadhan-issue");

  const pickFrom = (topic: TopicImages) => {
    const list = [topic.primary, ...topic.alternatives];
    return list[hash % list.length];
  };

  // 1. Precise check on Title text:

  // Accessibility / Ramps
  if (
    titleText.includes("ramp") ||
    titleText.includes("wheelchair") ||
    titleText.includes("tactile") ||
    titleText.includes("mobility aid") ||
    titleText.includes("accessible")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.accessibility);
  }

  // Streetlights / Electricity / Power
  if (
    titleText.includes("streetlight") ||
    titleText.includes("street light") ||
    titleText.includes("streetlights") ||
    titleText.includes("lights dead") ||
    titleText.includes("lighting") ||
    titleText.includes("transformer") ||
    titleText.includes("power line") ||
    titleText.includes("voltage") ||
    titleText.includes("grid power") ||
    titleText.includes("btm connection")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.electricity);
  }

  // Hospital & Healthcare
  if (
    titleText.includes("hospital") ||
    titleText.includes("phc") ||
    titleText.includes("clinic") ||
    titleText.includes("doctor") ||
    titleText.includes("ambulance") ||
    titleText.includes("medicine") ||
    titleText.includes("facilities doesn't work") ||
    titleText.includes("health camp") ||
    titleText.includes("anganwadi nutrition") ||
    titleText.includes("cold-chain")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.hospital);
  }

  // Drainage & Sanitation & Waste
  if (
    titleText.includes("open drain") ||
    titleText.includes("drain") ||
    titleText.includes("sewage") ||
    titleText.includes("garbage") ||
    titleText.includes("waste") ||
    titleText.includes("dustbin") ||
    titleText.includes("toilet") ||
    titleText.includes("dumped") ||
    titleText.includes("cleanliness") ||
    titleText.includes("stagnant water")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.sanitation);
  }

  // Water supply, pipelines, taps, handpumps, kiosks
  if (
    titleText.includes("drinking water") ||
    titleText.includes("water pipe") ||
    titleText.includes("pipe leaking") ||
    titleText.includes("water tap") ||
    titleText.includes("tap connection") ||
    titleText.includes("handpump") ||
    titleText.includes("water kiosk") ||
    titleText.includes("storage tank") ||
    titleText.includes("borewell motor") ||
    (titleText.includes("water") && !titleText.includes("water near bus stand") && !titleText.includes("stagnant water"))
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.water);
  }

  // Damaged highway, road, potholes, street surface
  if (
    titleText.includes("highway") ||
    titleText.includes("pothole") ||
    titleText.includes("broken road") ||
    titleText.includes("damaged highway") ||
    titleText.includes("damaged road") ||
    titleText.includes("cracked road") ||
    titleText.includes("road is broken") ||
    titleText.includes("speed breaker") ||
    titleText.includes("footpath") ||
    titleText.includes("footbridge") ||
    titleText.includes("road surface") ||
    titleText.includes("street area") ||
    titleText.includes("roads issue") ||
    titleText.includes("road")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.road_damaged);
  }

  // Education / Schools / Classrooms
  if (
    titleText.includes("school") ||
    titleText.includes("classroom") ||
    titleText.includes("library") ||
    titleText.includes("books") ||
    titleText.includes("mid-day meal")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.education);
  }

  // Public Transport
  if (
    titleText.includes("bus stand") ||
    titleText.includes("bus") ||
    titleText.includes("parking") ||
    titleText.includes("stop sign") ||
    titleText.includes("traffic")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.transport);
  }

  // Agriculture
  if (
    titleText.includes("farm") ||
    titleText.includes("crop") ||
    titleText.includes("sowing") ||
    titleText.includes("soil") ||
    titleText.includes("irrigation") ||
    titleText.includes("kharif") ||
    titleText.includes("seed bank") ||
    titleText.includes("drip line")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.agriculture);
  }

  // Environment
  if (
    titleText.includes("mining") ||
    titleText.includes("pond") ||
    titleText.includes("river") ||
    titleText.includes("tree") ||
    titleText.includes("plantation") ||
    titleText.includes("grove") ||
    titleText.includes("wetland") ||
    titleText.includes("air quality")
  ) {
    return pickFrom(ISSUE_TOPIC_IMAGES.environment);
  }

  // 2. Category matching if title didn't hit a specific rule:
  if (catText.includes("health")) return pickFrom(ISSUE_TOPIC_IMAGES.hospital);
  if (catText.includes("road") || catText.includes("urban") || catText.includes("infra")) return pickFrom(ISSUE_TOPIC_IMAGES.road_damaged);
  if (catText.includes("water")) return pickFrom(ISSUE_TOPIC_IMAGES.water);
  if (catText.includes("sanitat") || catText.includes("garbage")) return pickFrom(ISSUE_TOPIC_IMAGES.sanitation);
  if (catText.includes("electr") || catText.includes("energy")) return pickFrom(ISSUE_TOPIC_IMAGES.electricity);
  if (catText.includes("trans")) return pickFrom(ISSUE_TOPIC_IMAGES.transport);
  if (catText.includes("agri")) return pickFrom(ISSUE_TOPIC_IMAGES.agriculture);
  if (catText.includes("educat")) return pickFrom(ISSUE_TOPIC_IMAGES.education);
  if (catText.includes("access")) return pickFrom(ISSUE_TOPIC_IMAGES.accessibility);
  if (catText.includes("environ")) return pickFrom(ISSUE_TOPIC_IMAGES.environment);

  // 3. Fallback to description analysis
  if (descText.includes("hospital") || descText.includes("doctor")) return pickFrom(ISSUE_TOPIC_IMAGES.hospital);
  if (descText.includes("pothole") || descText.includes("pavement")) return pickFrom(ISSUE_TOPIC_IMAGES.road_damaged);
  if (descText.includes("drinking water") || descText.includes("tap")) return pickFrom(ISSUE_TOPIC_IMAGES.water);

  // Default fallback: damaged road photo
  return ISSUE_TOPIC_IMAGES.road_damaged.primary;
}
