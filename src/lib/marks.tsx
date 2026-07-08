// src/lib/marks.tsx
// Per-item identity marks: a bespoke line icon + accent color pairing for
// each product and lab, so no two cards in a grid share a visual signature.
// Icons are hand-drawn (not stock Lucide) and tied to what the item actually
// does. Colors come from the mark palette in globals.css.

import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "fill">;

function svg(props: IconProps, children: React.ReactNode) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Greenlit: approval stamp — a bordered square with a checkmark. */
export function StampIcon(props: IconProps) {
  return svg(
    props,
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M8 12.2l2.6 2.6L16.3 9" />
    </>
  );
}

/** Treehouse: a small roofline over two overlapping figures (the friend group). */
export function NestIcon(props: IconProps) {
  return svg(
    props,
    <>
      <path d="M6 8.5L12 4l6 4.5" />
      <circle cx="9.3" cy="14" r="3" />
      <circle cx="14.7" cy="14" r="3" />
      <path d="M6.5 20c.4-1.7 1.6-2.8 2.8-2.8s2.4 1.1 2.8 2.8M11.9 20c.4-1.7 1.6-2.8 2.8-2.8s2.4 1.1 2.8 2.8" />
    </>
  );
}

/** Clipboard: checklist board — the ops platform's grid of daily tasks. */
export function ChecklistIcon(props: IconProps) {
  return svg(
    props,
    <>
      <rect x="5.5" y="4" width="13" height="17" rx="2" />
      <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
      <path d="M8.5 10.5h7M8.5 14h7M8.5 17.5h4" />
    </>
  );
}

/** Business Plan Writer: a fanned pipeline of agent nodes handing off work. */
export function PipelineIcon(props: IconProps) {
  return svg(
    props,
    <>
      <circle cx="4.5" cy="12" r="2" />
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="12" cy="18.5" r="2" />
      <circle cx="19.5" cy="12" r="2" />
      <path d="M6.3 12h3.4M13.6 7.1l4-2.4M13.6 16.9l4 2.4" />
    </>
  );
}

/** Solutions Playbook: an open book — the flagship reference doc set. */
export function OpenBookIcon(props: IconProps) {
  return svg(
    props,
    <>
      <path d="M12 6c-2.5-1.6-5.2-1.9-8-1v14c2.8-.9 5.5-.6 8 1V6z" />
      <path d="M12 6c2.5-1.6 5.2-1.9 8-1v14c-2.8-.9-5.5-.6-8 1V6z" />
    </>
  );
}

/** AI Engineering Studio: a hub-and-spoke node cluster. */
export function NetworkIcon(props: IconProps) {
  return svg(
    props,
    <>
      <circle cx="12" cy="12" r="2.1" />
      <circle cx="12" cy="4.2" r="1.5" />
      <circle cx="19" cy="8.6" r="1.5" />
      <circle cx="19" cy="15.4" r="1.5" />
      <circle cx="5" cy="15.4" r="1.5" />
      <circle cx="5" cy="8.6" r="1.5" />
      <path d="M12 9.9V5.7M13.7 10.8l3.6-2.6M13.7 13.2l3.6 2.6M10.3 13.2l-3.6 2.6M10.3 10.8L6.7 8.2" />
    </>
  );
}

/** Prompt Library: stacked, offset cards — the persona/workflow catalog. */
export function StackedCardsIcon(props: IconProps) {
  return svg(
    props,
    <>
      <path d="M8 4.5h9a1.5 1.5 0 011.5 1.5v9" />
      <rect x="4.5" y="8" width="12" height="12" rx="2" />
    </>
  );
}

/** Implementation Studio: modular infra blocks — hands-on Terraform labs. */
export function BlocksIcon(props: IconProps) {
  return svg(
    props,
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </>
  );
}

/** DevOps Studio: a cloud with a live telemetry pulse — observability labs. */
export function PulseCloudIcon(props: IconProps) {
  return svg(
    props,
    <>
      <path d="M6.5 17.5a4.5 4.5 0 01-.6-8.96 5.5 5.5 0 0110.6-2.3A4 4 0 0117.5 14" />
      <path d="M6 17.5h12M7.8 14l2-2.6 2 2 2.7-3.4" />
    </>
  );
}

export interface Mark {
  Icon: (props: IconProps) => React.ReactElement;
  text: string;
  bg: string;
}

export const MARKS: Record<string, Mark> = {
  greenlit: {
    Icon: StampIcon,
    text: "text-[var(--color-mark-pine)]",
    bg: "bg-[var(--color-mark-pine-soft)]",
  },
  treehouse: {
    Icon: NestIcon,
    text: "text-[var(--color-mark-honey)]",
    bg: "bg-[var(--color-mark-honey-soft)]",
  },
  clipboard: {
    Icon: ChecklistIcon,
    text: "text-[var(--color-mark-denim)]",
    bg: "bg-[var(--color-mark-denim-soft)]",
  },
  "business-plan-writer": {
    Icon: PipelineIcon,
    text: "text-[var(--color-mark-plum)]",
    bg: "bg-[var(--color-mark-plum-soft)]",
  },
  "solutions-playbook": {
    Icon: OpenBookIcon,
    text: "text-[var(--color-accent)]",
    bg: "bg-[var(--color-accent-soft)]",
  },
  "ai-engineering-studio": {
    Icon: NetworkIcon,
    text: "text-[var(--color-clay)]",
    bg: "bg-[var(--color-clay-soft)]",
  },
  "prompt-library": {
    Icon: StackedCardsIcon,
    text: "text-[var(--color-mark-slate)]",
    bg: "bg-[var(--color-mark-slate-soft)]",
  },
  "implementation-studio": {
    Icon: BlocksIcon,
    text: "text-[var(--color-mark-rust)]",
    bg: "bg-[var(--color-mark-rust-soft)]",
  },
  "devops-studio": {
    Icon: PulseCloudIcon,
    text: "text-[var(--color-mark-moss)]",
    bg: "bg-[var(--color-mark-moss-soft)]",
  },
};
