# Trajectory — design document

Portfolio for Kevin J. Gómez Guzmán. Concept: **the site is an autonomous mission**.
Kevin builds machines that navigate themselves — motion profiling, PID control,
LiDAR + computer vision, agentic AI. The site borrows its entire visual and motion
language from that work. Scroll drives a motion-profiled journey through waypoints;
every animation is an engineering reference, not decoration.

Content source of truth: `KevinGomez_Resume 2-19-26 Oficial.pdf` (copied to
`public/resume.pdf`). **Never invent experience, projects, or numbers.**

## Site architecture

| Route | Purpose |
|---|---|
| `/` | The mission — single narrative page through five waypoints |
| `/resume` | Embedded PDF viewer + download, mobile fallback |
| 404 | "Off course" — themed, links back to the path |

Waypoints on `/`:

1. **Hero** — name, thesis ("I build things that drive themselves"), particle
   point-cloud (the machine's perception of Kevin), telemetry stats.
2. **wp.01 About** — short narrative + education/credentials.
3. **wp.02 Missions** — experience timeline, each role a mission log entry.
4. **wp.03 Projects** — bento grid of built things.
5. **wp.04 Systems** — skills grouped as subsystems (no dishonest skill bars).
6. **wp.05 Contact** — "open a channel": mailto composer, direct links.

Awards render as "mission outcomes" between Missions and Projects.

## Component hierarchy

```
app/
  layout.tsx          fonts, metadata, Providers, Cursor, Nav, Footer
  page.tsx            section composition
  resume/page.tsx     PDF viewer
  not-found.tsx       404
  opengraph-image.tsx OG card
components/
  providers.tsx       next-themes + Lenis smooth scroll
  nav.tsx             fixed top bar, waypoint links, resume CTA
  theme-toggle.tsx
  cursor.tsx          PID-tuned follower (fine pointers only)
  spine.tsx           left waypoint rail, scroll progress + marker
  section.tsx         waypoint section wrapper + header
  reveal.tsx          shared scroll-reveal primitives
  counter.tsx         odometer number on in-view
  hero.tsx
  particle-field.tsx  canvas point cloud (portrait.png or KG monogram)
  about.tsx  experience.tsx  awards.tsx  projects.tsx  skills.tsx
  contact.tsx  footer.tsx
lib/
  data.ts             ALL content, typed — edit here to add a project/role
```

## Design system

Tokens are CSS custom properties in `app/globals.css`, mapped to Tailwind v4
utility names via `@theme inline`. Dark is default; light mode via
`data-theme="light"` (next-themes).

| Token | Dark | Light | Role |
|---|---|---|---|
| `--bg` | `#0A0C10` | `#F6F5F1` | canvas |
| `--surface` | `#12151C` | `#FFFFFF` | cards |
| `--line` | `white/8%` | `ink/10%` | hairlines |
| `--fg` | `#E9EEF4` | `#10141B` | primary text |
| `--fg2` / `--fg3` | grays | grays | secondary / telemetry |
| `--accent` | `#22D3EE` cyan | `#0E7490` teal | the path, interaction |
| `--gold` | `#FFB454` | `#B45309` | achievements only |

Rules: one accent per view; amber only for awards/championship facts; hairline
borders (1px, low-alpha); section rhythm `py-28+`; content max-width 72rem.

Typography — three voices:
- **Space Grotesk** (`font-display`) — headlines, the engineer's voice
- **Inter** (`font-sans`) — body, the human voice
- **JetBrains Mono** (`font-mono`) — telemetry, coordinates, meta (the machine)

Mono text is always small (11–13px), uppercase, tracked wide, `--fg3` or accent.

## Animation plan

Every motion cites a real technique from Kevin's work:

| Effect | Reference | Implementation |
|---|---|---|
| Scroll easing | motion profiling | Lenis smooth scroll (`lerp 0.1`) |
| Cursor follower | PID controller | underdamped spring (ζ≈0.75) in rAF — slight overshoot is intentional |
| Spine progress + marker | odometry | Motion `useScroll` → scaleY + marker translate |
| Section reveals | waypoint arrival | `whileInView`, y+opacity, trapezoid-ish ease `[0.16,1,0.3,1]`, stagger 60–90ms |
| Hero point cloud | LiDAR / perception | canvas 2D; particles jitter (noise) and *resolve* — lock to target, brighten — near the focus point; idle focus autonomously scans (Lissajous), pointer takes over |
| Stat counters | telemetry | animate 0→value on first in-view |
| Award numbers | podium | amber accent + counter |

Constraints: transform/opacity only; no layout thrash; canvas capped ~3.5k
particles; `prefers-reduced-motion` disables Lenis, cursor, particle loop
(static render), and converts reveals to fades. Touch devices never get the
custom cursor.

## Performance & a11y budget

- Zero WebGL, zero heavy libs — canvas 2D + SVG + Motion only.
- Fonts via `next/font` (self-hosted, swap).
- Semantic landmarks, skip link, focus-visible rings, AA contrast in both themes.
- Target: Lighthouse ≥95 across the board.

## Adding content later

- New job/project/award → add one object in `lib/data.ts`.
- Real portrait for the hero: drop `public/portrait.png` (transparent bg,
  square, ~600px). Particle field samples it automatically; falls back to the
  KG monogram when absent.
