'use client';

import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p';
  glowColor?: 'blue' | 'pink' | 'green';
}

export function GlitchText({
  text,
  className = '',
  as: Component = 'span',
  glowColor = 'blue',
}: GlitchTextProps) {
  const glowClass = {
    blue: 'glow-blue',
    pink: 'glow-pink',
    green: 'glow-green',
  }[glowColor];

  return (
    <motion.span
      className={`glitch ${glowClass} ${className}`}
      data-text={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Component className="relative">{text}</Component>
    </motion.span>
  );
}
