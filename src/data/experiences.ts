export interface ExperienceData {
  title: string;
  company: string;
  period: string;
  location: string;
  logo: string | null;
  type: "current" | "past" | "side-business";
  note?: string;
  highlights: {
    icon: string;
    text: string;
    metric: boolean;
  }[];
  achievements: string[];
  technologies: string[];
}

export const experiencesData: ExperienceData[] = [
  {
    title: "Site Reliability Engineer",
    company: "Prove AI",
    period: "Jan 2025 - Sept 2025",
    location: "Remote",
    logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ef8062d24_image.png",
    type: "past",
    note: "Contract role to deepen technical expertise",
    highlights: [
      { icon: "Award", text: "SOC 2: 34% → 100%", metric: true },
      { icon: "TrendingUp", text: "99.9% uptime maintained", metric: true },
      { icon: "Code", text: "80% faster deployments", metric: true }
    ],
    achievements: [
      "Led SOC 2 Type II readiness from 34% to 100%, establishing control frameworks and documentation that enabled successful audit. Security compliance often decides enterprise deals.",
      "Built production infrastructure automation with Terraform and GitHub Actions, cutting deployment time 80% across 4 environments.",
      "Maintained 99.9% uptime for customer-facing services with comprehensive secret management and least-privilege access.",
      "Redesigned observability using Vector and OpenSearch, reducing production issue detection time by 60%.",
      "Created developer tooling that cut new engineer onboarding time by 50%."
    ],
    technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Helm", "SOC 2", "Vector", "OpenSearch", "Python"]
  },
  {
    title: "Founder & CEO",
    company: "Sproutflow Studio",
    period: "Nov 2024 - Present",
    location: "New Orleans, LA",
    logo: null,
    type: "side-business",
    note: "Side Business",
    highlights: [
      { icon: "Briefcase", text: "Entrepreneurial venture", metric: false },
      { icon: "Palette", text: "Full-stack delivery", metric: false }
    ],
    achievements: [
      "Founded web design studio serving small businesses as side venture alongside Solutions Engineering job search.",
      "Manage full customer lifecycle: discovery, requirements gathering, design, development, and launch.",
      "Built personal portfolio site as proof-of-concept, which landed first paying client.",
      "Demonstrates consultative discovery, technical scoping, project management, and stakeholder communication.",
      "Paused Jan-Sep 2025 during SRE contract, relaunched Sept 2025."
    ],
    technologies: ["TypeScript", "Next.js", "React", "Node.js", "Full-Stack", "Web Design", "Customer Solutions", "Entrepreneurship"]
  },
  {
    title: "Cloud Infrastructure Engineer",
    company: "IBM",
    period: "Feb 2022 - Aug 2024",
    location: "Remote",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    highlights: [
      { icon: "Award", text: "$10.1M deal closed", metric: true },
      { icon: "Users", text: "12 enterprise clients", metric: true },
      { icon: "TrendingUp", text: "85% faster setup", metric: true }
    ],
    achievements: [
      "Technical advisor for 12 enterprise clients across energy, financial services, and healthcare, managing full lifecycle from discovery through production.",
      "Served as technical lead for CenterPoint Energy's 11-month SAP RISE evaluation ($10.1M contract). Designed VPC automation that reduced environment provisioning from 2+ weeks to under 3 hours—speed improvement was a key differentiator. Project expanded into multi-year engagement.",
      "Partnered with Solutions Engineers during sales cycles, delivering presentations and POCs that demonstrated feasibility.",
      "Architected multi-cluster Kubernetes solutions with network policies, service mesh, and compliance controls.",
      "Provided ongoing guidance and optimization to ensure customer success."
    ],
    technologies: ["Multi-cloud", "Terraform", "Kubernetes", "Service Mesh", "Solutions Architecture", "Client Delivery", "Pre-Sales"]
  },
  {
    title: "Senior Solutions Engineer",
    company: "IBM",
    period: "Feb 2021 - Feb 2022",
    location: "Austin, TX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    note: "Promoted after 14 months",
    highlights: [
      { icon: "Users", text: "15+ presentations", metric: true },
      { icon: "TrendingUp", text: "Team leadership", metric: false },
      { icon: "Zap", text: "40% faster POCs", metric: true }
    ],
    achievements: [
      "Promoted to senior role after 14 months of exceptional performance.",
      "Led enterprise sales cycles with C-level presentations across manufacturing, telecom, and energy sectors.",
      "Mentored 8 junior Solutions Engineers across two cohorts (Spring & Fall 2021). Weekly standups focused on dissecting customer calls and handling objections. 3 earned promotions, 2 received performance awards within 12 months.",
      "Reduced POC build times 40% through reusable automation—faster POCs mean faster deal cycles.",
      "Architected OpenShift platforms with GitOps workflows (Argo CD, Tekton) supporting full sales lifecycle."
    ],
    technologies: ["Pre-Sales", "Technical Leadership", "Kubernetes", "OpenShift", "Argo CD", "Tekton", "Team Mentorship", "Customer Success"]
  },
  {
    title: "Solutions Engineer",
    company: "IBM",
    period: "Dec 2019 - Feb 2021",
    location: "Austin, TX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    highlights: [
      { icon: "Rocket", text: "Technical pre-sales", metric: false },
      { icon: "CheckCircle", text: "Full sales lifecycle", metric: false },
      { icon: "Target", text: "80% POC conversion", metric: true }
    ],
    achievements: [
      "Primary technical resource for enterprise prospects throughout sales process.",
      "Built POC environments and product demonstrations driving purchasing decisions.",
      "Implemented GitOps workflows showcasing platform capabilities for customer use cases.",
      "Provided post-sales support and customer enablement through training and workshops.",
      "Promoted to Senior Solutions Engineer after 14 months based on exceptional customer feedback."
    ],
    technologies: ["Pre-Sales", "Technical Consultation", "Kubernetes", "OpenShift", "GitOps", "Argo CD", "Customer Success"]
  },
  {
    title: "Web Developer",
    company: "Kortivity",
    period: "May 2019 - Dec 2019",
    location: "Austin, TX",
    logo: null,
    type: "past",
    highlights: [
      { icon: "Code", text: "Full-stack development", metric: false },
      { icon: "Award", text: "Production deployment", metric: false },
      { icon: "TrendingUp", text: "SDLC ownership", metric: false }
    ],
    achievements: [
      "Built Chrome extension using Vue.js for recruiter talent database, managing complete SDLC.",
      "Contributed to product currently in production with Kortivity clients."
    ],
    technologies: ["Vue.js", "Chrome Extension", "JavaScript", "Full-Stack"]
  }
];