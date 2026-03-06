import { NextResponse } from "next/server";

// OpenSky Network API — free, no auth needed for basic queries
// UAE bounding box: lat 22.5-26.5, lon 51-57
const OPENSKY_URL =
  "https://opensky-network.org/api/states/all?lamin=22.5&lamax=26.5&lomin=51&lomax=57";

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

export async function GET() {
  try {
    const res = await fetch(OPENSKY_URL, {
      next: { revalidate: 15 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      // OpenSky rate limits: return empty with status info
      return NextResponse.json({
        aircraft: [],
        count: 0,
        timestamp: Date.now(),
        error: `OpenSky returned ${res.status} — may be rate limited (10 req/10s for anonymous)`,
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
