// src/data/labs.ts
// Open Source & Labs: supporting evidence below the product carousel.
// Copy is final as written in the redesign handoff; do not paraphrase.

export interface Lab {
  name: string;
  description: string;
  href: string;
  /** Key into MARKS (src/lib/marks.tsx) for this repo's icon + accent color. */
  markId: string;
}

// The first entry is rendered as the featured card; the rest fill the grid below.
export const labs: Lab[] = [
  {
    name: "Solutions Playbook",
    description:
      "Operational framework for SEs and SAs: 111 Markdown resources and 13 diagrams covering the full customer engagement lifecycle.",
    href: "https://github.com/WBHankins93/solutions-playbook",
    markId: "solutions-playbook",
  },
  {
    name: "AI Engineering Studio",
    description:
      "The AI engineering ecosystem made legible through an SE/SA lens — foundations, decision frames, POC playbooks, and talk tracks across the LLMOps-to-governance stack.",
    href: "https://github.com/WBHankins93/ai-engineering-studio",
    markId: "ai-engineering-studio",
  },
  {
    name: "Prompt Library",
    description:
      "Reasoning and judgment architecture for AI. 86 personas, 13 workflows, layered standards. Model-agnostic.",
    href: "https://github.com/WBHankins93/prompt-library",
    markId: "prompt-library",
  },
  {
    name: "Implementation Studio",
    description:
      "9 hands-on labs covering constrained, air-gapped, and private-cluster environments. Production-grade Terraform.",
    href: "https://github.com/WBHankins93/implementation-studio",
    markId: "implementation-studio",
  },
  {
    name: "DevOps Studio",
    description:
      "Production-grade DevOps learning platform — hands-on AWS, Terraform, Kubernetes, and observability labs.",
    href: "https://github.com/WBHankins93/devops-studio",
    markId: "devops-studio",
  },
];

// Sproutflow Studio: single callout, not a project card.
export const sproutflowCallout = {
  label: "Building Sproutflow Studio",
  href: "https://sproutflow-studio.com",
};
