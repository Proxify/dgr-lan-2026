'use client';

import { motion } from 'framer-motion';
import { RetroCard } from '@/components/ui/RetroCard';
import { SCHEDULE, HALO_TOURNAMENT, COMICPALOOZA } from '@/lib/constants';
import type { ScheduleDay } from '@/types';
import {
  CalendarDays,
  Trophy,
  Sparkles,
  ExternalLink,
  Gift,
  Target,
  Users,
  Zap,
} from 'lucide-react';

const accentClass: Record<ScheduleDay['accent'], { text: string; border: string; glow: string }> = {
  blue:   { text: 'text-neon-blue',    border: 'border-neon-blue',    glow: 'glow-blue' },
  pink:   { text: 'text-neon-pink',    border: 'border-neon-pink',    glow: 'glow-pink' },
  green:  { text: 'text-neon-green',   border: 'border-neon-green',   glow: 'glow-green' },
  yellow: { text: 'text-pixel-yellow', border: 'border-pixel-yellow', glow: 'glow-yellow' },
  purple: { text: 'text-neon-purple',  border: 'border-neon-purple',  glow: 'glow-pink' },
};

export function ScheduleSection() {
  return (
    <section
      id="schedule"
      className="relative py-24 sm:py-32 bg-retro-dark overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarDays className="w-8 h-8 text-neon-pink" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-neon-pink glow-pink">
              CAMPAIGN SCHEDULE
            </h2>
          </div>
          <p className="font-terminal text-xl text-gray-400 mb-2">
            5 days of structured chaos
          </p>
          <p className="font-terminal text-sm text-gray-500">
            Daily cadence: 11 AM start • dinner depart 4:30 / dinner 5:00 • evening goes to 11 PM • free play after
          </p>
        </motion.div>

        {/* Day-by-day Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {SCHEDULE.map((day, idx) => {
            const accent = accentClass[day.accent];
            return (
              <RetroCard key={day.day} delay={0.1 * idx} className="flex flex-col">
                {/* Day badge */}
                <div className="flex items-baseline justify-between mb-4 pb-3 border-b border-gray-700">
                  <div>
                    <div className={`font-pixel text-2xl ${accent.text} ${accent.glow}`}>
                      {day.day}
                    </div>
                    <div className="font-terminal text-lg text-gray-400">{day.date}</div>
                  </div>
                  <div className="text-right max-w-[60%]">
                    <div className="font-pixel text-[0.6rem] text-white leading-tight">
                      {day.title}
                    </div>
                  </div>
                </div>

                {/* Time blocks */}
                <div className="space-y-3 flex-1">
                  {day.blocks.map((block, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * idx + i * 0.04 }}
                    >
                      <div
                        className={`flex-shrink-0 w-1 ${
                          block.highlight ? accent.border : 'border-gray-700'
                        } border-l-2`}
                      />
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-pixel text-[0.55rem] uppercase tracking-wider ${
                            block.highlight ? accent.text : 'text-gray-500'
                          }`}
                        >
                          {block.time}
                        </div>
                        <div
                          className={`font-terminal text-base ${
                            block.highlight ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {block.activity}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Optional note */}
                {day.note && (
                  <div className="mt-4 pt-3 border-t border-gray-700">
                    <p className="font-terminal text-sm text-gray-500 italic">
                      {day.note}
                    </p>
                  </div>
                )}
              </RetroCard>
            );
          })}
        </div>

        {/* Halo Tournament + Comicpalooza side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Halo Tournament Card */}
          <RetroCard delay={0.6} className="flex flex-col">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
              <Trophy className="w-8 h-8 text-pixel-yellow" />
              <div>
                <h3 className="font-pixel text-sm text-pixel-yellow glow-yellow">
                  HALO TOURNAMENT
                </h3>
                <p className="font-terminal text-sm text-gray-400">
                  Multi-match playlist + obstacle course
                </p>
              </div>
            </div>

            {/* Events list */}
            <div className="mb-6">
              <div className="font-pixel text-[0.6rem] text-neon-pink mb-2 flex items-center gap-2">
                <Target className="w-3 h-3" /> EVENTS
              </div>
              <div className="space-y-2">
                {HALO_TOURNAMENT.events.map((event, i) => (
                  <div key={i} className="font-terminal text-base">
                    <span className="text-white">{event.name}</span>
                    <span className="text-gray-500"> — {event.when}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Playlist */}
            <div className="mb-6">
              <div className="font-pixel text-[0.6rem] text-neon-blue mb-2 flex items-center gap-2">
                <Zap className="w-3 h-3" /> FRIDAY PLAYLIST (10 GAMES)
              </div>
              <div className="bg-retro-black/50 border border-gray-700 overflow-hidden">
                <table className="w-full font-terminal text-sm">
                  <thead>
                    <tr className="bg-retro-black border-b border-gray-700">
                      <th className="text-left py-1 px-2 text-gray-500 font-pixel text-[0.5rem] w-8">#</th>
                      <th className="text-left py-1 px-2 text-gray-500 font-pixel text-[0.5rem]">MODE</th>
                      <th className="text-left py-1 px-2 text-gray-500 font-pixel text-[0.5rem]">MAP</th>
                      <th className="text-left py-1 px-2 text-gray-500 font-pixel text-[0.5rem]">TYPE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HALO_TOURNAMENT.playlist.map((g) => (
                      <tr key={g.num} className="border-b border-gray-800 last:border-0">
                        <td className="py-1 px-2 text-gray-500">{g.num}</td>
                        <td className="py-1 px-2 text-white">{g.mode}</td>
                        <td className="py-1 px-2 text-gray-400">{g.map}</td>
                        <td className="py-1 px-2">
                          <span
                            className={`font-pixel text-[0.5rem] ${
                              g.type === 'FFA'
                                ? 'text-neon-blue'
                                : g.type === 'Team'
                                ? 'text-neon-pink'
                                : 'text-neon-green'
                            }`}
                          >
                            {g.type.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scoring */}
            <div className="mb-6">
              <div className="font-pixel text-[0.6rem] text-neon-green mb-2 flex items-center gap-2">
                <Users className="w-3 h-3" /> SCORING (golf-style — lowest wins)
              </div>
              <div className="space-y-2 font-terminal text-base">
                <div>
                  <span className="font-pixel text-[0.55rem] text-neon-blue">FFA: </span>
                  <span className="text-gray-300">{HALO_TOURNAMENT.scoring.ffa}</span>
                </div>
                <div>
                  <span className="font-pixel text-[0.55rem] text-neon-pink">TEAM: </span>
                  <span className="text-gray-300">{HALO_TOURNAMENT.scoring.team}</span>
                </div>
                <div>
                  <span className="font-pixel text-[0.55rem] text-pixel-yellow">OBSTACLE: </span>
                  <span className="text-gray-300">{HALO_TOURNAMENT.scoring.obstacleCourse}</span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-700">
                  <span className="font-pixel text-[0.55rem] text-neon-green">FINAL: </span>
                  <span className="text-white">{HALO_TOURNAMENT.scoring.overall}</span>
                </div>
              </div>
            </div>

            {/* Prizes */}
            <div className="mt-auto pt-4 border-t border-gray-700">
              <div className="font-pixel text-[0.6rem] text-pixel-yellow mb-3 flex items-center gap-2">
                <Gift className="w-3 h-3" /> PRIZES
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {HALO_TOURNAMENT.prizes.map((p, i) => (
                  <div
                    key={i}
                    className="text-center py-2 bg-retro-black/50 border border-pixel-yellow/50 font-pixel text-[0.55rem] text-pixel-yellow"
                  >
                    {p}
                  </div>
                ))}
              </div>
              <p className="font-terminal text-sm text-gray-400 italic">
                {HALO_TOURNAMENT.prizeNote}
              </p>
            </div>
          </RetroCard>

          {/* Comicpalooza Card */}
          <RetroCard delay={0.7} className="flex flex-col">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-700">
              <Sparkles className="w-8 h-8 text-neon-pink" />
              <div>
                <h3 className="font-pixel text-sm text-neon-pink glow-pink">
                  COMICPALOOZA SEND-OFF
                </h3>
                <p className="font-terminal text-sm text-gray-400">
                  Sunday optional group stop on the way home
                </p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div>
                <div className="font-pixel text-[0.6rem] text-neon-blue mb-1">WHEN</div>
                <p className="font-terminal text-base text-white">
                  {COMICPALOOZA.ourTrip}
                </p>
              </div>

              <div>
                <div className="font-pixel text-[0.6rem] text-neon-green mb-1">WHERE</div>
                <p className="font-terminal text-base text-white">
                  {COMICPALOOZA.location}
                </p>
              </div>

              <div>
                <div className="font-pixel text-[0.6rem] text-pixel-yellow mb-1">
                  ⭐ HIGHLIGHTS
                </div>
                <ul className="space-y-1">
                  {COMICPALOOZA.highlights.map((h, i) => (
                    <li key={i} className="font-terminal text-base text-gray-300 flex gap-2">
                      <span className="text-neon-pink">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="font-pixel text-[0.6rem] text-neon-pink mb-1">SUNDAY TICKET</div>
                <p className="font-terminal text-base text-white">
                  {COMICPALOOZA.ticketSunday} — show floor 10 AM–5 PM
                </p>
              </div>

              <div className="bg-retro-black/50 border border-neon-pink/30 p-3">
                <p className="font-terminal text-sm text-gray-400 italic">
                  Dungeon Crawler Carl fans — this is your moment. Carl and the
                  voice of Carl, in the same building.
                </p>
              </div>
            </div>

            <a
              href={COMICPALOOZA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 font-pixel text-[0.6rem] text-neon-blue hover:text-neon-pink transition-colors py-2 border border-neon-blue hover:border-neon-pink"
            >
              COMICPALOOZA.COM
              <ExternalLink className="w-3 h-3" />
            </a>
          </RetroCard>
        </div>
      </div>
    </section>
  );
}
