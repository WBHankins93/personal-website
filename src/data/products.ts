// src/data/products.ts
// Featured Products — the centerpiece carousel on the redesigned homepage.
// Copy is final as written in the redesign handoff; do not paraphrase.

export type ProductStatus =
  | "Live Beta"
  | "In Development"
  | "Production · Private"
  | "Functional Prototype";

export interface Product {
  name: string;
  status: ProductStatus;
  problem: string;
  solution: string;
  stack: string[];
  /** Primary CTA. Omit when the product is private / has no public link. */
  cta?: { label: string; href: string };
  /** Small contextual note shown in place of a CTA (e.g. NDA / attribution). */
  note?: string;
}

export const products: Product[] = [
  {
    name: "Greenlit",
    status: "Live Beta",
    problem: "Most applicants don't know why their resumes fail ATS screening.",
    solution:
      "AI-powered resume coaching platform with ATS scoring, keyword analysis, and role-specific feedback. Built during my own job search.",
    stack: ["Next.js", "Supabase", "Anthropic", "Google Gemini"],
    cta: { label: "Visit Site", href: "https://greenlit.cv" },
  },
  {
    name: "Treehouse",
    status: "In Development",
    problem: "Important moments get lost between group texts and social media.",
    solution:
      "Private iOS app for close friend groups to preserve memories, plans, birthdays, and life events without the noise of social media.",
    stack: ["React Native", "Expo", "Neon PostgreSQL", "Apple Sign In"],
  },
  {
    name: "Clipboard",
    status: "Production · Private",
    problem: "Service businesses rely on fragmented systems for daily operations.",
    solution:
      "Multi-tenant operations platform for appointment-based, multi-location businesses. Row-level security, vertical packs, role dashboards.",
    stack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind"],
    note: "Built through Sproutflow Studio",
  },
  {
    name: "Business Plan Writer",
    status: "Functional Prototype",
    problem: "Creating investor-ready business plans takes significant time and expertise.",
    solution:
      "5-agent AI pipeline that generates structured business plans from intake data. Provider-agnostic across Groq, Anthropic, and OpenAI.",
    stack: ["Python", "Groq", "Anthropic", "OpenAI"],
    cta: {
      label: "View on GitHub",
      href: "https://github.com/WBHankins93/business-plan-writer",
    },
  },
];
