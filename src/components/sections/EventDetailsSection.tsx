'use client';

import { motion } from 'framer-motion';
import { RetroCard } from '@/components/ui/RetroCard';
import { EVENT_DETAILS } from '@/lib/constants';
import {
  Calendar,
  MapPin,
  Package,
  Sun,
  Moon,
  Gamepad2,
  Wifi,
  UtensilsCrossed,
  Check,
} from 'lucide-react';

export function EventDetailsSection() {
  return (
    <section
      id="details"
      className="relative py-24 sm:py-32 bg-retro-black overflow-hidden"
    >
      {/* Section Header */}
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-pixel text-2xl sm:text-3xl text-neon-blue glow-blue mb-4">
            MISSION BRIEFING
          </h2>
          <p className="font-terminal text-xl text-gray-400">
            Everything you need to know before deployment
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Dates Card */}
          <RetroCard delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-8 h-8 text-neon-pink" />
              <h3 className="font-pixel text-sm text-neon-pink">OPERATION DATES</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Sun className="w-5 h-5 text-pixel-yellow mt-1" />
                <div>
                  <p className="font-terminal text-lg text-white">Arrival</p>
                  <p className="font-terminal text-gray-400">
                    {EVENT_DETAILS.dates.arriveFormatted}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Moon className="w-5 h-5 text-neon-blue mt-1" />
                <div>
                  <p className="font-terminal text-lg text-white">Departure</p>
                  <p className="font-terminal text-gray-400">
                    {EVENT_DETAILS.dates.departFormatted}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <p className="font-pixel text-[0.6rem] text-neon-green">
                  3 NIGHTS OF PURE CHAOS
                </p>
              </div>
            </div>
          </RetroCard>

          {/* Location Card */}
          <RetroCard delay={0.2}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-neon-green" />
              <h3 className="font-pixel text-sm text-neon-green">BASE CAMP</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-terminal text-xl text-white mb-1">
                  {EVENT_DETAILS.location.name}
                </p>
                <p className="font-terminal text-gray-400">
                  {EVENT_DETAILS.location.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {EVENT_DETAILS.location.features.slice(0, 4).map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green" />
                    <span className="font-terminal text-sm text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={EVENT_DETAILS.location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-pixel text-[0.6rem] text-neon-blue hover:text-neon-pink transition-colors"
              >
                VIEW LOCATION →
              </a>
            </div>
          </RetroCard>

          {/* What to Bring Card */}
          <RetroCard delay={0.3} className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-8 h-8 text-pixel-yellow" />
              <h3 className="font-pixel text-sm text-pixel-yellow">LOADOUT</h3>
            </div>

            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2 scrollbar-thin">
              {EVENT_DETAILS.loadout.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <Check className="w-4 h-4 text-neon-green flex-shrink-0" />
                  <span className="font-terminal text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </RetroCard>
        </div>

        {/* Bottom Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 px-6 sm:px-8 py-4 bg-retro-dark border border-gray-700">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-neon-green" />
              <span className="font-terminal text-gray-300">High-Speed Internet</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-700" />
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-neon-pink" />
              <span className="font-terminal text-gray-300">Gaming Ready</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-700" />
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-pixel-yellow" />
              <span className="font-terminal text-gray-300">Full Kitchen</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
