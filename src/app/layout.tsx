// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Space_Grotesk, Source_Sans_3, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const SITE_URL = "https://www.benhankins.dev";
const TITLE = "Ben Hankins: Solutions Engineer & Software Builder";
const DESCRIPTION =
  "Ben Hankins is a Solutions Engineer who builds production software. 7+ years across enterprise architecture, cloud infrastructure, and customer-facing engineering, with shipped products like Greenlit and Clipboard to show for it.";

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
    // TODO: Confirm whether GTM Engineer should remain, or be replaced with Solutions Architect.
    "GTM Engineer",
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
        className={`${spaceGrotesk.variable} ${sourceSans3.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
