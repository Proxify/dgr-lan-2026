---
period: monthly
start: 2026-04-01T00:00:00.000Z
end: 2026-05-01T00:00:00.000Z
project: dgr-lan-2026
entries: 3
critical: 0
generated: 2026-05-01T05:00:14.575Z
---

# LAN 2026 squad expanded to 18 members with self-serve Discord RSVP and class color fixes shipped.

April 2026 focused on scaling the LAN 2026 squad infrastructure with minimal operational overhead. The team confirmed that squad RSVP is fully self-serve via Discord OAuth — new members only need to be added to the static `SQUAD_MEMBERS` array in `src/lib/squad.ts`, with no manual Supabase rows required. RSVP status is captured automatically when members log in and submit via Discord, removing a manual onboarding step.

Two new attendees were onboarded under this flow: Joe Baker (member #17, Ranger) and Aaron Davis (member #18, Mage), both added to the static array and pushed to production via Vercel. Alongside the additions, a small UI bug was fixed in `SquadMemberCard.tsx` — the `classColors` and `classPixelColors` maps were missing entries for Ranger and Mage, causing both classes to fall back to the default blue. Ranger now renders in teal (Wind icon) and Mage in its proper color, restoring class differentiation on squad cards.

No blockers or risks were flagged this period. The combination of self-serve RSVP and the class-color fix means future squad additions should be trivially handled by editing one array, with correct visual rendering out of the box.

## Themes

- squad onboarding
- discord oauth rsvp
- ui polish
- lan 2026 prep

## Goals

- [ ] Onboard LAN 2026 squad members via self-serve Discord RSVP flow _(on track)_
- [x] Ensure all class types render with correct colors on squad cards _(completed)_

## Stats

| Metric | Value | Trend | Confidence |
|--------|-------|-------|------------|
| Total LAN 2026 squad members | 18 members | ↑ | — |
| New squad members added this period | 2 members | ↑ | — |
