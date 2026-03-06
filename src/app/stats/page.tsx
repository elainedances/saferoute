"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Area,
} from "recharts";

// ── sample data spanning Feb 28 – Mar 6 2026 ──────────────────────────

const missileData = [
  { date: "Feb 28", missiles: 35, missilesInt: 33, drones: 80, dronesInt: 76, rate: 95 },
  { date: "Mar 1", missiles: 15, missilesInt: 14, drones: 28, dronesInt: 28, rate: 98 },
  { date: "Mar 2", missiles: 42, missilesInt: 40, drones: 62, dronesInt: 58, rate: 94 },
  { date: "Mar 3", missiles: 38, missilesInt: 36, drones: 45, dronesInt: 43, rate: 95 },
  { date: "Mar 4", missiles: 52, missilesInt: 47, drones: 70, dronesInt: 66, rate: 93 },
  { date: "Mar 5", missiles: 7, missilesInt: 6, drones: 125, dronesInt: 119, rate: 95 },
  { date: "Mar 6", missiles: 12, missilesInt: 12, drones: 44, dronesInt: 44, rate: 100 },
];

const flightData = [
  { date: "Feb 28", DXB: 620, AUH: 310, SHJ: 85 },
  { date: "Mar 1", DXB: 590, AUH: 295, SHJ: 80 },
  { date: "Mar 2", DXB: 580, AUH: 280, SHJ: 78 },
  { date: "Mar 3", DXB: 510, AUH: 240, SHJ: 72 },
  { date: "Mar 4", DXB: 0, AUH: 0, SHJ: 0 },
  { date: "Mar 5", DXB: 120, AUH: 45, SHJ: 38 },
  { date: "Mar 6", DXB: 248, AUH: 95, SHJ: 60 },
];

const priceData = [
  { date: "Feb 28", price: 1800 },
  { date: "Mar 1", price: 1850 },
  { date: "Mar 2", price: 2100 },
  { date: "Mar 3", price: 2900 },
  { date: "Mar 4", price: 5200 },
  { date: "Mar 5", price: 4800 },
  { date: "Mar 6", price: 3600 },
];

const casualtyData = [
  { date: "Feb 28", killed: 0, injured: 3 },
  { date: "Mar 1", killed: 0, injured: 5 },
  { date: "Mar 2", killed: 0, injured: 8 },
  { date: "Mar 3", killed: 1, injured: 12 },
  { date: "Mar 4", killed: 0, injured: 15 },
  { date: "Mar 5", killed: 3, injured: 58 },
  { date: "Mar 6", killed: 0, injured: 4 },
];

const ceasefireData = [
  { date: "Feb 28", probability: 72 },
  { date: "Mar 1", probability: 65 },
  { date: "Mar 2", probability: 48 },
  { date: "Mar 3", probability: 30 },
  { date: "Mar 4", probability: 12 },
  { date: "Mar 5", probability: 18 },
  { date: "Mar 6", probability: 24 },
];

// ── shared chart theme ─────────────────────────────────────────────────

const axisStyle = { fontSize: 11, fill: "#8888a0" };
const gridStyle = { stroke: "rgba(255,255,255,0.04)" };

interface ChartPayloadItem {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
  payload?: Record<string, unknown>;
}

function DarkTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1a25]/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-[#8888a0] mb-1 font-medium">{label}</p>
      {payload.map((entry: ChartPayloadItem, i: number) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: <span className="font-mono font-semibold">{entry.value}{suffix ?? ""}</span>
        </p>
      ))}
    </div>
  );
}

// ── card wrapper ───────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
  delay = 0,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="bg-[#12121a]/80 backdrop-blur-xl border-white/5 hover:border-white/10 transition-colors">
        <CardContent className="p-4 md:p-5">
          <h3 className="text-sm font-semibold mb-0.5">{title}</h3>
          <p className="text-[11px] text-[#8888a0] mb-4">{subtitle}</p>
          <div className="h-64 w-full">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── page ───────────────────────────────────────────────────────────────

