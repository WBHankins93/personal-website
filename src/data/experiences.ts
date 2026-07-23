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
      "Drove SOC 2 Type II from a 34% Vanta baseline to a passed audit in six months, standing up company-wide least-privilege IAM and repository security rules where there had been none. Introduced automated CI/CD where deployments had been manual, cutting deploy time ~80%, and kept production stable across 4 Kubernetes clusters with a single incident in nine months.",
  },
  {
    company: "IBM - Client Engineering",
    role: "Client Technical Specialist -> Cloud Engineer -> Cloud Infrastructure Engineer",
    roleProgression: [
      "Client Technical Specialist · 2019–2021",
      "Cloud Engineer · 2021–2023",
      "Cloud Infrastructure Engineer · 2023–2024",
    ],
    period: "2019–2024",
    summary:
      "Led technical discovery, solution design, and demo delivery across enterprise accounts including AT&T, Boeing, Cencora, and Norfolk Southern. Owned the production infrastructure for CenterPoint Energy's $10.1M SAP RISE engagement. Built customer-facing MVPs and POCs with a strong evaluation-to-signing conversion rate.",
  },
];
