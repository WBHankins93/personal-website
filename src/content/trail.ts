// The Trail. Oldest first; the map draws them left to right and the phone
// layout reverses the list. Dates, roles and bullets come from handoff
// section 8, which matches the résumé in public/.
//
// TODO(ben): approve the detail bullets before they ship (handoff 12.7).
// Do not add client names or figures beyond these without his sign-off, and
// do not name the new employer: the trail ends at "Next summit".

export interface TrailStop {
  id: string;
  years: string;
  /** Year printed on the axis under the marker. */
  axisYear: string;
  name: string;
  /** Short role for the map label. */
  role: string;
  /** Full role for the detail card and the phone layout. */
  roleLong: string;
  bullets: string[];
  stack: string[];
  summit?: boolean;
}

export const trail: TrailStop[] = [
  {
    id: "general-assembly",
    years: "2018",
    axisYear: "2018",
    name: "General Assembly",
    role: "Bootcamp · trailhead",
    roleLong: "Software Engineering Bootcamp · trailhead",
    bullets: [],
    stack: [],
  },
  {
    id: "kortivity",
    years: "2019",
    axisYear: "2019",
    name: "Kortivity",
    role: "Front End Dev",
    roleLong: "Front End Developer (contract)",
    bullets: ["Built a Vue-based Chrome extension for recruiters."],
    stack: ["Vue", "Chrome extension"],
  },
  {
    id: "ibm",
    years: "2019 to 2024",
    axisYear: "2019",
    name: "IBM",
    role: "Client Engineering · 3 roles",
    roleLong: "Client Engineering · 3 roles",
    bullets: [
      "Client Technical Specialist (Dec 2019 to Jan 2021), Cloud Engineer (Feb 2021 to Mar 2023), Cloud Infrastructure Engineer (Apr 2023 to Aug 2024).",
      "Wrote Terraform and OpenShift automation.",
      "Scaled a utility deployment from 2 to 49 OpenShift environments.",
    ],
    stack: ["Terraform", "OpenShift"],
  },
  {
    id: "prove-ai",
    years: "2025",
    axisYear: "2025",
    name: "Prove AI",
    role: "Site Reliability Eng",
    roleLong: "Site Reliability Engineer",
    bullets: [
      "Took SOC 2 Type II from a 34% baseline to a passed audit in six months.",
      "Ran 4 Kubernetes clusters.",
      "Built CI/CD with GitHub Actions and Helm.",
    ],
    stack: ["Kubernetes", "GitHub Actions", "Helm"],
  },
  {
    id: "sproutflow",
    years: "2025 to now",
    axisYear: "2025",
    name: "Sproutflow Studio",
    role: "Founder",
    roleLong: "Founder",
    bullets: ["Next.js sites and production support for New Orleans small businesses."],
    stack: ["Next.js"],
  },
  {
    id: "next-summit",
    years: "2026",
    axisYear: "2026",
    name: "Next summit",
    role: "New chapter · details soon",
    roleLong: "New chapter, details soon",
    bullets: [],
    stack: [],
    summit: true,
  },
];
