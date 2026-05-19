import type {
  EventDetails,
  ScheduleDay,
  HaloTournament,
  ComicpaloozaInfo,
  AttendeeInfo,
} from '@/types';

// Event Target Dates
export const EVENT_START_DATE = new Date('2026-05-20T16:00:00-05:00'); // Wed setup day
export const EVENT_END_DATE = new Date('2026-05-24T11:00:00-05:00'); // 11 AM Sunday checkout

// Legacy alias for backwards compatibility
export const EVENT_DATE = EVENT_START_DATE;

// Event Details
export const EVENT_DETAILS: EventDetails = {
  name: 'The Woodlands LAN 2026',
  dates: {
    arrive: new Date('2026-05-20'),
    depart: new Date('2026-05-24'),
    arriveFormatted: 'Wednesday, May 20th 2026 (Setup)',
    departFormatted: 'Sunday, May 24th 2026 (11 AM Checkout)',
  },
  location: {
    name: 'Game On at The Woodlands',
    url: 'https://airbnb.com/h/gameonatthewoodlands',
    mapUrl: 'https://www.google.com/maps?q=983+N+Red+Cedar+Cir,+Spring,+TX+77380',
    address: '983 N Red Cedar Cir, Spring, TX 77380',
    features: [
      'Gaming Setup Ready',
      'Hot Tub',
      'Full Kitchen',
      'Multiple Bedrooms',
      'High-Speed Internet',
      'Outdoor Space',
    ],
  },
  loadout: [
    'Your Gaming Rig (PC/Laptop)',
    'Monitor(s)',
    'Keyboard & Mouse',
    'Headset',
    'Ethernet Cable (Cat6+, 10ft minimum)',
    'Sleeping Bag, Pillow, Cushions',
    'Folding Chair / Seat',
    'Folding Table (if you have one)',
    'Drinks (for the whole weekend)',
    'Snacks',
    'Toiletries & Meds',
    'Change of Clothes for 5 days',
  ],
  provided: [
    'Some Tables (bring extras if you can)',
    'Power Strips / Surge Protectors',
    'Wi-Fi + Wired Ethernet',
    'Hot Tub & Full Kitchen',
    'Prizes (donations welcome!)',
  ],
  venue: {
    address: '983 N Red Cedar Cir, Spring, TX 77380',
    parking:
      '2 cars in driveway, overflow on side street — DO NOT block mailboxes',
    amenities: ['Hot Tub', 'Full Kitchen', 'High-Speed Wi-Fi + Wired Ethernet'],
  },
};

// Equipment Options for RSVP
export const EQUIPMENT_OPTIONS = [
  'Gaming PC',
  'Gaming Laptop',
  'Console (Switch)',
  'VR Headset',
  'Extra Monitor',
  'Network Switch',
  'Gaming Chair',
  'Folding Chair',
  'Folding Table',
  'Sleeping Bag',
  'Pillow / Cushions',
];

// Arrival Time Options
export const ARRIVAL_TIMES = [
  'Wednesday (Setup Day)',
  'Thursday Afternoon',
  'Thursday Evening',
  'Friday Morning (Late)',
  'Friday Afternoon',
];

// ====================================================
// Schedule — Day-by-day plan
// Daily cadence: 11 AM start, dinner depart 4:30 / 5 PM,
// evening runs to 11 PM, free play after.
// ====================================================
export const SCHEDULE: ScheduleDay[] = [
  {
    day: 'WED',
    date: 'May 20',
    title: 'Setup Day',
    accent: 'blue',
    blocks: [
      { time: '11:00 AM+', activity: 'Arrive, unload, claim your spot' },
      { time: 'Afternoon', activity: 'Set up rigs, run ethernet, network test' },
      { time: '4:30 PM', activity: 'Depart for dinner', highlight: true },
      { time: '5:00 PM', activity: 'Dinner', highlight: true },
      { time: '6:30 – 11:00 PM', activity: 'Finish setup, warm-up gaming' },
      { time: '11:00 PM+', activity: 'Free play' },
    ],
  },
  {
    day: 'THU',
    date: 'May 21',
    title: 'Setup Continued + Halo Obstacle Course',
    accent: 'green',
    blocks: [
      { time: '11:00 AM', activity: 'Day starts' },
      { time: '11:30 AM – 4:30 PM', activity: 'Late arrivals settle in, casual games' },
      { time: '4:30 PM', activity: 'Depart for dinner', highlight: true },
      { time: '5:00 PM', activity: 'Dinner', highlight: true },
      {
        time: '6:30 – 11:00 PM',
        activity: '🏁 HALO OBSTACLE COURSE — Forge timed run, individual (counts toward tournament)',
        highlight: true,
      },
      { time: '11:00 PM+', activity: 'Free play' },
    ],
  },
  {
    day: 'FRI',
    date: 'May 22',
    title: 'Halo Tournament + Finals',
    accent: 'pink',
    blocks: [
      { time: '11:00 AM', activity: 'Day starts' },
      {
        time: '11:30 AM – 4:30 PM',
        activity: '🏆 Tournament Block 1 (Games 1–5)',
        highlight: true,
      },
      { time: '4:30 PM', activity: 'Depart for dinner', highlight: true },
      { time: '5:00 PM', activity: 'Dinner', highlight: true },
      {
        time: '6:30 – 10:00 PM',
        activity: '🏆 Tournament Block 2 + Sudden-Death Finale (Games 6–10)',
        highlight: true,
      },
      {
        time: '10:00 – 11:00 PM',
        activity: '🥇 AWARDS CEREMONY — 1st, 2nd, 3rd place prizes',
        highlight: true,
      },
      { time: '11:00 PM+', activity: 'Free play' },
    ],
    note: 'Comicpalooza opens today (Houston, 35 min south, 2–8 PM) — but tournament owns this day.',
  },
  {
    day: 'SAT',
    date: 'May 23',
    title: 'Star Citizen + Farewell Night',
    accent: 'yellow',
    blocks: [
      { time: '11:00 AM', activity: 'Day starts' },
      {
        time: '11:30 AM – 4:30 PM',
        activity: '🚀 Star Citizen Org Day — fleet ops, missions, exploration',
        highlight: true,
      },
      { time: '4:30 PM', activity: 'Depart for dinner', highlight: true },
      {
        time: '5:00 PM',
        activity: '🍽️ FAREWELL DINNER — last big meal together',
        highlight: true,
      },
      {
        time: '6:30 – 11:00 PM',
        activity: '🚀 Star Citizen Block 2 + Last Hurrah',
        highlight: true,
      },
      { time: '11:00 PM+', activity: 'Free play / early tear-down for Sunday departures' },
    ],
    note: 'Comicpalooza biggest day in Houston (show floor 10–7) — optional split for those who want it.',
  },
  {
    day: 'SUN',
    date: 'May 24',
    title: 'Checkout + Optional Comicpalooza Send-Off',
    accent: 'purple',
    blocks: [
      { time: 'Morning', activity: 'Wake up, pack, clean up' },
      {
        time: '11:00 AM',
        activity: '🧳 CHECKOUT — out of the Airbnb (hard deadline)',
        highlight: true,
      },
      {
        time: 'After checkout',
        activity:
          '🎉 Optional Comicpalooza send-off (Houston, ~35 min south) — meet up at the show, then everyone heads home',
        highlight: true,
      },
    ],
    note: 'Matt Dinniman + Jeff Hays are at Comicpalooza all 3 days — Sunday show floor 10 AM–5 PM, $72 ticket.',
  },
];

