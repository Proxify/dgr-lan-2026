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
}

// Countdown Types
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}
