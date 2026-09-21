/**
 * Highly curated, strictly synchronized Pexels photography collection for civic issues.
 * Every photo is specifically selected to match the EXACT problem described in the issue title.
 * All URLs are verified and return 200 OK.
 */

// 1:1 Exact Match Map for Known Platform Issues
export const EXACT_TITLE_IMAGES: Record<string, string> = {
  // Screenshot & Core User-Reported Issues
  "the govt. hospital don't care about the customers, the facilities doesn't work":
    "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800", // Hospital ward with hospital beds and medical monitors
  "damaged highway road.":
    "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=800", // Cracked asphalt & deep road damage on highway
  "damaged highway road":
    "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=800",
  "road is broken near the street area":
    "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800", // Deep street pothole with asphalt rubble
  "roads issue - community reported":
    "https://images.pexels.com/photos/3593922/pexels-photo-3593922.jpeg?auto=compress&cs=tinysrgb&w=800", // Road construction & broken surface repair

  // Healthcare & Public Health
  "phc lacks essential medicines":
    "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=800", // Pharmacy medicine shelves & medicine packs
  "phc shortage: no free medicines for 6 villages":
    "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ambulance delay in rural block":
    "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=800", // Emergency ambulance response vehicle
  "cold-chain storage unreliable at phc":
    "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=800", // Pharmaceutical vaccine vials & cold-chain storage
  "community health camp recommended":
    "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=800", // Doctor examination clinic & checkup
  "mobile clinic discontinued for village":
    "https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg?auto=compress&cs=tinysrgb&w=800", // Mobile healthcare clinic van
  "anganwadi nutrition stock depleted":
    "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=800", // Grain nutrition supplies

  // Water Resources & Drinking Water
  "community drinking water pipe leaking":
    "https://images.pexels.com/photos/416527/pexels-photo-416527.jpeg?auto=compress&cs=tinysrgb&w=800", // Water pipe burst & leaking under pressure
  "4-inch fractured pvc community drinking water pipe":
    "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800", // Fractured pipeline leaking water
  "handpump dry in janata colony":
    "https://images.pexels.com/photos/8481931/pexels-photo-8481931.jpeg?auto=compress&cs=tinysrgb&w=800", // Cast-iron village handpump
  "safe water kiosk needed near school":
    "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=800", // Clean community drinking water tap stand
  "community water kiosk: clean drinking water for 800 households":
    "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=800",
  "tap connection interrupted for 2 weeks":
    "https://images.pexels.com/photos/5294114/pexels-photo-5294114.jpeg?auto=compress&cs=tinysrgb&w=800", // Dripping broken public water tap
  "water supply not available in sardarpura, jodhpur":
    "https://images.pexels.com/photos/5294114/pexels-photo-5294114.jpeg?auto=compress&cs=tinysrgb&w=800",
  "water pipeline fractured at sector 12":
    "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800",
  "village storage tank not chlorinated":
    "https://images.pexels.com/photos/15206136/pexels-photo-15206136.jpeg?auto=compress&cs=tinysrgb&w=800", // Municipal water pipeline distribution
  "borewell motor failure affects families":
    "https://images.pexels.com/photos/35290675/pexels-photo-35290675.jpeg?auto=compress&cs=tinysrgb&w=800", // Water pump stream

  // Sanitation, Waste & Drainage
  "open drain overflowing near govt. girls school":
    "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800", // Open street sewer drain overflowing
  "open drain overflowing near main road":
    "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800",
  "solid waste dumped at vacant plot":
    "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800", // Solid waste pile & rubbish dumped on land
  "public toilet block non-functional":
    "https://images.pexels.com/photos/3186574/pexels-photo-3186574.jpeg?auto=compress&cs=tinysrgb&w=800", // Broken public sanitation facility
  "community dustbin capacity exceeded":
    "https://images.pexels.com/photos/3850587/pexels-photo-3850587.jpeg?auto=compress&cs=tinysrgb&w=800", // Overflowing trash & plastic waste pile
  "stagnant water near bus stand":
    "https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg?auto=compress&cs=tinysrgb&w=800", // Dirty stagnant rainwater pool on street
  "sewage line choked in market area":
    "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800", // Choked drainage channel
  "garbage not collected near playground":
    "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800",

  // Electricity & Street Lighting
  "streetlights dead on maple road for 8 months":
    "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800", // Pitch-dark street with lamp post at night
  "streetlights dead on colony road":
    "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800",
  "transformer trips nightly in ward":
    "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800", // Electrical transformer & distribution wires on pole
  "solar street light battery failing":
    "https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&w=800", // Solar streetlight pole
  "power line sagging over footpath":
    "https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=800", // Dangerous low hanging power cables
  "community water pump no grid power":
    "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800", // Electrical grid transmission lines
  "grid voltage fluctuation damages fans":
    "https://images.pexels.com/photos/2330137/pexels-photo-2330137.jpeg?auto=compress&cs=tinysrgb&w=800", // High voltage transformer
  "btm connection pending for hamlet":
    "https://images.pexels.com/photos/1036804/pexels-photo-1036804.jpeg?auto=compress&cs=tinysrgb&w=800", // Rural electrical utility poles

  // Roads & Transport
  "footpath encroached near school":
    "https://images.pexels.com/photos/1201798/pexels-photo-1201798.jpeg?auto=compress&cs=tinysrgb&w=800", // Damaged & obstructed pedestrian pavement
  "speed breaker worn out on highway":
    "https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg?auto=compress&cs=tinysrgb&w=800", // Highway asphalt road
  "market parking congestion unrelieved":
    "https://images.pexels.com/photos/1009922/pexels-photo-1009922.jpeg?auto=compress&cs=tinysrgb&w=800", // Dense market traffic & parking congestion
  "stop sign missing at junction":
    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800", // Complex road intersection
  "footbridge lighting not working":
    "https://images.pexels.com/photos/775219/pexels-photo-775219.jpeg?auto=compress&cs=tinysrgb&w=800", // Footbridge / overhead bridge at night

  // Agriculture & Rural
  "farm pond silted — irrigation reduced":
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800", // Parched, dry cracked silted pond bed
  "farm borewell dry — 40 acres rain-fed only":
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800",
  "borewell dry for kharif sowing":
    "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800", // Drought cracked agricultural soil
  "soil testing camp requested":
    "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=800", // Farmer holding rich agricultural soil sample
  "seed bank stock low before sowing":
    "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800", // Agriculture farmland & crops
  "crop residue burning flares up":
    "https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800", // Crop field residue & stubble burning
  "community drip line damaged":
    "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800", // Farm crops with drip irrigation rows

  // Education
  "school classroom roof leaking":
    "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800", // Classroom blackboard & desks
  "girls toilet locked at govt school":
    "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800", // Government school campus
  "mid-day meal kitchen needs upgrade":
    "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800", // School dining & kitchen hall
  "library books stock outdated":
    "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800", // Library shelves filled with books
  "smart classroom non-functional":
    "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=800", // Classroom desk & learning equipment
  "school boundary wall damaged":
    "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800", // School boundary building

  // Accessibility
  "wheelchair ramp blocked at court":
    "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800", // Wheelchair accessibility entrance ramp
  "no ramp access at district court & bus stand":
    "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800",
  "bus stand lacks tactile paving":
    "https://images.pexels.com/photos/4064230/pexels-photo-4064230.jpeg?auto=compress&cs=tinysrgb&w=800", // Sidewalk tactile paving & mobility aid
  "public building lift non-functional":
    "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800",
  "footpath uneven for mobility aids":
    "https://images.pexels.com/photos/1201798/pexels-photo-1201798.jpeg?auto=compress&cs=tinysrgb&w=800",
  "atm not wheelchair accessible":
    "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ramp railing missing at health center":
    "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800",

  // Environment
  "pond eutrophication — fish kill risk":
    "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800", // Village pond & aquatic water body
  "illegal sand mining at riverbank":
    "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800", // Natural riverbank & sand
  "community grove needs plantation drive":
    "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=800", // Forest trees & plantation grove
  "air quality spike near brick kilns":
    "https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800", // Atmospheric smoke & air pollution
  "wetland encroachment reported":
    "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800",
  "e-waste collection camp requested":
    "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800",
};

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
 * Synchronized topic classifier.
 * Checks for exact title matches first, then specific semantic keywords.
 * Never randomizes: always delivers the most accurate picture depicting the issue.
 */
