// src/lib/colors.ts
// Unified category color definitions for consistent styling across the application
export const CATEGORY = {
  infrastructure: {
    // Infrastructure = Emerald (distinct from other categories)
    ring: "ring-emerald-200",
    grad: "from-emerald-50 to-teal-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    accent: "text-emerald-600",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-emerald-50/30 hover:from-emerald-50/50 hover:to-emerald-50/50",
  },
  automation: {
    // Automation = Amber (energy, transformation)
    ring: "ring-amber-200",
    grad: "from-amber-50 to-yellow-50",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    accent: "text-amber-600",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-amber-50/30 hover:from-amber-50/50 hover:to-amber-50/50",
  },
  monitoring: {
    // Monitoring = Cyan (observability, clear visibility)
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-sky-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    accent: "text-cyan-600",
    iconBg: "bg-cyan-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-cyan-50/30 hover:from-cyan-50/50 hover:to-cyan-50/50",
  },
  "ci-cd": {
    // CI/CD = Blue (trust, communication, flow)
    ring: "ring-blue-200",
    grad: "from-blue-50 to-indigo-50",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    accent: "text-blue-600",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-blue-50/30 hover:from-blue-50/50 hover:to-blue-50/50",
  },
  security: {
    // Security = Orange (alert, protection)
    ring: "ring-orange-200",
    grad: "from-orange-50 to-red-50",
    pill: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    accent: "text-orange-600",
    iconBg: "bg-orange-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-orange-50/30 hover:from-orange-50/50 hover:to-orange-50/50",
  },
  "web-dev": {
    // Web Development = Fuchsia (creative, modern)
    ring: "ring-fuchsia-200",
    grad: "from-fuchsia-50 to-pink-50",
    pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    dot: "bg-fuchsia-500",
    accent: "text-fuchsia-600",
    iconBg: "bg-fuchsia-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-fuchsia-50/30 hover:from-fuchsia-50/50 hover:to-fuchsia-50/50",
  },
  education: {
    // Education = Indigo (knowledge, learning)
    ring: "ring-indigo-200",
    grad: "from-indigo-50 to-purple-50",
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
    accent: "text-indigo-600",
    iconBg: "bg-indigo-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-indigo-50/30 hover:from-indigo-50/50 hover:to-indigo-50/50",
  },
  containers: {
    // Containers = Purple (orchestration, Kubernetes)
    ring: "ring-purple-200",
    grad: "from-purple-50 to-violet-50",
    pill: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    accent: "text-purple-600",
    iconBg: "bg-purple-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-purple-50/30 hover:from-purple-50/50 hover:to-purple-50/50",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY;
export function cat(c: CategoryKey) { return CATEGORY[c]; }