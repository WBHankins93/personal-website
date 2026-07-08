// src/data/whatibuild.ts
// "What I Build": four categories that teach the visitor how to read the
// rest of the page. Copy is final as written; do not paraphrase.

import { Package, Layers, Bot, Handshake, type LucideIcon } from "lucide-react";

export interface BuildCategory {
  name: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind text-color utility for this category's icon + accent. */
  text: string;
  /** Tailwind bg-color utility for this category's icon badge. */
  bg: string;
}

export const buildCategories: BuildCategory[] = [
  {
    name: "Products",
    description: "Software built to solve specific user or customer problems.",
    icon: Package,
    text: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent-soft)]",
  },
  {
    name: "Internal Platforms",
    description:
      "Systems that power operations, automation, and business workflows.",
    icon: Layers,
    text: "text-[var(--color-mark-denim)]",
    bg: "bg-[var(--color-mark-denim-soft)]",
  },
  {
    name: "AI Workflows",
    description:
      "Practical AI systems that reduce manual work and improve decision-making.",
    icon: Bot,
    text: "text-[var(--color-mark-plum)]",
    bg: "bg-[var(--color-mark-plum-soft)]",
  },
  {
    name: "Customer Solutions",
    description:
      "Custom software and architecture delivered through consulting engagements.",
    icon: Handshake,
    text: "text-[var(--color-clay)]",
    bg: "bg-[var(--color-clay-soft)]",
  },
];
