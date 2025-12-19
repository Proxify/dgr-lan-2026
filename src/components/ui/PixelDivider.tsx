'use client';

import { motion } from 'framer-motion';

interface PixelDividerProps {
  className?: string;
  color?: 'blue' | 'pink' | 'gradient';
}

export function PixelDivider({ className = '', color = 'gradient' }: PixelDividerProps) {
  const colorStyles = {
    blue: 'bg-neon-blue',
    pink: 'bg-neon-pink',
    gradient: 'bg-gradient-to-r from-transparent via-neon-blue to-transparent',
  };

  return (
    <motion.div
      className={`w-full flex items-center justify-center py-8 ${className}`}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`h-[2px] w-full max-w-4xl ${colorStyles[color]}`} />
    </motion.div>
  );
}
