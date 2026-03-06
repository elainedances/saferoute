import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Cloudflare Tunnel to VPS proxy (HTTPS, no port issues)
const TUNNEL_URL = process.env.FLIGHT_TUNNEL_URL || "https://expected-athens-areas-explicit.trycloudflare.com/api/live-flights";

export async function GET() {
  try {
    const res = await fetch(TUNNEL_URL, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json({
        aircraft: [], count: 0, timestamp: Date.now(),
        error: `Tunnel returned ${res.status}`,
      });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({
      aircraft: [], count: 0, timestamp: Date.now(),
      error: err instanceof Error ? err.message : "Tunnel fetch failed",
    });
  }
}
