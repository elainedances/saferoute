import { NextResponse } from "next/server";

// Two strategies: VPS proxy (preferred) and direct OpenSky with OAuth
const PROXY_URL = process.env.FLIGHT_PROXY_URL || "http://77.42.76.176:3847/api/live-flights";
const OPENSKY_URL = "https://opensky-network.org/api/states/all?lamin=22.5&lamax=26.5&lomin=51&lomax=57";
const TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";
const CLIENT_ID = process.env.OPENSKY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.OPENSKY_CLIENT_SECRET || "";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 15; // Vercel Pro allows up to 15s

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60000) return tokenCache.token;
  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    tokenCache = { token: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
    return data.access_token;
  } catch {
    return null;
  }
}

function parseStates(data: { time: number; states?: (string | number | boolean | null)[][] }) {
  const states = data.states || [];
  return states
    .filter((s) => s[5] != null && s[6] != null)
    .map((s) => ({
      icao24: s[0] as string,
      callsign: ((s[1] as string) || "").trim() || "N/A",
      originCountry: s[2] as string,
      lat: s[6] as number,
      lng: s[5] as number,
      altitude: s[7] as number | null,
      velocity: s[9] as number | null,
      heading: s[10] as number | null,
      onGround: s[8] as boolean,
      lastContact: s[4] as number,
    }));
}

async function tryProxy() {
  const res = await fetch(PROXY_URL, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`Proxy ${res.status}`);
  return await res.json();
}

async function tryDirect() {
  const token = await getToken();
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(OPENSKY_URL, { headers, cache: "no-store", signal: AbortSignal.timeout(6000) });
  if (!res.ok) throw new Error(`OpenSky ${res.status}`);
  const data = await res.json();
  const aircraft = parseStates(data);
  return { aircraft, count: aircraft.length, timestamp: data.time * 1000, authenticated: !!token, source: "direct" };
}

export async function GET() {
  // Try VPS proxy first, fall back to direct OpenSky
  try {
    const data = await tryProxy();
    return NextResponse.json({ ...data, source: "proxy" });
  } catch (proxyErr) {
    try {
      const data = await tryDirect();
      return NextResponse.json(data);
    } catch (directErr) {
      return NextResponse.json({
        aircraft: [],
        count: 0,
        timestamp: Date.now(),
        error: `Proxy: ${proxyErr instanceof Error ? proxyErr.message : "failed"}, Direct: ${directErr instanceof Error ? directErr.message : "failed"}`,
      });
    }
  }
}
