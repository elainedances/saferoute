// Sample data based on the Iran-UAE conflict (Feb 28 - Mar 6, 2026)

export type ThreatLevel = 'critical' | 'high' | 'elevated' | 'guarded' | 'low';
export type Severity = 'critical' | 'warning' | 'advisory' | 'info';
export type AirportStatus = 'open' | 'limited' | 'closed';

export interface StatusData {
  threatLevel: ThreatLevel;
  threatDescription: string;
  airspaceStatus: string;
  airspaceDetail: string;
  lastUpdated: string;
  airports: AirportInfo[];
  latestThreat: string;
  embassyAlert: string;
}

export interface AirportInfo {
  code: string;
  name: string;
  status: AirportStatus;
  detail: string;
  lat: number;
  lng: number;
}

export interface Incident {
  id: string;
  timestamp: string;
  source: string;
  headline: string;
  detail: string;
  severity: Severity;
  sourceUrl?: string;
  location?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNo: string;
  from: string;
  to: string;
  via?: string;
  departure: string;
  status: 'on-time' | 'delayed' | 'cancelled' | 'unknown';
  price?: string;
  bookingUrl?: string;
}

export interface MapMarker {
  id: string;
  type: 'airport' | 'embassy' | 'military' | 'nuclear' | 'border' | 'incident';
  name: string;
  lat: number;
  lng: number;
  detail: string;
  status?: string;
  color: string;
}

export const statusData: StatusData = {
  threatLevel: 'critical',
  threatDescription: 'Active military conflict. Iran has launched 189+ ballistic missiles, 941+ drones, and 8 cruise missiles at UAE (by Mar 4). 3 killed, 78 injured — all from intercept debris. Conflict widened to all Gulf states on Mar 6.',
  airspaceStatus: 'PARTIALLY OPEN',
  airspaceDetail: 'UAE airspace reopened with restrictions as of Mar 5. Limited commercial operations resuming from DXB and AUH. Military corridors remain active.',
  lastUpdated: '2026-03-06T09:30:00Z',
  airports: [
    { code: 'DXB', name: 'Dubai International', status: 'limited', detail: 'Limited operations. ~40% of flights operating. Terminal 1 & 3 open.', lat: 25.2532, lng: 55.3657 },
    { code: 'AUH', name: 'Abu Dhabi International', status: 'limited', detail: 'Restricted operations. Military activity nearby. Delays expected.', lat: 24.4330, lng: 54.6511 },
    { code: 'SHJ', name: 'Sharjah International', status: 'open', detail: 'Open with delays. Increased traffic from DXB diversions.', lat: 25.3286, lng: 55.5172 },
    { code: 'DWC', name: 'Al Maktoum International', status: 'closed', detail: 'Closed to commercial operations. Military use only.', lat: 24.8960, lng: 55.1614 },
  ],
  latestThreat: 'Mar 6 03:45 UTC — NCEMA reports all incoming projectiles intercepted overnight. No new casualties. Debris clearance ongoing in Al Reem Island area.',
  embassyAlert: 'Swedish Embassy advises all Swedish nationals to register on Svensklistan immediately. Consider departure via available commercial flights. Embassy operating extended hours.',
};

