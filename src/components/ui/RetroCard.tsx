'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  delay?: number;
}

export function RetroCard({
  children,
  className = '',
  glowOnHover = true,
  delay = 0,
}: RetroCardProps) {
  return (
    <motion.div
      className={`
        retro-card
        bg-gradient-to-br from-retro-dark to-retro-purple
        border-2 border-neon-blue
        p-6 relative
        ${glowOnHover ? 'hover:border-neon-pink hover:glow-box-pink' : ''}
        transition-all duration-300
        ${className}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={glowOnHover ? { y: -4 } : undefined}
    >
      {children}
    </motion.div>
  );
}
