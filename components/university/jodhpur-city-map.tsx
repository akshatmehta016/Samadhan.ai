"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ExternalLink,
  MapPin,
  Navigation,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// Precise real-world geo-coordinates in Jodhpur, Rajasthan
export const JODHPUR_COORDINATES = {
  center: { lat: 26.2885, lng: 73.0243 }, // Jodhpur Central Hub
  defaultZoom: 12,
  landmarks: [
    {
      id: "mehrangarh",
      name: "Mehrangarh Fort & Old Blue City",
      type: "heritage",
      lat: 26.2978,
      lng: 73.0185,
      issuesCount: 3,
      topCase: "Ancient Sandstone Wall Drainage & Siltation Risk",
      assignedTeam: "Architectural Heritage & Civil Squad",
      status: "Monitored",
      urgency: "Medium",
      color: "#0d9488",
    },
    {
      id: "ghanta-ghar",
      name: "Ghanta Ghar / Sardar Market",
      type: "commercial",
      lat: 26.2952,
      lng: 73.0244,
      issuesCount: 4,
      topCase: "High-Density Market Waste Congestion & Drainage",
      assignedTeam: "Urban Sanitation & Waste Mgmt Team",
      status: "Assigned",
      urgency: "High",
      color: "#0284c7",
    },
    {
      id: "ratanada",
      name: "Ratanada & Circuit House",
      type: "infrastructure",
      lat: 26.2690,
      lng: 73.0370,
      issuesCount: 5,
      topCase: "Bridge Deck Expansion Gap Fracture (Report #001)",
      assignedTeam: "Civil Engineering Team (CE-401)",
      status: "In Progress",
      urgency: "High",
      color: "#f59e0b",
    },
    {
      id: "shastri-nagar",
      name: "Shastri Nagar Ward 12",
      type: "sanitation",
      lat: 26.2770,
      lng: 73.0070,
      issuesCount: 2,
      topCase: "Stormwater Main Backflow near MDM Hospital",
      assignedTeam: "Public Health & Drainage Lab",
      status: "Assigned",
      urgency: "Medium",
      color: "#0284c7",
    },
    {
      id: "kaylana",
      name: "Kaylana Lake & Reservoir Catchment",
      type: "water",
      lat: 26.2910,
      lng: 72.9730,
      issuesCount: 4,
      topCase: "Industrial Effluent Spill & Coliform Contamination",
      assignedTeam: "Environmental Science Team (EV-305)",
      status: "Critical",
      urgency: "Critical",
      color: "#ef4444",
    },
    {
      id: "mandore",
      name: "Mandore Heritage Gardens & Canal",
      type: "drainage",
      lat: 26.3570,
      lng: 73.0410,
      issuesCount: 3,
      topCase: "Seasonal Runoff Canal Overflow & Silt Deposition",
      assignedTeam: "Hydrology & Geotechnical Squad",
      status: "Monitored",
      urgency: "Medium",
      color: "#0d9488",
    },
    {
      id: "aiims-campus",
      name: "AIIMS Jodhpur (Basni)",
      type: "university",
      lat: 26.2415,
      lng: 73.0085,
      issuesCount: 1,
      topCase: "Biomedical Safe Route Logistics & Clinic Reach",
      assignedTeam: "Community Medicine & Bio-Lab Team",
      status: "Partner Uni",
      urgency: "Low",
      color: "#8b5cf6",
    },
    {
      id: "iit-campus",
      name: "IIT Jodhpur Campus (Karwar)",
      type: "university",
      lat: 26.4715,
      lng: 73.1135,
      issuesCount: 0,
      topCase: "AI & IoT Sensor Mesh Command Node (Karwar)",
      assignedTeam: "IIT Jodhpur Lead AI & Drone Research Labs",
      status: "Lead Partner",
      urgency: "Lead",
      color: "#6366f1",
    },
  ],
};

type Landmark = (typeof JODHPUR_COORDINATES.landmarks)[0];

const TILE_LAYERS = {
  esri: {
    name: "Clean Street",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    subdomains: "",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; World Street Map',
  },
  osm: {
    name: "Standard OSM",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    subdomains: "abc",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    name: "Satellite Hybrid",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    subdomains: "",
    attribution: '&copy; Esri &mdash; Earthstar Geographics',
  },
  topo: {
    name: "Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    subdomains: "",
    attribution: '&copy; Esri &mdash; Topo',
  },
};

