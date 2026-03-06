import { NextResponse } from "next/server";

// Proxy to VPS which has authenticated OpenSky access
// (OpenSky blocks Vercel cloud IPs, so VPS fetches and caches)
const PROXY_URL = process.env.FLIGHT_PROXY_URL || "http://77.42.76.176:3847/api/live-flights";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const res = await fetch(PROXY_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({
        aircraft: [],
        count: 0,
        timestamp: Date.now(),
        error: `Proxy returned ${res.status}`,
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      aircraft: [],
      count: 0,
      timestamp: Date.now(),
      error: err instanceof Error ? err.message : "Failed to fetch from proxy",
    });
  }
}
