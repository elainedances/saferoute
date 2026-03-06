"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldAlert,
  Plane,
  Radio,
  Building2,
  Phone,
  ArrowRight,
  AlertTriangle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { statusData, incidents } from "@/lib/data";
import { getUAENow } from "@/lib/time";

const threatColors = {
  critical: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", glow: "shadow-red-500/20" },
  high: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30", glow: "shadow-orange-500/20" },
  elevated: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", glow: "shadow-yellow-500/20" },
  guarded: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-blue-500/20" },
  low: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", glow: "shadow-green-500/20" },
};

export default function Dashboard() {
  const [secondsAgo, setSecondsAgo] = useState(0);
  const [uaeTime, setUaeTime] = useState("");

  useEffect(() => {
    const updateInterval = setInterval(() => {
      const diff = Math.floor((Date.now() - new Date(statusData.lastUpdated).getTime()) / 1000);
      setSecondsAgo(diff);
      setUaeTime(getUAENow());
    }, 1000);
    setUaeTime(getUAENow());
    return () => clearInterval(updateInterval);
  }, []);

  const tc = threatColors[statusData.threatLevel];
  const latestIncident = incidents[0];

  const formatTime = (s: number) => {
    if (s < 60) return `${s}s ago`;
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    return `${Math.floor(s / 3600)}h ago`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
      {/* Threat Level Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border ${tc.border} ${tc.bg} p-4 shadow-lg ${tc.glow}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${tc.text}`} />
            <span className={`font-semibold text-sm uppercase tracking-wider ${tc.text}`}>
              Threat Level: {statusData.threatLevel}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#8888a0]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Clock className="w-3 h-3" />
            <span>{uaeTime} · Updated {formatTime(secondsAgo)}</span>
          </div>
        </div>
        <p className="text-sm text-[#e5e5ef]/80">{statusData.threatDescription}</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-[#12121a] border-white/5 hover:border-white/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#8888a0] flex items-center gap-2">
                <Radio className="w-4 h-4" />
                Airspace Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                  {statusData.airspaceStatus}
                </Badge>
              </div>
              <p className="text-xs text-[#8888a0]">{statusData.airspaceDetail}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="bg-[#12121a] border-white/5 hover:border-white/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#8888a0] flex items-center gap-2">
                <Plane className="w-4 h-4" />
                Airport Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {statusData.airports.map((a) => (
                  <div key={a.code} className="flex items-center justify-between text-sm">
                    <span className="font-mono">{a.code}</span>
                    <Badge
                      variant="outline"
                      className={
                        a.status === "open"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : a.status === "limited"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {a.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="bg-[#12121a] border-white/5 hover:border-white/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#8888a0] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Latest Threat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{statusData.latestThreat}</p>
              {latestIncident && (
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs bg-white/5 text-[#8888a0] border-white/10">
                    Source: {latestIncident.source}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card className="bg-[#12121a] border-white/5 hover:border-white/10 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-[#8888a0] flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Embassy Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{statusData.embassyAlert}</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <Link href="/help">
          <Button
            variant="outline"
            className="w-full h-auto py-4 bg-[#12121a] border-white/5 hover:bg-white/5 hover:border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-orange-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">How to Leave</div>
                <div className="text-xs text-[#8888a0]">Evacuation steps</div>
              </div>
            </div>
          </Button>
        </Link>

        <Link href="/help#emergency-numbers">
          <Button
            variant="outline"
            className="w-full h-auto py-4 bg-[#12121a] border-white/5 hover:bg-white/5 hover:border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">Emergency Numbers</div>
                <div className="text-xs text-[#8888a0]">Call for help</div>
              </div>
            </div>
          </Button>
        </Link>

        <Link href="/help#swedish-embassy">
          <Button
            variant="outline"
            className="w-full h-auto py-4 bg-[#12121a] border-white/5 hover:bg-white/5 hover:border-white/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">Swedish Embassy</div>
                <div className="text-xs text-[#8888a0]">Contact info</div>
              </div>
            </div>
          </Button>
        </Link>
      </motion.div>

      {/* Footer disclaimer (mobile) */}
      <p className="text-center text-xs text-[#555570] py-4 md:hidden">
        Data from official sources only. Verify critical decisions with your embassy.
      </p>
    </div>
  );
}
