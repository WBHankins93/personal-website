// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Space_Grotesk, Source_Sans_3, Sixtyfour, JetBrains_Mono } from "next/font/google";
import FluidBlobWrapper from "@/components/FluidBlobWrapper";

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

const sixtyfour = Sixtyfour({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sixtyfour',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const siteDescription =
  "Solutions Architect helping enterprise teams solve complex cloud and platform challenges. Expert in technical pre-sales, proof-of-concept delivery, and infrastructure automation across AWS, GCP, and multi-cloud environments.";

export const metadata: Metadata = {
  metadataBase: new URL("https://benhankins.vercel.app"),
  title: "Ben Hankins | Solutions Architect & Technical Strategist",
  description: siteDescription,
  openGraph: {
    title: "Ben Hankins | Solutions Architect & Technical Strategist",
    description: siteDescription,
    url: "/",
    siteName: "Ben Hankins",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/projects/personal-website.jpg",
        width: 1200,
        height: 750,
        alt: "Ben Hankins portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ben Hankins | Solutions Architect & Technical Strategist",
    description: siteDescription,
    images: ["/projects/personal-website.jpg"],
  },
  icons: {
    icon: "/b-logo-updated-photoroom.png",
    shortcut: "/b-logo-updated-photoroom.png",
    apple: "/b-logo-updated-photoroom.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${sourceSans3.variable} ${jetbrainsMono.variable} ${sixtyfour.variable} antialiased`}
      >
        <FluidBlobWrapper />
        {children}
      </body>
    </html>
  );
}
