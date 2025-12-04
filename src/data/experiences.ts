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
      "Led SOC 2 Type II compliance readiness from 34% to 100%, directly unblocking enterprise sales by meeting strict security vendor requirements.",
      "Maintained 99.9% uptime across 4 production Kubernetes clusters while reducing deployment time by 80% through GitHub Actions automation.",
      "Improved incident response by 60% via error-focused observability dashboards (Vector, OpenSearch)."
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
      "Founded and operate technical consultancy serving 5 clients, applying enterprise Solutions Engineering methodology to small business engagements.",
      "Manage complete customer lifecycle: technical discovery, solution design, custom platform development (TypeScript/Next.js/React), and ongoing account management.",
      "Delivered 100% of projects on-time and within budget with measurable business outcomes: 50% lead generation increase (psychiatry), zero-to-traction launch (event decor), 30% customer acquisition growth (pool services)."
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
      "Contributed infrastructure automation to CenterPoint Energy's $10.1M SAP RISE win by designing Terraform framework that scaled environments from 2 to 49, creating competitive differentiation during 11-month vendor evaluation.",
      "Owned technical relationships across 12 strategic enterprise accounts (AT&T, CenterPoint Energy, Pepsi, NBC Universal, Cencora, Citibank, RBC), managing full customer lifecycle from discovery through production expansion.",
      "Designed and deployed scalable infrastructure across 20+ enterprise environments, reducing deployment cycles from manual to automated workflows using Terraform and GitOps.",
      "Partnered with Solutions Engineering throughout sales cycles, delivering technical workshops and architecture presentations to C-level stakeholders that accelerated adoption."
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
      "Achieved 70% close rate on enterprise POCs by architecting reusable Kubernetes deployment frameworks that reduced customer time-to-value by 40%.",
      "Delivered technical presentations and solution workshops to C-level stakeholders across manufacturing, telecom, and energy sectors, accelerating purchase decisions.",
      "Led technical enablement for 8-person engineering cohort through weekly mentorship sessions, contributing to 3 promotions and 2 performance awards within 12 months."
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
      "Earned promotion to Senior Solutions Engineer after 14 months based on strong customer feedback, high win rate, and technical excellence in POC delivery."
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