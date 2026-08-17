export type ProjectSlug =
  | "greenlit"
  | "business-plan-writer"
  | "living-playbooks";

export type ProjectStage =
  | "Live beta · redesign underway"
  | "Internal release candidate"
  | "Live · continuously maintained";

export type MicroWorldId = ProjectSlug | "breadth";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "live" | "source";
}
export interface ProjectCaseStudy {
  challenge: string;
  system: string[];
  decisions: string[];
  evidence: string[];
  walkthrough: string[];
  lessons: string[];
}

export interface Project {
  slug: ProjectSlug;
  name: string;
  shortName: string;
  stage: ProjectStage;
  role: string;
  value: string;
  summary: string;
  proofPoints: string[];
  capabilities: string[];
  microWorld: MicroWorldId;
  markId: string;
  order: number;
  featured: true;
  links: ProjectLink[];
  caseStudy: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    slug: "greenlit",
    name: "Greenlit",
    shortName: "Greenlit",
    stage: "Live beta · redesign underway",
    role: "Founder · product, architecture, and UX",
    value:
      "Industry-aware resume coaching that shows job seekers what is weakening their application—and what to improve next.",
    summary:
      "A live ATS scanning, coaching, and resume-building product designed around specific evidence instead of generic AI advice.",
    proofPoints: [
      "Free industry-aware scan",
      "Deterministic scoring with grounded coaching",
      "13 editorial resume templates",
    ],
    capabilities: ["Product design", "AI systems", "Next.js", "Document rendering"],
    microWorld: "greenlit",
    markId: "greenlit",
    order: 1,
    featured: true,
    links: [{ label: "Visit Greenlit", href: "https://greenlit.cv", kind: "live" }],
    caseStudy: {
      challenge:
        "Most resume tools produce a score or a rewrite without showing candidates what the system actually found. Greenlit needed to make ATS feedback legible, actionable, and trustworthy for people already navigating a stressful job search.",
      system: [
        "Parse the uploaded resume into a structured document model.",
        "Classify the candidate's likely industry and apply the relevant scoring rubric.",
        "Score structure, evidence, keywords, credentials, clarity, and industry fit deterministically.",
        "Use AI for grounded coaching and verified rewrites, then carry approved material into the resume builder.",
      ],
      decisions: [
        "Keep the score itself deterministic so model variance cannot change the baseline diagnosis.",
        "Give the coaching layer explicit score bands and harvested resume facts instead of asking it to improvise context.",
        "Separate ATS-safe templates from a visual portfolio template whose sharing tradeoffs are stated plainly.",
      ],
      evidence: [
        "The free scan is live at greenlit.cv and does not require an account.",
        "The product includes an industry-aware scoring system, coaching pipeline, and 13 resume templates.",
        "A broader profile and product-design makeover is underway; the portfolio labels that work honestly rather than presenting it as finished.",
      ],
      walkthrough: [
        "Upload and parse",
        "Classify and score",
        "Explain the gaps",
        "Verify targeted rewrites",
        "Build and export",
      ],
      lessons: [
        "AI is more useful when it explains a stable rubric than when it invents the rubric itself.",
        "Job-search products earn trust by naming uncertainty and showing evidence, not by overstating precision.",
        "Document rendering is product infrastructure: typography, pagination, and export fidelity all affect whether the coaching is usable.",
      ],
    },
  },
  {
    slug: "business-plan-writer",
    name: "Business Plan Writer",
    shortName: "Plan Writer",
    stage: "Internal release candidate",
    role: "Product architecture · AI orchestration",
    value:
      "A review-gated system that turns structured intake and evidence into a funding-focused business plan.",
    summary:
      "A typed multi-stage pipeline with parallel market and finance work, configurable high-quality writing, deterministic gates, and retained audit artifacts.",
    proofPoints: [
      "Five-stage core pipeline",
      "Parallel market and finance analysis",
      "Bounded critic revision and release gates",
    ],
    capabilities: ["Python", "Agent orchestration", "Typed contracts", "Document generation"],
    microWorld: "business-plan-writer",
    markId: "business-plan-writer",
    order: 2,
    featured: true,
    links: [
      {
        label: "View source",
        href: "https://github.com/WBHankins93/business-plan-writer",
        kind: "source",
      },
    ],
    caseStudy: {
      challenge:
        "Long-form business plans combine narrative, market judgment, financial assumptions, and lender-facing detail. A single prompt can sound polished while silently contradicting the underlying numbers, so the system needed explicit boundaries and release controls.",
      system: [
        "Validate structured intake and evidence before the first model call.",
        "Run market building and financial checking in parallel behind typed contracts.",
        "Compose the plan through a separately configurable writer step, including an Opus-quality model when the work calls for it.",
        "Critique, reconcile, optionally revise once, and preserve every draft, score, call record, and gate decision.",
      ],
      decisions: [
        "Use typed records at every agent boundary so failures and retries remain inspectable.",
        "Keep financial arithmetic deterministic and ask models to exercise judgment around computed facts.",
        "Bound revisions instead of creating an open-ended agent loop.",
        "Block customer-final downloads until deterministic gates and human review conditions pass.",
      ],
      evidence: [
        "The internal release-candidate workflow runs end to end through CLI and web-demo paths.",
        "The system retains distinct audit artifacts, call telemetry, critic history, and rendered review packets.",
        "Commercial launch still depends on evaluator calibration, production OCR, and written SBA-counsel guidance.",
      ],
      walkthrough: [
        "Validate intake",
        "Build market and financial views in parallel",
        "Compose the plan",
        "Critique and reconcile",
        "Review and release",
      ],
      lessons: [
        "Good orchestration is mostly explicit contracts, deterministic gates, and honest failure states.",
        "A better writer model improves prose, but it cannot replace evidence quality or arithmetic controls.",
        "Auditability becomes a product feature when generated work informs consequential decisions.",
      ],
    },
  },
  {
    slug: "living-playbooks",
    name: "Living Playbooks",
    shortName: "Playbooks",
    stage: "Live · continuously maintained",
    role: "Author · systems and information architecture",
    value:
      "A living education system that turns field experience into searchable paths, diagrams, templates, and decision tools.",
    summary:
      "Solutions Playbook anchors an interconnected set of live GitHub Pages sites spanning solutions work, AI engineering, implementation, and DevOps.",
    proofPoints: [
      "111 Markdown resources",
      "13 polished diagrams",
      "Dedicated SE and SA learning tracks",
    ],
    capabilities: ["Technical writing", "Information architecture", "Architecture", "Enablement"],
    microWorld: "living-playbooks",
    markId: "solutions-playbook",
    order: 3,
    featured: true,
    links: [
      {
        label: "Open the live playbook",
        href: "https://wbhankins93.github.io/solutions-playbook/",
        kind: "live",
      },
      {
        label: "View source",
        href: "https://github.com/WBHankins93/solutions-playbook",
        kind: "source",
      },
    ],
    caseStudy: {
      challenge:
        "Solutions work spans discovery, architecture, delivery, recovery, migration, security, and executive communication. Useful knowledge was scattered across notes and repositories, so the project needed a navigation model that works both during an urgent engagement and during deliberate study.",
      system: [
        "Organize field material into distinct Solutions Engineer and Solutions Architect tracks.",
        "Offer alternate entry points by situation, learning path, artifact, diagram, and reusable template.",
        "Publish plain Markdown through a searchable VitePress site with downloadable source material.",
        "Connect the flagship to AI Engineering, Implementation, and DevOps studios as deeper branches of the same education system.",
      ],
      decisions: [
        "Keep Markdown as the durable source so the material remains portable and easy to maintain.",
        "Treat navigation as part of the content: urgent recovery and structured learning require different paths.",
        "Run link checking and the full documentation build in CI so a broken cross-reference cannot merge unnoticed.",
      ],
      evidence: [
        "Solutions Playbook is live on GitHub Pages with 111 resources and 13 diagrams.",
        "Its content spans pre-sales, implementation, architecture, migrations, compliance, recovery, and stakeholder management.",
        "The connected AI Engineering, Implementation, and DevOps sites are also published as live learning environments.",
      ],
      walkthrough: [
        "Choose an SE or SA track",
        "Enter by situation or learning path",
        "Move from guide to diagram",
        "Copy a reusable template",
        "Follow a connected studio deeper",
      ],
      lessons: [
        "Information architecture determines whether deep knowledge is useful under pressure.",
        "A living system needs build checks and maintenance standards, not just more content.",
        "Teaching material becomes stronger when architecture, customer context, and delivery mechanics stay connected.",
      ],
    },
  },
];

export const featuredProjects = [...projects].sort((a, b) => a.order - b.order);

export const supportingWork = [
  { name: "Clipboard", stage: "Private · polishing", capability: "Operations platforms" },
  { name: "Treehouse", stage: "In development", capability: "Mobile products" },
] as const;

export const playbookBranches = [
  "Solutions Playbook",
  "AI Engineering Studio",
  "Implementation Studio",
  "DevOps Studio",
] as const;

export const sproutflow = {
  name: "Sproutflow Studio",
  href: "https://sproutflow-studio.com",
  stage: "Active client work",
  capability: "Customer solutions",
  summary:
    "My client-facing practice for turning technical discovery into production software, AI systems, and automation.",
} as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
