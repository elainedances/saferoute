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
  threatDescription: 'Active military conflict — Day 6. Iran has launched 196+ ballistic missiles (181 intercepted, 2 struck territory), 689+ drones (44 caused impact), and 8 cruise missiles at UAE. 3 killed, 78 injured. Conflict widened to all Gulf states. Iranian drone carrier struck by US forces.',
  airspaceStatus: 'PARTIALLY OPEN',
  airspaceDetail: 'UAE airspace reopened with restrictions as of Mar 5. Limited commercial operations resuming from DXB and AUH. Military corridors remain active.',
  lastUpdated: '2026-03-06T09:30:00Z',
  airports: [
    { code: 'DXB', name: 'Dubai International', status: 'limited', detail: 'Limited operations. ~40% of flights operating. Terminal 1 & 3 open.', lat: 25.2532, lng: 55.3657 },
    { code: 'AUH', name: 'Abu Dhabi International', status: 'limited', detail: 'Restricted operations. Military activity nearby. Delays expected.', lat: 24.4330, lng: 54.6511 },
    { code: 'SHJ', name: 'Sharjah International', status: 'open', detail: 'Open with delays. Increased traffic from DXB diversions.', lat: 25.3286, lng: 55.5172 },
    { code: 'DWC', name: 'Al Maktoum International', status: 'closed', detail: 'Closed to commercial operations. Military use only.', lat: 24.8960, lng: 55.1614 },
  ],
  latestThreat: 'Mar 6 12:00 UTC — CENTCOM confirms Iranian drone carrier struck and on fire. UAE MoD: 196 ballistic missiles detected since Feb 28, 181 destroyed. GPS jamming affecting 1,100+ ships in Gulf waters.',
  embassyAlert: 'Swedish Embassy advises all Swedish nationals to register on Svensklistan immediately. Consider departure via available commercial flights. Embassy operating extended hours.',
};