export function JodhpurCityMap({ className = "" }: { className?: string }) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  const [activeItem, setActiveItem] = useState<Landmark>(JODHPUR_COORDINATES.landmarks[2]); // Default to Ratanada
  const [activeLayer, setActiveLayer] = useState<keyof typeof TILE_LAYERS>("esri");
  const [mapReady, setMapReady] = useState(false);

  // Initialize Leaflet map safely on client
  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      if (!mapContainerRef.current) return;
      // Clean up previous instance if any
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const L = await import("leaflet");
      if (isCancelled || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: [JODHPUR_COORDINATES.center.lat, JODHPUR_COORDINATES.center.lng],
        zoom: JODHPUR_COORDINATES.defaultZoom,
        zoomControl: false,
        attributionControl: false,
      });

      const currentLayerConfig = TILE_LAYERS[activeLayer];
      const tileLayer = L.tileLayer(currentLayerConfig.url, {
        maxZoom: 19,
        subdomains: currentLayerConfig.subdomains,
        attribution: currentLayerConfig.attribution,
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapInstanceRef.current = map;

      // Add custom SVG pulsating markers for each landmark
      const newMarkers = new Map();
      JODHPUR_COORDINATES.landmarks.forEach((item) => {
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute h-8 w-8 rounded-full animate-ping opacity-60" style="background-color: ${item.color};"></span>
            <span class="relative flex h-7 w-7 items-center justify-center rounded-full shadow-lg border-2 border-white text-white text-[10px] font-black" style="background-color: ${item.color};">
              ${item.issuesCount > 0 ? item.issuesCount : "★"}
            </span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-jodhpur-pin",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([item.lat, item.lng], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          setActiveItem(item);
          map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 14), { duration: 1 });
        });

        newMarkers.set(item.id, marker);
      });

      markersRef.current = newMarkers;
      setMapReady(true);
    }

    initMap();

    return () => {
      isCancelled = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update tile layer when activeLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;
    import("leaflet").then((L) => {
      if (tileLayerRef.current) {
        mapInstanceRef.current.removeLayer(tileLayerRef.current);
      }
      const layerConfig = TILE_LAYERS[activeLayer];
      const newLayer = L.tileLayer(layerConfig.url, {
        maxZoom: 19,
        subdomains: layerConfig.subdomains,
        attribution: layerConfig.attribution,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
    });
  }, [activeLayer, mapReady]);

  // Fly to active landmark when selected from bottom pills
  const selectLandmark = (item: Landmark) => {
    setActiveItem(item);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([item.lat, item.lng], 14, { duration: 1.1 });
    }
  };

  const zoomIn = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomIn();
  };

  const zoomOut = () => {
    if (mapInstanceRef.current) mapInstanceRef.current.zoomOut();
  };

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [JODHPUR_COORDINATES.center.lat, JODHPUR_COORDINATES.center.lng],
        JODHPUR_COORDINATES.defaultZoom,
        { duration: 1.2 }
      );
    }
  };

  return (
    <div
      className={`relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 sm:h-[440px] shadow-sm ${className}`}
    >
      {/* Leaflet Map Target DOM */}
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      {/* Map Header Floating Overlay */}
      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-900">Jodhpur Civic GIS</span>
          <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-800 font-mono">
            {activeItem ? `${activeItem.lat.toFixed(4)}° N, ${activeItem.lng.toFixed(4)}° E` : "26.2885° N, 73.0243° E"}
          </span>
        </div>

        {/* Layer Switcher */}
        <div className="hidden sm:flex items-center rounded-xl border border-slate-200 bg-white/95 p-0.5 shadow-md backdrop-blur-md">
          {(Object.keys(TILE_LAYERS) as Array<keyof typeof TILE_LAYERS>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveLayer(key)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                activeLayer === key
                  ? "bg-primary-600 text-white shadow-xs"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              {TILE_LAYERS[key].name}
            </button>
          ))}
        </div>
      </div>

      {/* Action Controls on Top Right */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5 pointer-events-auto">
        <button
          type="button"
          onClick={zoomIn}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          type="button"
          onClick={resetView}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Fit All Jodhpur Wards"
        >
          <RotateCcw size={15} />
        </button>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${activeItem.lat},${activeItem.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white/95 text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
          title="Open Location in Google Maps"
        >
          <ExternalLink size={15} />
        </a>
      </div>

      {/* Interactive Bottom Overlay */}
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-auto space-y-2">
        {/* Active Landmark Telemetry Card */}
        {activeItem && (
          <div className="rounded-2xl border border-slate-200/95 bg-white/95 p-3 shadow-lg backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ backgroundColor: activeItem.color }}
                >
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="truncate text-xs sm:text-sm font-extrabold text-slate-900">
                      {activeItem.name}
                    </p>
                    <span
                      className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white"
                      style={{ backgroundColor: activeItem.color }}
                    >
                      {activeItem.status}
                    </span>
                    <span className="hidden sm:inline-block rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 font-mono">
                      {activeItem.lat.toFixed(4)}° N, {activeItem.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 line-clamp-1 mt-0.5">
                    {activeItem.topCase}
                  </p>
                  <p className="text-[11px] text-teal-700 font-medium line-clamp-1">
                    Squad: <strong>{activeItem.assignedTeam}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <Link
                  href="/university/reports"
                  className="inline-flex items-center gap-1 rounded-xl bg-primary-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-700"
                >
                  View Case Report →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Hotspot Pills (Ward & Location Selector) */}
        <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-xl backdrop-blur-md scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 pl-1 text-[11px] font-bold text-slate-700">
            <Navigation size={12} className="text-primary-600" /> Jodhpur Wards:
          </span>
          {JODHPUR_COORDINATES.landmarks.map((landmark) => {
            const isSelected = activeItem.id === landmark.id;
            return (
              <button
                key={landmark.id}
                type="button"
                onClick={() => selectLandmark(landmark)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: landmark.color }}
                />
                <span className="truncate max-w-[130px] sm:max-w-none">{landmark.name.split(" ")[0]}</span>
                {landmark.issuesCount > 0 ? (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-800"
                    }`}
                  >
                    {landmark.issuesCount}
                  </span>
                ) : (
                  <Sparkles size={10} className={isSelected ? "text-amber-300" : "text-amber-500"} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
