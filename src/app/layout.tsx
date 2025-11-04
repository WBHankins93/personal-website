// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Space_Grotesk, Source_Sans_3, Sixtyfour, JetBrains_Mono } from "next/font/google";

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

export const metadata: Metadata = {
  title: "Ben Hankins | Solutions Engineer & Cloud Infrastructure Specialist",
  description: "Solutions Engineer helping enterprise teams solve complex cloud and platform challenges. Expert in technical pre-sales, proof-of-concept delivery, and infrastructure automation across AWS, GCP, and multi-cloud environments.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${sourceSans3.variable} ${jetbrainsMono.variable} ${sixtyfour.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}