# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
```

## Architecture

This is a Next.js 16 App Router application for a LAN party event website with a synthwave/retrowave aesthetic theme.

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Auth/DB**: Supabase (Discord OAuth + PostgreSQL)
- **State**: Zustand with persist middleware
- **Animations**: GSAP with ScrollTrigger, Framer Motion
- **Styling**: Tailwind CSS 4 with custom retro theme

### Key Directories

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/rsvp/          # RSVP submission API (POST/GET)
│   ├── api/discord/       # Discord membership verification
│   └── auth/callback/     # Supabase OAuth callback
├── components/
│   ├── sections/          # Page sections (Hero, Countdown, Squad, etc.)
│   ├── layout/            # Navigation, Footer
│   └── ui/                # Reusable UI components (PixelButton, RetroCard, GlitchText)
├── hooks/
│   ├── useAuth.ts         # Discord auth & membership check
│   ├── useGSAP.ts         # GSAP/ScrollTrigger wrapper
│   └── useCountdown.ts    # Event countdown timer
├── lib/
│   ├── supabase/          # Client, server, middleware Supabase setup
│   ├── store.ts           # Zustand RSVP form state
│   └── constants.ts       # Event details, dates, equipment options
└── types/                 # TypeScript interfaces
```

### Auth Flow
1. User clicks "Login with Discord" → Supabase OAuth with `identify guilds` scopes
2. Callback redirects to `/auth/callback` which exchanges code for session
3. `useAuth` hook checks membership in DGR Discord server via `/api/discord/check-membership`
4. RSVP submissions require authenticated user who is a server member

### Database
Single table `rsvp_responses` in Supabase with Row Level Security. Schema in `supabase-schema.sql`.

### Styling Conventions
- Uses custom CSS properties defined in `globals.css` (neon colors, retro fonts)
- Two fonts: `Press Start 2P` (headings), `VT323` (body)
- Custom Tailwind theme colors: `neon-blue`, `neon-pink`, `neon-green`, `retro-black`, `retro-dark`
- CSS utility classes: `.glow-blue`, `.glow-pink`, `.pixel-border`, `.retro-card`, `.glitch`
- CRT scanline overlay applied globally via `.crt-overlay`

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
DISCORD_GUILD_ID
```
