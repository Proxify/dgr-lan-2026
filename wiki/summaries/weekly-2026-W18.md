---
period: weekly
start: 2026-04-27T00:00:00.000Z
end: 2026-05-04T00:00:00.000Z
project: dgr-lan-2026
entries: 3
critical: 0
generated: 2026-05-04T04:00:10.621Z
---

# LAN 2026 squad expanded to 18 members with self-serve Discord RSVP and complete class color coverage.

This week's activity centered on the LAN 2026 squad management system. Two new attendees, Joe Baker (member #17, Ranger) and Aaron Davis (member #18, Mage), were added to the static `SQUAD_MEMBERS` array in `src/lib/squad.ts` and deployed to production via Vercel, bringing total roster size to 18.

A key architectural insight was confirmed: squad RSVP is fully self-serve via Discord OAuth. New members only need to be added to the `SQUAD_MEMBERS` array — no manual Supabase rows are required, since RSVP status is recorded automatically on Discord login. This streamlines onboarding for future additions.

A visual bug was also resolved: the `classColors` and `classPixelColors` maps in `SquadMemberCard.tsx` were missing Ranger and Mage entries, causing both to fall back to default blue. Ranger now renders in teal with the Wind icon, restoring correct class theming across the squad cards.

## Themes

- LAN 2026 squad management
- Discord OAuth onboarding
- UI class theming
- production deployments

## Goals

- [ ] Onboard full LAN 2026 attendee roster via self-serve Discord RSVP _(on track)_
- [x] Complete class color coverage for all squad member classes _(completed)_

## Stats

| Metric | Value | Trend | Confidence |
|--------|-------|-------|------------|
| LAN 2026 squad members | 18 members | ↑ | — |
| New attendees added this week | 2 members | ↑ | — |
