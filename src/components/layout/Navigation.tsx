'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#countdown', label: 'Countdown' },
  { href: '#details', label: 'Details' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#rules', label: 'Rules' },
  { href: '#squad', label: 'Squad' },
  { href: '#location', label: 'Location' },
  { href: '#rsvp', label: 'RSVP' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled ? 'bg-retro-black/90 backdrop-blur-md border-b border-neon-blue/30' : 'bg-transparent'}
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#"
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Image
                src="/images/generated/dgr_gaming_2026.png"
                alt="DGR Gaming"
                width={40}
                height={40}
                className="group-hover:brightness-125 transition-all"
              />
              <span className="font-pixel text-[0.5rem] text-white hidden sm:block">
                DGR<span className="text-neon-pink"> LAN</span>
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-pixel text-[0.5rem] text-gray-400 hover:text-neon-blue transition-colors relative"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-neon-blue"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - using CSS transitions to avoid AnimatePresence hydration issues */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-retro-black/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`
            absolute inset-x-0 top-16 p-4
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}
          `}
        >
          <div className="bg-retro-dark border-2 border-neon-blue p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left font-pixel text-sm text-white hover:text-neon-pink transition-colors py-2 border-b border-gray-700 last:border-0"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
