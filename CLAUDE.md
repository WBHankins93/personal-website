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
- `src/components/` - React components, including `ui/` for shadcn-style base components
- `src/data/` - Static data files (projects.ts, experiences.ts)
- `src/lib/` - Utilities including `cn()` helper, color system, animation configs
- `src/hooks/` - Custom hooks (scroll triggers, parallax, reduced motion)

**Component Patterns**:
- Use `"use client"` directive for interactive components
- Wrap Three.js/heavy components with `dynamic()` import and `{ ssr: false }` for SSR safety
- Animation constants are centralized in `src/lib/animation-configs/`
- Category colors for projects/tech are defined in `src/lib/colors.ts`

**Styling**:
- Theme variables (Matrix green theme) defined in `src/app/globals.css`
- Uses `cn()` from `src/lib/utils.ts` for conditional classNames (clsx + tailwind-merge)
- Path alias: `@/*` maps to `./src/*`

**Accessibility**:
- Use `useReducedMotion()` hook to respect `prefers-reduced-motion`
- Components use Radix UI primitives for accessible foundations

## Pre-commit

Husky runs lint-staged on commit, which applies ESLint --fix to TypeScript files.
