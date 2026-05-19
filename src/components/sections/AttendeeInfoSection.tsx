'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { ATTENDEE_INFO, EVENT_DETAILS } from '@/lib/constants';
import { Wifi, Eye, EyeOff, Copy, Check, ShieldCheck, MapPin, Info } from 'lucide-react';

export function AttendeeInfoSection() {
  const { user, discordStatus } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<'ssid' | 'password' | null>(null);

  // Gate: must be signed in AND a DGR guild member
  if (!user || !discordStatus.isMember) {
    return null;
  }

  const copy = async (value: string, which: 'ssid' | 'password') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(which);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard unavailable — silent
    }
  };

  return (
    <section
      id="attendee-info"
      className="relative py-20 sm:py-24 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <ShieldCheck className="w-8 h-8 text-neon-green" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-neon-green glow-green">
              ATTENDEE INFO
            </h2>
          </div>
          <p className="font-terminal text-lg text-gray-400">
            Hello, {discordStatus.user?.username} — here&apos;s what you need on arrival
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-gradient-to-br from-retro-dark to-retro-purple border-2 border-neon-green p-8">
            {/* Wi-Fi */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Wifi className="w-6 h-6 text-neon-blue" />
                <h3 className="font-pixel text-sm text-neon-blue">WI-FI</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-4 bg-retro-black/50 border border-gray-700 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-pixel text-[0.55rem] text-gray-500 mb-1">SSID</div>
                    <div className="font-terminal text-xl text-white truncate">
                      {ATTENDEE_INFO.wifi.ssid}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => copy(ATTENDEE_INFO.wifi.ssid, 'ssid')}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-neon-blue transition-colors"
                    aria-label="Copy SSID"
                  >
                    {copied === 'ssid' ? (
                      <Check className="w-5 h-5 text-neon-green" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between gap-4 bg-retro-black/50 border border-gray-700 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-pixel text-[0.55rem] text-gray-500 mb-1">PASSWORD</div>
                    <div className="font-terminal text-xl text-white truncate">
                      {showPassword
                        ? ATTENDEE_INFO.wifi.password
                        : '•'.repeat(ATTENDEE_INFO.wifi.password.length)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => copy(ATTENDEE_INFO.wifi.password, 'password')}
                      className="p-2 text-gray-400 hover:text-neon-blue transition-colors"
                      aria-label="Copy password"
                    >
                      {copied === 'password' ? (
                        <Check className="w-5 h-5 text-neon-green" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Address + Parking */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-neon-pink" />
                <h3 className="font-pixel text-sm text-neon-pink">ADDRESS + PARKING</h3>
              </div>
              <p className="font-terminal text-lg text-white mb-1">
                {EVENT_DETAILS.venue.address}
              </p>
              <p className="font-terminal text-base text-gray-400">
                {ATTENDEE_INFO.parkingNote}
              </p>
            </div>

            {/* Notes */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Info className="w-6 h-6 text-pixel-yellow" />
                <h3 className="font-pixel text-sm text-pixel-yellow">HEADS UP</h3>
              </div>
              <ul className="space-y-2">
                {ATTENDEE_INFO.notes.map((note, i) => (
                  <li key={i} className="font-terminal text-base text-gray-300 flex gap-2">
                    <span className="text-pixel-yellow">→</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-center mt-4 font-terminal text-sm text-gray-600 italic">
            {'// visible only to verified DGR Discord members'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
