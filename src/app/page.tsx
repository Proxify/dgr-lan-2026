import { Navigation } from '@/components/layout/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { EventDetailsSection } from '@/components/sections/EventDetailsSection';
import { ScheduleSection } from '@/components/sections/ScheduleSection';
import { SquadSection } from '@/components/sections/SquadSection';
import { LocationSection } from '@/components/sections/LocationSection';
import { AttendeeInfoSection } from '@/components/sections/AttendeeInfoSection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { RetroFooter } from '@/components/layout/RetroFooter';
import { PixelDivider } from '@/components/ui/PixelDivider';
import { FloatingDecorations } from '@/components/ui/FloatingDecorations';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Floating Decorative Elements (visible on desktop) */}
      <FloatingDecorations />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section with GSAP Scroll Zoom */}
      <HeroSection />

      {/* Countdown Timer */}
      <CountdownSection />

      <PixelDivider />

      {/* Event Details */}
      <EventDetailsSection />

      <PixelDivider color="pink" />

      {/* Schedule */}
      <ScheduleSection />

      <PixelDivider />

      {/* Squad Members */}
      <SquadSection />

      <PixelDivider />

      {/* Location */}
      <LocationSection />

      <PixelDivider color="pink" />

      {/* Attendee-only Info (gated behind Discord auth — renders null for guests) */}
      <AttendeeInfoSection />

      {/* RSVP Form */}
      <RSVPSection />

      {/* Footer */}
      <RetroFooter />
    </main>
  );
}
