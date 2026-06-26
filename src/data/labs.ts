// src/data/labs.ts
// Open Source & Labs — supporting evidence below the product carousel.
// Copy is final as written in the redesign handoff; do not paraphrase.

export interface Lab {
  name: string;
  description: string;
  href: string;
}

export const labs: Lab[] = [
  {
    name: "Solutions Playbook",
    description:
      "Operational framework for SEs and SAs — 41 files covering the full customer engagement lifecycle.",
    href: "https://github.com/WBHankins93/solutions-playbook",
  },
  {
    name: "Prompt Library",
    description:
      "Reasoning and judgment architecture for AI. 50 personas, 12 workflows, layered standards. Model-agnostic.",
    href: "https://github.com/WBHankins93/prompt-library",
  },
  {
    name: "Implementation Studio",
    description:
      "9 hands-on labs covering constrained, air-gapped, and private-cluster environments. Production-grade Terraform.",
    href: "https://github.com/WBHankins93/implementation-studio",
  },
  {
    name: "DevOps Studio",
    description:
      "Production-grade DevOps learning platform — hands-on AWS, Terraform, Kubernetes, and observability labs.",
    href: "https://github.com/WBHankins93/devops-studio",
  },
];

// Sproutflow Studio — single callout, not a project card.
export const sproutflowCallout = {
  label: "Building Sproutflow Studio",
  href: "https://sproutflow-studio.com",
};
