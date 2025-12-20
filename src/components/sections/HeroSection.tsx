'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useGSAP, gsap, ScrollTrigger } from '@/hooks/useGSAP';
import { GlitchText } from '@/components/ui/GlitchText';
import { PixelButton } from '@/components/ui/PixelButton';
import { ChevronDown, Gamepad2 } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !contentRef.current) return;

    // Hero zoom and fade on scroll
    gsap.to(contentRef.current, {
      scale: 1.3,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });
  }, []);

  const scrollToContent = () => {
    const countdownSection = document.getElementById('countdown');
    if (countdownSection) {
      countdownSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-screen w-full overflow-hidden bg-retro-black"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/hero-background.png"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-black/60 via-transparent to-retro-black/80" />
      </div>

      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite',
        }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 10, 0.8) 70%, rgba(10, 10, 10, 1) 100%)',
        }}
      />

      {/* DGR Gaming Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] opacity-[0.15]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <Image
            src="/images/generated/dgr_gaming_2026.png"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div
        ref={contentRef}
        className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
      >
        {/* Badge */}
        <motion.div
          className="flex items-center gap-2 mb-6 px-4 py-2 border border-neon-pink bg-retro-dark/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Gamepad2 className="w-5 h-5 text-neon-pink" />
          <span className="font-pixel text-[0.5rem] text-neon-pink uppercase tracking-wider">
            A DGR Gaming Event
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="font-pixel text-xl sm:text-5xl md:text-7xl mb-2 leading-tight whitespace-nowrap">
            <GlitchText text="THE WOODLANDS" glowColor="blue" />
          </h1>
          <h1 className="font-pixel text-4xl sm:text-6xl md:text-8xl mb-6">
            <span className="text-neon-pink glow-pink">LAN</span>
            <span className="text-pixel-yellow glow-blue ml-4">2026</span>
          </h1>
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-terminal text-2xl sm:text-3xl text-neon-green glow-green mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          MAY 21 - 24, 2026
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="font-terminal text-lg sm:text-xl text-gray-400 max-w-xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Maximum gaming. Minimal sleep. At least one existential crisis around 3AM while updating drivers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <PixelButton
            size="lg"
            onClick={() => {
              const rsvpSection = document.getElementById('rsvp');
              if (rsvpSection) rsvpSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            RSVP Now
          </PixelButton>
          <PixelButton
            variant="secondary"
            size="lg"
            onClick={() => {
              const squadSection = document.getElementById('squad');
              if (squadSection) squadSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Squad
          </PixelButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-neon-blue"
        onClick={scrollToContent}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
        <span className="font-pixel text-[0.4rem] block mt-1">SCROLL</span>
      </motion.button>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-neon-blue opacity-50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-neon-blue opacity-50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-neon-blue opacity-50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-neon-blue opacity-50" />

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
  );
}