// ====================================================
// Halo Tournament — events, playlist, scoring, prizes
// ====================================================
export const HALO_TOURNAMENT: HaloTournament = {
  events: [
    {
      name: 'Halo Obstacle Course',
      when: 'Thursday Night',
      format: 'Forge-mode timed run, individual',
    },
    {
      name: 'Multi-Match Tournament',
      when: 'Friday',
      format: '10-game playlist across FFA, Team, and Infection modes',
    },
    {
      name: 'Awards Ceremony',
      when: 'Friday 10–11 PM',
      format: '1st, 2nd, 3rd place prizes',
    },
  ],
  playlist: [
    { num: 1, mode: 'Swords & Shotguns', map: 'Guardian', type: 'FFA' },
    { num: 2, mode: 'SudoSWAT', map: 'Blackout', type: 'FFA' },
    { num: 3, mode: 'Team BRs', map: 'Last Resort', type: 'Team' },
    { num: 4, mode: 'SudoVIP', map: 'Gephyrophobia', type: 'Team' },
    { num: 5, mode: 'Castle Wars CTF', map: 'Castle Wars', type: 'Team' },
    { num: 6, mode: 'Shotty Snipers', map: 'Narrows', type: 'FFA' },
    { num: 7, mode: 'SudoInfection', map: 'High Ground', type: 'Infection' },
    { num: 8, mode: 'SWATBall (Oddball)', map: 'Cold Storage', type: 'FFA' },
    { num: 9, mode: 'Big Team Battle', map: 'Blood Gulch', type: 'Team' },
    { num: 10, mode: 'Sudden-Death Finale', map: 'TBD', type: 'FFA' },
  ],
  scoring: {
    ffa: 'Finishing position = your score. 1st = 1 point, 2nd = 2 points, etc.',
    team: 'Winning team: 1 point each. Losing team: 6 points each. Tie: 3 points each.',
    obstacleCourse: 'Rank by completion time — same as FFA (1st = 1 pt, 2nd = 2 pts…).',
    overall: 'Sum every event. LOWEST total score wins the championship (golf-style).',
  },
  prizes: ['🥇 1st Place', '🥈 2nd Place', '🥉 3rd Place'],
  prizeNote:
    'Prizes provided by your hosts. Want to throw in a prize? Donations welcome — bring it.',
};

// ====================================================
// Comicpalooza side-event info
// ====================================================
export const COMICPALOOZA: ComicpaloozaInfo = {
  name: 'Comicpalooza 2026',
  dates: 'May 22–24, 2026',
  location:
    'George R. Brown Convention Center, Houston (~35 min south of the venue)',
  ourTrip: 'Sunday May 24, after 11 AM checkout — group send-off',
  highlights: [
    'Matt Dinniman — Dungeon Crawler Carl author',
    'Jeff Hays — DCC audiobook narrator',
    'Both confirmed all 3 days',
  ],
  ticketSunday: '$72',
  url: 'https://www.comicpalooza.com/',
};

// ====================================================
// Attendee-only Info (gated behind Discord/DGR auth)
// ====================================================
export const ATTENDEE_INFO: AttendeeInfo = {
  wifi: { ssid: 'ORBI14', password: 'roundwind136' },
  parkingNote:
    '2 cars fit in the driveway. Overflow on the side street — DO NOT block mailboxes.',
  notes: [
    'Hard checkout 11 AM Sunday — pack up Saturday night if you can.',
    'Bring drinks for the whole weekend — restock runs are on you.',
    'Power strips and some tables are provided. Extra tables welcome.',
  ],
};
