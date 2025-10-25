// src/lib/colors.ts
export const CATEGORY = {
  infrastructure: {
    // Cloud & Multi-Cloud = Cyan (bright, cloud association)
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-blue-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    iconBg: "bg-cyan-500",
    iconColor: "text-white",
    // Light card with subtle cyan tint
    bg: "bg-gradient-to-br from-slate-50 to-cyan-50/30 hover:from-cyan-50/50 hover:to-cyan-50/50",
  },
  automation: {
    // DevOps & Automation = Orange/Amber (energy, transformation)
    ring: "ring-orange-200",
    grad: "from-orange-50 to-amber-50",
    pill: "bg-orange-50 text-orange-700 border-orange-200",
    dot: "bg-orange-500",
    iconBg: "bg-orange-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-orange-50/30 hover:from-orange-50/50 hover:to-orange-50/50",
  },
  security: {
    // Security & Compliance = Red (critical, protection)
    ring: "ring-red-200",
    grad: "from-red-50 to-rose-50",
    pill: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    iconBg: "bg-red-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-red-50/30 hover:from-red-50/50 hover:to-red-50/50",
  },
  "ci-cd": {
    // Customer Engagement = Blue (trust, communication)
    ring: "ring-blue-200",
    grad: "from-blue-50 to-sky-50",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    iconBg: "bg-blue-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-blue-50/30 hover:from-blue-50/50 hover:to-blue-50/50",
  },
  monitoring: {
    // Observability & SRE = Emerald (health, green light, monitoring)
    ring: "ring-emerald-200",
    grad: "from-emerald-50 to-teal-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-emerald-50/30 hover:from-emerald-50/50 hover:to-emerald-50/50",
  },
  containers: {
    // Container Platforms = Purple (orchestration, Kubernetes purple)
    ring: "ring-purple-200",
    grad: "from-purple-50 to-violet-50",
    pill: "bg-purple-50 text-purple-700 border-purple-200",
    dot: "bg-purple-500",
    iconBg: "bg-purple-500",
    iconColor: "text-white",
    bg: "bg-gradient-to-br from-slate-50 to-purple-50/30 hover:from-purple-50/50 hover:to-purple-50/50",
  },
} as const;

export type CategoryKey = keyof typeof CATEGORY;
export function cat(c: CategoryKey) { return CATEGORY[c]; }