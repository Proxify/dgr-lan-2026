'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const decorations = [
  {
    src: '/images/generated/decorative-controller.png',
    alt: 'Floating controller',
    position: 'top-[20%] left-[5%]',
    size: 'w-16 h-16 sm:w-24 sm:h-24',
    animation: { y: [0, -20, 0], rotate: [0, 5, 0] },
    duration: 6,
  },
  {
    src: '/images/generated/decorative-pizza.png',
    alt: 'Floating pizza',
    position: 'top-[40%] right-[3%]',
    size: 'w-14 h-14 sm:w-20 sm:h-20',
    animation: { y: [0, 15, 0], rotate: [0, -8, 0] },
    duration: 5,
  },
  {
    src: '/images/generated/decorative-joystick.png',
    alt: 'Floating joystick',
    position: 'top-[60%] left-[2%]',
    size: 'w-12 h-12 sm:w-16 sm:h-16',
    animation: { y: [0, -15, 0], rotate: [0, 10, 0] },
    duration: 7,
  },
  {
    src: '/images/generated/decorative-energy-drink.png',
    alt: 'Floating energy drink',
    position: 'top-[80%] right-[5%]',
    size: 'w-14 h-14 sm:w-18 sm:h-18',
    animation: { y: [0, 20, 0], rotate: [0, -5, 0] },
    duration: 8,
  },
];

export function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden hidden lg:block">
      {decorations.map((decoration, index) => (
        <motion.div
          key={decoration.src}
          className={`absolute ${decoration.position} ${decoration.size} opacity-60`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            ...decoration.animation,
          }}
          transition={{
            opacity: { duration: 1, delay: index * 0.3 },
            scale: { duration: 1, delay: index * 0.3 },
            y: { duration: decoration.duration, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: decoration.duration, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Image
            src={decoration.src}
            alt={decoration.alt}
            fill
            className="object-contain drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]"
          />
        </motion.div>
      ))}
    </div>
  );
}