export default function StatsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Conflict Statistics</h1>
        <p className="text-xs text-[#8888a0]">Feb 28 – Mar 6, 2026 · Sample data for situational awareness</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1 — Missiles per Day */}
        <ChartCard
          title="Ballistic Missiles per Day"
          subtitle="Launched vs intercepted. Line shows overall intercept rate %."
          delay={0.05}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={missileData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<DarkTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#8888a0" }} />
              <Bar yAxisId="left" dataKey="missiles" name="Missiles launched" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={14} />
              <Bar yAxisId="left" dataKey="missilesInt" name="Missiles intercepted" fill="#22c55e" radius={[3, 3, 0, 0]} barSize={14} />
              <Line yAxisId="right" type="monotone" dataKey="rate" name="Intercept %" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: "#eab308" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 1b — Drones per Day */}
        <ChartCard
          title="Drones per Day"
          subtitle="Launched vs intercepted. Drones cheaper but easier to intercept."
          delay={0.07}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={missileData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<DarkTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#8888a0" }} />
              <Bar yAxisId="left" dataKey="drones" name="Drones launched" fill="#f97316" radius={[3, 3, 0, 0]} barSize={14} />
              <Bar yAxisId="left" dataKey="dronesInt" name="Drones intercepted" fill="#3b82f6" radius={[3, 3, 0, 0]} barSize={14} />
              <Line yAxisId="right" type="monotone" dataKey="rate" name="Intercept %" stroke="#eab308" strokeWidth={2} dot={{ r: 3, fill: "#eab308" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 2 — Daily Flights */}
        <ChartCard
          title="Daily Flights Departing UAE"
          subtitle="Commercial departures by airport. Zero = airspace closed."
          delay={0.1}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={flightData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#8888a0" }} />
              <Line type="monotone" dataKey="DXB" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: "#3b82f6" }} />
              <Line type="monotone" dataKey="AUH" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: "#f97316" }} />
              <Line type="monotone" dataKey="SHJ" stroke="#22c55e" strokeWidth={2} dot={{ r: 3, fill: "#22c55e" }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 3 — Flight Prices */}
        <ChartCard
          title="Flight Prices to Scandinavia"
          subtitle="Average economy fare DXB→ARN (AED). Spike = conflict demand."
          delay={0.15}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={priceData} margin={{ top: 5, right: 10, left: -5, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip suffix=" AED" />} />
              <Area type="monotone" dataKey="price" fill="url(#priceGrad)" stroke="transparent" />
              <Line type="monotone" dataKey="price" name="Avg fare" stroke="#f97316" strokeWidth={2} dot={{ r: 3, fill: "#f97316" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 4 — Casualties */}
        <ChartCard
          title="Casualties & Injuries"
          subtitle="Reported civilian casualties in UAE. All from debris / secondary effects."
          delay={0.2}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={casualtyData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisStyle} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<DarkTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#8888a0" }} />
              <Bar dataKey="killed" name="Killed" fill="#ef4444" radius={[3, 3, 0, 0]} barSize={20} />
              <Bar dataKey="injured" name="Injured" fill="#f97316" radius={[3, 3, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* 5 — Ceasefire Probability */}
        <ChartCard
          title="Ceasefire Probability"
          subtitle="Aggregated prediction-market estimate (Polymarket / Metaculus)."
          delay={0.25}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={ceasefireData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="ceaseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid {...gridStyle} />
              <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={axisStyle} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<DarkTooltip suffix="%" />} />
              <Area type="monotone" dataKey="probability" fill="url(#ceaseGrad)" stroke="transparent" />
              <Line type="monotone" dataKey="probability" name="Ceasefire %" stroke="#22c55e" strokeWidth={2} dot={{ r: 4, fill: "#22c55e", stroke: "#22c55e" }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <p className="text-center text-xs text-[#555570] py-4">
        Sample data for illustration. Sources: NCEMA, GCAA, Reuters, Polymarket. Verify critical decisions with your embassy.
      </p>
    </div>
  );
}
