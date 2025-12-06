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
      "Drove SOC 2 Type II readiness from 34% → 100%, unblocking enterprise sales.",
      "Maintained 99.9% uptime across 4 Kubernetes clusters and cut deployment times 80% with GitHub Actions.",
      "Improved incident response 60% using focused observability dashboards (Vector, OpenSearch)."
    ],
    technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Helm", "SOC 2", "Vector", "OpenSearch", "Python"]
  },
  {
    title: "Founder & Technical Consultant",
    company: "Sproutflow Studio",
    period: "Nov 2024 - Present",
    location: "New Orleans, LA",
    logo: null,
    type: "side-business",
    note: "Side Business",
    highlights: [
      { icon: "Users", text: "5 clients served", metric: true },
      { icon: "CheckCircle", text: "100% on-time delivery", metric: true },
      { icon: "TrendingUp", text: "Measurable business outcomes", metric: true }
    ],
    achievements: [
      "Operate technical consultancy serving 5 clients using enterprise SE practices.",
      "Own full lifecycle: discovery, design, development (TypeScript/Next.js), delivery, and account management.",
      "Delivered 100% on-time projects with measurable impact: 50% more leads, zero-to-launch delivery, and 30% acquisition growth."
    ],
    technologies: ["TypeScript", "Next.js", "React", "Solutions Engineering", "Technical Discovery", "Account Management", "Customer Success"]
  },
  {
    title: "Cloud Infrastructure Engineer",
    company: "IBM",
    period: "March 2022 - Aug 2024",
    location: "Remote",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    highlights: [
      { icon: "Award", text: "$10.1M deal closed", metric: true },
      { icon: "Users", text: "12 enterprise clients", metric: true },
      { icon: "TrendingUp", text: "20+ environments deployed", metric: true }
    ],
    achievements: [
      "Built Terraform automation scaling SAP RISE environments 2 → 49, contributing to a $10.1M win.",
      "Owned technical leadership across 12 enterprise accounts from discovery through expansion.",
      "Delivered 20+ cloud environments, replacing manual work with Terraform and GitOps automation.",
      "Supported SE teams with workshops and C-level architecture sessions to accelerate adoption."
    ],
    technologies: ["Multi-cloud", "Terraform", "Kubernetes", "GitOps", "Solutions Architecture", "Enterprise Accounts", "CI/CD"]
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
      { icon: "Target", text: "70% close rate", metric: true },
      { icon: "TrendingUp", text: "40% faster POCs", metric: true },
      { icon: "Users", text: "Team mentorship", metric: false }
    ],
    achievements: [
      "Achieved 70% POC close rate using reusable Kubernetes frameworks that cut time-to-value 40%.",
      "Delivered workshops and technical presentations to C-level leaders across key industries.",
      "Led enablement for 8 engineers, contributing to 3 promotions and 2 performance awards."
    ],
    technologies: ["Pre-Sales", "Technical Leadership", "Kubernetes", "OpenShift", "Argo CD", "Tekton", "Team Mentorship", "Customer Success"]
  },
  {
    title: "Solutions Engineer",
    company: "IBM",
    period: "Dec 2019 - Jan 2021",
    location: "Austin, TX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    highlights: [
      { icon: "Rocket", text: "Technical pre-sales", metric: false },
      { icon: "CheckCircle", text: "Full sales lifecycle", metric: false },
      { icon: "Award", text: "Promoted after 14 months", metric: true }
    ],
    achievements: [
      "Promoted in 14 months for strong customer results, high win rates, and consistent technical delivery."
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
      "Built a Vue-based Chrome extension for recruiter workflows, owning the full SDLC.",
      "Delivered production features currently used by Kortivity clients."
    ],
    technologies: ["Vue.js", "Chrome Extension", "JavaScript", "Full-Stack"]
  }
];
