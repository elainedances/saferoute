import { NextResponse } from "next/server";

// OpenSky Network API — OAuth2 authenticated
// UAE bounding box: lat 22.5-26.5, lon 51-57
const OPENSKY_URL =
  "https://opensky-network.org/api/states/all?lamin=22.5&lamax=26.5&lomin=51&lomax=57";
const TOKEN_URL =
  "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token";

const CLIENT_ID = process.env.OPENSKY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.OPENSKY_CLIENT_SECRET || "";

export interface LiveAircraft {
  icao24: string;
  callsign: string;
  originCountry: string;
  lat: number;
  lng: number;
  altitude: number | null; // meters
  velocity: number | null; // m/s
  heading: number | null; // degrees
  onGround: boolean;
  lastContact: number;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Cache the access token in memory (serverless cold starts will re-fetch)
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET) return null;

  // Return cached token if still valid (with 60s buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) {
    return cachedToken.token;
  }

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
    });

    if (!res.ok) return null;

    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    return data.access_token;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const token = await getAccessToken();

    const headers: Record<string, string> = { Accept: "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(OPENSKY_URL, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({
        aircraft: [],
        count: 0,
        timestamp: Date.now(),
        error: `OpenSky returned ${res.status}${!token ? " (unauthenticated — set OPENSKY_CLIENT_ID/SECRET env vars)" : ""}`,
      });
    }

    const data = await res.json();
    const states = data.states || [];

    const aircraft: LiveAircraft[] = states
      .filter((s: (string | number | boolean | null)[]) => s[5] != null && s[6] != null)
      .map((s: (string | number | boolean | null)[]) => ({
        icao24: s[0] as string,
        callsign: (s[1] as string)?.trim() || "N/A",
        originCountry: s[2] as string,
        lat: s[6] as number,
        lng: s[5] as number,
        altitude: s[7] as number | null,
        velocity: s[9] as number | null,
        heading: s[10] as number | null,
        onGround: s[8] as boolean,
        lastContact: s[4] as number,
      }));

    return NextResponse.json({
      aircraft,
      count: aircraft.length,
      timestamp: data.time * 1000,
      authenticated: !!token,
    });
  } catch (err) {
    return NextResponse.json({
      aircraft: [],
      count: 0,
      timestamp: Date.now(),
      error: "Failed to fetch live flight data",
    });
  }
}
