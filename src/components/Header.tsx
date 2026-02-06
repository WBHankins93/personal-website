// components/Header.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#footer" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "h-16 md:h-20",
        isScrolled || isMenuOpen
          ? "bg-white/80 dark:bg-zinc-900/70 backdrop-blur border-b border-black/5 dark:border-white/10"
          : "bg-transparent",
        "transition-colors duration-300",
        "pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
      ].join(" ")}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
        {/* LEFT: logo + name grouped */}
        <a
          href="#home"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
          aria-label="Go to home"
        >
          <Image
            src="/b-logo-refined.png"
            alt="Ben Hankins logo"
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-xl ring-1 ring-black/10 dark:ring-white/20 shadow-sm"
            priority
          />
          <span className="text-xl md:text-2xl font-bold gradient-text">
            Ben Hankins
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-slate-700 hover:text-emerald-600 transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle (stays far right) */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile sheet */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-left text-slate-700 hover:text-orange-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
