// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import { Manrope, Open_Sans, Fira_Code } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",  // 👈 This matches Tailwind config
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-body",     // 👈 Matches Tailwind config
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",     // 👈 Matches Tailwind config
});

export const metadata: Metadata = {
  title: "Ben Hankins | SRE & DevOps Engineer",
  description: "Experienced infrastructure engineer...",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${openSans.variable} ${firaCode.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
