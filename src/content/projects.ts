// Selected Work. One entry per poster, in wall order. Adding an entry adds a
// poster (the wall sizes itself to the list), so a fifth poster such as
// Treehouse is one more object here. TODO(ben): Treehouse, yes or no.
//
// Facts only (handoff section 8). Where Ben has not supplied something, the
// field is null or empty and the UI shows a placeholder. Do not fill gaps
// with invented copy, numbers or architecture.

export type PosterArt = "field-kit" | "greenlit" | "plan-writer" | "clipboard" | "generic";

/** Paper and border treatment (handoff 7.3 poster table). */
export type PosterTheme = "kit" | "green" | "navy" | "amber";

export interface SchematicNode {
  label: string;
  x: number;
  y: number;
  w: number;
}

/** Box-and-line architecture drawn on the back of a poster, in a 300 x 425 box. */
export interface Schematic {
  nodes: SchematicNode[];
  /** SVG path data for the connectors. */
  wires: string;
  notes: { text: string[]; x: number; y: number }[];
  /** Text alternative read by screen readers in place of the diagram. */
  alt: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  /** Title as set on the poster, one array item per line. */
  titleLines: string[];
  masthead: [string, string];
  badge?: string;
  theme: PosterTheme;
  art: PosterArt;
  footer: string;
  /** Short bullets for the unfolded panel: what it is, who it is for, what shipped last. */
  bullets: string[];
  stack: string[];
  link: { label: string; href: string | null };
  /** First is the large slot, the next two are the small ones. Empty shows placeholders. */
  screenshots: Screenshot[];
  schematic: Schematic | null;
}

export const projects: Project[] = [
  {
    slug: "pre-sales-field-kit",
    titleLines: ["Pre-Sales", "Field Kit"],
    masthead: ["Vol. 01 · 2026", ""],
    badge: "New",
    theme: "kit",
    art: "field-kit",
    footer: "Sproutflow · on Gumroad now",
    // TODO(ben): what it is in one line, who it is for, what shipped in the latest upgrade.
    bullets: ["Launched on Gumroad under Sproutflow."],
    // TODO(ben): stack.
    stack: [],
    // TODO(ben): Gumroad URL (handoff 12.3).
    link: { label: "Get it on Gumroad", href: null },
    // TODO(ben): screenshots (handoff 12.2).
    screenshots: [],
    // TODO(ben): architecture notes (handoff 12.4).
    schematic: null,
  },
  {
    slug: "greenlit",
    titleLines: ["Greenlit"],
    masthead: ["greenlit.cv", "Live"],
    theme: "green",
    art: "greenlit",
    footer: "AI resume scoring and coaching",
    // TODO(ben): add the "what shipped in the latest upgrade" bullet.
    bullets: [
      "A live SaaS that scores resumes and coaches candidates on them.",
      "A deterministic ATS analyzer does the scoring. An AI narrative layer explains it.",
      "Checkout runs on Stripe.",
    ],
    stack: ["Next.js 15", "TypeScript", "Vercel Postgres", "Gemini", "Stripe"],
    link: { label: "Visit greenlit.cv", href: "https://greenlit.cv" },
    // TODO(ben): screenshots of the new UI.
    screenshots: [],
    // TODO(ben): architecture notes.
    schematic: null,
  },
  {
    slug: "business-plan-writer",
    titleLines: ["Business", "Plan Writer"],
    masthead: ["Five agents", "Pipeline"],
    theme: "navy",
    art: "plan-writer",
    footer: "Investor-ready plans, generated",
    // TODO(ben): add the "what shipped in the latest upgrade" bullet.
    bullets: [
      "Generates investor-ready business plans from an idea.",
      "Five agents in a pipeline: validation, then market and financial analysis in parallel, then drafting and critique.",
      "Each step routes to its own model across Groq, Anthropic and OpenAI.",
    ],
    stack: ["FastAPI", "Next.js", "Supabase", "Stripe", "Groq", "Anthropic", "OpenAI"],
    // TODO(ben): confirm this link. It is the one on the current live site;
    // the handoff lists the Business Plan Writer link as still needed.
    link: { label: "Open the app", href: "https://business-plan-writer-chi.vercel.app" },
    // TODO(ben): screenshots of the new UI.
    screenshots: [],
    schematic: {
      nodes: [
        { label: "idea in", x: 96, y: 136, w: 108 },
        { label: "1 validation", x: 96, y: 174, w: 108 },
        { label: "2 market", x: 30, y: 220, w: 104 },
        { label: "3 financial", x: 166, y: 220, w: 104 },
        { label: "4 drafting", x: 96, y: 268, w: 108 },
        { label: "5 critique", x: 96, y: 306, w: 108 },
        { label: "plan out", x: 96, y: 344, w: 108 },
      ],
      wires:
        "M150,162 v12 M150,200 v10 M150,210 H82 v10 M150,210 H218 v10 M82,246 v12 H218 v-12 M150,258 v10 M150,294 v12 M150,332 v12",
      notes: [
        { text: ["parallel"], x: 18, y: 290 },
        { text: ["per-step model", "routing"], x: 222, y: 284 },
      ],
      alt: "Architecture: an idea goes in and passes through five agents. Step 1 validates the idea. Steps 2 and 3, market analysis and financial analysis, run in parallel. Step 4 drafts the plan and step 5 critiques it, then the finished plan comes out. Each step is routed to its own model across Groq, Anthropic and OpenAI. Built with FastAPI, Next.js, Supabase and Stripe.",
    },
  },
  {
    slug: "clipboard",
    titleLines: ["ClipBoard"],
    masthead: ["Multi-tenant", "Ops"],
    theme: "amber",
    art: "clipboard",
    footer: "SaaS operations platform",
    // TODO(ben): who it is for and what shipped in the latest upgrade.
    bullets: ["A multi-tenant SaaS operations platform."],
    // TODO(ben): stack.
    stack: [],
    // TODO(ben): live link (handoff 12.3).
    link: { label: "Visit ClipBoard", href: null },
    // TODO(ben): screenshots.
    screenshots: [],
    // TODO(ben): architecture notes.
    schematic: null,
  },
];

export const getProject = (slug: string): Project | undefined => projects.find((p) => p.slug === slug);

/** Quiet row of chips under the unfold panel (handoff 7.3). */
export const labs = [
  { label: "solutions-playbook", href: "https://github.com/WBHankins93/solutions-playbook" },
  {
    label: "hiddenlayer-litellm-pii-guardrail",
    href: "https://github.com/WBHankins93/hiddenlayer-litellm-pii-guardrail",
  },
  { label: "more on GitHub", href: "https://github.com/WBHankins93" },
];
