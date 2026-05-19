// Squad Member Types
export interface SquadMember {
  id: number;
  name: string;
  displayName: string;
  playerClass: string;
  avatar?: string;
}

// RSVP Status for Squad Display
export type AttendanceStatus = 'yes' | 'no' | 'maybe' | null;

export interface RSVPListItem {
  name: string;
  attending: AttendanceStatus;
  discord_avatar: string | null;
  discord_username: string | null;
}

// RSVP Types
export interface RSVPResponse {
  id: string;
  name: string;
  attending: 'yes' | 'no' | 'maybe';
  arrivalTime: string;
  equipment: string[];
  dietaryRestrictions: string;
  notes: string;
  submittedAt: Date;
}

// Event Types
export interface EventDetails {
  name: string;
  dates: {
    arrive: Date;
    depart: Date;
    arriveFormatted: string;
    departFormatted: string;
  };
  location: {
    name: string;
    url: string;
    mapUrl: string;
    address: string;
    features: string[];
  };
  loadout: string[];
  provided: string[];
  venue: {
    address: string;
    parking: string;
    amenities: string[];
  };
}

// Schedule Types
export interface ScheduleBlock {
  time: string;
  activity: string;
  highlight?: boolean;
}

export interface ScheduleDay {
  day: string;
  date: string;
  title: string;
  accent: 'blue' | 'pink' | 'green' | 'yellow' | 'purple';
  blocks: ScheduleBlock[];
  note?: string;
}

// Halo Tournament Types
export interface HaloPlaylistEntry {
  num: number;
  mode: string;
  map: string;
  type: 'FFA' | 'Team' | 'Infection';
}

export interface HaloTournament {
  events: { name: string; when: string; format: string }[];
  playlist: HaloPlaylistEntry[];
  scoring: {
    ffa: string;
    team: string;
    obstacleCourse: string;
    overall: string;
  };
  prizes: string[];
  prizeNote: string;
}

// Comicpalooza Info
export interface ComicpaloozaInfo {
  name: string;
  dates: string;
  location: string;
  ourTrip: string;
  highlights: string[];
  ticketSunday: string;
  url: string;
}

// Attendee-only Info (gated behind Discord auth)
export interface AttendeeInfo {
  wifi: { ssid: string; password: string };
  parkingNote: string;
  notes: string[];
}

// Countdown Types
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
