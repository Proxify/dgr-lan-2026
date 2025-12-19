import type { EventDetails } from '@/types';

// Event Target Dates
export const EVENT_START_DATE = new Date('2026-05-21T16:00:00-05:00'); // 4 PM CDT
export const EVENT_END_DATE = new Date('2026-05-24T12:00:00-05:00'); // Noon CDT on departure day

// Legacy alias for backwards compatibility
export const EVENT_DATE = EVENT_START_DATE;

// Event Details
export const EVENT_DETAILS: EventDetails = {
  name: 'The Woodlands LAN 2026',
  dates: {
    arrive: new Date('2026-05-21'),
    depart: new Date('2026-05-24'),
    arriveFormatted: 'Thursday, May 21st 2026',
    departFormatted: 'Sunday, May 24th 2026',
  },
  location: {
    name: 'Game On at The Woodlands',
    url: 'https://airbnb.com/h/gameonatthewoodlands',
    mapUrl: 'https://www.google.com/maps?q=30.139155183277555,-95.46901425602044',
    address: 'The Woodlands, TX',
    features: [
      'Gaming Setup Ready',
      'Pool & Hot Tub',
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
    'Ethernet Cable (Cat6+ recommended)',
    'Power Strip / Surge Protector',
    'Controller (if you\'re that kind of person)',
    'Snacks & Energy Drinks',
    'Sleeping Gear (if not claiming a bed)',
    'Toiletries',
    'Change of Clothes',
    'Your A-Game',
  ],
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
  'Sleeping Bag',
];

// Arrival Time Options
export const ARRIVAL_TIMES = [
  'Thursday Morning (Before Noon)',
  'Thursday Afternoon (12-5 PM)',
  'Thursday Evening (5-9 PM)',
  'Thursday Night (After 9 PM)',
  'Friday Morning',
  'Friday Afternoon',
];
