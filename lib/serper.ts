import https from "https";

const SERPER_API_KEY =
  process.env.SERPER_API_KEY || "fba413f05f847c8551c52dd5088ed21f7d073815";

export interface SerperImageResult {
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  source?: string;
  domain?: string;
  link?: string;
}

/**
 * Strips conversational phrasing from citizen reports to construct high-precision
 * search queries for Serper Google Images.
 */
export function sanitizeSearchQuery(
  rawTitle?: string | null,
  rawCategory?: string | null,
  rawDesc?: string | null
): string {
  const title = (rawTitle || "").trim();
  const lower = title.toLowerCase();

  // Known specific mappings to guarantee optimal photo relevance
  if (lower.includes("hospital") || lower.includes("facilities doesn't work")) {
    return "government hospital damaged ward broken facilities";
  }
  if (lower.includes("damaged highway") || (lower.includes("highway") && lower.includes("road"))) {
    return "damaged highway road asphalt cracked";
  }
  if (lower.includes("road is broken") || lower.includes("broken road") || lower.includes("pothole")) {
    return "broken street road pothole asphalt india";
  }
  if (lower.includes("pipe leaking") || lower.includes("water pipe") || lower.includes("drinking water pipe")) {
    return "broken municipal drinking water pipe leaking street";
  }
  if (lower.includes("handpump") || lower.includes("hand pump")) {
    return "village hand pump dry broken water";
  }
  if (lower.includes("open drain") || lower.includes("sewage")) {
    return "open drain overflowing street sewage";
  }
  if (lower.includes("solid waste") || lower.includes("garbage")) {
    return "solid waste garbage dumped plot street";
  }
  if (lower.includes("streetlight") || lower.includes("street light") || lower.includes("lights dead")) {
    return "dark street lights not working road night";
  }
  if (lower.includes("transformer") || lower.includes("power line")) {
    return "electrical transformer pole wire hazard street";
  }
  if (lower.includes("borewell dry") || lower.includes("farm pond silted") || lower.includes("drought")) {
    return "dry cracked agricultural soil drought farm";
  }
  if (lower.includes("ambulance")) {
    return "rural ambulance emergency delay vehicle";
  }
  if (lower.includes("classroom roof") || lower.includes("school")) {
    return "government school classroom damaged roof building";
  }
  if (lower.includes("wheelchair") || lower.includes("ramp")) {
    return "wheelchair ramp building accessibility barrier";
  }
  if (lower.includes("tactile") || lower.includes("bus stand")) {
    return "bus stand sidewalk damaged public transport";
  }

  // Generic cleaning: remove conversational stop-phrases
  let cleaned = title
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, " ")
    .replace(/\b(the|a|an|don't|does|doesn't|about|care|customers|people|near|area|for|at|in|on|with|our|we|please|urgent|very|really)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (cleaned.length < 5 && rawCategory) {
    cleaned = `${cleaned} ${rawCategory} civic issue`.trim();
  }

  return cleaned || "civic infrastructure issue";
}

/**
 * Searches Serper Google Images API.
 */
export function searchSerperImages(
  query: string,
  limit: number = 5
): Promise<SerperImageResult[]> {
  return new Promise((resolve) => {
    const data = JSON.stringify({ q: query, num: limit });
    const req = https.request(
      {
        hostname: "google.serper.dev",
        path: "/images",
        method: "POST",
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
      (res) => {
        let buf = "";
        res.on("data", (chunk) => (buf += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(buf);
            if (Array.isArray(parsed.images)) {
              resolve(parsed.images);
            } else {
              resolve([]);
            }
          } catch {
            resolve([]);
          }
        });
      }
    );
    req.on("error", () => resolve([]));
    req.on("timeout", () => {
      req.destroy();
      resolve([]);
    });
    req.write(data);
    req.end();
  });
}

/**
 * Fetches the best Google Image URL via Serper for a given issue.
 * Prefers Google's encrypted-tbn0 cached thumbnail or direct imageUrl to prevent hotlink blocks.
 */
export async function fetchSerperIssueImage(
  title: string,
  category?: string,
  description?: string
): Promise<string | null> {
  const query = sanitizeSearchQuery(title, category, description);
  const results = await searchSerperImages(query, 3);
  if (!results || results.length === 0) return null;

  // Use Google-cached thumbnail or imageUrl
  // Note: thumbnailUrl from Google's static CDN is ultra-reliable (no 403 hotlink blocks)
  const chosen = results[0];
  return chosen.imageUrl || chosen.thumbnailUrl || null;
}
