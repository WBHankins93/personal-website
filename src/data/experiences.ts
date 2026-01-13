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
    note: "2-person team, platform reliability and operational readiness",
    highlights: [
      { icon: "Award", text: "SOC 2: 34% to 100%", metric: true },
      { icon: "TrendingUp", text: "99.9% uptime maintained", metric: true },
      { icon: "Code", text: "80% faster deployments", metric: true }
    ],
    achievements: [
      "Owned platform reliability, infrastructure, and CI/CD across multi-cluster Kubernetes environments supporting production services.",
      "Led SOC 2 Type II readiness from 34% to 100%, unblocking enterprise sales by meeting security and compliance requirements.",
      "Reduced deployment time by 80% using GitHub Actions while maintaining 99.9% uptime across four production environments.",
      "Improved incident detection and response by 60% through redesigned observability using Vector and OpenSearch."
    ],
    technologies: [
      "AWS",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Helm",
      "SOC 2",
      "Vector",
      "OpenSearch",
      "Python"
    ]
  },
  {
    title: "Founder and Technical Consultant",
    company: "Sproutflow Studio",
    period: "Nov 2024 - Present",
    location: "New Orleans, LA",
    logo: null,
    type: "side-business",
    note: "Founder, selective client engagements",
    highlights: [
      { icon: "Users", text: "5 clients served", metric: true },
      { icon: "CheckCircle", text: "100% on-time delivery", metric: true },
      { icon: "TrendingUp", text: "Measured business impact", metric: true }
    ],
    achievements: [
      "Founded and operate a technical consulting practice to remain hands-on in customer engagement and delivery, selectively serving clients using enterprise discovery and delivery methods.",
      "Owned full engagement lifecycle including discovery, solution design, development, delivery, and ongoing customer support.",
      "Delivered measurable outcomes including a 50% increase in lead generation, zero-to-traction product launches, Shopify-based brand store redesigns gaining early traction, and 30% customer acquisition growth."
    ],
    technologies: [
      "TypeScript",
      "Next.js",
      "React",
      "Solutions Engineering",
      "Technical Discovery",
      "Account Management",
      "Customer Success"
    ]
  },
  {
    title: "Senior Solutions Engineer - Infrastructure",
    company: "IBM",
    period: "March 2022 - Aug 2024",
    location: "Remote",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    type: "past",
    note: "Expanded scope within Client Engineering, customer-facing infrastructure ownership",
    highlights: [
      { icon: "Award", text: "$10.1M SAP RISE win", metric: true },
      { icon: "Users", text: "12 enterprise clients", metric: true },
      { icon: "TrendingUp", text: "20+ environments deployed", metric: true }
    ],
    achievements: [
      "Served as technical lead for CenterPoint Energy’s SAP RISE evaluation, designing Terraform automation that scaled environments from 2 to 49 and supported a $10.1M enterprise win.",
      "Acted as technical advisor across 12 enterprise accounts, owning architecture from discovery through production deployment and ongoing optimization.",
      "Established Terraform and GitOps standards across 20+ enterprise environments, replacing manual provisioning with automated delivery workflows.",
      "Led architecture workshops with senior stakeholders, translating infrastructure capabilities into business outcomes such as faster time-to-market, cost optimization, and risk reduction."
    ],
    technologies: [
      "Multi-cloud",
      "Terraform",
      "Kubernetes",
      "GitOps",
      "Solutions Architecture",
      "Enterprise Accounts",
      "CI/CD"
    ]
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
      { icon: "Users", text: "Mentored 8 engineers", metric: true }
    ],
    achievements: [
      "Maintained approximately 70% POC close rate by driving technical strategy and validation using reusable Kubernetes frameworks that reduced time-to-value by 40%.",
      "Delivered executive architecture workshops and technical presentations for enterprise stakeholders across manufacturing, telecom, and energy sectors.",
      "Mentored eight Solutions Engineers across two cohorts, contributing to three promotions and two performance awards."
    ],
    technologies: [
      "Pre-Sales",
      "Technical Leadership",
      "Kubernetes",
      "OpenShift",
      "Argo CD",
      "Tekton",
      "Customer Success"
    ]
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
      "Delivered technical pre-sales support across the full sales lifecycle, consistently driving strong customer outcomes and earning promotion within 14 months."
    ],
    technologies: [
      "Pre-Sales",
      "Technical Consultation",
      "Kubernetes",
      "OpenShift",
      "GitOps",
      "Argo CD",
      "Customer Success"
    ]
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
      { icon: "Award", text: "Production delivery", metric: false },
      { icon: "TrendingUp", text: "SDLC ownership", metric: false }
    ],
    achievements: [
      "Built and delivered a Vue-based Chrome extension for recruiter workflows, owning the full software development lifecycle.",
      "Shipped production features that remain in use by Kortivity customers."
    ],
    technologies: [
      "Vue.js",
      "JavaScript",
      "Chrome Extensions",
      "Full-Stack Development"
    ]
  }
];
