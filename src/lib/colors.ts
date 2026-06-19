// src/lib/colors.ts
// Product status badge palette for the editorial redesign.
// Each product state maps to a color-coded pill using the editorial tokens
// defined in globals.css.
//   Live Beta            → accent teal
//   In Development       → amber
//   Production · Private → green
//   Functional Prototype → gray
import type { ProductStatus } from "@/data/products";

export const STATUS_STYLE: Record<
  ProductStatus,
  { text: string; bg: string; dot: string }
> = {
  "Live Beta": {
    text: "text-[var(--color-status-beta)]",
    bg: "bg-[var(--color-status-beta-bg)]",
    dot: "bg-[var(--color-status-beta)]",
  },
  "In Development": {
    text: "text-[var(--color-status-dev)]",
    bg: "bg-[var(--color-status-dev-bg)]",
    dot: "bg-[var(--color-status-dev)]",
  },
  "Production · Private": {
    text: "text-[var(--color-status-prod)]",
    bg: "bg-[var(--color-status-prod-bg)]",
    dot: "bg-[var(--color-status-prod)]",
  },
  "Functional Prototype": {
    text: "text-[var(--color-status-proto)]",
    bg: "bg-[var(--color-status-proto-bg)]",
    dot: "bg-[var(--color-status-proto)]",
  },
};
