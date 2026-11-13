// Site-wide copy and links. Facts only: see docs/redesign-bayou/HANDOFF.md
// section 8. Anything marked TODO(ben) is a placeholder waiting on Ben.

export const SITE_URL = "https://www.benhankins.dev";

export const site = {
  name: "Ben Hankins",
  role: "Full Stack Engineer",
  place: "South Louisiana",
  // TODO(ben): confirm or replace the hero tagline (handoff 12.6).
  tagline: "I write software in South Louisiana, usually louder than necessary.",
  description:
    "Ben Hankins is a Full Stack Engineer in South Louisiana. Selected work, the career trail from 2018 to now, and what happens outside the editor.",
  coordinates: "29.98°N 90.15°W · Metairie, Louisiana",
  email: "benhankins.work@gmail.com",
  github: "https://github.com/WBHankins93",
  linkedin: "https://www.linkedin.com/in/ben-hankins/",
  resume: "/Ben_Hankins_FDE_Resume.pdf",
} as const;

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Trail", href: "#trail" },
  { label: "Off the clock", href: "#off-the-clock" },
  { label: "Contact", href: "#contact" },
] as const;

/** Ticker band under the hero (handoff 7.2). */
export const stack = [
  "TypeScript",
  "Next.js",
  "React",
  "Node",
  "Python",
  "Go",
  "Postgres",
  "Kubernetes",
  "Terraform",
  "AWS",
] as const;

/** Featured card in the hero, painted mode only (handoff 7.1). */
export const featured = {
  eyebrow: "Just shipped",
  title: "Pre-Sales Field Kit",
  cta: "On Gumroad now",
  /** Slug in content/projects.ts. The card uses that project's link once it has one. */
  project: "pre-sales-field-kit",
} as const;

export const conservationLine =
  "Working to partner with a local wildlife conservation group. More here soon.";
