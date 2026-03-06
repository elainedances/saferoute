// Edge Runtime — runs on Cloudflare Workers (different network than serverless)
export const runtime = "edge";
export const dynamic = "force-dynamic";

const PROXY_URL = "http://77.42.76.176:3847/api/live-flights";
const OPENSKY_URL = "https://opensky-network.org/api/states/all?lamin=22.5&lamax=26.5&lomin=51&lomax=57";
const TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

async function getToken(clientId: string, clientSecret: string): Promise<string | null> {
  if (!clientId || !clientSecret) return null;
  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}`,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token || null;
  } catch {
    return null;
  }
}

function parseStates(data: { time: number; states?: (string | number | boolean | null)[][] }) {
  const states = data.states || [];
  return states
    .filter((s) => s[5] != null && s[6] != null)
    .map((s) => ({
      icao24: s[0],
      callsign: ((s[1] as string) || "").trim() || "N/A",
      originCountry: s[2],
      lat: s[6],
      lng: s[5],
      altitude: s[7],
      velocity: s[9],
      heading: s[10],
      onGround: s[8],
      lastContact: s[4],
    }));
}

export async function GET() {
  const errors: string[] = [];

  // Strategy 1: VPS proxy
  try {
    const res = await fetch(PROXY_URL, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      return new Response(JSON.stringify({ ...data, via: "proxy" }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }
    errors.push(`proxy:${res.status}`);
  } catch (e) {
    errors.push(`proxy:${e instanceof Error ? e.message : "failed"}`);
  }

  // Strategy 2: Direct OpenSky with OAuth
  try {
    const clientId = process.env.OPENSKY_CLIENT_ID || "";
    const clientSecret = process.env.OPENSKY_CLIENT_SECRET || "";
    const token = await getToken(clientId, clientSecret);
    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(OPENSKY_URL, { headers, signal: AbortSignal.timeout(8000) });
    if (res.ok) {
      const raw = await res.json();
      const aircraft = parseStates(raw);
      return new Response(
        JSON.stringify({ aircraft, count: aircraft.length, timestamp: raw.time * 1000, authenticated: !!token, via: "direct" }),
        { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }
    errors.push(`direct:${res.status}`);
  } catch (e) {
    errors.push(`direct:${e instanceof Error ? e.message : "failed"}`);
  }

  // Both failed
  return new Response(
    JSON.stringify({ aircraft: [], count: 0, timestamp: Date.now(), errors }),
    { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
  );
}
