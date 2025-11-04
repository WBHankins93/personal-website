// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// NEW: Industrial Heritage with Human Touch font combination
import { Titillium_Web, Source_Sans_3, Sixtyfour, Roboto_Mono } from "next/font/google";

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${titilliumWeb.variable} ${sourceSans3.variable} ${robotoMono.variable} ${sixtyfour.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}