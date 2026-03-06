"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { statusData, flights } from "@/lib/data";
import {
  Plane,
  ExternalLink,
  AlertTriangle,
  Car,
  ArrowRight,
  Clock,
} from "lucide-react";

const statusColors = {
  "on-time": { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
  delayed: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
  cancelled: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
  unknown: { bg: "bg-white/10", text: "text-[#8888a0]", border: "border-white/10" },
};

const airportStatusColors = {
  open: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", dot: "bg-green-500" },
  limited: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30", dot: "bg-yellow-500" },
  closed: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", dot: "bg-red-500" },
};

export default function FlightsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Flights & Routes</h1>
        <p className="text-xs text-[#8888a0]">Routes to Scandinavia from UAE & alternative escape routes</p>
      </div>

      {/* Price Warning */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-start gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3"
      >
        <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-orange-400">Prices may be significantly inflated</p>
          <p className="text-xs text-[#8888a0]">
            Due to crisis demand, ticket prices may be 3-5× normal rates. Book flexible tickets where possible.
            Check multiple airlines and consider alternative routes via Oman.
          </p>
        </div>
      </motion.div>

      {/* Airport Status */}
      <div>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Airport Status</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {statusData.airports.map((airport) => {
            const sc = airportStatusColors[airport.status];
            return (
              <motion.div
                key={airport.code}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-[#12121a] border-white/5">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono font-bold text-lg">{airport.code}</span>
                      <div className={`w-2.5 h-2.5 rounded-full ${sc.dot}`} />
                    </div>
                    <Badge variant="outline" className={`${sc.bg} ${sc.text} ${sc.border} text-[10px]`}>
                      {airport.status}
                    </Badge>
                    <p className="text-[10px] text-[#555570] mt-1 line-clamp-2">{airport.detail}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Available Flights */}
      <div>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Available Routes to Scandinavia</h2>
        <div className="space-y-2">
          {flights.map((flight, idx) => {
            const sc = statusColors[flight.status];
            const dep = new Date(flight.departure);
            const time = dep.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Dubai" });
            const date = dep.toLocaleDateString("en-GB", { month: "short", day: "numeric", timeZone: "Asia/Dubai" });

            return (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-[#12121a] border-white/5 hover:border-white/10 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{flight.airline}</span>
                          <span className="text-xs font-mono text-[#8888a0]">{flight.flightNo}</span>
                          <Badge variant="outline" className={`${sc.bg} ${sc.text} ${sc.border} text-[10px]`}>
                            {flight.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#8888a0]">
                          <span className="font-mono font-medium text-white">{flight.from}</span>
                          {flight.via && (
                            <>
                              <ArrowRight className="w-3 h-3" />
                              <span className="font-mono">{flight.via}</span>
                            </>
                          )}
                          <ArrowRight className="w-3 h-3" />
                          <span className="font-mono font-medium text-white">{flight.to}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-[#8888a0]">
                          <Clock className="w-3 h-3" />
                          <span className="font-mono">{time}</span>
                        </div>
                        <div className="text-[10px] text-[#555570]">{date}</div>
                        {flight.price && (
                          <div className="text-xs font-medium text-white mt-1">{flight.price}</div>
                        )}
                      </div>
                    </div>
                    {flight.bookingUrl && flight.status !== "cancelled" && (
                      <a
                        href={flight.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-xs text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Book on {flight.airline}
                      </a>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Alternative Routes */}
      <div>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Alternative: Overland via Oman</h2>
        <Card className="bg-[#12121a] border-white/5">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Drive to Oman → Fly from Muscat</h3>
                <p className="text-xs text-[#8888a0]">
                  If UAE airports are disrupted, consider driving to Oman and flying from Muscat (MCT).
                  Oman has not been targeted and Muscat airport is operating normally.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono">1</div>
                <div>
                  <p className="font-medium">Hatta Border (from Dubai) — ~90 min drive</p>
                  <p className="text-xs text-[#8888a0]">Route: Dubai → Hatta → Oman interior</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono">2</div>
                <div>
                  <p className="font-medium">Al Ain / Al Buraimi Border — ~3h drive to Muscat</p>
                  <p className="text-xs text-[#8888a0]">Route: Abu Dhabi/Al Ain → Al Buraimi → Muscat</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono">3</div>
                <div>
                  <p className="font-medium">Fly Muscat → Stockholm (via Istanbul)</p>
                  <p className="text-xs text-[#8888a0]">Oman Air WY612: MCT → IST → ARN — AED 2,400+</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-xs text-[#8888a0]">
              <p className="font-medium text-yellow-400 mb-1">Requirements for Oman entry:</p>
              <ul className="space-y-0.5 list-disc list-inside">
                <li>Valid passport (6+ months)</li>
                <li>Swedish nationals can get visa on arrival at land border</li>
                <li>Have AED/OMR cash for border fees (~OMR 5)</li>
                <li>Car rental: consider one-way drop-off if driving rental</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Airline Links */}
      <div>
        <h2 className="text-sm font-medium text-[#8888a0] mb-3 uppercase tracking-wider">Book Directly</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { name: "SAS", url: "https://www.flysas.com" },
            { name: "Norwegian", url: "https://www.norwegian.com" },
            { name: "Turkish Airlines", url: "https://www.turkishairlines.com" },
            { name: "Emirates", url: "https://www.emirates.com" },
            { name: "Qatar Airways", url: "https://www.qatarairways.com" },
            { name: "Oman Air", url: "https://www.omanair.com" },
          ].map((airline) => (
            <a
              key={airline.name}
              href={airline.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[#12121a] border border-white/5 rounded-lg p-3 text-sm hover:border-white/10 transition-colors"
            >
              <span>{airline.name}</span>
              <ExternalLink className="w-3 h-3 text-[#555570]" />
            </a>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[#555570] py-4">
        Flight data is sample/illustrative. Always verify with the airline directly before booking.
      </p>
    </div>
  );
}
