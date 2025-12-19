'use client';

import { motion } from 'framer-motion';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Omit animation props that conflict with Framer Motion
type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>;

interface PixelButtonProps extends ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: PixelButtonProps) {
  const variantStyles = {
    primary: 'bg-neon-blue text-retro-black hover:bg-neon-pink',
    secondary: 'bg-retro-dark text-neon-blue border-2 border-neon-blue hover:border-neon-pink hover:text-neon-pink',
    danger: 'bg-pixel-red text-white hover:bg-neon-pink',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-[0.5rem]',
    md: 'px-6 py-3 text-[0.625rem]',
    lg: 'px-8 py-4 text-[0.75rem]',
  };

  return (
    <motion.button
      className={`
        font-pixel uppercase tracking-wider
        transition-all duration-100 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      style={{
        clipPath: `polygon(
          0 4px, 4px 4px, 4px 0,
          calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px,
          100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%,
          4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px)
        )`,
      }}
      whileHover={!disabled ? { x: -2, y: -2 } : undefined}
      whileTap={!disabled ? { x: 0, y: 0 } : undefined}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">...</span>
          Loading
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
}
