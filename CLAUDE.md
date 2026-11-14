# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint (next lint)
npm run test         # Run Jest tests
npm run test:watch   # Jest in watch mode
npm run type-check   # TypeScript type checking
npm run build:check  # Type check + build (use before deploy)
```

## The bayou redesign

The site is mid-redesign on the `redesign/bayou` branch. The spec is `docs/redesign-bayou/HANDOFF.md`; read it before changing anything visual. `docs/redesign-bayou/reference/index.html` is the approved mockup source (shapes, colors, proportions, not production code).

- Milestones 1 to 7 are built: foundation, illustration kit, Tier 1 SVG hero, Selected Work, Trail, Off the Clock, ticker, Tier 2 Three.js hero, hardening.
- Still open: milestone 8, which Ben has reserved for the final UI and animation polish (Tier 2 motion and its performance on real hardware), then the pull request.
- Known gaps going into milestone 8: the Tier 2 chunks are about 242KB gzipped against a budget of about 200KB; frame rate has only been measured on software GL; Safari, Firefox and real phones are untested; Lighthouse has not been run.
- Branch rules: commit only to `redesign/bayou`. Never commit to, push to, or merge into `main`. Ben merges the pull request himself.
- If something in the handoff looks wrong, ask Ben. No silent changes beyond the spec.

## Architecture

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion. Deployed on Vercel; `https://benhankins.dev` redirects to `https://www.benhankins.dev`.

**Routes** (`src/app/`):
- `/` — one page, in fixed order: Hero, Ticker, Selected Work (`#work`), The Trail (`#trail`), Off the Clock (`#off-the-clock`), Contact sign (`#contact`)
- `/kit` — illustration kit reference. Works in local dev and on Vercel previews, 404s in production (`VERCEL_ENV === "production"`)
- `/projects`, `/projects/*`, `/about`, `/contact` — permanent redirects in `next.config.ts` to the matching section; keep them for inbound links
- `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx` — metadata routes. The OG card renders `<BayouScene mode="paint" />` to an SVG string and uses it as the background, so it follows the hero automatically. It loads WOFF fonts from `src/app/_og/` because the renderer cannot use next/font

**Key directories**:
- `src/content/` — all copy and facts as typed data: `site.ts`, `projects.ts`, `trail.ts`, `postcards.ts`; `content.test.ts` guards them
- `src/components/kit/` — illustration kit: `geometry.ts` (pure seeded path builders) and `index.tsx` (`<Cypress/>`, `<Fir/>`, `<FirRow/>`, `<Ridge/>`, `<Moss/>`, `<Halftone/>`, `<ReflectionBars/>`)
- `src/components/hero/` — `BayouScene.tsx` (server component, the scene in paint or schematic mode), `Hero.tsx` (client, the reveal) and `tier2/` (`BayouCanvas.tsx`, the Three.js layers; `layers.ts`, the layer list and texture builder)
- `src/components/work/`, `trail/`, `offclock/`, `site/` — the page sections
- `src/styles/` — `hero.css`, `work.css`, `trail.css`, imported by `src/app/globals.css`
- `src/lib/` — `rand.ts` (seeded random), `structured-data.ts` (JSON-LD)

**Component patterns**:
- Use `"use client"` only for interactive components. Illustration stays in server components and is passed into client components as props (see how `page.tsx` hands both scenes to `Hero`)
- Change content in `src/content/`, not in components
- Path alias: `@/*` maps to `./src/*`
- Styling is semantic class names in the CSS files above, with tokens from `@theme` in `globals.css`. Tailwind utilities for the tokens exist (`bg-cream`, `text-ink`, `font-display`) but are not the main styling path

## Illustration rules

- Never call `Math.random()` in illustration code. Use `rnd(seed)` from `src/lib/rand.ts` so shapes match between server and client
- When several shapes share one rng, build their geometry up front and in order (`buildCypress(...)`), then pass it to the component. Do not let the sequence depend on React render order
- Every illustration draws in two modes from the same shapes. Paint is the default; the `.bayou-schematic` class turns any group into 1.2px mint outlines. Mark fills that should vanish in schematic mode with `paint-only`, and shapes that keep their own fill and stroke with `keep`
- `BayouScene` groups its shapes back to front with `data-layer` (sky, sun, ridges, far-trees, water, mid-trees, egret, foreground). Tier 2 and any later illustrator pass replace art per layer, so keep that structure

## Hero reveal