export const incidents: Incident[] = [
  // === Mar 6 ===
  {
    id: '30',
    timestamp: '2026-03-06T12:00:00Z',
    source: 'CENTCOM',
    headline: 'US strikes Iranian drone carrier — ship on fire in Persian Gulf',
    detail: 'US Central Command confirmed strikes on an Iranian drone carrier vessel, roughly the size of a WWII aircraft carrier, which is now on fire. The ship was used to launch Shahed-type drones at Gulf targets.',
    severity: 'critical',
    sourceUrl: 'https://twitter.com/CENTCOM',
  },
  {
    id: '29',
    timestamp: '2026-03-06T11:25:00Z',
    source: 'Bloomberg',
    headline: 'Iran\'s Gulf attacks rebounding on its own economy',
    detail: 'Bloomberg reports Iran\'s strikes on UAE and other Gulf states are cutting off its own access to vital imports. UAE is Iran\'s largest re-export hub — the economic blowback is severe.',
    severity: 'advisory',
    sourceUrl: 'https://www.bloomberg.com/news/articles/2026-03-06/iran-s-attacks-on-the-uae-are-costing-it-access-to-vital-imports',
  },
  {
    id: '28',
    timestamp: '2026-03-06T10:00:00Z',
    source: 'The National',
    headline: 'GPS jamming and spoofing surges across Gulf — 1,100+ ships affected',
    detail: 'Widespread GPS interference across UAE, Qatari, Omani, and Iranian waters. Ships falsely positioned at airports, Barakah Nuclear Plant, and on Iranian land. 21 new AIS jamming clusters identified since Feb 28.',
    severity: 'warning',
    sourceUrl: 'https://www.thenationalnews.com/future/technology/2026/03/05/gps-jamming-gps-spoofing-uae/',
  },
  {
    id: '27',
    timestamp: '2026-03-06T09:00:00Z',
    source: 'UAE MoD',
    headline: 'UAE intercepts 6 ballistic missiles and 125 drones on Mar 5',
    detail: 'UAE Ministry of Defence confirmed interception of 6 ballistic missiles (of 7 detected) and 125 drones on Thursday March 5. Total since Feb 28: 196 ballistic missiles detected, 181 destroyed, 13 fell into sea, 2 struck territory.',
    severity: 'critical',
    sourceUrl: 'https://gulfnews.com/world/americas/us-israel-iran-war-day-6-iran-israel-strikes-continue-uae-extends-limited-flights-1.500463753',
  },
  {
    id: '26',
    timestamp: '2026-03-06T08:00:00Z',
    source: 'The Guardian',
    headline: 'Dubai influencers\' luxury image "shattered" by Iranian strikes',
    detail: 'Guardian reports on the impact on Dubai\'s expat community. Fairmont The Palm struck, Burj Al Arab damaged by intercept fragments, US consulate parking lot in Dubai hit by drone strike causing fire.',
    severity: 'advisory',
    sourceUrl: 'https://www.theguardian.com/world/2026/mar/03/dubai-influencers-iran-war-strikes',
  },
  {
    id: '25',
    timestamp: '2026-03-06T06:00:00Z',
    source: 'Al Jazeera',
    headline: 'Iran widens attacks — Saudi Arabia, Kuwait, Qatar, Bahrain, Oman struck',
    detail: 'Iran expanded strikes to every Gulf country hosting US military infrastructure. Prince Sultan Air Base (Saudi) targeted. Kuwaiti air base in flames. 13 missiles intercepted over Qatar. Hotel and residential buildings hit in Bahrain. Iran FM says they are "targeting US presence, not neighbours."',
    severity: 'critical',
    sourceUrl: 'https://www.aljazeera.com/news/2026/3/5/iran-fires-more-missiles-drones-across-gulf-region-amid-us-israeli-attacks',
  },
  {
    id: '24',
    timestamp: '2026-03-06T04:00:00Z',
    source: 'House of Commons Library',
    headline: 'UK Parliamentary briefing: Iran strikes across 7 countries',
    detail: 'UK Parliament briefing confirms Iranian counter-strikes now target Bahrain, Kuwait, Qatar, UAE, Oman, Iraq and Jordan — in addition to Israel. Iran claims it targets only "US presence" in these countries.',
    severity: 'advisory',
    sourceUrl: 'https://commonslibrary.parliament.uk/research-briefings/cbp-10521/',
  },
  // === Mar 5 ===
  {
    id: '23',
    timestamp: '2026-03-05T22:00:00Z',
    source: 'The National',
    headline: 'Safety alerts in Abu Dhabi, Dubai and Sharjah after intercepts',
    detail: '6 injured in Abu Dhabi by debris after drones intercepted. Cumulative total: 196 ballistic missiles detected (181 destroyed), 13 fell into sea, 2 hit territory. 78 total injuries across UAE.',
    severity: 'warning',
    sourceUrl: 'https://www.thenationalnews.com/news/uae/2026/03/05/six-injured-in-abu-dhabi-by-debris-after-drones-intercepted/',
  },
  {
    id: '22',
    timestamp: '2026-03-05T18:30:00Z',
    source: 'GCAA',
    headline: 'UAE airspace partially reopened with military corridors',
    detail: 'General Civil Aviation Authority partially reopened UAE airspace. Aircraft must follow designated corridors avoiding military zones. NOTAM B0847/26 in effect. Limited flights resuming from DXB and AUH.',
    severity: 'advisory',
    sourceUrl: 'https://www.gcaa.gov.ae',
  },
  {
    id: '21',
    timestamp: '2026-03-05T14:00:00Z',
    source: 'UD (Utrikesdepartementet)',
    headline: 'Sweden raises UAE travel advisory to "Avrådan" (highest level)',
    detail: 'Swedish Ministry for Foreign Affairs advises against ALL travel to UAE. Swedish nationals should consider leaving when safe. Register on Svensklistan. Emergency line: +46 8 405 50 05.',
    severity: 'critical',
    sourceUrl: 'https://www.regeringen.se/ud',
  },
  // === Mar 4 ===
  {
    id: '20',
    timestamp: '2026-03-04T20:00:00Z',
    source: 'Wikipedia / UAE MoD',
    headline: 'Updated totals: 174 ballistic missiles, 689 drones launched at UAE',
    detail: 'UAE Defence Ministry update as of Mar 4: 174 ballistic missiles tracked (161 intercepted, 13 fell into sea). 689 drones detected (645 intercepted, 44 caused impact). 8 cruise missiles — all intercepted.',
    severity: 'critical',
    sourceUrl: 'https://en.wikipedia.org/wiki/2026_Iranian_strikes_on_the_United_Arab_Emirates',
  },
  {
    id: '19',
    timestamp: '2026-03-04T16:00:00Z',
    source: 'AWS',
    headline: 'AWS data center in UAE struck — power shut down',
    detail: 'Amazon Web Services reported one of its UAE data centers (mec1-az2) caught fire after being struck by "objects" at 4:30 PM local time. Power shut down. Later reported "localised power issues" in az3.',
    severity: 'warning',
    sourceUrl: 'https://en.wikipedia.org/wiki/2026_Iranian_strikes_on_the_United_Arab_Emirates',
  },
  // === Mar 3 ===
  {
    id: '18',
    timestamp: '2026-03-03T12:00:00Z',
    source: 'NYT',
    headline: 'Gulf states trapped between US and Iran — nightmare scenario',
    detail: 'Iran has fired over 1,000 missiles and drones at Saudi Arabia, UAE, Qatar, Bahrain, Kuwait and Oman combined. 7 killed across all Gulf states. Gulf states that pushed for de-escalation now turning against Iran.',
    severity: 'advisory',
    sourceUrl: 'https://www.nytimes.com/2026/03/03/world/middleeast/iran-us-israel-war-persian-gulf.html',
  },
  {
    id: '17',
    timestamp: '2026-03-03T06:00:00Z',
    source: 'NCEMA',
    headline: 'Overnight barrage — missiles and drones intercepted, debris in Mussafah',
    detail: 'UAE air defenses intercepted incoming overnight. Debris from intercepts fell in industrial areas of Mussafah, Abu Dhabi. 1 worker injured from falling debris.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  // === Mar 2 ===
  {
    id: '16',
    timestamp: '2026-03-02T14:00:00Z',
    source: 'The Guardian',
    headline: 'Gulf states on verge of acting against Iran over "reckless" strikes',
    detail: 'Qatar\'s former PM warned Iran has "lost Gulf sympathy" and "sowed doubts hard to erase." Gulf states that mediated for peace are now considering active support for US-Israel operations.',
    severity: 'advisory',
    sourceUrl: 'https://www.theguardian.com/world/2026/mar/02/gulf-states-iran-strikes-response',
  },
  {
    id: '15',
    timestamp: '2026-03-02T10:00:00Z',
    source: 'UAE MoD',
    headline: 'Second wave of strikes — 42 missiles, 60+ drones detected',
    detail: 'Iran launched second major wave targeting UAE military installations. 42 ballistic missiles and over 60 drones detected. UAE reports 95% intercept rate. Minor debris in Al Reem Island.',
    severity: 'critical',
    sourceUrl: 'https://www.reuters.com',
  },
  // === Mar 1 ===
  {
    id: '14',
    timestamp: '2026-03-01T20:00:00Z',
    source: 'Wikipedia',
    headline: 'Shahed drone strikes Fairmont The Palm — Burj Al Arab damaged',
    detail: 'Shahed-type drone struck near Fairmont The Palm Hotel on Palm Jumeirah causing explosion and fire. 4 injured. Windows shattered in nearby buildings. Intercept fragments also damaged Burj Al Arab.',
    severity: 'critical',
    sourceUrl: 'https://en.wikipedia.org/wiki/2026_Iranian_strikes_on_the_United_Arab_Emirates',
  },
  {
    id: '13',
    timestamp: '2026-03-01T12:30:00Z',
    source: 'Wikipedia',
    headline: 'Dubai International Airport struck — 4 staff injured, evacuated',
    detail: 'DXB Terminal 3 struck by suspected air strike around 12:30 AM local time. 4 airport staff injured. Full evacuation ordered. Airport sustained "minor damage." Videos show impact at Terminal 3.',
    severity: 'critical',
    sourceUrl: 'https://en.wikipedia.org/wiki/2026_Iranian_strikes_on_the_United_Arab_Emirates',
  },
  {
    id: '12',
    timestamp: '2026-03-01T10:00:00Z',
    source: 'Wikipedia',
    headline: 'Fire at Jebel Ali Port — debris from interception',
    detail: 'Fire broke out at Jebel Ali Port, attributed by Dubai government to debris from "aerial interception" of an Iranian attack. French naval base Camp de la Paix near Zayed Port also struck by drones.',
    severity: 'warning',
    sourceUrl: 'https://en.wikipedia.org/wiki/2026_Iranian_strikes_on_the_United_Arab_Emirates',
  },
  {
    id: '11',
    timestamp: '2026-03-01T04:00:00Z',
    source: 'NCEMA',
    headline: 'First Iranian drones reach UAE — intercepted over Abu Dhabi',
    detail: 'THAAD and Patriot systems intercepted drones and ballistic missiles targeting Abu Dhabi and Al Dhafra Air Base area. Debris fell near Zayed International Airport — 1 killed (Pakistani national), 7 injured.',
    severity: 'critical',
    sourceUrl: 'https://www.ncema.gov.ae',
  },
  // === Feb 28 ===
  {
    id: '10',
    timestamp: '2026-02-28T22:00:00Z',
    source: 'Reuters',
    headline: 'Iran launches retaliatory missile and drone strikes on Gulf states + Israel',
    detail: 'Iran fired ballistic missiles and drones at Israel, UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman in retaliation for Operation Epic Fury. UAE reports 35 ballistic missiles and 80+ drones in first hours.',
    severity: 'critical',
    sourceUrl: 'https://www.reuters.com',
  },
  {
    id: '9',
    timestamp: '2026-02-28T18:00:00Z',
    source: 'AP News',
    headline: 'US and Israel launch joint strikes on Iran — "Operation Epic Fury"',
    detail: 'Coordinated US-Israeli military operation targets Iranian nuclear facilities, military installations, and leadership. Iran vows massive retaliation across the region.',
    severity: 'critical',
    sourceUrl: 'https://apnews.com',
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
  // Incidents (verified from Wikipedia, Reuters, Al Jazeera, Gulf News)
  { id: 'inc-1', type: 'incident', name: 'Debris near Zayed Airport — 1 killed, 7 injured', lat: 24.44, lng: 54.65, detail: 'Mar 1: Intercept debris fell in residential area near Zayed International Airport. 1 Pakistani national killed, 7 injured.', color: '#ef4444' },
  { id: 'inc-2', type: 'incident', name: 'Drone strike — Fairmont The Palm', lat: 25.1124, lng: 55.1390, detail: 'Mar 1: Shahed drone struck near Fairmont hotel. Explosion and fire. 4 injured. Windows shattered in nearby buildings.', color: '#ef4444' },
  { id: 'inc-3', type: 'incident', name: 'Intercept fragments — Burj Al Arab damaged', lat: 25.1412, lng: 55.1854, detail: 'Mar 1: Fragments from missile interception caused damage to Burj Al Arab.', color: '#f97316' },
  { id: 'inc-4', type: 'incident', name: 'DXB Terminal 3 struck — 4 injured', lat: 25.2532, lng: 55.3657, detail: 'Mar 1: Dubai International Airport T3 struck by suspected air strike ~12:30 AM local. 4 staff injured. Airport evacuated.', color: '#ef4444' },
  { id: 'inc-5', type: 'incident', name: 'Fire at Jebel Ali Port', lat: 25.0074, lng: 55.0606, detail: 'Mar 1: Fire from interception debris. Dubai government confirmed "aerial interception" caused the fire.', color: '#f97316' },
  { id: 'inc-6', type: 'incident', name: 'Drones hit Camp de la Paix (French base)', lat: 24.5180, lng: 54.3820, detail: 'Mar 1: French naval base near Zayed Port struck by drones. France deployed Rafale jets in response.', color: '#ef4444' },
  { id: 'inc-7', type: 'incident', name: 'Debris — Mussafah industrial area', lat: 24.3500, lng: 54.4900, detail: 'Mar 3: Intercept debris fell in industrial area. 1 worker injured.', color: '#f97316' },
  { id: 'inc-8', type: 'incident', name: 'AWS data center struck — on fire', lat: 24.42, lng: 54.50, detail: 'Mar 4: AWS mec1-az2 data center struck by "objects," caught fire. Power shut down. az3 also had power issues.', color: '#ef4444' },
  { id: 'inc-9', type: 'incident', name: 'Drone strike — US Consulate parking, Dubai', lat: 25.1870, lng: 55.2600, detail: 'Mar 3: Drone struck US consulate parking lot in Dubai. Fire broke out, no injuries reported.', color: '#f97316' },
  { id: 'inc-10', type: 'incident', name: '6 injured — Abu Dhabi intercept debris', lat: 24.47, lng: 54.37, detail: 'Mar 5: 6 people injured by debris after drones intercepted over Abu Dhabi.', color: '#f97316' },
];
