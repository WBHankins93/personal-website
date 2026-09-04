// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Old_Standard_TT, Work_Sans, Space_Mono } from "next/font/google";

// Old Standard TT — a genuine 19th-century encyclopedia serif — is now
// reserved for exactly two signature spots per the round-3 feedback: the
// hero name and the stat numbers. Everywhere else that used to reach for
// it (section headings, card titles, buttons, nav) moved to Work Sans, so
// this one dominant sans + one reserved serif accent reads as consistent
// rather than "everything is the fancy font." (Same pattern PitchBook uses:
// one sans family throughout, a serif reserved for a single H1 moment.)
const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

// Work Sans is now the site's workhorse typeface — nav, headings, card
// titles, buttons, and body copy all run through it, with weight (not a
// font-family switch) doing the work of hierarchy. Loads the full working
// range used across the site: 400 body, 500 medium labels/links, 600
// semibold subheads/CTAs, 700 bold headings.
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

// Space Mono is the spec default for anything data-shaped (eyebrows, stat
// labels, FIG. tags, the terminal moment), replacing JetBrains Mono.
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const SITE_URL = "https://www.benhankins.dev";
const TITLE = "Ben Hankins: Solutions Engineer & Software Builder";
const DESCRIPTION =
  "Ben Hankins is a Solutions Engineer who builds production software and living technical systems, including Greenlit, Business Plan Writer, and Solutions Playbook.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Ben Hankins",
  },
  description: DESCRIPTION,
  applicationName: "Ben Hankins",
  authors: [{ name: "Ben Hankins", url: SITE_URL }],
  creator: "Ben Hankins",
  publisher: "Ben Hankins",
  keywords: [
    "Ben Hankins",
    "Solutions Engineer",
    "Sales Engineer",
    "Forward Deployed Engineer",
    "cloud infrastructure",
    "Kubernetes",
    "platform engineering",
    "AI engineering",
    "Next.js",
    "TypeScript",
    "enterprise architecture",
    "technical pre-sales",
    "software builder",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Ben Hankins",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/b-logo-updated-photoroom.png",
    shortcut: "/b-logo-updated-photoroom.png",
    apple: "/b-logo-updated-photoroom.png",
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light" as const,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${oldStandardTT.variable} ${workSans.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
