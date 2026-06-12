# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
npm run test         # Run Jest tests
npm run test:watch   # Jest in watch mode
npm run type-check   # TypeScript type checking
npm run build:check  # Type check + build (use before deploy)
```

## Architecture

**Stack**: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Three.js

**Key Directories**:
- `src/app/` - Pages using App Router (home, /about, /projects, /contact)
- `src/components/` - React components
- `src/data/` - Static data files (projects.ts)
- `src/lib/` - Utilities including `cn()` helper and animation configs
- `src/hooks/` - Custom hooks (scroll trigger, reduced motion)

**Component Patterns**:
- Use `"use client"` directive for interactive components
- Wrap Three.js/heavy components with `dynamic()` import and `{ ssr: false }` for SSR safety
- Animation constants are centralized in `src/lib/animation-configs/`

**Styling**:
- Theme variables (Matrix green theme) defined in `src/app/globals.css`
- Uses `cn()` from `src/lib/utils.ts` for conditional classNames (clsx + tailwind-merge)
- Path alias: `@/*` maps to `./src/*`

**Assets**:
- Project card images live in `public/projects/` — JPEG screenshots for live
  sites, generated terminal-style SVG covers for repo-only/NDA projects

**Accessibility**:
- Use `useReducedMotion()` hook to respect `prefers-reduced-motion`

## Pre-commit

Husky runs lint-staged on commit, which applies ESLint --fix to TypeScript files.
