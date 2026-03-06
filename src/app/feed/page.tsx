"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { incidents, type Severity } from "@/lib/data";
import { ChevronDown, ExternalLink, Filter } from "lucide-react";

const severityConfig: Record<Severity, { label: string; color: string; bg: string; border: string; dot: string }> = {
  critical: { label: "CRITICAL", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", dot: "bg-red-500" },
  warning: { label: "WARNING", color: "text-orange-400", bg: "bg-orange-500/20", border: "border-orange-500/30", dot: "bg-orange-500" },
  advisory: { label: "ADVISORY", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30", dot: "bg-yellow-500" },
  info: { label: "INFO", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30", dot: "bg-green-500" },
};

export default function FeedPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Severity | "all">("all");

  const filtered = activeFilter === "all" ? incidents : incidents.filter((i) => i.severity === activeFilter);

  const formatTimestamp = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diffH = Math.floor((now.getTime() - d.getTime()) / 3600000);
    const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "UTC" });
    const date = d.toLocaleDateString("en-GB", { month: "short", day: "numeric", timeZone: "UTC" });
    return { time, date, diffH };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Live Feed</h1>
          <p className="text-xs text-[#8888a0]">{incidents.length} events tracked</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-[#8888a0]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>LIVE</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-[#8888a0] shrink-0" />
        {(["all", "critical", "warning", "advisory", "info"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              activeFilter === f
                ? "bg-white/10 text-white"
                : "text-[#555570] hover:text-[#8888a0] hover:bg-white/5"
            }`}
          >
            {f === "all" ? "All" : severityConfig[f].label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map((incident, idx) => {
            const sc = severityConfig[incident.severity];
            const { time, date, diffH } = formatTimestamp(incident.timestamp);
            const isExpanded = expandedId === incident.id;

            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => setExpandedId(isExpanded ? null : incident.id)}
                className={`relative bg-[#12121a] rounded-xl border cursor-pointer transition-colors ${
                  isExpanded ? "border-white/15" : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Severity indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-l-xl ${sc.dot}`} />

                <div className="pl-4 pr-3 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`${sc.bg} ${sc.color} ${sc.border} text-[10px] px-1.5 py-0`}>
                          {sc.label}
                        </Badge>
                        <span className="text-[10px] text-[#555570]">{incident.source}</span>
                      </div>
                      <h3 className="text-sm font-medium leading-snug">{incident.headline}</h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono text-[#8888a0]">{time}</div>
                      <div className="text-[10px] text-[#555570]">{date}</div>
                      {diffH <= 24 && (
                        <div className="text-[10px] text-[#555570]">{diffH}h ago</div>
                      )}
                    </div>
                  </div>

                  {/* Expand indicator */}
                  <div className="flex justify-center mt-1">
                    <ChevronDown
                      className={`w-4 h-4 text-[#555570] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 mt-3 border-t border-white/5">
                          <p className="text-sm text-[#8888a0] leading-relaxed">{incident.detail}</p>
                          {incident.sourceUrl && (
                            <a
                              href={incident.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" />
                              {incident.source}
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-center text-xs text-[#555570] py-4">
        Data from official sources only. Verify critical decisions with your embassy.
      </p>
    </div>
  );
}
