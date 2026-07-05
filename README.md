# kevin gómez — portfolio

Personal portfolio built on the **Trajectory** concept: the site is an
autonomous mission, and scroll drives a motion-profiled path through waypoints.
See [DESIGN.md](DESIGN.md) for the full design system and animation plan.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · next-themes

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts) — experience, projects, skills,
awards, contact links. Adding a role or project is a one-object edit; no
component changes needed.

The resume PDF is served from `public/resume.pdf`. Replace that file when the
resume updates.

Optional: add `public/portrait.png` (square, transparent background) and the
hero point cloud will render it instead of the KG monogram.
