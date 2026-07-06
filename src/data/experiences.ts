// src/data/experiences.ts
// Experience timeline for the editorial homepage. Concise by design: the
// resume carries the detail. Copy is final as written; do not paraphrase.

export interface Experience {
  company: string;
  role: string;
  roleProgression?: string[];
  period: string;
  summary: string;
}

export const experiences: Experience[] = [
  {
    company: "Sproutflow Studio",
    role: "Founder & Solutions Engineer",
    period: "Oct 2025–Present",
    summary:
      "Run client engagements end-to-end from technical discovery through production deployment. Build AI systems and automation for clients and internal operations. Delivered custom software across healthcare, e-commerce, and service verticals.",
  },
  {
    company: "Prove AI",
    role: "Site Reliability Engineer",
    period: "Jan 2025–Sep 2025",
    summary:
      "Led SOC 2 Type II readiness from 34% to 100%, unblocking $2M+ in regulated-industry pipeline. Maintained 99.9% uptime across 4 production Kubernetes clusters. Reduced deployment time 80% through CI/CD automation.",
  },
  {
    company: "IBM - Client Engineering",
    role: "Solutions Engineer -> Senior Solutions Engineer -> Cloud Infrastructure Engineer",
    roleProgression: [
      "Solutions Engineer",
      "Senior Solutions Engineer",
      "Cloud Infrastructure Engineer",
    ],
    period: "Dec 2019–Aug 2024",
    summary:
      "Led technical discovery, solution design, and demo delivery across enterprise accounts including AT&T, Boeing, Cencora, and Norfolk Southern. Owned the production infrastructure for CenterPoint Energy's $10.1M SAP RISE engagement. Built customer-facing MVPs and POCs with a strong evaluation-to-signing conversion rate.",
  },
];