export const incidents: Incident[] = [
  {
    id: '1',
    timestamp: '2026-03-06T09:15:00Z',
    source: 'NCEMA',
    headline: 'All-clear issued for Abu Dhabi following overnight intercepts',
    detail: 'UAE National Crisis and Emergency Management Authority confirms all 12 ballistic missiles targeting Abu Dhabi were successfully intercepted by THAAD and Patriot systems. No casualties reported. Debris fell in unpopulated areas near Saadiyat Island.',
    severity: 'info',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  {
    id: '2',
    timestamp: '2026-03-06T07:30:00Z',
    source: 'Reuters',
    headline: 'DXB resumes limited commercial flights after 18-hour closure',
    detail: 'Dubai International Airport has resumed limited commercial operations after an 18-hour closure due to missile activity. Airlines including Emirates, flydubai, and Turkish Airlines are gradually restoring service. Passengers advised to check with airlines before heading to airport.',
    severity: 'advisory',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '3',
    timestamp: '2026-03-06T05:00:00Z',
    source: 'Swedish Embassy Abu Dhabi',
    headline: 'Embassy extends operating hours for consular emergencies',
    detail: 'The Swedish Embassy in Abu Dhabi will operate from 07:00-22:00 until further notice. Emergency consular assistance available 24/7 via UD emergency line +46 8 405 50 05. All Swedish nationals urged to register on Svensklistan.',
    severity: 'advisory',
    sourceUrl: 'https://www.swedenabroad.se/abu-dhabi',
  },
  {
    id: '4',
    timestamp: '2026-03-06T03:45:00Z',
    source: 'NCEMA',
    headline: 'Multiple ballistic missiles intercepted over Abu Dhabi',
    detail: 'THAAD and Patriot batteries intercepted 12 Iranian ballistic missiles targeting Abu Dhabi metropolitan area between 02:15-03:30 UTC. Residents reported loud booms from intercepts. No ground impacts in populated areas.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  {
    id: '5',
    timestamp: '2026-03-05T22:00:00Z',
    source: 'AP News',
    headline: 'Iran\'s IRGC claims second wave of missile strikes on UAE military targets',
    detail: 'Iran\'s Islamic Revolutionary Guard Corps announced a second wave of "Operation True Promise III" targeting Al Dhafra Air Base and other military installations in the UAE. UAE military confirmed intercepts and activated civil defense protocols.',
    severity: 'critical',
    sourceUrl: 'https://apnews.com',
  },
  {
    id: '6',
    timestamp: '2026-03-05T18:30:00Z',
    source: 'GCAA',
    headline: 'UAE airspace partially reopened with military corridors',
    detail: 'The General Civil Aviation Authority has partially reopened UAE airspace for commercial operations. Aircraft must follow designated corridors avoiding military zones. NOTAM B0847/26 in effect.',
    severity: 'advisory',
    sourceUrl: 'https://www.gcaa.gov.ae',
  },
  {
    id: '7',
    timestamp: '2026-03-05T14:00:00Z',
    source: 'Reuters',
    headline: 'Debris from intercepted missile damages vehicles in Dubai Marina',
    detail: 'Falling debris from an intercepted ballistic missile damaged several vehicles in the Dubai Marina area. No injuries reported. Dubai Civil Defence cordoned off the area for inspection and cleanup.',
    severity: 'warning',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '8',
    timestamp: '2026-03-05T10:00:00Z',
    source: 'UD (Utrikesdepartementet)',
    headline: 'Sweden raises UAE travel advisory to "Avrådan" (highest level)',
    detail: 'The Swedish Ministry for Foreign Affairs has raised the travel advisory for UAE to the highest level, advising against all travel. Swedish nationals in UAE should consider leaving when safe to do so. Register on Svensklistan for updates.',
    severity: 'critical',
    sourceUrl: 'https://www.regeringen.se/ud',
  },
  {
    id: '9',
    timestamp: '2026-03-04T20:00:00Z',
    source: 'NCEMA',
    headline: 'First wave: 47 missiles intercepted, minor debris in Abu Dhabi suburbs',
    detail: 'UAE air defenses intercepted 47 out of 52 ballistic missiles in the first wave of Iranian strikes. Five missiles struck unpopulated desert areas near Al Dhafra. Minor debris fell in Khalifa City. Two minor injuries reported from falling glass.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  {
    id: '10',
    timestamp: '2026-03-04T16:00:00Z',
    source: 'AP News',
    headline: 'UAE closes all airspace after Iran launches "Operation True Promise III"',
    detail: 'All UAE airports ceased operations and airspace was fully closed after Iran launched a barrage of ballistic missiles. Emirates, Etihad, and all carriers grounded flights. Passengers stranded at terminals.',
    severity: 'critical',
    sourceUrl: 'https://apnews.com',
  },
  {
    id: '11',
    timestamp: '2026-03-03T12:00:00Z',
    source: 'Reuters',
    headline: 'Iran threatens retaliation against UAE for hosting US military assets',
    detail: 'Iran\'s Supreme National Security Council warned of "severe consequences" for UAE over the presence of US military forces at Al Dhafra Air Base. Gulf states urged de-escalation.',
    severity: 'warning',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '12',
    timestamp: '2026-03-01T08:00:00Z',
    source: 'GCAA',
    headline: 'UAE raises aviation security to highest level amid tensions',
    detail: 'General Civil Aviation Authority raised security posture at all UAE airports to the maximum level. Enhanced screening and restricted airside access implemented.',
    severity: 'advisory',
    sourceUrl: 'https://www.gcaa.gov.ae',
  },
  {
    id: '13',
    timestamp: '2026-02-28T22:00:00Z',
    source: 'Reuters',
    headline: 'Iran launches retaliatory missile strikes on Israel and Gulf states',
    detail: 'Iran fired ballistic missiles and drones at Israel and multiple Gulf states in retaliation for US-Israeli "Operation Epic Fury" strikes. UAE reports 35 ballistic missiles and over 80 drones detected. Air defenses activated across the region.',
    severity: 'critical',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '14',
    timestamp: '2026-02-28T18:00:00Z',
    source: 'AP News',
    headline: 'US and Israel launch joint strikes on Iran — "Operation Epic Fury"',
    detail: 'The United States and Israel launched a coordinated military operation against Iranian nuclear and military facilities. Khamenei reportedly killed in initial strikes. Iran vows massive retaliation.',
    severity: 'critical',
    sourceUrl: 'https://apnews.com',
  },
  {
    id: '15',
    timestamp: '2026-03-01T04:00:00Z',
    source: 'NCEMA',
    headline: 'First Iranian drones reach UAE airspace — intercepted over Abu Dhabi',
    detail: 'THAAD and Patriot systems intercepted 28 drones and 15 ballistic missiles targeting Abu Dhabi and Al Dhafra Air Base area. No ground impacts in populated areas. UAE activates civil defense protocols.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  {
    id: '16',
    timestamp: '2026-03-02T10:00:00Z',
    source: 'Reuters',
    headline: 'Second wave of Iranian strikes hits UAE — 42 missiles, 60+ drones',
    detail: 'Iran launched a second major wave targeting UAE military installations. 42 ballistic missiles and over 60 drones detected. UAE reports 95% intercept rate. Minor debris in Al Reem Island.',
    severity: 'critical',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '17',
    timestamp: '2026-03-03T06:00:00Z',
    source: 'NCEMA',
    headline: 'Overnight barrage — 38 missiles and 45 drones intercepted',
    detail: 'UAE air defenses intercepted 38 ballistic missiles and 45 drones overnight. Debris from intercepts fell in industrial areas of Mussafah, Abu Dhabi. 1 worker injured.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  {
    id: '18',
    timestamp: '2026-03-06T06:00:00Z',
    source: 'Reuters',
    headline: 'Iran widens attacks — Saudi Arabia, Kuwait, Qatar, Bahrain struck',
    detail: 'Iran expanded operations to hit military targets across the Gulf. Prince Sultan Air Base (Saudi) targeted with 3 missiles (intercepted). Kuwaiti air base in flames. 13 missiles intercepted over Qatar. Hotel and residential buildings hit in Bahrain.',
    severity: 'critical',
    sourceUrl: 'https://www.reuters.com',
  },
];

export const flights: Flight[] = [
  {
    id: 'f1',
    airline: 'Emirates',
    flightNo: 'EK157',
    from: 'DXB',
    to: 'ARN',
    departure: '2026-03-06T14:30:00Z',
    status: 'delayed',
    price: 'AED 4,800+',
    bookingUrl: 'https://www.emirates.com',
  },
  {
    id: 'f2',
    airline: 'Turkish Airlines',
    flightNo: 'TK759',
    from: 'DXB',
    to: 'ARN',
    via: 'IST',
    departure: '2026-03-06T16:00:00Z',
    status: 'on-time',
    price: 'AED 3,200+',
    bookingUrl: 'https://www.turkishairlines.com',
  },
  {
    id: 'f3',
    airline: 'Qatar Airways',
    flightNo: 'QR1074',
    from: 'DXB',
    to: 'ARN',
    via: 'DOH',
    departure: '2026-03-06T18:45:00Z',
    status: 'on-time',
    price: 'AED 3,600+',
    bookingUrl: 'https://www.qatarairways.com',
  },
  {
    id: 'f4',
    airline: 'Etihad',
    flightNo: 'EY71',
    from: 'AUH',
    to: 'ARN',
    departure: '2026-03-06T22:00:00Z',
    status: 'unknown',
    price: 'AED 5,100+',
    bookingUrl: 'https://www.etihad.com',
  },
  {
    id: 'f5',
    airline: 'EgyptAir',
    flightNo: 'MS614',
    from: 'DXB',
    to: 'ARN',
    via: 'CAI',
    departure: '2026-03-07T06:00:00Z',
    status: 'on-time',
    price: 'AED 2,800+',
    bookingUrl: 'https://www.egyptair.com',
  },
  {
    id: 'f6',
    airline: 'SAS',
    flightNo: 'SK4042',
    from: 'DXB',
    to: 'CPH',
    departure: '2026-03-07T08:30:00Z',
    status: 'cancelled',
    price: '—',
    bookingUrl: 'https://www.flysas.com',
  },
  {
    id: 'f7',
    airline: 'Oman Air',
    flightNo: 'WY612',
    from: 'MCT',
    to: 'ARN',
    via: 'IST',
    departure: '2026-03-06T20:00:00Z',
    status: 'on-time',
    price: 'AED 2,400+',
    bookingUrl: 'https://www.omanair.com',
  },
];

export const mapMarkers: MapMarker[] = [
  // Airports
  { id: 'dxb', type: 'airport', name: 'DXB — Dubai International', lat: 25.2532, lng: 55.3657, detail: 'Limited operations', status: 'limited', color: '#eab308' },
  { id: 'auh', type: 'airport', name: 'AUH — Abu Dhabi International', lat: 24.4330, lng: 54.6511, detail: 'Restricted operations', status: 'limited', color: '#eab308' },
  { id: 'shj', type: 'airport', name: 'SHJ — Sharjah International', lat: 25.3286, lng: 55.5172, detail: 'Open with delays', status: 'open', color: '#22c55e' },
  { id: 'dwc', type: 'airport', name: 'DWC — Al Maktoum International', lat: 24.8960, lng: 55.1614, detail: 'Closed — military use', status: 'closed', color: '#ef4444' },
  // Embassy & Consulate
  { id: 'embassy-ad', type: 'embassy', name: 'Swedish Embassy Abu Dhabi', lat: 24.4539, lng: 54.3773, detail: 'Extended hours 07:00-22:00. +971 2 415 9700', color: '#3b82f6' },
  { id: 'consulate-dxb', type: 'embassy', name: 'Swedish Consulate Dubai', lat: 25.2048, lng: 55.2708, detail: 'Business Bay area. Limited services.', color: '#3b82f6' },
  // Military
  { id: 'dhafra', type: 'military', name: 'Al Dhafra Air Base', lat: 24.248, lng: 54.547, detail: 'US/UAE military base — known target. Active THAAD/Patriot batteries.', color: '#ef4444' },
  // Nuclear
  { id: 'barakah', type: 'nuclear', name: 'Barakah Nuclear Power Plant', lat: 23.958, lng: 52.264, detail: 'Operating normally. Enhanced security perimeter. Not targeted (so far).', color: '#f97316' },
  // Border Crossings
  { id: 'hatta', type: 'border', name: 'Hatta Border Crossing', lat: 24.7936, lng: 56.1147, detail: 'Open. Route to Oman interior. ~90 min from Dubai.', color: '#22c55e' },
  { id: 'buraimi', type: 'border', name: 'Al Ain / Al Buraimi Border', lat: 24.2167, lng: 55.7833, detail: 'Open. Direct route to Muscat (~3h drive).', color: '#22c55e' },
  // Incidents
  { id: 'inc-1', type: 'incident', name: 'Missile intercept — Saadiyat Island', lat: 24.54, lng: 54.44, detail: 'Mar 6: Debris from intercepted missile. No casualties.', color: '#ef4444' },
  { id: 'inc-2', type: 'incident', name: 'Debris impact — Dubai Marina', lat: 25.0800, lng: 55.1375, detail: 'Mar 5: Vehicle damage from interceptor debris. No injuries.', color: '#f97316' },
  { id: 'inc-3', type: 'incident', name: 'Debris — Khalifa City', lat: 24.4200, lng: 54.5800, detail: 'Mar 4: Minor debris. 2 minor injuries from broken glass.', color: '#f97316' },
];
