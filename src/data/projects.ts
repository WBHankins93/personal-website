// src/data/projects.ts

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  github_url?: string;
  image_url?: string;
  category: "infrastructure" | "automation" | "monitoring" | "ci-cd" | "cloud" | "security";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "automated-vpc-deployment-centerpoint",
    name: "Automated VPC Deployment (CenterPoint)",
    description:
      "As a key client project at IBM, I led the complete automation of a complex VPC & VSI deployment using Terraform, drastically reducing the provisioning time from over 2 weeks to just 2.7 hours.",
    technologies: ["Terraform", "VPC", "VSI", "Automation", "IBM Cloud", "Client Delivery"],
    github_url: "",
    image_url: "",
    category: "infrastructure",
    featured: true
  },
  {
    id: "terraform-infra-platform",
    name: "Terraform Infra Platform (Prove AI)",
    description:
      "Production-level Terraform automation used to build the entire ProveAI infrastructure. This project showcases advanced IaC patterns, modular design, and reusable deployment strategies.",
    technologies: ["Terraform", "IaC", "AWS", "Kubernetes", "Helm", "GitHub Actions"],
    github_url: "https://github.com/WBHankins93/terraform-infra-platform",
    image_url: "",
    category: "infrastructure",
    featured: true
  },
  {
    id: "devops-studio",
    name: "DevOps Studio",
    description:
      "An open-source learning tool for new DevOps and Infra Engineers, providing hands-on labs, tutorials, and real-world scenarios to accelerate skill development in a sandboxed environment.",
    technologies: [
      "Open Source",
      "Education",
      "Terraform",
      "AWS",
      "VPC",
      "S3",
      "Jenkins",
      "GitLab CI",
      "GCP",
      "EKS",
      "Helm",
      "ArgoCD",
      "Docker Compose",
      "AWS Lambda",
      "CloudWatch",
      "Ansible",
      "Flask",
      "GitOps"
    ],
    github_url: "https://github.com/WBHankins93/devops-studio",
    image_url: "",
    category: "ci-cd",
    featured: true
  },
  {
    id: "enterprise-cloud-delivery-ibm",
    name: "Enterprise Cloud Delivery (IBM)",
    description:
      "Architected and automated cloud environments for major enterprise clients, resulting in a $10.1M SAP RISE deal. Reduced deployment times by 85% using Terraform and custom automation.",
    technologies: ["IBM Cloud", "Solutions Architect", "Terraform", "Automation", "Enterprise", "Pre-Sales"],
    github_url: "",
    image_url: "",
    category: "infrastructure",
    featured: true
  },
  {
    id: "terraform-aws-modules",
    name: "Terraform AWS Modules",
    description:
      "Created reusable Terraform modules for AWS infrastructure provisioning, including VPC, EKS, RDS, and security groups with best practice configurations.",
    technologies: ["Terraform", "AWS", "CloudFormation", "GitHub Actions"],
    github_url: "https://github.com/WBHankins93/terraform-modules",
    image_url: "",
    category: "infrastructure",
    featured: true
  },
  {
    id: "python-go-sre-utilities",
    name: "Python & Go SRE Utilities",
    description:
      "A powerful CLI tool featuring useful Python automation scripts, bash utilities, and performant Go system code for common SRE and DevOps tasks, designed to boost daily productivity.",
    technologies: ["Python", "Go", "CLI", "SRE", "Automation", "Bash"],
    github_url: "https://github.com/WBHankins93/python-go-sre-utils",
    image_url: "",
    category: "automation",
    featured: true
  },
  {
    id: "att-watsonxai-integration",
    name: "AT&T Watsonx.ai Integration",
    description:
      "Enhanced customer service capabilities for AT&T by integrating IBM's watsonx.ai into their Connected Solutions platform, enabling advanced, AI-driven analytics and support.",
    technologies: ["Watsonx.ai", "IBM Cloud", "Openshift", "Next.js", "Integration", "API"],
    github_url: "",
    image_url: "",
    category: "automation",
    featured: true
  },
  {
    id: "go-restful-api",
    name: "Go RESTful API",
    description:
      "A backend API built with Go, using the Mux router for handling requests and GORM for database interactions. A personal project to explore backend development with Go.",
    technologies: ["Go", "API", "Mux", "GORM", "Backend"],
    github_url: "",
    image_url: "",
    category: "automation",
    featured: false,
    draft: true
  },
  {
    id: "python-pr-summary-bot",
    name: "Python PR Summary Bot",
    description:
      "Developed Python scripts to summarize Terraform 'plan' output and post clean summaries in Pull Request comments, improving transparency and reducing review friction for the engineering team.",
    technologies: ["Python", "GitHub Actions", "Terraform", "API"],
    github_url: "https://github.com/WBHankins93/tf-plan-checker",
    image_url: "",
    category: "ci-cd",
    featured: true
  },
  {
    id: "deployment-patterns",
    name: "deployment-patterns",
    description:
      "Reference implementations of blue/green, canary, and GitOps flows with scripts and concise guides.",
    technologies: ["Blue/Green", "Canary", "GitOps", "Helm", "Argo CD", "CI/CD"],
    github_url: "https://github.com/WBHankins93/deployment-patterns",
    image_url: "",
    category: "ci-cd",
    featured: true
  },
  {
    id: "gcp-gke-gitops",
    name: "gcp-gke-gitops",
    description:
      "GitOps-driven GKE deployment framework using Argo CD and Terraform with environment overlays.",
    technologies: ["GCP", "GKE", "Terraform", "Argo CD", "Kubernetes", "GitOps"],
    github_url: "https://github.com/WBHankins93/gcp-gke-gitops",
    image_url: "",
    category: "cloud",
    featured: true
  },
  {
    id: "mlops-sre-mini",
    name: "mlops-sre-mini",
    description:
      "Train a model, serve via FastAPI, deploy with Helm, monitor with Prometheus/Grafana, and automate CI/CD.",
    technologies: ["MLOps", "FastAPI", "Docker", "Helm", "Prometheus", "Grafana"],
    github_url: "https://github.com/WBHankins93/mlops-sre-mini",
    image_url: "",
    category: "monitoring",
    featured: true
  }
];
