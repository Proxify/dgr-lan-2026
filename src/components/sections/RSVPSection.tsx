'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRSVPStore } from '@/lib/store';
import { useAuth } from '@/hooks/useAuth';
import { SQUAD_MEMBERS } from '@/lib/squad';
import { EQUIPMENT_OPTIONS, ARRIVAL_TIMES } from '@/lib/constants';
import { PixelButton } from '@/components/ui/PixelButton';
import {
  Send,
  CheckCircle,
  User,
  Clock,
  Package,
  MessageSquare,
  PartyPopper,
  LogIn,
  LogOut,
  Shield,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function RSVPSection() {
  const {
    currentResponse,
    isSubmitting,
    isSubmitted,
    error,
    setField,
    submitRSVP,
    resetForm,
    loadExistingRSVP,
  } = useRSVPStore();

  const {
    user,
    isLoading: authLoading,
    discordStatus,
    signInWithDiscord,
    signOut,
  } = useAuth();

  // Load existing RSVP when user is authenticated and a DGR member
  useEffect(() => {
    if (user && discordStatus.isMember && !discordStatus.isLoading) {
      loadExistingRSVP();
    }
  }, [user, discordStatus.isMember, discordStatus.isLoading, loadExistingRSVP]);

  const handleEquipmentToggle = (item: string) => {
    const current = currentResponse.equipment || [];
    const updated = current.includes(item)
      ? current.filter((i) => i !== item)
      : [...current, item];
    setField('equipment', updated);
  };

  // Loading state
  if (authLoading || discordStatus.isLoading) {
    return (
      <section
        id="rsvp"
        className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="w-12 h-12 text-neon-blue mx-auto mb-4 animate-spin" />
            <p className="font-terminal text-xl text-gray-400">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  // Not authenticated - show Discord login
  if (!user) {
    return (
      <section
        id="rsvp"
        className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/rsvp-background.png"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-neon-purple mx-auto mb-6" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-pixel-yellow mb-4">
              SQUAD MEMBERS ONLY
            </h2>
            <p className="font-terminal text-xl text-gray-400 mb-8">
              Sign in with Discord to confirm your attendance.
              <br />
              You must be a member of the DGR Discord server.
            </p>

            <PixelButton
              size="lg"
              onClick={signInWithDiscord}
              className="inline-flex items-center gap-3"
            >
              <DiscordIcon className="w-6 h-6" />
              SIGN IN WITH DISCORD
            </PixelButton>
          </motion.div>
        </div>
      </section>
    );
  }

  // Authenticated but not a DGR member
  if (!discordStatus.isMember) {
    return (
      <section
        id="rsvp"
        className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/generated/rsvp-background.png"
            alt=""
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-16 h-16 text-pixel-yellow mx-auto mb-6" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-pixel-red mb-4">
              ACCESS DENIED
            </h2>
            <p className="font-terminal text-xl text-gray-400 mb-4">
              You must be a member of the DGR Discord server to RSVP.
            </p>
            <p className="font-terminal text-lg text-gray-500 mb-8">
              Signed in as: {discordStatus.user?.username || user.email}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PixelButton
                variant="secondary"
                onClick={signOut}
                className="inline-flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                SIGN OUT
              </PixelButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <section
        id="rsvp"
        className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <PartyPopper className="w-24 h-24 text-neon-green mx-auto mb-6" />
            </motion.div>

            <h2 className="font-pixel text-2xl sm:text-3xl text-neon-green glow-green mb-4">
              YOU&apos;RE IN!
            </h2>

            <p className="font-terminal text-xl text-gray-300 mb-4">
              Your RSVP has been recorded. See you at the LAN!
            </p>

            <p className="font-terminal text-sm text-gray-500 mb-8">
              Signed in as: {discordStatus.user?.username}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PixelButton variant="secondary" onClick={resetForm}>
                Update Response
              </PixelButton>
              <PixelButton
                variant="secondary"
                onClick={signOut}
                className="inline-flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </PixelButton>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Main form - authenticated and DGR member
  return (
    <section
      id="rsvp"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/rsvp-background.png"
          alt=""
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-pixel text-2xl sm:text-3xl text-pixel-yellow mb-4">
            CONFIRM YOUR SLOT
          </h2>
          <p className="font-terminal text-xl text-gray-400 mb-2">
            Lock in your attendance for The Woodlands LAN 2026
          </p>
          <div className="flex items-center justify-center gap-2 text-neon-green">
            <DiscordIcon className="w-5 h-5" />
            <span className="font-terminal text-sm">
              Signed in as {discordStatus.user?.username}
            </span>
            <button
              onClick={signOut}
              className="text-gray-500 hover:text-gray-300 transition-colors ml-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* RSVP Form */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-retro-dark to-retro-purple border-2 border-pixel-yellow p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitRSVP();
              }}
              className="space-y-6"
            >
              {/* Name Selection */}
              <div>
                <label className="flex items-center gap-2 font-pixel text-sm text-white mb-3">
                  <User className="w-4 h-4 text-neon-blue" />
                  WHO ARE YOU?
                </label>
                <select
                  value={currentResponse.name || ''}
                  onChange={(e) => setField('name', e.target.value)}
                  className="w-full bg-retro-black border-2 border-gray-700 px-4 py-3 font-terminal text-lg text-white focus:border-neon-blue focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select your name...</option>
                  {SQUAD_MEMBERS.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.displayName} - {member.playerClass}
                    </option>
                  ))}
                </select>
              </div>

              {/* Attendance */}
              <div>
                <label className="flex items-center gap-2 font-pixel text-sm text-white mb-3">
                  <CheckCircle className="w-4 h-4 text-neon-green" />
                  ARE YOU IN?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['yes', 'maybe', 'no'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setField('attending', option)}
                      className={`
                        py-3 px-4 font-pixel text-sm uppercase transition-all
                        ${
                          currentResponse.attending === option
                            ? option === 'yes'
                              ? 'bg-neon-green text-retro-black'
                              : option === 'maybe'
                              ? 'bg-pixel-yellow text-retro-black'
                              : 'bg-pixel-red text-white'
                            : 'bg-retro-black border-2 border-gray-700 text-gray-400 hover:border-gray-500'
                        }
                      `}
                    >
                      {option === 'yes' ? "I'M IN" : option === 'maybe' ? 'MAYBE' : 'CANT MAKE IT'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Arrival Time */}
              {currentResponse.attending !== 'no' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="flex items-center gap-2 font-pixel text-sm text-white mb-3">
                    <Clock className="w-4 h-4 text-neon-pink" />
                    ARRIVAL TIME
                  </label>
                  <select
                    value={currentResponse.arrivalTime || ''}
                    onChange={(e) => setField('arrivalTime', e.target.value)}
                    className="w-full bg-retro-black border-2 border-gray-700 px-4 py-3 font-terminal text-lg text-white focus:border-neon-blue focus:outline-none transition-colors"
                  >
                    <option value="">Select arrival time...</option>
                    {ARRIVAL_TIMES.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Equipment */}
              {currentResponse.attending !== 'no' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="flex items-center gap-2 font-pixel text-sm text-white mb-3">
                    <Package className="w-4 h-4 text-pixel-yellow" />
                    BRINGING EQUIPMENT
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {EQUIPMENT_OPTIONS.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleEquipmentToggle(item)}
                        className={`
                          py-2 px-3 font-terminal text-sm text-left transition-all
                          ${
                            (currentResponse.equipment || []).includes(item)
                              ? 'bg-neon-blue/20 border-2 border-neon-blue text-neon-blue'
                              : 'bg-retro-black border-2 border-gray-700 text-gray-400 hover:border-gray-500'
                          }
                        `}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Notes */}
              <div>
                <label className="flex items-center gap-2 font-pixel text-sm text-white mb-3">
                  <MessageSquare className="w-4 h-4 text-neon-purple" />
                  NOTES (OPTIONAL)
                </label>
                <textarea
                  value={currentResponse.notes || ''}
                  onChange={(e) => setField('notes', e.target.value)}
                  placeholder="Dietary restrictions, special requests, trash talk..."
                  className="w-full bg-retro-black border-2 border-gray-700 px-4 py-3 font-terminal text-lg text-white focus:border-neon-blue focus:outline-none transition-colors resize-none h-24"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-pixel-red/20 border border-pixel-red px-4 py-3 font-terminal text-pixel-red">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <PixelButton
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    SUBMIT RSVP
                  </span>
                </PixelButton>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
