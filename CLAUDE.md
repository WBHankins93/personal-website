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

## Architecture

**Stack**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide icons. Deployed on Vercel; `https://benhankins.dev` redirects to `https://www.benhankins.dev`.

**Routes** (`src/app/`):
- `/` — single editorial page: Hero, ProjectBento (`#work`), Experience, Contact
- `/projects` and `/projects/[slug]` — project index and case studies (static params from `src/data/projects.ts`)
- `/about` and `/contact` — permanent redirects to `/#experience` and `/#contact`; keep them for inbound links
- `opengraph-image.tsx`, `sitemap.ts`, `robots.ts` — generated metadata routes

**Key Directories**:
- `src/components/redesign/` — homepage sections plus Nav, Footer, ScrollRail
- `src/components/projects/` — ProjectBento cards, ProjectCaseStudy, ProjectMicroWorlds illustrations
- `src/data/` — `projects.ts` (flagship projects, supporting work, Sproutflow) and `experiences.ts`; `projects.test.ts` guards the registry
- `src/lib/` — `animation-configs/` (easing and motion variants), `sections.ts` (section ids/numbers for the nav and scroll rail), `structured-data.ts` (JSON-LD), `marks.tsx`, `project-signals.ts`
- `src/hooks/` — `useReducedMotion`, `useScrollTrigger`, `useActiveSection`
- `docs/` — `DESIGN.md` (design system and migration notes), `screenshots/`, verification notes

**Component Patterns**:
- Use `"use client"` for interactive components
- Animation constants live in `src/lib/animation-configs/`
- Project and experience copy lives in `src/data/`; change content there, not in components
- Path alias: `@/*` maps to `./src/*`

## Content and positioning

- Identity line: "Customer-facing engineer by career. Product builder by practice." It appears in the Hero tagline, `layout.tsx` metadata, `opengraph-image.tsx`, and `structured-data.ts` — keep all four in sync.
- Role targets: Solutions Engineer, Forward Deployed Engineer, Implementation Engineer, and selective Full Stack Engineer. Don't add more titles.
- Employment facts and metrics must match the resume in `public/Ben_Hankins_SE_Resume.pdf`. Don't invent or round claims.

## Styling

- Field-journal palette (paper, ink, forest, rust/clay, teal) defined as tokens in `src/app/globals.css`; `docs/DESIGN.md` records the verified contrast values — don't drift the hexes
- Fonts from `layout.tsx`: Work Sans (`font-body`, the workhorse), Old Standard TT (`font-heading`, reserved for the hero name and stat numbers), Space Mono (`font-mono`, eyebrows and labels)
- The `--color-matrix*`, `--color-mbg-*`, and `--color-mtext-*` tokens in `globals.css` are legacy from the old theme and unused
- `receipt.html` at the repo root is orphaned and not served

## Motion and accessibility

- Respect `prefers-reduced-motion` via `useReducedMotion()`
- Content below the fold renders visible by default — no `whileInView` reveals (DESIGN.md Migration Note #1)
- Mount reveals must not branch their `initial`/`animate` props on `useReducedMotion`: the hook only knows the preference after mount, so the server always renders `opacity: 0` and the branch can strand elements invisible. Keep one animation path and add the `motion-reveal` class; `globals.css` pins it to its final state under reduced motion

## Pre-commit

Husky runs lint-staged on commit, which applies ESLint --fix to TypeScript files.
