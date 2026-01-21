

// /data/experiences.ts

export const experiencesData = [
  {
    title: "Site Reliability Engineer (SRE) / DevOps Engineer",
    company: "Prove AI",
    period: "Jan 2025 – Sep 2025",
    location: "Remote (US)",
    type: "current",
    // Update these logo paths to match your project structure (or remove)
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ef8062d24_image.png",
    note: "2-person infra team • production ownership",
    highlights: [
      { icon: "CheckCircle", text: "99.9% uptime (multi-cluster)", metric: true },
      { icon: "Zap", text: "80% faster deployments", metric: true },
      { icon: "Shield", text: "SOC 2 Type II readiness", metric: false }, // NOTE: 'Shield' is NOT in iconMap. Use one that exists:
      // We'll fix it below by changing to "Award"
      // Keeping this comment for clarity.
      { icon: "Award", text: "SOC 2 Type II readiness", metric: true },
      { icon: "TrendingUp", text: "60% lower MTTD", metric: true },
    ],
    achievements: [
      "Owned production reliability, cloud infrastructure, and CI/CD for multi-cluster Kubernetes environments; sustained 99.9% uptime while reducing deployment time by ~80%.",
      "Led SOC 2 Type II operational readiness from 34% to 100%, unblocking enterprise security and compliance requirements.",
      "Redesigned observability using Vector + OpenSearch, reducing mean time to detection by ~60% through error-focused logging and improved signal quality.",
      "Built automation tooling + runbooks that reduced developer onboarding time by ~50% and improved incident response consistency.",
    ],
    technologies: [
      "Kubernetes",
      "AWS",
      "Terraform",
      "Docker",
      "CI/CD",
      "Vector",
      "OpenSearch",
      "SOC 2",
      "Linux",
      "SRE",
    ],
  },

  {
    title: "Senior Cloud Engineer / Cloud Infrastructure Engineer",
    company: "IBM",
    period: "Feb 2021 – Aug 2024",
    location: "Remote (US)",
    type: "past",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    note: "Promotion path • customer-facing cloud delivery",
    highlights: [
      { icon: "TrendingUp", text: "$10.1M SAP RISE engagement", metric: true },
      { icon: "Zap", text: "Provisioning: weeks → <3 hours", metric: true },
      { icon: "Users", text: "12+ strategic enterprise accounts", metric: false },
      { icon: "Rocket", text: "POC → production platforms", metric: false },
      { icon: "Code", text: "Kubernetes + Terraform + GitOps", metric: false },
    ],
    achievements: [
      "Led technical delivery for CenterPoint Energy’s 11-month SAP RISE evaluation ($10.1M contract); ran daily architecture calls/workshops and built Terraform automation that cut environment provisioning from 2+ weeks to under 3 hours.",
      "Owned multi-cloud Kubernetes/OpenShift platform delivery across AWS, GCP, and IBM Cloud, supporting regulated enterprise environments with strict networking, security, and compliance requirements.",
      "Designed GitOps delivery workflows (Argo CD/Tekton) and reusable platform patterns that improved build consistency and reduced POC build times by ~40%.",
      "Served as technical advisor for 12 enterprise clients (e.g., AT&T, CenterPoint Energy, Pepsi, NBCUniversal), driving discovery → architecture → deployment → optimization and long-term platform adoption.",
      "Partnered with cross-functional SE/AE teams on customer-facing technical strategy and executive workshops, translating platform capabilities into outcomes (time-to-market, reliability, risk reduction, cost).",
    ],
    technologies: [
      "Kubernetes",
      "OpenShift",
      "Terraform",
      "Argo CD",
      "Tekton",
      "Helm",
      "Ansible",
      "AWS",
      "GCP",
      "IBM Cloud",
      "VPC",
      "Linux",
    ],
  },

  {
    title: "Cloud Engineer",
    company: "IBM",
    period: "Dec 2019 – Feb 2021",
    location: "Austin, TX",
    type: "past",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    note: "Foundation years • platform + delivery",
    highlights: [
      { icon: "Target", text: "POC delivery + technical validation", metric: false },
      { icon: "Rocket", text: "Customer environments (real constraints)", metric: false },
      { icon: "Code", text: "OpenShift / container platforms", metric: false },
      { icon: "Users", text: "Stakeholder alignment", metric: false },
    ],
    achievements: [
      "Built and deployed OpenShift/Kubernetes environments for customer demos and constrained enterprise scenarios (private networking, restricted egress, security controls).",
      "Supported technical discovery and solution validation for early-stage platform engagements, bridging customer requirements into implementable infrastructure plans.",
      "Strengthened fundamentals in cloud networking, IAM/RBAC, delivery workflows, and Kubernetes operations through hands-on platform builds and troubleshooting.",
    ],
    technologies: [
      "OpenShift",
      "Kubernetes",
      "Docker",
      "Linux",
      "CI/CD",
      "Networking",
      "IAM/RBAC",
      "Helm",
    ],
  },

  {
    title: "Founder / Technical Consultant",
    company: "Sproutflow Studio",
    period: "Late 2024 – Present",
    location: "Remote",
    type: "side-business",
    logo: "/public/logo-design-Photoroom.png",
    note: "Full-stack web platforms (separate from cloud track)",
    highlights: [
      { icon: "Briefcase", text: "Client delivery + consulting", metric: false },
      { icon: "Code", text: "TypeScript / Next.js builds", metric: false },
      { icon: "Sparkles", text: "Design → build → deploy", metric: false },
      { icon: "Target", text: "Production launches", metric: true },
    ],
    achievements: [
      "Built and deployed full-stack websites/platforms for small business clients using TypeScript, React, and Next.js.",
      "Owned end-to-end delivery: scoping, implementation, deployments, and iteration based on customer feedback.",
      "Kept the work intentionally separate from my cloud engineering brand while reinforcing a strong delivery rhythm and customer outcomes mindset.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Vercel",
      "Postgres",
      "Tailwind",
    ],
  },
] as const;
