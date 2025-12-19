'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { padNumber } from '@/hooks/useCountdown';

interface FlipDigitProps {
  value: number;
  label: string;
}

export function FlipDigit({ value, label }: FlipDigitProps) {
  const displayValue = padNumber(value);

  return (
    <div className="flip-digit-container">
      <div className="flex gap-1">
        {displayValue.split('').map((digit, index) => (
          <div key={index} className="relative">
            <div className="flip-digit">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={digit}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="block"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

interface FlipClockProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function FlipClock({ days, hours, minutes, seconds }: FlipClockProps) {
  return (
    <div className="flip-clock flex-wrap">
      <FlipDigit value={days} label="Days" />
      <div className="text-neon-blue text-4xl font-pixel self-start mt-6 hidden sm:block">:</div>
      <FlipDigit value={hours} label="Hours" />
      <div className="text-neon-blue text-4xl font-pixel self-start mt-6 hidden sm:block">:</div>
      <FlipDigit value={minutes} label="Mins" />
      <div className="text-neon-blue text-4xl font-pixel self-start mt-6 hidden sm:block">:</div>
      <FlipDigit value={seconds} label="Secs" />
    </div>
  );
}
