// src/lib/colors.ts
export const CATEGORY = {
  infrastructure: {
    ring: "ring-emerald-200",
    grad: "from-emerald-50 to-teal-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    // Used for filled/tinted cards that lighten on hover
    bg: "bg-gradient-to-br from-emerald-100 to-teal-100 group-hover:from-emerald-50 group-hover:to-teal-50",
  },
  automation: {
    ring: "ring-amber-200",
    grad: "from-amber-50 to-yellow-50",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    bg: "bg-gradient-to-br from-amber-100 to-yellow-100 group-hover:from-amber-50 group-hover:to-yellow-50",
  },
  security: {
    ring: "ring-rose-200",
    grad: "from-rose-50 to-orange-50",
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    bg: "bg-gradient-to-br from-rose-100 to-orange-100 group-hover:from-rose-50 group-hover:to-orange-50",
  },
  "ci-cd": {
    ring: "ring-sky-200",
    grad: "from-sky-50 to-cyan-50",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    bg: "bg-gradient-to-br from-sky-100 to-cyan-100 group-hover:from-sky-50 group-hover:to-cyan-50",
  },
  monitoring: {
    ring: "ring-violet-200",
    grad: "from-violet-50 to-fuchsia-50",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    bg: "bg-gradient-to-br from-violet-100 to-fuchsia-100 group-hover:from-violet-50 group-hover:to-fuchsia-50",
  },
  cloud: {
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-blue-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    bg: "bg-gradient-to-br from-cyan-100 to-blue-100 group-hover:from-cyan-50 group-hover:to-blue-50",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY;
export function cat(c: CategoryKey) { return CATEGORY[c]; }
