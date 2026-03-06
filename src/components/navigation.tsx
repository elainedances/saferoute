"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Map, Radio, Plane, ShieldAlert, Home, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Status", icon: Home },
  { href: "/map", label: "Map", icon: Map },
  { href: "/feed", label: "Feed", icon: Radio },
  { href: "/flights", label: "Flights", icon: Plane },
  { href: "/stats", label: "Stats", icon: BarChart3 },
  { href: "/help", label: "Help", icon: ShieldAlert },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <span className="font-semibold text-lg tracking-tight">SafeRoute</span>
          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">LIVE</span>
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-[#8888a0] hover:text-white hover:bg-white/5"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors min-w-[56px]",
                  isActive
                    ? "text-white"
                    : "text-[#555570]"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-blue-400")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
