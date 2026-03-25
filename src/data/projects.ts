// src/data/projects.ts

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  category: "infrastructure" | "automation" | "monitoring" | "ci-cd" | "security" | "web-dev" | "education" | "ai-engineering" | "python" | "client-work";
  tags?: string[]; // extra filter tags (e.g. a project in ai-engineering that also belongs in full-stack)
  featured?: boolean;
  showcase?: boolean;
  techCount: number;
  projectType: 'Production' | 'Client Work' | 'Open Source' | 'Learning';
  status: 'Active' | 'Complete' | 'Maintained' | 'Archived' | 'Live Beta';
  architecture: 'Microservices' | 'Monolith' | 'Serverless' | 'Infrastructure' | 'JAMstack';
  scale: 'Enterprise' | 'Startup' | 'Personal' | 'Small Business';
  environment: 'AWS' | 'Multi-cloud' | 'On-prem' | 'GCP' | 'IBM Cloud' | 'Vercel';
};

// Ordering: showcase: true → featured: true → everything else
export const projects: Project[] = [

  // ─── SHOWCASE ────────────────────────────────────────────────────────────────
  {
    id: "greenlit",
    name: "Greenlit",
    description:
      "AI resume coaching platform with industry-specific feedback, ATS scoring, and bullet rewrites. Built during my own job search to solve a problem I was actually experiencing.",
    technologies: ["Next.js", "Supabase", "Google Gemini", "Anthropic"],
    live_url: "https://greenlit-cv.vercel.app/",
    image_url: "",
    category: "ai-engineering",
    tags: ["full-stack"],
    featured: true,
    showcase: true,
    techCount: 4,
    projectType: 'Production',
    status: 'Live Beta',
    architecture: 'JAMstack',
    scale: 'Personal',
    environment: 'Vercel'
  },
  {
    id: "ai-business-plan-generator",
    name: "AI Business Plan Generator",
    description:
      "5-agent AI pipeline for business plan generation. Provider-agnostic architecture spanning Groq, Anthropic, and OpenAI.",
    technologies: ["Python", "Groq", "Anthropic", "OpenAI"],
    github_url: "https://github.com/WBHankins93/business-plan-writer",
    image_url: "",
    category: "python",
    tags: ["ai-engineering"],
    featured: true,
    showcase: true,
    techCount: 4,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Monolith',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "prompt-library",
    name: "Prompt Library",
    description:
      "A reasoning and judgment architecture for AI — not just a folder of prompts. 50 personas, 12 workflows, layered foundation standards. Model-agnostic. Built to make AI interactions produce better thinking, not just better outputs.",
    technologies: ["Markdown", "LLM", "Open Source"],
    github_url: "https://github.com/WBHankins93/prompt-library",
    image_url: "",
    category: "ai-engineering",
    featured: true,
    showcase: true,
    techCount: 3,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "job-extractor",
    name: "Job Extractor",
    description:
      "Automated job hunting pipeline built during my own search. ATS detection, job fetch, resume-fit scoring, cron schedules, and structured CSV exports. Built to solve the problem, then kept building.",
    technologies: ["Python", "Automation", "Cron"],
    github_url: "https://github.com/WBHankins93/job-extractor",
    image_url: "",
    category: "python",
    tags: ["ai-engineering"],
    featured: true,
    showcase: true,
    techCount: 3,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Monolith',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },

  // ─── FEATURED ────────────────────────────────────────────────────────────────
  {
    id: "terraform-infra-platform",
    name: "Terraform Infra Platform (Prove AI)",
    description:
      "Modular Terraform framework used across client engagements. Reduced enterprise POC build times by 40% through reusable modules. Powers Prove AI's production infrastructure.",
    technologies: ["Terraform", "IaC", "AWS", "Kubernetes", "Helm", "GitHub Actions"],
    github_url: "https://github.com/WBHankins93/terraform-infra-platform",
    image_url: "",
    category: "infrastructure",
    featured: true,
    techCount: 6,
    projectType: 'Production',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Startup',
    environment: 'AWS'
  },
  {
    id: "devops-studio",
    name: "DevOps Studio",
    description:
      "Production-grade DevOps learning platform. Master AWS, Terraform, Kubernetes, Observability, and Platform Engineering through hands-on, enterprise-style labs.",
    technologies: ["Terraform", "AWS", "Kubernetes", "ArgoCD", "Helm", "GitOps", "Ansible"],
    github_url: "https://github.com/WBHankins93/devops-studio",
    image_url: "",
    category: "education",
    featured: true,
    techCount: 7,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "implementation-studio",
    name: "Implementation Studio",
    description:
      "9 hands-on labs covering constrained environments, air-gapped networks, and private clusters. Production-grade Terraform modules you can actually run.",
    technologies: ["Terraform", "GCP", "AWS", "Kubernetes", "Air-gapped", "Private Clusters"],
    github_url: "https://github.com/WBHankins93/implementation-studio",
    image_url: "",
    category: "infrastructure",
    featured: true,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "solutions-playbook",
    name: "Solutions Playbook",
    description:
      "Operational SE framework with 41 files covering the full customer engagement lifecycle. Structured around practical SE workflows and real-world moments of need.",
    technologies: ["Solutions Engineering", "Customer Success", "Technical Sales", "Documentation"],
    github_url: "https://github.com/WBHankins93/solutions-playbook",
    image_url: "",
    category: "education",
    featured: true,
    techCount: 4,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "nealy-event-decor",
    name: "Nealy Event Decor",
    description:
      "Live e-commerce and booking platform for an event decor business. Full-stack solution built with Next.js, TypeScript, hosted on Vercel.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Sanity CMS"],
    github_url: "https://github.com/WBHankins93/nealy-event-decor",
    live_url: "https://www.nealyevents.com/",
    image_url: "",
    category: "web-dev",
    tags: ["client-work"],
    featured: true,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },

  // ─── PYTHON PROJECTS ─────────────────────────────────────────────────────────
  {
    id: "python-go-sre-utilities",
    name: "Python & Go SRE Utilities",
    description:
      "CLI toolkit for SRE and DevOps tasks. Python automation scripts, bash utilities, and Go tooling for the day-to-day grind.",
    technologies: ["Python", "Go", "CLI", "SRE", "Automation", "Bash"],
    github_url: "https://github.com/WBHankins93/python-go-sre-utils",
    image_url: "",
    category: "python",
    featured: false,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Monolith',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "mlops-sre-mini",
    name: "MLOps SRE Mini",
    description:
      "End-to-end MLOps pipeline: train models, serve via FastAPI, deploy with Helm, monitor with Prometheus. The whole loop in one repo.",
    technologies: ["Python", "FastAPI", "Docker", "Helm", "Prometheus", "Grafana"],
    github_url: "https://github.com/WBHankins93/mlops-sre-mini",
    image_url: "",
    category: "python",
    tags: ["ai-engineering"],
    featured: false,
    techCount: 6,
    projectType: 'Learning',
    status: 'Complete',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },

  // ─── WEB DEV / FULL-STACK ─────────────────────────────────────────────────────
  {
    id: "sproutflow-flagship",
    name: "Sproutflow Studio",
    description:
      "Agency website for my web consultancy. Modern responsive design, dynamic case study integration, built to convert.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    github_url: "https://github.com/WBHankins93/sproutflow-flagship",
    live_url: "https://www.sproutflow-studio.com/",
    image_url: "",
    category: "web-dev",
    featured: false,
    techCount: 5,
    projectType: 'Production',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Personal',
    environment: 'Vercel'
  },
  {
    id: "second-line-psychiatry",
    name: "Second Line Psychiatry",
    description:
      "Professional telehealth website with modern design, scheduling integration, and HIPAA-conscious architecture.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "SEO"],
    github_url: "https://github.com/WBHankins93/second-line-psych",
    live_url: "https://www.secondlinepsychiatry.com/",
    image_url: "",
    category: "web-dev",
    tags: ["client-work"],
    featured: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },
  {
    id: "big-butt-association",
    name: "Bekky (BBA)",
    description:
      "E-commerce store for EDM fashion with membership features. Custom Shopify theme development.",
    technologies: ["Shopify", "Liquid", "E-commerce", "Theme Development"],
    github_url: "https://github.com/WBHankins93/bekky",
    live_url: "https://bigbuttassociation.com/",
    image_url: "",
    category: "web-dev",
    tags: ["client-work"],
    featured: false,
    techCount: 4,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },
  {
    id: "personal-website",
    name: "This Portfolio",
    description:
      "Matrix-themed portfolio built with Next.js 15, Framer Motion, and Three.js. Yes, this site is on here.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
    github_url: "https://github.com/WBHankins93/personal-website",
    live_url: "https://benhankins.vercel.app",
    image_url: "",
    category: "web-dev",
    featured: false,
    techCount: 5,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Personal',
    environment: 'Vercel'
  },

  // ─── INFRASTRUCTURE ───────────────────────────────────────────────────────────
  {
    id: "terraform-aws-modules",
    name: "Terraform AWS Modules",
    description:
      "Reusable Terraform modules for AWS infrastructure — VPC, EKS, RDS, security groups. Drop in, configure, ship.",
    technologies: ["Terraform", "AWS", "CloudFormation", "GitHub Actions"],
    github_url: "https://github.com/WBHankins93/terraform-modules",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 4,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'AWS'
  },
  {
    id: "gcp-gke-gitops",
    name: "GCP GKE GitOps",
    description:
      "GitOps-driven GKE deployment framework using Argo CD and Terraform. Everything declarative, nothing manual.",
    technologies: ["GKE", "Terraform", "Argo CD", "Kubernetes", "GitOps"],
    github_url: "https://github.com/WBHankins93/gcp-gke-gitops",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 5,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'GCP'
  },
  {
    id: "deployment-patterns",
    name: "Deployment Patterns",
    description:
      "Practical SRE guide to deployment strategies — rolling, blue/green, canary. Includes implementation scripts, decision frameworks, and risk analysis.",
    technologies: ["Blue/Green", "Canary", "GitOps", "Helm", "Argo CD", "Shell"],
    github_url: "https://github.com/WBHankins93/deployment-patterns",
    image_url: "",
    category: "infrastructure",
    tags: ["ci-cd"],
    featured: false,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "helm-charts",
    name: "Helm Charts",
    description:
      "Production-ready Helm charts with best practices for templating and release automation.",
    technologies: ["Helm", "Kubernetes", "Templating", "Package Management"],
    github_url: "https://github.com/WBHankins93/helm-charts",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 4,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "github-action-templates",
    name: "GitHub Action Templates",
    description:
      "Reusable GitHub Actions workflows for CI/CD patterns, infrastructure deployment, and testing pipelines.",
    technologies: ["GitHub Actions", "CI/CD", "Automation", "Workflows"],
    github_url: "https://github.com/WBHankins93/github-action-templates",
    image_url: "",
    category: "infrastructure",
    tags: ["ci-cd"],
    featured: false,
    techCount: 4,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "platform-engineering-lab",
    name: "Platform Engineering Lab",
    description:
      "Platform engineering experiments — service mesh, developer portals, DX optimization patterns. Learning out loud.",
    technologies: ["Platform Engineering", "Service Mesh", "Kubernetes", "Observability"],
    github_url: "https://github.com/WBHankins93/platform-engineering-lab",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 4,
    projectType: 'Learning',
    status: 'Active',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },

  // ─── CLIENT WORK (NDA / Enterprise) ──────────────────────────────────────────
  {
    id: "automated-vpc-deployment-centerpoint",
    name: "Automated VPC Deployment (CenterPoint)",
    description:
      "Automated VPC & VSI deployment using Terraform, reducing provisioning time from 2 weeks to 2.7 hours. Delivered for CenterPoint Energy on IBM Cloud.",
    technologies: ["Terraform", "VPC", "VSI", "Automation", "IBM Cloud"],
    image_url: "",
    category: "client-work",
    tags: ["infrastructure"],
    featured: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Complete',
    architecture: 'Infrastructure',
    scale: 'Enterprise',
    environment: 'IBM Cloud'
  },
  {
    id: "enterprise-cloud-delivery-ibm",
    name: "Enterprise Cloud Delivery (IBM)",
    description:
      "Architected and delivered cloud environments for Fortune 500 clients including NBC Universal, Citibank, and AT&T. Contributed to the $10.1M SAP RISE deal.",
    technologies: ["IBM Cloud", "Solutions Architecture", "Terraform", "Pre-Sales", "Enterprise"],
    image_url: "",
    category: "client-work",
    featured: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Complete',
    architecture: 'Infrastructure',
    scale: 'Enterprise',
    environment: 'IBM Cloud'
  },
  {
    id: "att-watsonxai-integration",
    name: "AT&T Watsonx.ai Integration",
    description:
      "Integrated IBM watsonx.ai into AT&T's platform, enabling AI-driven analytics and enhanced customer service. Led technical discovery and POC delivery.",
    technologies: ["Watsonx.ai", "IBM Cloud", "OpenShift", "Next.js", "API Integration"],
    image_url: "",
    category: "client-work",
    tags: ["ai-engineering"],
    featured: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Complete',
    architecture: 'Microservices',
    scale: 'Enterprise',
    environment: 'IBM Cloud'
  },
];
