// src/data/projects.ts

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  category: "infrastructure" | "automation" | "monitoring" | "ci-cd" | "security" | "web-dev" | "education";
  featured?: boolean;
  showcase?: boolean;
  techCount: number;
  projectType: 'Production' | 'Client Work' | 'Open Source' | 'Learning';
  status: 'Active' | 'Complete' | 'Maintained' | 'Archived';
  architecture: 'Microservices' | 'Monolith' | 'Serverless' | 'Infrastructure' | 'JAMstack';
  scale: 'Enterprise' | 'Startup' | 'Personal' | 'Small Business';
  environment: 'AWS' | 'Multi-cloud' | 'On-prem' | 'GCP' | 'IBM Cloud' | 'Vercel';
};

export const projects: Project[] = [
  // FEATURED PROJECTS
  {
    id: "terraform-infra-platform",
    name: "Terraform Infra Platform (Prove AI)",
    description:
      "Production Terraform automation for ProveAI's infrastructure with advanced IaC patterns and modular design.",
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
      "Open-source DevOps training platform with labs, tutorials, and real-world scenarios.",
    technologies: [
      "Open Source",
      "Education",
      "Terraform",
      "AWS",
      "VPC",
      "S3",
      "GitLab CI",
      "EKS",
      "Helm",
      "ArgoCD",
      "Ansible",
      "GitOps"
    ],
    github_url: "https://github.com/WBHankins93/devops-studio",
    image_url: "",
    category: "education",
    featured: true,
    showcase: true,
    techCount: 12,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },

  // SPROUTFLOW PROJECTS - WEB DEVELOPMENT
  {
    id: "second-line-psychiatry",
    name: "Second Line Psychiatry",
    description:
      "Professional telehealth website with modern design, scheduling, and HIPAA-compliant architecture.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "SEO"],
    github_url: "https://github.com/WBHankins93/second-line-psych",
    live_url: "https://www.secondlinepsychiatry.com/",
    image_url: "",
    category: "web-dev",
    featured: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },
  {
    id: "nealy-event-decor",
    name: "Nealy Event Decor",
    description:
      "Modern website with custom CMS for event decor business, delivering elegant online presence.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Sanity CMS"],
    github_url: "https://github.com/WBHankins93/nealy-event-decor",
    live_url: "https://nealy-event-decor.vercel.app/",
    image_url: "",
    category: "web-dev",
    featured: true,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },
  {
    id: "sproutflow-flagship",
    name: "Sproutflow Studio Website",
    description:
      "Flagship agency website showcasing services and portfolio with modern web development capabilities.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    github_url: "https://github.com/WBHankins93/sproutflow-flagship",
    live_url: "https://sproutflow.vercel.app",
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
    id: "personal-website",
    name: "Personal Portfolio",
    description:
      "Solutions Engineering portfolio with glassmorphism UI, showcasing projects and customer-first approach.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
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

  // INFRASTRUCTURE & CLOUD PROJECTS
  {
    id: "terraform-aws-modules",
    name: "Terraform AWS Modules",
    description:
      "Reusable Terraform modules for AWS infrastructure with VPC, EKS, RDS, and security groups.",
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
    id: "python-go-sre-utilities",
    name: "Python & Go SRE Utilities",
    description:
      "CLI tool with Python automation scripts, bash utilities, and Go code for SRE and DevOps tasks.",
    technologies: ["Python", "Go", "CLI", "SRE", "Automation", "Bash"],
    github_url: "https://github.com/WBHankins93/python-go-sre-utils",
    image_url: "",
    category: "automation",
    featured: false,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Monolith',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "python-pr-summary-bot",
    name: "Python PR Summary Bot",
    description:
      "Python scripts that summarize Terraform plan output in PR comments, improving transparency and review efficiency.",
    technologies: ["Python", "GitHub Actions", "Terraform", "API"],
    github_url: "https://github.com/WBHankins93/tf-plan-checker",
    image_url: "",
    category: "ci-cd",
    featured: false,
    techCount: 4,
    projectType: 'Production',
    status: 'Active',
    architecture: 'Serverless',
    scale: 'Startup',
    environment: 'AWS'
  },
  {
    id: "deployment-patterns",
    name: "deployment-patterns",
    description:
      "Reference implementations of blue/green, canary, and GitOps deployment patterns with guides.",
    technologies: ["Blue/Green", "Canary", "GitOps", "Helm", "Argo CD", "CI/CD"],
    github_url: "https://github.com/WBHankins93/deployment-patterns",
    image_url: "",
    category: "ci-cd",
    featured: false,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "gcp-gke-gitops",
    name: "gcp-gke-gitops",
    description:
      "GitOps-driven GKE deployment framework using Argo CD and Terraform.",
    technologies: ["GKE", "Terraform", "Argo CD", "Kubernetes", "GitOps"],
    github_url: "https://github.com/WBHankins93/gcp-gke-gitops",
    image_url: "",
    category: "ci-cd",
    featured: false,
    techCount: 6,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'GCP'
  },
  {
    id: "mlops-sre-mini",
    name: "mlops-sre-mini",
    description:
      "End-to-end MLOps pipeline: train models, serve via FastAPI, deploy with Helm, and monitor with Prometheus.",
    technologies: ["MLOps", "FastAPI", "Docker", "Helm", "Prometheus", "Grafana"],
    github_url: "https://github.com/WBHankins93/mlops-sre-mini",
    image_url: "",
    category: "automation",
    featured: false,
    techCount: 6,
    projectType: 'Learning',
    status: 'Complete',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "platform-engineering-lab",
    name: "Platform Engineering Lab",
    description:
      "Platform engineering experiments showcasing modern tools, service mesh, and DX optimization patterns.",
    technologies: ["Platform Engineering", "Service Mesh", "Developer Experience", "Kubernetes", "Observability"],
    github_url: "https://github.com/WBHankins93/platform-engineering-lab",
    image_url: "",
    category: "automation",
    featured: false,
    techCount: 5,
    projectType: 'Learning',
    status: 'Active',
    architecture: 'Microservices',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "helm-charts",
    name: "Helm Charts",
    description:
      "Production-ready Helm charts with best practices for templating and release automation.",
    technologies: ["Helm", "Kubernetes", "Templating", "Charts", "Package Management"],
    github_url: "https://github.com/WBHankins93/helm-charts",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 5,
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
    technologies: ["GitHub Actions", "CI/CD", "Automation", "Templates", "Workflows"],
    github_url: "https://github.com/WBHankins93/github-action-templates",
    image_url: "",
    category: "ci-cd",
    featured: false,
    techCount: 5,
    projectType: 'Open Source',
    status: 'Maintained',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "implementation-studio",
    name: "Implementation Studio",
    description: "Technical deployment patterns platform with 9 labs covering constrained environments and production-grade Terraform modules.",
    technologies: ["Terraform", "GCP", "AWS", "Kubernetes", "Air-gapped", "Private Clusters", "Education"],
    github_url: "https://github.com/WBHankins93/implementation-studio",
    live_url: "",
    image_url: "",
    category: "education",
    featured: true,
    showcase: true,
    techCount: 7,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "solutions-playbook",
    name: "Solutions Playbook",
    description: "Operational SE framework with 41 files covering the full lifecycle, structured around 'moments of need'.",
    technologies: ["Solutions Engineering", "Customer Success", "Technical Sales", "Documentation", "Frameworks"],
    github_url: "https://github.com/WBHankins93/solutions-playbook",
    live_url: "",
    image_url: "",
    category: "education",
    featured: true,
    showcase: true,
    techCount: 5,
    projectType: 'Open Source',
    status: 'Active',
    architecture: 'Infrastructure',
    scale: 'Personal',
    environment: 'Multi-cloud'
  },
  {
    id: "big-butt-association",
    name: "Big Butt Association",
    description: "E-commerce store for EDM fashion with membership features, built on Shopify/Liquid with custom theme development.",
    technologies: ["Shopify", "Liquid", "E-commerce", "Theme Development", "Payment Integration"],
    github_url: "https://github.com/WBHankins93/big-butt-association",
    live_url: "https://bigbuttassociation.com/",
    image_url: "",
    category: "web-dev",
    featured: false,
    showcase: false,
    techCount: 5,
    projectType: 'Client Work',
    status: 'Active',
    architecture: 'JAMstack',
    scale: 'Small Business',
    environment: 'Vercel'
  },

  // NDA PROJECTS (No GitHub repos available)
  {
    id: "automated-vpc-deployment-centerpoint",
    name: "Automated VPC Deployment (CenterPoint)",
    description:
      "Automated VPC & VSI deployment using Terraform, reducing provisioning time from 2 weeks to 2.7 hours.",
    technologies: ["Terraform", "VPC", "VSI", "Automation", "IBM Cloud", "Client Delivery"],
    github_url: "",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 6,
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
      "Automated cloud environments for enterprise clients, contributing to $10.1M SAP RISE deal.",
    technologies: ["IBM Cloud", "Solutions Architect", "Terraform", "Automation", "Enterprise", "Pre-Sales"],
    github_url: "",
    image_url: "",
    category: "infrastructure",
    featured: false,
    techCount: 6,
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
      "Integrated IBM watsonx.ai into AT&T's platform, enabling AI-driven analytics and enhanced customer service.",
    technologies: ["Watsonx.ai", "IBM Cloud", "Openshift", "Next.js", "Integration", "API"],
    github_url: "",
    image_url: "",
    category: "automation",
    featured: false,
    techCount: 6,
    projectType: 'Client Work',
    status: 'Complete',
    architecture: 'Microservices',
    scale: 'Enterprise',
    environment: 'IBM Cloud'
  }
];