// src/data/whatibuild.ts
// "What I Build" — four categories that teach the visitor how to read the
// rest of the page. Copy is final as written; do not paraphrase.

import { Package, Layers, Bot, Handshake, type LucideIcon } from "lucide-react";

export interface BuildCategory {
  name: string;
  description: string;
  icon: LucideIcon;
}

export const buildCategories: BuildCategory[] = [
  {
    name: "Products",
    description: "Software built to solve specific user or customer problems.",
    icon: Package,
  },
  {
    name: "Internal Platforms",
    description:
      "Systems that power operations, automation, and business workflows.",
    icon: Layers,
  },
  {
    name: "AI Workflows",
    description:
      "Practical AI systems that reduce manual work and improve decision-making.",
    icon: Bot,
  },
  {
    name: "Customer Solutions",
    description:
      "Custom software and architecture delivered through consulting engagements.",
    icon: Handshake,
  },
];
