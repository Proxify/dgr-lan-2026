'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SQUAD_MEMBERS } from '@/lib/squad';
import { SquadMemberCard } from '@/components/ui/SquadMemberCard';
import { Users, Swords } from 'lucide-react';
import type { RSVPListItem, AttendanceStatus } from '@/types';

export function SquadSection() {
  const [rsvpMap, setRsvpMap] = useState<Map<string, { status: AttendanceStatus; discordUsername: string | null }>>(new Map());
  const [confirmedCount, setConfirmedCount] = useState(0);

  useEffect(() => {
    async function fetchRSVPs() {
      try {
        const response = await fetch('/api/rsvp/list');
        if (response.ok) {
          const { data } = await response.json() as { data: RSVPListItem[] };
          const map = new Map<string, { status: AttendanceStatus; discordUsername: string | null }>();
          let confirmed = 0;
          data.forEach((rsvp) => {
            map.set(rsvp.name.toLowerCase(), {
              status: rsvp.attending,
              discordUsername: rsvp.discord_username,
            });
            if (rsvp.attending === 'yes') confirmed++;
          });
          setRsvpMap(map);
          setConfirmedCount(confirmed);
        }
      } catch (error) {
        console.error('Failed to fetch RSVPs:', error);
      }
    }
    fetchRSVPs();
  }, []);

  const getAttendanceStatus = (memberName: string): AttendanceStatus => {
    return rsvpMap.get(memberName.toLowerCase())?.status || null;
  };

  const getDiscordUsername = (memberName: string): string | null => {
    return rsvpMap.get(memberName.toLowerCase())?.discordUsername || null;
  };
  return (
    <section
      id="squad"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-purple/30 to-retro-black overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/squad-background.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-neon-pink"
          animate={{
            y: [0, 100, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 bg-neon-blue"
          animate={{
            y: [0, -80, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-2 h-2 bg-neon-green"
          animate={{
            y: [0, 60, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Swords className="w-8 h-8 text-neon-pink" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-neon-pink glow-pink">
              THE SQUAD
            </h2>
            <Swords className="w-8 h-8 text-neon-pink transform scale-x-[-1]" />
          </div>
          <p className="font-terminal text-xl text-gray-400">
            The DGR Gaming crew. 12 legends. 1 destination.
          </p>
        </motion.div>

        {/* Squad Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {SQUAD_MEMBERS.map((member, index) => (
            <SquadMemberCard
              key={member.id}
              member={member}
              index={index}
              attendanceStatus={getAttendanceStatus(member.name)}
              discordUsername={getDiscordUsername(member.name)}
            />
          ))}
        </div>

        {/* Squad Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-6 h-6 text-neon-green" />
              <span className="font-pixel text-3xl text-neon-green">{confirmedCount}</span>
              <span className="font-pixel text-xl text-gray-500">/ 12</span>
            </div>
            <span className="font-terminal text-gray-400">Confirmed</span>
          </div>

          <div className="w-px h-16 bg-gray-700 hidden sm:block" />

          <div className="text-center">
            <div className="font-pixel text-3xl text-neon-green mb-2">72+</div>
            <span className="font-terminal text-gray-400">Hours of Gaming</span>
          </div>

          <div className="w-px h-16 bg-gray-700 hidden sm:block" />

          <div className="text-center">
            <div className="font-pixel text-3xl text-neon-pink mb-2">∞</div>
            <span className="font-terminal text-gray-400">Cups of Coffee</span>
          </div>

          <div className="w-px h-16 bg-gray-700 hidden sm:block" />

          <div className="text-center">
            <div className="font-pixel text-3xl text-pixel-yellow mb-2">3AM</div>
            <span className="font-terminal text-gray-400">Driver Updates</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
