// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Old_Standard_TT, Work_Sans, Space_Mono } from "next/font/google";

// v3 "specimen and signal" type system (docs/DESIGN.md): Old Standard TT
// replaces Space Grotesk for display type — a genuine 19th-century
// encyclopedia serif instead of one of the two default AI-tool display
// faces the live-site audit flagged. Both weights are loaded since the
// spec uses 700 for headlines and 400 italic for the one whimsical accent
// line per page.
const oldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
});

// Work Sans replaces Source Sans 3 for body copy — optional polish per the
// spec, cheap enough to take here.
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
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
