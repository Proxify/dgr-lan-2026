'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PixelButton } from '@/components/ui/PixelButton';
import { EVENT_DETAILS } from '@/lib/constants';
import {
  MapPin,
  ExternalLink,
  Waves,
  Utensils,
  Wifi,
  Tv,
  Car,
  Trees,
} from 'lucide-react';

const features = [
  { icon: Waves, label: 'Pool & Hot Tub', color: 'text-neon-blue' },
  { icon: Tv, label: 'Gaming Setup', color: 'text-neon-pink' },
  { icon: Wifi, label: 'High-Speed WiFi', color: 'text-neon-green' },
  { icon: Utensils, label: 'Full Kitchen', color: 'text-pixel-yellow' },
  { icon: Car, label: 'Free Parking', color: 'text-pixel-orange' },
  { icon: Trees, label: 'Outdoor Space', color: 'text-neon-green' },
];

export function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="location"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-retro-black overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(0, 212, 255, 0.3) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(255, 0, 128, 0.3) 0%, transparent 40%)
            `,
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="w-8 h-8 text-neon-green" />
            <h2 className="font-pixel text-2xl sm:text-3xl text-neon-green glow-green">
              BASE CAMP
            </h2>
          </div>
          <p className="font-terminal text-xl text-gray-400">
            Our home base for the weekend
          </p>
        </motion.div>

        {/* Location Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          style={{ opacity }}
        >
          <div className="bg-gradient-to-br from-retro-dark to-retro-purple border-2 border-neon-green p-8 relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-neon-green/10 to-transparent" />

            {/* Location Illustration */}
            <motion.div
              className="relative h-48 sm:h-64 mb-6 overflow-hidden rounded-sm border-2 border-neon-green/50"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/images/generated/location-house.png"
                alt="The Woodlands LAN venue - stylized illustration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-retro-dark via-transparent to-transparent" />

              {/* Corner Decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green" />
              <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-green" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-green" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-green" />
            </motion.div>

            {/* Embedded Google Map */}
            <motion.div
              className="relative h-48 sm:h-64 bg-retro-black mb-8 overflow-hidden group border-2 border-gray-700"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3446.8!2d-95.46901425602044!3d30.139155183277555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA4JzIwLjgiTiA5NcKwMjgnMDguNSJX!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(50%) contrast(1.1)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
              />

              {/* Corner Decorations */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-green pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-green pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-green pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-green pointer-events-none" />
            </motion.div>

            {/* Location Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
              <div>
                <h3 className="font-pixel text-lg text-white mb-2">
                  {EVENT_DETAILS.location.name}
                </h3>
                <p className="font-terminal text-gray-400">
                  {EVENT_DETAILS.location.address}
                </p>
              </div>

              <PixelButton
                onClick={() => window.open(EVENT_DETAILS.location.url, '_blank')}
              >
                <span className="flex items-center gap-2">
                  View on Airbnb
                  <ExternalLink className="w-4 h-4" />
                </span>
              </PixelButton>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="text-center p-4 bg-retro-black/50 border border-gray-700 hover:border-neon-blue transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color} mx-auto mb-2`} />
                  <span className="font-terminal text-sm text-gray-300">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Map Coordinates Easter Egg */}
        <motion.p
          className="text-center mt-8 font-terminal text-sm text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          // coordinates locked • extraction point confirmed
        </motion.p>
      </div>
    </section>
  );
}
