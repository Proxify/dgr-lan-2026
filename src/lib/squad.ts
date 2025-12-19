import type { SquadMember } from '@/types';

export const SQUAD_MEMBERS: SquadMember[] = [
  {
    id: 1,
    name: 'Chad Cooper',
    displayName: 'Chad Cooper',
    playerClass: 'Dungeon Master',
    avatar: '/avatars/player-1.svg',
  },
  {
    id: 2,
    name: 'John Tyler',
    displayName: 'John Tyler',
    playerClass: 'Strategist',
    avatar: '/avatars/player-2.svg',
  },
  {
    id: 3,
    name: 'Michael Crain',
    displayName: 'Michael Crain',
    playerClass: 'Speed Runner',
    avatar: '/avatars/player-3.svg',
  },
  {
    id: 4,
    name: 'Matt Williams',
    displayName: 'Matt Williams',
    playerClass: 'Tank',
    avatar: '/avatars/player-4.svg',
  },
  {
    id: 5,
    name: 'Marianne LaChance',
    displayName: 'Marianne LaChance',
    playerClass: 'Healer',
    avatar: '/avatars/player-5.svg',
  },
  {
    id: 6,
    name: 'Alex White',
    displayName: 'Alex White',
    playerClass: 'Sniper',
    avatar: '/avatars/player-6.svg',
  },
  {
    id: 7,
    name: 'Chris Roach',
    displayName: 'Chris Roach',
    playerClass: 'Bard',
    avatar: '/avatars/player-7.svg',
  },
  {
    id: 8,
    name: 'Louis Moore',
    displayName: 'Louis Moore',
    playerClass: 'Wizard',
    avatar: '/avatars/player-8.svg',
  },
  {
    id: 9,
    name: 'Elliot Harris',
    displayName: 'Elliot Harris',
    playerClass: 'Rogue',
    avatar: '/avatars/player-9.svg',
  },
  {
    id: 10,
    name: 'Joey Williams',
    displayName: 'Joey Williams',
    playerClass: 'Paladin',
    avatar: '/avatars/player-10.svg',
  },
  {
    id: 11,
    name: 'Daryl Schneider',
    displayName: 'Daryl Schneider',
    playerClass: 'Engineer',
    avatar: '/avatars/player-11.svg',
  },
  {
    id: 12,
    name: 'Austin George',
    displayName: 'Austin George',
    playerClass: 'Berserker',
    avatar: '/avatars/player-12.svg',
  },
];

// Get squad member by name
export function getSquadMember(name: string): SquadMember | undefined {
  return SQUAD_MEMBERS.find(
    (member) => member.name.toLowerCase() === name.toLowerCase()
  );
}

// Get all squad member names for dropdown
export function getSquadNames(): string[] {
  return SQUAD_MEMBERS.map((member) => member.name);
}