- One value drives the hero: the reveal position from 0 (schematic) to 1 (painted). `Hero.tsx` writes it to the `--x` and `--k` custom properties and keeps it in a ref; the auto-sweep, drag handle, keyboard and switch all call `setReveal()`. Tier 2 reads the same ref into its `uReveal` uniform every frame
- The nav and text block render three times: a mint copy in the schematic layer, a cream copy in the clipped painted layer, and a transparent live copy on top holding the real `h1` and links. The visual copies are `inert` and `aria-hidden`. Change markup in `Chrome`, once
- CSS sets the pre-JavaScript state: schematic on desktop, painted below 1024px and under reduced motion. Keep `hero.css` and the `useEffect` in `Hero.tsx` in agreement
- The hero never reacts to scroll

## Hero Tier 2 (Three.js)

- Tier 1 (SVG) always renders first and is the LCP. Tier 2 is a separate chunk loaded with `next/dynamic` after the page's `load` event, only at 1024px and wider, with WebGL, with reduced motion off. Do not import `three` or `@react-three/fiber` anywhere outside `src/components/hero/tier2/`
- There is one source of art. `layers.ts` serializes each `data-layer` group of the server-rendered SVG and rasterizes it to a canvas texture in the browser. To change the art, change `BayouScene`; to change the layering or depth, change `LAYERS`
- The fragment shader in `BayouCanvas.tsx` must use the same diagonal as the `clip-path` in `hero.css` (11% lean at mid-sweep, zero at both ends). If one changes, change the other
- The canvas sits under both hero layers. `data-tier="2"` on the hero hides the SVG scenes and clips the schematic layer to its own side of the line; the DOM text, build log, handle and switch stay as they are
- Fallback to Tier 1: WebGL context failure or loss, or an average under 40fps across two seconds. The choice is kept in `sessionStorage`. `?tier=1` and `?tier=2` force a tier; `?tier=2` also turns the frame-rate fallback off, which is needed on headless or software-GL machines
- The render loop is demand-driven: full rate while the pointer or reveal is moving, half rate for idle motion, nothing while the hero is off screen or the tab is hidden. Keep it that way

## Content and positioning

- Role line: "Full Stack Engineer · South Louisiana". It comes from `src/content/site.ts` and feeds the hero, `layout.tsx` metadata, the OG card, the contact sign and JSON-LD
- Do not mention Ben's new employer anywhere. The trail ends at "Next summit"
- Facts only. Employment facts and figures must match the résumé in `public/Ben_Hankins_FDE_Resume.pdf` and handoff section 8. Do not invent or round claims, add client names, or draw an architecture diagram Ben has not supplied
- Placeholders waiting on Ben are marked `TODO(ben)` in `src/content/`. The list is handoff section 12

## Styling

- Tokens are fixed (handoff section 6) and live in `@theme` in `src/app/globals.css`; do not drift the hexes. `docs/DESIGN.md` is the reference
- Fonts are self-hosted from `src/app/fonts/` through `next/font/local`: Anton (display), JetBrains Mono 500 (labels and UI), Space Grotesk (body), DM Serif Display (hero tagline only). The font variables sit on `<html>` because the theme tokens resolve at `:root`
- Print treatment: hard offset shadows with no blur, an off-register second ink on section headings, paper grain (`.grain`) on painted surfaces only. No rounded cards, no glassmorphism, no blurred shadows, and no gradients on painted surfaces except the phone hero scrim
- The desktop layout starts at 1024px (`64rem`). Below that is the phone layout. One exception: the trail map starts at 1200px (`75rem`), because its SVG labels get too small below that

## Motion and accessibility

- `prefers-reduced-motion` disables the hero sweep, the ticker, the trail draw-in and the poster flip (cross-fade instead). Check both CSS and JS paths when adding motion
- Content renders visible by default. The one scroll-triggered effect, the trail draw-in, is armed by JavaScript only when the map is still below the fold and motion is allowed, so nothing can be left invisible. Follow that pattern for any new one
- Mount reveals must not branch their `initial`/`animate` props on `useReducedMotion`: the hook only knows the preference after mount. Keep one animation path and add the `motion-reveal` class, which pins the final state under reduced motion
- The reveal handle is a real slider, posters and trail markers are buttons, and decorative SVG is `aria-hidden`. The page has exactly one `h1`

## Pre-commit

Husky runs lint-staged on commit, which applies ESLint --fix to TypeScript files.
