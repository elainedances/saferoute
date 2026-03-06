"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { mapMarkers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const typeIcons: Record<string, string> = {
  airport: "✈️",
  embassy: "🇸🇪",
  military: "⚔️",
  nuclear: "☢️",
  border: "🚗",
  incident: "💥",
};

const typeLabels: Record<string, string> = {
  airport: "Airport",
  embassy: "Embassy",
  military: "Military",
  nuclear: "Nuclear",
  border: "Border",
  incident: "Incident",
};

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<typeof mapMarkers[0] | null>(null);
  const [filters, setFilters] = useState<Set<string>>(new Set(["airport", "embassy", "military", "nuclear", "border", "incident"]));

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Load mapbox CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css";
    document.head.appendChild(link);

    const initMap = async () => {
      const mapboxgl = (await import("mapbox-gl")).default;

      mapboxgl.accessToken = MAPBOX_TOKEN;

      const map = new mapboxgl.Map({
        container: mapContainer.current!,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [54.5, 24.5],
        zoom: 7,
        attributionControl: false,
      });

      map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");

      map.on("load", () => {
        setMapLoaded(true);

        // Add threat zones around military targets
        map.addSource("threat-zones", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [54.547, 24.248] },
                properties: { radius: 15000, color: "#ef4444" },
              },
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [52.264, 23.958] },
                properties: { radius: 10000, color: "#f97316" },
              },
            ],
          },
        });

        // Al Dhafra threat zone
        const createCircle = (center: [number, number], radiusKm: number) => {
          const points = 64;
          const coords = [];
          for (let i = 0; i < points; i++) {
            const angle = (i / points) * 2 * Math.PI;
            const dx = radiusKm * Math.cos(angle);
            const dy = radiusKm * Math.sin(angle);
            const lat = center[1] + (dy / 111.32);
            const lng = center[0] + (dx / (111.32 * Math.cos(center[1] * Math.PI / 180)));
            coords.push([lng, lat]);
          }
          coords.push(coords[0]);
          return coords;
        };

        map.addSource("dhafra-zone", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [createCircle([54.547, 24.248], 20)],
            },
            properties: {},
          },
        });

        map.addLayer({
          id: "dhafra-zone-fill",
          type: "fill",
          source: "dhafra-zone",
          paint: {
            "fill-color": "#ef4444",
            "fill-opacity": 0.08,
          },
        });

        map.addLayer({
          id: "dhafra-zone-line",
          type: "line",
          source: "dhafra-zone",
          paint: {
            "line-color": "#ef4444",
            "line-opacity": 0.3,
            "line-width": 1,
            "line-dasharray": [3, 3],
          },
        });

        map.addSource("barakah-zone", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [createCircle([52.264, 23.958], 15)],
            },
            properties: {},
          },
        });

        map.addLayer({
          id: "barakah-zone-fill",
          type: "fill",
          source: "barakah-zone",
          paint: {
            "fill-color": "#f97316",
            "fill-opacity": 0.06,
          },
        });

        map.addLayer({
          id: "barakah-zone-line",
          type: "line",
          source: "barakah-zone",
          paint: {
            "line-color": "#f97316",
            "line-opacity": 0.25,
            "line-width": 1,
            "line-dasharray": [3, 3],
          },
        });

        // Add markers
        mapMarkers.forEach((marker) => {
          const el = document.createElement("div");
          el.className = "marker-pin";
          el.innerHTML = `<div style="
            width: 32px; height: 32px; border-radius: 50%;
            background: ${marker.color}22;
            border: 2px solid ${marker.color};
            display: flex; align-items: center; justify-content: center;
            font-size: 14px; cursor: pointer;
            box-shadow: 0 0 12px ${marker.color}44;
          ">${typeIcons[marker.type]}</div>`;
          el.setAttribute("data-type", marker.type);

          el.addEventListener("click", () => {
            setSelectedMarker(marker);
            map.flyTo({ center: [marker.lng, marker.lat], zoom: 10, duration: 1000 });
          });

          new mapboxgl.Marker({ element: el })
            .setLngLat([marker.lng, marker.lat])
            .addTo(map);
        });
      });

      mapRef.current = map;
    };

    initMap();

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  // Filter visibility
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;
    const markers = document.querySelectorAll(".marker-pin");
    markers.forEach((el) => {
      const type = el.getAttribute("data-type");
      if (type) {
        (el as HTMLElement).style.display = filters.has(type) ? "block" : "none";
      }
    });
  }, [filters, mapLoaded]);

  const toggleFilter = (type: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <div className="relative h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)]">
      <div ref={mapContainer} className="absolute inset-0" />

      {/* Filter controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-3 left-3 z-10 bg-[#12121a]/90 backdrop-blur-xl rounded-xl border border-white/10 p-2 space-y-1"
      >
        <div className="flex items-center gap-1 px-2 py-1 text-xs text-[#8888a0]">
          <Layers className="w-3 h-3" />
          <span>Layers</span>
        </div>
        {Object.entries(typeLabels).map(([type, label]) => (
          <button
            key={type}
            onClick={() => toggleFilter(type)}
            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-xs transition-colors ${
              filters.has(type) ? "bg-white/10 text-white" : "text-[#555570] hover:text-[#8888a0]"
            }`}
          >
            <span>{typeIcons[type]}</span>
            <span>{label}</span>
          </button>
        ))}
      </motion.div>

      {/* Zoom controls */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
        <button
          onClick={() => mapRef.current?.zoomIn()}
          className="w-10 h-10 bg-[#12121a]/90 backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => mapRef.current?.zoomOut()}
          className="w-10 h-10 bg-[#12121a]/90 backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => mapRef.current?.flyTo({ center: [54.5, 24.5], zoom: 7, duration: 1000 })}
          className="w-10 h-10 bg-[#12121a]/90 backdrop-blur-xl rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <Locate className="w-4 h-4" />
        </button>
      </div>

      {/* Selected marker info */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-24 md:bottom-6 left-3 right-3 md:left-auto md:right-3 md:w-80 z-10 bg-[#12121a]/95 backdrop-blur-xl rounded-xl border border-white/10 p-4"
        >
          <button
            onClick={() => setSelectedMarker(null)}
            className="absolute top-2 right-2 text-[#8888a0] hover:text-white text-lg"
          >
            ×
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{typeIcons[selectedMarker.type]}</span>
            <h3 className="font-semibold text-sm">{selectedMarker.name}</h3>
          </div>
          {selectedMarker.status && (
            <Badge
              variant="outline"
              className={`mb-2 text-xs ${
                selectedMarker.status === "open"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : selectedMarker.status === "limited"
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }`}
            >
              {selectedMarker.status}
            </Badge>
          )}
          <p className="text-xs text-[#8888a0]">{selectedMarker.detail}</p>
          <p className="text-[10px] text-[#555570] mt-2">
            {selectedMarker.lat.toFixed(4)}°N, {selectedMarker.lng.toFixed(4)}°E
          </p>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-24 md:bottom-6 left-3 z-10">
        <div className="bg-[#12121a]/80 backdrop-blur-xl rounded-lg border border-white/10 px-3 py-2 text-[10px] text-[#8888a0] space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-red-500 opacity-50" style={{ borderBottom: "1px dashed #ef4444" }}></span>
            <span>Threat zone (20km)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-orange-500 opacity-50" style={{ borderBottom: "1px dashed #f97316" }}></span>
            <span>Caution zone (15km)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
