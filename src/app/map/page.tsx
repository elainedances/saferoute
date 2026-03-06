"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { mapMarkers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Layers } from "lucide-react";
import dynamic from "next/dynamic";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
);
const Circle = dynamic(
  () => import("react-leaflet").then((m) => m.Circle),
  { ssr: false }
);

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
  border: "Border Crossing",
  incident: "Incident",
};

export default function MapPage() {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<Set<string>>(
    new Set(["airport", "embassy", "military", "nuclear", "border", "incident"])
  );
  const [selectedMarker, setSelectedMarker] = useState<typeof mapMarkers[0] | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleFilter = (type: string) => {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filtered = mapMarkers.filter((m) => filters.has(m.type));

  if (!mounted) {
    return (
      <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-[#8888a0] text-sm">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-3.5rem)]">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <style>{`
        .leaflet-container { background: #0a0a0f; }
        .custom-marker { display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; }
        .leaflet-popup-content-wrapper { background: #12121aee; color: #fff; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(12px); border-radius: 12px; }
        .leaflet-popup-tip { background: #12121aee; }
        .leaflet-popup-content { margin: 8px 12px; font-size: 12px; }
        .leaflet-control-attribution { background: rgba(10,10,15,0.8) !important; color: #555 !important; font-size: 10px !important; }
        .leaflet-control-attribution a { color: #666 !important; }
        .leaflet-control-zoom a { background: #12121a !important; color: #fff !important; border-color: rgba(255,255,255,0.1) !important; }
        .leaflet-control-zoom a:hover { background: #1a1a25 !important; }
      `}</style>

      <MapContainer
        center={[24.5, 54.5]}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Threat zone around Al Dhafra */}
        <Circle
          center={[24.248, 54.547]}
          radius={20000}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#ef4444",
            fillOpacity: 0.08,
            weight: 1,
            dashArray: "6 4",
            opacity: 0.3,
          }}
        />

        {/* Caution zone around Barakah */}
        <Circle
          center={[23.958, 52.264]}
          radius={15000}
          pathOptions={{
            color: "#f97316",
            fillColor: "#f97316",
            fillOpacity: 0.06,
            weight: 1,
            dashArray: "6 4",
            opacity: 0.25,
          }}
        />

        {filtered.map((marker) => {
          const L = require("leaflet");
          const icon = L.divIcon({
            html: `<div style="
              width:32px;height:32px;border-radius:50%;
              background:${marker.color}22;
              border:2px solid ${marker.color};
              display:flex;align-items:center;justify-content:center;
              font-size:14px;
              box-shadow:0 0 12px ${marker.color}44;
            ">${typeIcons[marker.type]}</div>`,
            className: "custom-marker",
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          return (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={icon}
              eventHandlers={{
                click: () => setSelectedMarker(marker),
              }}
            >
              <Popup>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <span>{typeIcons[marker.type]}</span>
                    <strong>{marker.name}</strong>
                  </div>
                  {marker.status && (
                    <span style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      borderRadius: 6,
                      fontSize: 10,
                      marginBottom: 4,
                      background: marker.status === "open" ? "#22c55e33" : marker.status === "limited" ? "#eab30833" : "#ef444433",
                      color: marker.status === "open" ? "#22c55e" : marker.status === "limited" ? "#eab308" : "#ef4444",
                      border: `1px solid ${marker.status === "open" ? "#22c55e44" : marker.status === "limited" ? "#eab30844" : "#ef444444"}`,
                    }}>
                      {marker.status.toUpperCase()}
                    </span>
                  )}
                  <p style={{ color: "#aaa", margin: "4px 0 0" }}>{marker.detail}</p>
                  <p style={{ color: "#666", fontSize: 10, margin: "4px 0 0" }}>
                    {marker.lat.toFixed(4)}°N, {marker.lng.toFixed(4)}°E
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Filter controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-3 left-3 z-[1000] bg-[#12121a]/90 backdrop-blur-xl rounded-xl border border-white/10 p-2 space-y-1"
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

      {/* Legend */}
      <div className="absolute bottom-24 md:bottom-6 left-3 z-[1000]">
        <div className="bg-[#12121a]/80 backdrop-blur-xl rounded-lg border border-white/10 px-3 py-2 text-[10px] text-[#8888a0] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-4 h-0 border-t border-dashed border-red-500"></span>
            <span>Threat zone — Al Dhafra (20km)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0 border-t border-dashed border-orange-500"></span>
            <span>Caution zone — Barakah (15km)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
