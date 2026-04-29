# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
```

No test suite exists. Lint is the only automated check.

## What This Is

A single-page Next.js 16 (App Router) website for **The Woodlands LAN 2026** — a private LAN party event May 21–24, 2026 hosted by the DGR Gaming Discord community. The site has: a hero with countdown, squad roster, event details, location info, and an RSVP form gated behind Discord auth.

## Architecture

### Auth & RSVP Gate

The RSVP form requires Discord OAuth via Supabase. The flow:
1. `useAuth` hook (client-side) manages session state and calls `/api/discord/check-membership`
2. The membership check hits the Discord API (`/users/@me/guilds`) using the OAuth `provider_token` to verify the user is in the DGR guild (`DISCORD_GUILD_ID`, default `243941270467248129`)
3. The check has several fallback trust paths: if the user already has an existing RSVP, if `SKIP_GUILD_CHECK=true`, or if the Discord API returns 401/429/5xx and the user authenticated via Discord
4. RSVP POST also re-verifies guild membership server-side before writing to Supabase
5. RSVPs upsert on `discord_user_id` conflict — one RSVP per Discord account
6. `/auth/callback` exchanges the OAuth code and redirects to `/`

The Supabase middleware (`middleware.ts`) refreshes sessions on every non-static request.

### State Management

`useRSVPStore` (Zustand with `persist`) stores the RSVP form in localStorage under key `woodlands-lan-rsvp`. It persists `currentResponse` and `isSubmitted` across page loads. On mount, `RSVPSection` calls `loadExistingRSVP()` to sync with the database and correct stale localStorage state.

### Page Structure

`src/app/page.tsx` composes the single page in order: `Navigation → HeroSection → CountdownSection → EventDetailsSection → SquadSection → LocationSection → RSVPSection → RetroFooter`, separated by `PixelDivider` components.

### Animations

- **GSAP + ScrollTrigger** (`useGSAP` hook): `HeroSection` uses a pinned scroll-scrub zoom/fade. Import GSAP via `@/hooks/useGSAP` (not directly from `gsap`) to ensure ScrollTrigger is registered.
- **Framer Motion**: entrance animations on hero elements, squad cards, and interactive states. Used for anything React-lifecycle-driven.

### Data Sources

All static data lives in `src/lib/`:
- `constants.ts` — event dates, location details, equipment options, arrival time choices
- `squad.ts` — `SQUAD_MEMBERS` array (16 members with name, playerClass, avatar path)

Squad avatars are SVGs at `public/avatars/player-{1-16}.svg`. Generated images are at `public/images/generated/`.

### API Routes

| Route | Auth Required | Purpose |
|-------|--------------|---------|
| `POST /api/rsvp` | Yes + DGR member | Submit/update RSVP |
| `GET /api/rsvp` | Yes | Fetch current user's RSVP |
| `GET /api/rsvp/list` | No | All RSVPs (for squad display) |
| `GET /api/discord/check-membership` | Yes | Check DGR guild membership |
| `GET /auth/callback` | — | Supabase OAuth code exchange |

### Styling

Tailwind CSS v4 with theme defined inline in `globals.css` via `@theme`. Custom font classes: `font-pixel` (`Press Start 2P`) and `font-terminal` (`VT323`). Neon glow utilities (`.glow-blue`, `.glow-pink`, `.glow-green`) and `.pixel-border` are defined as CSS utility classes in `globals.css`. The CRT scanline overlay is a global pseudo-element on `body::after`.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL       # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon key
DISCORD_GUILD_ID               # DGR guild ID (default: 243941270467248129)
SKIP_GUILD_CHECK               # Set to "true" to bypass Discord membership check in dev
```
