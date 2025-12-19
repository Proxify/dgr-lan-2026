'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { EVENT_START_DATE, EVENT_END_DATE } from '@/lib/constants';
import { FlipClock } from '@/components/ui/FlipDigit';
import { Timer, Zap, Trophy, PartyPopper } from 'lucide-react';

export function CountdownSection() {
  const timeLeft = useCountdown(EVENT_START_DATE, EVENT_END_DATE);

  const getHeaderContent = () => {
    switch (timeLeft.status) {
      case 'loading':
        return { title: 'LOADING...', subtitle: 'Calculating countdown...' };
      case 'upcoming':
        return { title: 'LOADING NEXT LAN IN', subtitle: 'Prepare your rigs and stock up on coffee' };
      case 'in_progress':
        return { title: 'EVENT IN PROGRESS', subtitle: 'The legends have assembled!' };
      case 'completed':
        return { title: 'EVENT COMPLETE', subtitle: 'Thanks for an epic LAN! See you next year!' };
    }
  };

  const header = getHeaderContent();

  return (
    <section
      id="countdown"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-retro-black via-retro-dark to-retro-black overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/countdown-background.png"
          alt=""
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Timer className="w-8 h-8 text-neon-pink" />
            <h2 className="font-pixel text-xl sm:text-2xl text-white">
              {header.title}
            </h2>
            <Timer className="w-8 h-8 text-neon-pink" />
          </div>

          <p className="font-terminal text-gray-400 text-lg">
            {header.subtitle}
          </p>
        </motion.div>

        {/* Countdown Clock or Status */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {timeLeft.status === 'upcoming' ? (
            <FlipClock
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
            />
          ) : timeLeft.status === 'in_progress' ? (
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-4 px-8 py-6 bg-retro-dark border-2 border-neon-green"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 65, 0.3)',
                    '0 0 40px rgba(0, 255, 65, 0.5)',
                    '0 0 20px rgba(0, 255, 65, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-10 h-10 text-neon-green" />
                <span className="font-pixel text-2xl sm:text-4xl text-neon-green glow-green">
                  GAME ON!
                </span>
                <Zap className="w-10 h-10 text-neon-green" />
              </motion.div>
            </div>
          ) : timeLeft.status === 'completed' ? (
            <div className="text-center">
              <motion.div
                className="inline-flex items-center gap-4 px-8 py-6 bg-retro-dark border-2 border-pixel-yellow"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                    '0 0 40px rgba(255, 215, 0, 0.5)',
                    '0 0 20px rgba(255, 215, 0, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-10 h-10 text-pixel-yellow" />
                <span className="font-pixel text-2xl sm:text-4xl text-pixel-yellow glow-yellow">
                  GG WP!
                </span>
                <PartyPopper className="w-10 h-10 text-pixel-yellow" />
              </motion.div>
            </div>
          ) : (
            // Loading state
            <div className="text-center">
              <div className="inline-flex items-center gap-4 px-8 py-6 bg-retro-dark border-2 border-gray-600">
                <span className="font-pixel text-2xl text-gray-400 animate-pulse">
                  ...
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Subtext */}
        {timeLeft.status === 'upcoming' && (
          <motion.p
            className="text-center mt-8 font-terminal text-xl text-neon-blue"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Until the chaos begins at{' '}
            <span className="text-neon-pink">The Woodlands</span>
          </motion.p>
        )}
      </div>

      {/* Animated Pulse Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          className="w-[600px] h-[600px] rounded-full border border-neon-blue/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </section>
  );
}
