"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  MapPin,
  Navigation,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

export interface DistrictDatum {
  district: string;
  count: number;
  active: number;
  resolved: number;
}

export const JODHPUR_CENTER: [number, number] = [26.2885, 73.0243];

export const JODHPUR_DISTRICT_COORDS: Record<string, [number, number]> = {
  // Jodhpur Central & Civic Zones
  "Jodhpur": [26.2885, 73.0243],
  "Jodhpur Central": [26.2885, 73.0243],
  "Sardarpura": [26.2842, 73.0305],
  "Ratanada": [26.2690, 73.0370],
  "Basni": [26.2415, 73.0085],
  "Mandore": [26.3570, 73.0410],
  "Mogra Kalan": [26.2459, 73.0249],
  "Shastri Nagar": [26.2780, 73.0080],
  "Paota": [26.3020, 73.0450],
  "Kaylana": [26.2900, 72.9750],
  "Mehrangarh": [26.2978, 73.0185],
  "Karwar": [26.4715, 73.1135],
  // Major Rajasthan Districts
  "Jaipur": [26.9124, 75.7873],
  "Udaipur": [24.5854, 73.7125],
  "Bikaner": [28.0229, 73.3119],
  "Kota": [25.2138, 75.8648],
  "Ajmer": [26.4499, 74.6399],
  "Pali": [25.7711, 73.3234],
  "Barmer": [25.7521, 71.3967],
  "Nagaur": [27.2070, 73.7423],
  "Jaisalmer": [26.9157, 70.9083],
};

const DISTRICT_NAME_MAP: Record<string, string> = {
  Ranchi: "Jodhpur",
  Bokaro: "Sardarpura",
  Dhanbad: "Ratanada",
  Pakur: "Basni",
  Jamshedpur: "Mandore",
  Giridih: "Mogra Kalan",
  Hazaribagh: "Shastri Nagar",
  Deoghar: "Paota",
  "East Singhbhum": "Jaipur",
  Palamu: "Udaipur",
};

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
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Earthstar Geographics',
  },
  topo: {
    name: "Topographic",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
    subdomains: "",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Topo',
  },
};

function colorFor(count: number): string {
  if (count >= 4) return "#dc2626";
  if (count >= 3) return "#f59e0b";
  if (count >= 2) return "#0284c7";
  return "#0d9488";
}

export function DistrictMap({
  districts,
  className = "",
}: {
  districts: DistrictDatum[];
  className?: string;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tileLayerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());

  const [activeLayer, setActiveLayer] = useState<keyof typeof TILE_LAYERS>("esri");
  const [mapReady, setMapReady] = useState(false);

  const points: { datum: DistrictDatum; lat: number; lng: number }[] = districts.map(
    (d) => {
      const mappedName = DISTRICT_NAME_MAP[d.district] || d.district;
      const coords =
        JODHPUR_DISTRICT_COORDS[mappedName] ||
        JODHPUR_DISTRICT_COORDS[d.district] ||
        JODHPUR_CENTER;
      return {
        datum: { ...d, district: mappedName },
        lat: coords[0],
        lng: coords[1],
      };
    },
  );

  const [activeItem, setActiveItem] = useState<DistrictDatum | null>(
    () => points[0]?.datum ?? null,
  );

  useEffect(() => {
    let isCancelled = false;

    async function initMap() {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const L = await import("leaflet");
      if (isCancelled || !mapContainerRef.current) return;

      const map = L.map(mapContainerRef.current, {
        center: JODHPUR_CENTER,
        zoom: 11,
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

      const newMarkers = new Map();
      points.forEach(({ datum, lat, lng }) => {
        const color = colorFor(datum.count);
        const iconHtml = `
          <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
            <span class="absolute h-8 w-8 rounded-full animate-ping opacity-60" style="background-color: ${color};"></span>
            <span class="relative flex h-7 w-7 items-center justify-center rounded-full shadow-lg border-2 border-white text-white text-[10px] font-black" style="background-color: ${color};">
              ${datum.count}
            </span>
          </div>
        `;

        const customIcon = L.divIcon({
          html: iconHtml,
          className: "custom-gov-pin",
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker.on("click", () => {
          setActiveItem(datum);
          map.flyTo([lat, lng], Math.max(map.getZoom(), 10), { duration: 1 });
        });

        newMarkers.set(datum.district, marker);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const selectDistrict = (point: { datum: DistrictDatum; lat: number; lng: number }) => {
    setActiveItem(point.datum);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([point.lat, point.lng], 10, { duration: 1.1 });
    }
  };

  const zoomIn = () => mapInstanceRef.current?.zoomIn();
  const zoomOut = () => mapInstanceRef.current?.zoomOut();

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(JODHPUR_CENTER, 11, { duration: 1.2 });
    }
  };

  const total = districts.reduce((acc, d) => acc + d.count, 0);

  return (
    <div
      className={`relative h-[380px] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 sm:h-[460px] shadow-sm ${className}`}
    >
      <div ref={mapContainerRef} className="h-full w-full z-0" />

      <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200/90 bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </span>
          <span className="text-xs font-bold text-slate-900">District Report Heatmap</span>
          <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[10px] font-extrabold text-sky-800 font-mono">
            {total} issues · {districts.length} districts
          </span>
        </div>

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
          title="Reset View"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-auto space-y-2">
        {activeItem && (
          <div className="rounded-2xl border border-slate-200/95 bg-white/95 p-3 shadow-lg backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <div className="flex items-start gap-2.5 min-w-0">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                  style={{ backgroundColor: colorFor(activeItem.count) }}
                >
                  <MapPin size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <p className="truncate text-xs sm:text-sm font-extrabold text-slate-900">
                      {activeItem.district} District
                    </p>
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white" style={{ backgroundColor: colorFor(activeItem.count) }}>
                      {activeItem.count} Reports
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">
                    {activeItem.active} in-work · {activeItem.resolved} resolved
                  </p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeItem.district)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-xl bg-primary-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-primary-700 self-end sm:self-center"
              >
                Open in Maps <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 p-2 shadow-xl backdrop-blur-md scrollbar-none">
          <span className="flex shrink-0 items-center gap-1 pl-1 text-[11px] font-bold text-slate-700">
            <Navigation size={12} className="text-primary-600" /> Districts:
          </span>
          {points.map((point) => {
            const isSelected = activeItem?.district === point.datum.district;
            return (
              <button
                key={point.datum.district}
                type="button"
                onClick={() => selectDistrict(point)}
                className={`flex shrink-0 items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200/70"
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: colorFor(point.datum.count) }}
                />
                <span className="truncate max-w-[110px]">{point.datum.district}</span>
                <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  isSelected ? "bg-white/20 text-white" : "bg-white text-slate-800"
                }`}>
                  {point.datum.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}