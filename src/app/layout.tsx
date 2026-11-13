import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SITE_URL, site } from "@/content/site";

// Self-hosted (handoff section 5). Files come from @fontsource, latin subset.
const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});
const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin-500-normal.woff2",
  weight: "500",
  variable: "--font-jetbrains",
  display: "swap",
});
const grotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-grotesk",
  display: "swap",
});
const dmSerif = localFont({
  src: "./fonts/dm-serif-display-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
  preload: false,
});

const TITLE = `${site.name}: ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Ben Hankins",
    "Full Stack Engineer",
    "South Louisiana",
    "New Orleans",
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
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: site.name,
    title: TITLE,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
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

export const viewport: Viewport = {
  themeColor: "#06120f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Font variables go on <html> so the @theme tokens in globals.css,
    // which resolve at :root, can see them.
    <html lang="en" className={`${anton.variable} ${jetbrains.variable} ${grotesk.variable} ${dmSerif.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