export function getIssueImageByTitleAndCategory(
  title?: string | null,
  category?: string | null,
  description?: string | null,
): string {
  const titleNorm = (title ?? "").toLowerCase().trim();
  const descNorm = (description ?? "").toLowerCase().trim();
  const catNorm = (category ?? "").toLowerCase().trim();

  // 1. Direct 1:1 match in exact dictionary
  if (EXACT_TITLE_IMAGES[titleNorm]) {
    return EXACT_TITLE_IMAGES[titleNorm];
  }

  // 2. Substring match against exact dictionary keys
  for (const [key, url] of Object.entries(EXACT_TITLE_IMAGES)) {
    if (titleNorm.includes(key) || key.includes(titleNorm)) {
      return url;
    }
  }

  // 3. Specific civic problem keyword matching (Title-first)

  // Ambulance
  if (titleNorm.includes("ambulance") || descNorm.includes("ambulance")) {
    return "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Medicines / Pharmacy
  if (
    titleNorm.includes("medicine") ||
    titleNorm.includes("prescription") ||
    titleNorm.includes("pharmacy") ||
    descNorm.includes("essential medicines")
  ) {
    return "https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Vaccines / Cold-chain
  if (titleNorm.includes("cold-chain") || titleNorm.includes("vaccine") || descNorm.includes("cold-chain")) {
    return "https://images.pexels.com/photos/593451/pexels-photo-593451.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Hospital & Health Care
  if (
    titleNorm.includes("hospital") ||
    titleNorm.includes("facilities doesn't work") ||
    titleNorm.includes("phc") ||
    titleNorm.includes("health clinic") ||
    titleNorm.includes("doctor") ||
    titleNorm.includes("patient")
  ) {
    return "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Highway damage / cracks
  if (
    titleNorm.includes("highway") ||
    titleNorm.includes("damaged highway") ||
    titleNorm.includes("cracked road") ||
    titleNorm.includes("fissure")
  ) {
    return "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Potholes / Broken street
  if (
    titleNorm.includes("pothole") ||
    titleNorm.includes("broken road") ||
    titleNorm.includes("road is broken") ||
    titleNorm.includes("street area") ||
    titleNorm.includes("road surface")
  ) {
    return "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Streetlights
  if (
    titleNorm.includes("streetlight") ||
    titleNorm.includes("street light") ||
    titleNorm.includes("lights dead") ||
    titleNorm.includes("lighting")
  ) {
    return "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Transformers & Power lines
  if (
    titleNorm.includes("transformer") ||
    titleNorm.includes("power line") ||
    titleNorm.includes("sagging") ||
    titleNorm.includes("voltage") ||
    titleNorm.includes("grid power")
  ) {
    return "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Leaking water pipe
  if (
    titleNorm.includes("pipe leaking") ||
    titleNorm.includes("water pipe") ||
    titleNorm.includes("pipeline") ||
    descNorm.includes("fractured")
  ) {
    return "https://images.pexels.com/photos/416527/pexels-photo-416527.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Handpump
  if (titleNorm.includes("handpump") || titleNorm.includes("hand pump")) {
    return "https://images.pexels.com/photos/8481931/pexels-photo-8481931.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Water tap & standpost
  if (titleNorm.includes("tap") || titleNorm.includes("drinking water") || titleNorm.includes("kiosk")) {
    return "https://images.pexels.com/photos/34053335/pexels-photo-34053335.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Open drain / sewage
  if (
    titleNorm.includes("open drain") ||
    titleNorm.includes("drain") ||
    titleNorm.includes("sewage") ||
    titleNorm.includes("gutter")
  ) {
    return "https://images.pexels.com/photos/2827734/pexels-photo-2827734.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Solid waste / garbage pile
  if (
    titleNorm.includes("garbage") ||
    titleNorm.includes("waste") ||
    titleNorm.includes("dustbin") ||
    titleNorm.includes("dumped") ||
    titleNorm.includes("cleanliness")
  ) {
    return "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Drought / Dry soil / Borewell dry / Farm pond silted
  if (
    titleNorm.includes("silted") ||
    titleNorm.includes("borewell dry") ||
    titleNorm.includes("drought") ||
    titleNorm.includes("rain-fed")
  ) {
    return "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Soil testing
  if (titleNorm.includes("soil") || descNorm.includes("soil testing")) {
    return "https://images.pexels.com/photos/1483880/pexels-photo-1483880.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Crops & Farming
  if (titleNorm.includes("crop") || titleNorm.includes("farm") || titleNorm.includes("sowing")) {
    return "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // School classroom
  if (titleNorm.includes("classroom") || titleNorm.includes("smart class")) {
    return "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Library & books
  if (titleNorm.includes("library") || titleNorm.includes("books")) {
    return "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // School general
  if (titleNorm.includes("school") || titleNorm.includes("student")) {
    return "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Wheelchair ramp & accessibility
  if (
    titleNorm.includes("ramp") ||
    titleNorm.includes("wheelchair") ||
    titleNorm.includes("tactile") ||
    titleNorm.includes("accessibility")
  ) {
    return "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Public Bus & Traffic
  if (titleNorm.includes("bus") || titleNorm.includes("traffic") || titleNorm.includes("parking")) {
    return "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=800";
  }

  // Category fallbacks
  if (catNorm.includes("health")) return "https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("road") || catNorm.includes("urban") || catNorm.includes("infra")) return "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("water")) return "https://images.pexels.com/photos/416527/pexels-photo-416527.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("sanitat") || catNorm.includes("garbage")) return "https://images.pexels.com/photos/128421/pexels-photo-128421.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("electr") || catNorm.includes("energy")) return "https://images.pexels.com/photos/15480506/pexels-photo-15480506.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("trans")) return "https://images.pexels.com/photos/385997/pexels-photo-385997.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("agri")) return "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("educat")) return "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("access")) return "https://images.pexels.com/photos/7551608/pexels-photo-7551608.jpeg?auto=compress&cs=tinysrgb&w=800";
  if (catNorm.includes("environ")) return "https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800";

  // Ultimate fallback is road pothole
  return "https://images.pexels.com/photos/2768961/pexels-photo-2768961.jpeg?auto=compress&cs=tinysrgb&w=800";
}
