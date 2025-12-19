'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EVENT_DETAILS } from '@/lib/constants';
import { Gamepad2, Heart, Github, ExternalLink } from 'lucide-react';

export function RetroFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-retro-dark border-t-2 border-neon-blue overflow-hidden">
      {/* Background Skyline */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/footer-skyline.png"
          alt=""
          fill
          className="object-cover object-bottom opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-retro-dark/80 to-transparent" />
      </div>
      {/* Animated Top Border Glow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #00d4ff, #ff0080, #00d4ff, transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/generated/dgr_gaming_2026.png"
                alt="DGR Gaming"
                width={48}
                height={48}
              />
              <div>
                <span className="font-pixel text-sm text-white block">DGR Gaming</span>
                <span className="font-pixel text-[0.5rem] text-neon-pink">presents TWL 2026</span>
              </div>
            </div>
            <p className="font-terminal text-gray-400 leading-relaxed">
              The Woodlands LAN 2026 - Where legends gather, controllers clash, and sleep is optional.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-pixel text-sm text-neon-blue mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 font-terminal">
              <li>
                <a
                  href="#countdown"
                  className="text-gray-400 hover:text-neon-pink transition-colors"
                >
                  Countdown
                </a>
              </li>
              <li>
                <a
                  href="#details"
                  className="text-gray-400 hover:text-neon-pink transition-colors"
                >
                  Event Details
                </a>
              </li>
              <li>
                <a
                  href="#squad"
                  className="text-gray-400 hover:text-neon-pink transition-colors"
                >
                  The Squad
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="text-gray-400 hover:text-neon-pink transition-colors"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#rsvp"
                  className="text-gray-400 hover:text-neon-pink transition-colors"
                >
                  RSVP
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-pixel text-sm text-neon-green mb-4">EVENT INFO</h3>
            <div className="space-y-3 font-terminal">
              <p className="text-gray-400">
                <span className="text-white">Dates:</span> May 21-24, 2026
              </p>
              <p className="text-gray-400">
                <span className="text-white">Location:</span> The Woodlands, TX
              </p>
              <a
                href={EVENT_DETAILS.location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-pink transition-colors"
              >
                View Airbnb
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <motion.p
            className="font-terminal text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Made with{' '}
            <Heart className="w-4 h-4 inline text-pixel-red" />{' '}
            caffeine and questionable life choices
          </motion.p>

          <motion.p
            className="font-terminal text-sm text-gray-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            &copy; {currentYear} DGR Gaming. All respawns reserved.
          </motion.p>
        </div>

        {/* Easter Egg */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="font-terminal text-xs text-gray-700">
            // IDDQD • IDKFA • ↑↑↓↓←→←→BA
          </p>
        </motion.div>
      </div>

      {/* Floating Pixel Decorations */}
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-neon-blue animate-pulse" />
      <div className="absolute bottom-8 left-8 w-1 h-1 bg-neon-pink animate-pulse delay-300" />
      <div className="absolute bottom-4 right-4 w-2 h-2 bg-neon-green animate-pulse delay-500" />
      <div className="absolute bottom-8 right-8 w-1 h-1 bg-pixel-yellow animate-pulse delay-700" />
    </footer>
  );
}
