'use client';

import { motion } from 'framer-motion';
import type { SquadMember, AttendanceStatus } from '@/types';
import { Gamepad2, Swords, Heart, Target, Skull, Wand2, Eye, Shield, Wrench, Music, Crown, Zap, Check, HelpCircle, X, Crosshair, Compass, Footprints } from 'lucide-react';
import { PixelCanvas } from './PixelCanvas';

interface SquadMemberCardProps {
  member: SquadMember;
  index: number;
  attendanceStatus?: AttendanceStatus;
  discordUsername?: string | null;
}

const classIcons: Record<string, React.ElementType> = {
  'Dungeon Master': Crown,
  'Strategist': Target,
  'Speed Runner': Zap,
  'Tank': Shield,
  'Healer': Heart,
  'Sniper': Target,
  'Berserker': Skull,
  'Wizard': Wand2,
  'Rogue': Eye,
  'Paladin': Swords,
  'Engineer': Wrench,
  'Bard': Music,
  'Hunter': Crosshair,
  'Warrior': Swords,
  'Scout': Compass,
  'Assassin': Footprints,
};

const classColors: Record<string, string> = {
  'Dungeon Master': 'text-pixel-yellow',
  'Strategist': 'text-neon-blue',
  'Speed Runner': 'text-neon-green',
  'Tank': 'text-gray-400',
  'Healer': 'text-neon-pink',
  'Sniper': 'text-pixel-red',
  'Berserker': 'text-pixel-red',
  'Wizard': 'text-neon-purple',
  'Rogue': 'text-gray-300',
  'Paladin': 'text-pixel-yellow',
  'Engineer': 'text-pixel-orange',
  'Bard': 'text-neon-pink',
  'Hunter': 'text-emerald-400',
  'Warrior': 'text-amber-500',
  'Scout': 'text-sky-400',
  'Assassin': 'text-violet-400',
};

const classPixelColors: Record<string, string[]> = {
  'Dungeon Master': ['#ffd700', '#ffb700', '#ff9500'],
  'Strategist': ['#00d4ff', '#0099cc', '#006699'],
  'Speed Runner': ['#00ff41', '#00cc33', '#009926'],
  'Tank': ['#9ca3af', '#6b7280', '#4b5563'],
  'Healer': ['#ff2a6d', '#ff0066', '#cc0052'],
  'Sniper': ['#ff3333', '#cc0000', '#990000'],
  'Berserker': ['#ff3333', '#cc0000', '#990000'],
  'Wizard': ['#b900ff', '#9900cc', '#660099'],
  'Rogue': ['#d1d5db', '#9ca3af', '#6b7280'],
  'Paladin': ['#ffd700', '#ffb700', '#ff9500'],
  'Engineer': ['#ff6600', '#cc5200', '#993d00'],
  'Bard': ['#ff2a6d', '#ff0066', '#cc0052'],
  'Hunter': ['#34d399', '#10b981', '#059669'],
  'Warrior': ['#f59e0b', '#d97706', '#b45309'],
  'Scout': ['#38bdf8', '#0ea5e9', '#0284c7'],
  'Assassin': ['#a78bfa', '#8b5cf6', '#7c3aed'],
};

// Attendance status badge configurations
const statusConfig = {
  yes: {
    icon: Check,
    label: 'GOING',
    borderColor: 'border-neon-green',
    glowColor: 'shadow-[0_0_20px_rgba(0,255,65,0.5)]',
    badgeBg: 'bg-neon-green',
    badgeText: 'text-retro-black',
  },
  maybe: {
    icon: HelpCircle,
    label: 'MAYBE',
    borderColor: 'border-pixel-yellow',
    glowColor: 'shadow-[0_0_20px_rgba(255,215,0,0.5)]',
    badgeBg: 'bg-pixel-yellow',
    badgeText: 'text-retro-black',
  },
  no: {
    icon: X,
    label: 'OUT',
    borderColor: 'border-gray-600',
    glowColor: '',
    badgeBg: 'bg-gray-600',
    badgeText: 'text-gray-300',
  },
};

export function SquadMemberCard({ member, index, attendanceStatus, discordUsername }: SquadMemberCardProps) {
  const IconComponent = classIcons[member.playerClass] || Gamepad2;
  const colorClass = classColors[member.playerClass] || 'text-neon-blue';
  const pixelColors = classPixelColors[member.playerClass] || ['#00d4ff', '#0099cc', '#006699'];

  const status = attendanceStatus ? statusConfig[attendanceStatus] : null;
  const StatusIcon = status?.icon;

  // Format Discord username with @ prefix
  const formattedDiscordName = discordUsername ? `@${discordUsername.replace(/^@/, '')}` : null;

  return (
    <motion.div
      className="group relative h-full"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      {/* Attendance Status Badge */}
      {status && (
        <motion.div
          className={`
            absolute -top-2 -right-2 z-20
            ${status.badgeBg} ${status.badgeText}
            px-2 py-1
            font-pixel text-[0.4rem]
            flex items-center gap-1
            ${attendanceStatus === 'yes' ? 'animate-pulse' : ''}
          `}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.08 + 0.3, type: 'spring' }}
        >
          {StatusIcon && <StatusIcon className="w-3 h-3" />}
          {status.label}
        </motion.div>
      )}

      <div
        className={`
          relative overflow-hidden h-full
          bg-gradient-to-br from-retro-dark to-retro-purple
          border-2 ${status ? status.borderColor : 'border-neon-blue'}
          ${status ? status.glowColor : ''}
          p-4 text-center
          transition-all duration-300
          group-hover:border-neon-pink
          group-hover:shadow-[0_0_20px_rgba(255,0,128,0.3)]
          ${attendanceStatus === 'no' ? 'opacity-50 grayscale-[30%]' : ''}
        `}
      >
        <PixelCanvas colors={pixelColors} gap={6} speed={40} />
        {/* Avatar Placeholder */}
        <motion.div
          className={`
            relative z-10
            w-16 h-16 mx-auto mb-3
            bg-retro-black
            border-2 border-current ${colorClass}
            flex items-center justify-center
            transition-all duration-300
            group-hover:scale-110
          `}
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5 }}
        >
          <IconComponent className={`w-8 h-8 ${colorClass}`} />
        </motion.div>

        {/* Name */}
        <h3 className="relative z-10 font-pixel text-[0.6rem] text-white mb-1 leading-tight">
          {member.displayName}
        </h3>

        {/* Class */}
        <p className={`relative z-10 font-terminal text-sm ${colorClass}`}>
          {member.playerClass}
        </p>
      </div>

      {/* Discord Username Tooltip on Hover */}
      {formattedDiscordName && (
        <div
          className="
            absolute -bottom-8 left-1/2 -translate-x-1/2
            bg-retro-dark border border-neon-blue
            px-2 py-1
            font-terminal text-xs text-neon-blue
            whitespace-nowrap
            opacity-0 scale-90
            transition-all duration-200
            group-hover:opacity-100 group-hover:scale-100
            pointer-events-none
            z-30
          "
        >
          {formattedDiscordName}
          {/* Tooltip arrow */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-retro-dark border-l border-t border-neon-blue rotate-45" />
        </div>
      )}

      {/* Glow effect on hover */}
      <div
        className="
          absolute inset-0 -z-10
          bg-gradient-to-r from-neon-blue via-neon-pink to-neon-blue
          opacity-0 blur-xl
          transition-opacity duration-300
          group-hover:opacity-30
        "
      />
    </motion.div>
  );
}
