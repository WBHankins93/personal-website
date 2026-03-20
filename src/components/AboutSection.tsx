"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY, type CategoryKey } from "@/lib/colors";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TIMING } from "@/lib/animation-configs/timing";
import { SPRING } from "@/lib/animation-configs/spring";
import { EASE } from "@/lib/animation-configs/ease";
import {
  Cloud,
  Server,
  Shield,
  Code,
  Sparkles,
} from "lucide-react";

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const getGradientForCategory = (key: CategoryKey): string => {
    const gradients: Record<CategoryKey, string> = {
      "ci-cd":
        "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 40% 80%, #2563eb 0%, transparent 50%), linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)",
      infrastructure:
        "radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 20%, #34d399 0%, transparent 50%), radial-gradient(circle at 40% 80%, #059669 0%, transparent 50%), linear-gradient(135deg, #d1fae5 0%, #6ee7b7 100%)",
      containers:
        "radial-gradient(circle at 20% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #a78bfa 0%, transparent 50%), radial-gradient(circle at 40% 80%, #7c3aed 0%, transparent 50%), linear-gradient(135deg, #f3e8ff 0%, #c4b5fd 100%)",
      automation:
        "radial-gradient(circle at 20% 50%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 40% 80%, #d97706 0%, transparent 50%), linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)",
      security:
        "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fb923c 0%, transparent 50%), radial-gradient(circle at 40% 80%, #ea580c 0%, transparent 50%), linear-gradient(135deg, #ffedd5 0%, #fdba74 100%)",
      "web-dev":
        "radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c084fc 0%, transparent 50%), radial-gradient(circle at 40% 80%, #9333ea 0%, transparent 50%), linear-gradient(135deg, #faf5ff 0%, #e9d5ff 100%)",
      education:
        "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 50%), radial-gradient(circle at 40% 80%, #4f46e5 0%, transparent 50%), linear-gradient(135deg, #eef2ff 0%, #c7d2fe 100%)",
      monitoring:
        "radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 50%), radial-gradient(circle at 40% 80%, #0891b2 0%, transparent 50%), linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)",
      "ai-engineering":
        "radial-gradient(circle at 20% 50%, #f43f5e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fb7185 0%, transparent 50%), radial-gradient(circle at 40% 80%, #e11d48 0%, transparent 50%), linear-gradient(135deg, #ffe4e6 0%, #fda4af 100%)",
      python:
        "radial-gradient(circle at 20% 50%, #eab308 0%, transparent 50%), radial-gradient(circle at 80% 20%, #facc15 0%, transparent 50%), radial-gradient(circle at 40% 80%, #ca8a04 0%, transparent 50%), linear-gradient(135deg, #fef9c3 0%, #fde047 100%)",
      "client-work":
        "radial-gradient(circle at 20% 50%, #14b8a6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2dd4bf 0%, transparent 50%), radial-gradient(circle at 40% 80%, #0d9488 0%, transparent 50%), linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
    };
    return gradients[key];
  };

  const heroCapability = {
    name: "Customer-Facing Technical Leadership",
    description:
      "Discovery through delivery. I run technical conversations from first call to production — architecture workshops, POC strategy, executive alignment, and making sure the handoff never happens because I never hand off.",
    credentials: ["Customer-led", "POC → production", "Enterprise-scale"],
  };

  const gridSkills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    key: CategoryKey;
  }> = [
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud Architecture",
      key: "infrastructure",
    },
    {
      icon: Server,
      name: "Kubernetes & Platform Engineering",
      key: "containers",
    },
    {
      icon: Code,
      name: "DevOps & Automation (IaC + CI/CD)",
      key: "automation",
    },
    {
      icon: Code,
      name: "Web Development & Fullstack",
      key: "web-dev",
    },
    {
      icon: Sparkles,
      name: "AI Engineering",
      key: "ai-engineering",
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      key: "security",
    },
  ];

  const quickFacts = [
    "New Orleans & PNW",
    "6+ years building",
    "Founder, Sproutflow Studio",
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-20 bg-slate-50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Editorial Profile: Two-column bio */}
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 md:gap-12 items-start mb-16 md:mb-20 max-w-4xl mx-auto">
            {/* Left column: Photo + quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
              className="flex flex-col items-center md:items-center md:sticky md:top-24"
            >
              <div className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 overflow-hidden rounded-2xl ring-2 ring-slate-200 bg-slate-100">
                <Image
                  src="/about-photo-placeholder.svg"
                  alt="Ben Hankins"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                  priority={false}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center max-w-[280px]">
                {quickFacts.map((fact) => (
                  <span
                    key={fact}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-slate-600 border border-slate-200"
                  >
                    {fact}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right column: Heading + bio text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12 },
                },
              }}
              className="flex flex-col text-center md:text-left pt-0 md:pt-2"
            >
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: TIMING.normal / 1000,
                      ease: EASE.easeOut,
                    },
                  },
                }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6"
              >
                About Me
              </motion.h2>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: TIMING.normal / 1000,
                      ease: EASE.easeOut,
                    },
                  },
                }}
                className="font-body text-base md:text-lg text-slate-700 leading-[1.7] mb-5"
              >
                What I care about is building things end to end and watching them hold up under real
                traffic. The moment that hooked me was taking a $10.1M cloud deal from architecture
                workshop to production at IBM — owning every layer, not handing anything off. That
                instinct carried me through standing up four Kubernetes clusters and driving SOC 2
                from 34% to 100% at Prove AI, and it&apos;s why I founded Sproutflow Studio: to keep
                building things people actually use, on my own terms.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: TIMING.normal / 1000,
                      ease: EASE.easeOut,
                    },
                  },
                }}
                className="font-body text-base md:text-lg text-slate-700 leading-[1.7]"
              >
                Outside of work I&apos;m usually at a concert, planning a trip, or coding late at
                night when the house is quiet and the thinking gets sharper. Split between New
                Orleans and always wanting to be back in the Pacific Northwest — the festivals and
                the forests.
              </motion.p>
            </motion.div>
          </div>

          {/* Core Capabilities */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: TIMING.normal / 1000,
              ease: EASE.easeOut,
            }}
            className="text-2xl font-bold text-slate-900 mb-8 text-center"
          >
            Core Capabilities
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hero capability card */}
            <motion.div
              className="md:col-span-3 group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
            >
              <motion.div
                whileHover={prefersReducedMotion ? {} : { y: -2, transition: SPRING.gentle }}
                className="rounded-2xl bg-slate-900 text-white ring-2 ring-slate-700 shadow-xl p-8 md:p-10 md:text-left text-center"
              >
                <h4 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {heroCapability.name}
                </h4>
                <p className="text-base text-slate-300 leading-relaxed mb-6 max-w-4xl md:mx-0 mx-auto">
                  {heroCapability.description}
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {heroCapability.credentials.map((cred, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white ring-1 ring-white/20"
                    >
                      {cred}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Skill cards - visual-forward with animated gradients */}
            {gridSkills.map((skill, index) => {
              const c = CATEGORY[skill.key];
              const row = Math.floor(index / 3);
              const col = index % 3;
              const delay = (row * 100 + col * 100) / 1000;

              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    delay,
                    duration: TIMING.normal / 1000,
                    ease: EASE.easeOut,
                  }}
                  className="group"
                >
                  <motion.div
                    whileHover={prefersReducedMotion ? {} : {
                      y: -4,
                      scale: 1.02,
                      transition: SPRING.gentle,
                    }}
                  >
                    <Card
                      className={[
                        "overflow-hidden rounded-2xl ring-2 h-full transition-all duration-300 shadow-xl relative flex flex-col",
                        "group-hover:shadow-2xl group-hover:ring-4",
                        c.ring,
                      ].join(" ")}
                    >
                      <div
                        className="absolute inset-0 opacity-90"
                        style={{
                          backgroundSize: "200% 200%, 200% 200%, 200% 200%, 100% 100%",
                          backgroundImage: getGradientForCategory(skill.key),
                          animation: prefersReducedMotion
                            ? "none"
                            : `gradient-${index % 6} ${8 + index * 1.5}s ease-in-out infinite`,
                        }}
                      />
                      <CardContent className="relative bg-white/60 backdrop-blur-md p-6 sm:p-8 text-center flex flex-col flex-1 items-center justify-center min-h-[180px] sm:min-h-[200px]">
                        <motion.div
                          className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${c.iconBg} shadow-md`}
                          whileHover={prefersReducedMotion ? {} : {
                            rotate: 5,
                            scale: 1.1,
                            transition: SPRING.gentle,
                          }}
                        >
                          <skill.icon className={`h-8 w-8 ${c.iconColor}`} />
                        </motion.div>
                        <h4 className="font-semibold text-slate-900 text-base sm:text-lg">{skill.name}</h4>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
