'use client';

// components/Header.tsx
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SPRING } from "@/lib/animation-configs/spring";
import { TIMING } from "@/lib/animation-configs/timing";
import { EASE } from "@/lib/animation-configs/ease";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const prefersReducedMotion = useReducedMotion();
  const { isScrolled, scrollDirection } = useScrollTrigger(8);
  
  // Track active section for nav highlighting
  useEffect(() => {
    const sectionIds = ['home', 'about', 'experience', 'projects', 'footer'];
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (sectionIds.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id) || document.querySelector(`#${id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);
  
  // Hide/show header based on scroll direction
  const shouldShow = scrollDirection === 'up' || !isScrolled || isMenuOpen;
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { label: "Home", href: "#home", id: "home" },
    { label: "About", href: "#about", id: "about" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#footer", id: "footer" },
  ];

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: TIMING.fast / 1000,
        ease: EASE.easeInOut,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: TIMING.normal / 1000,
        ease: EASE.easeInOut,
      },
    },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: TIMING.fast / 1000,
        ease: EASE.easeInOut,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            transition={{ duration: TIMING.fast / 1000 }}
          />
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
        initial={false}
        animate={{
          y: prefersReducedMotion || shouldShow ? 0 : -100,
          opacity: prefersReducedMotion || shouldShow ? 1 : 0,
        }}
        transition={SPRING.snappy}
        className={[
          "fixed inset-x-0 top-0 z-50",
          "h-16 md:h-20",
          isScrolled || isMenuOpen
            ? "bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border-b border-black/5 dark:border-white/10"
            : "bg-transparent",
          "transition-colors duration-300",
          "pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]",
        ].join(" ")}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-6">
          {/* LEFT: logo + name grouped */}
          <motion.a
            href="#home"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity"
            aria-label="Go to home"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            transition={SPRING.gentle}
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
          </motion.a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="relative text-slate-700 hover:text-emerald-600 transition-colors font-medium px-2 py-1"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  transition={SPRING.gentle}
                  initial={false}
                >
                  {item.label}
                  {/* Active section indicator - animated underline */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={SPRING.smooth}
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
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
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={SPRING.smooth}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </Button>
        </div>

        {/* Mobile sheet with animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={prefersReducedMotion ? {} : mobileMenuVariants}
              className="md:hidden border-t border-slate-200 bg-white dark:bg-zinc-900"
            >
              <div className="mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-col gap-4">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.label}
                      onClick={() => scrollToSection(item.href)}
                      className={`text-left text-slate-700 hover:text-orange-600 transition-colors font-medium px-2 py-1 relative ${
                        isActive ? 'text-orange-600' : ''
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        delay: index * 0.05,
                        duration: TIMING.fast / 1000,
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-active-indicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-orange-600 rounded-r-full"
                          transition={SPRING.smooth}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
