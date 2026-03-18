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

  // Gradient colors for each category - using darker and lighter versions of same color
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
    description: string;
    key: CategoryKey;
    credentials: string[];
  }> = [
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud Architecture",
      description:
        "AWS, GCP, IBM Cloud — multi-cloud architectures, migration planning, production readiness across regulated enterprise environments.",
      key: "infrastructure",
      credentials: ["Enterprise-scale", "Production ownership"],
    },
    {
      icon: Server,
      name: "Kubernetes & Platform Engineering",
      description:
        "Kubernetes/OpenShift, multi-cluster patterns, networking and security primitives, EKS/GKE/OpenShift delivery workflows.",
      key: "containers",
      credentials: ["Production ownership", "Enterprise-scale"],
    },
    {
      icon: Code,
      name: "DevOps & Automation (IaC + CI/CD)",
      description:
        "Terraform, GitOps, GitHub Actions CI/CD — repeatable delivery frameworks that cut provisioning from weeks to hours.",
      key: "automation",
      credentials: ["Production ownership"],
    },
    {
      icon: Code,
      name: "Web Development & Fullstack",
      description:
        "TypeScript, React, Next.js, Node.js, Supabase — modern full-stack applications from architecture through production deployment.",
      key: "web-dev",
      credentials: ["Modern stack", "Production-ready"],
    },
    {
      icon: Sparkles,
      name: "AI Engineering",
      description:
        "Multi-agent pipelines, LLM system architecture, prompt engineering — provider-agnostic workflows across Anthropic, Groq, OpenAI, Gemini, and Ollama.",
      key: "ai-engineering",
      credentials: ["AI-native", "Production-architected"],
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description:
        "SOC 2 Type II readiness, IAM/RBAC patterns, controls and evidence frameworks, security-conscious architectures for regulated industries.",
      key: "security",
      credentials: ["Compliance-ready", "Enterprise-ready"],
    },
  ];

  return (
    <section
      id="about"
      className="py-12 md:py-20 bg-gradient-to-br from-white via-slate-50 to-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6"
            >
              About Me
            </motion.h2>
          </div>

          <div className="max-w-[680px] mx-auto text-left px-4 md:px-0">
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
              className="flex flex-col items-center md:items-start"
            >
              <motion.div
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
                className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full ring-2 ring-slate-200 bg-slate-100 mb-8"
              >
                <Image
                  // SWAP: set src to real headshot path when ready (e.g. "/about-headshot.jpg")
                  src="/about-photo-placeholder.svg"
                  alt="Ben Hankins"
                  fill
                  className="object-cover"
                  sizes="176px"
                  priority={false}
                />
              </motion.div>

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
                className="font-body text-base text-slate-700 leading-[1.7] mb-8 w-full"
              >
                I&apos;ve never been someone who waits to be told what to do. I started building
                things because I loved seeing people actually use them — and that feeling
                hasn&apos;t left. Six years later I&apos;m writing AI pipelines, shipping client
                products, and still getting that same hit when something goes live.
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
                className="font-body text-base text-slate-700 leading-[1.7] mb-8 w-full"
              >
                Started at Kortivity in Austin building a Vue-powered recruiting tool. Went to
                IBM where I spent four years doing the hard stuff — enterprise cloud delivery,
                architecture workshops, and a $10.1M deal with CenterPoint Energy. Deepened my
                operational instincts as an SRE at Prove AI: 99.9% uptime, four Kubernetes
                clusters, SOC 2 from 34% to 100%. In late 2024 I founded Sproutflow Studio to get
                back to what I love — building things people use, owning it end to end.
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
                className="font-body text-base text-slate-700 leading-[1.7] mb-0 w-full"
              >
                Outside of work I&apos;m usually at a concert, planning a trip, or coding late at
                night when the house is quiet and the thinking gets sharper. Split between New
                Orleans and always wanting to be back in the Pacific Northwest. Both places feed
                different parts of me — the festivals and the forests.
              </motion.p>
            </motion.div>
          </div>

          {/* Core Capabilities - LIGHT CARDS WITH VIBRANT ICONS */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 mb-8 mt-16 md:mt-20 text-center"
          >
            Core Capabilities
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                          animation: `gradient-${index % 6} ${8 + index * 1.5}s ease-in-out infinite`,
                        }}
                      />
                      <CardContent className="relative bg-white/60 backdrop-blur-md p-6 text-center flex flex-col flex-1">
                        <motion.div
                          className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${c.iconBg} shadow-md flex-shrink-0`}
                          whileHover={prefersReducedMotion ? {} : {
                            rotate: 5,
                            scale: 1.1,
                            transition: SPRING.gentle,
                          }}
                        >
                          <skill.icon className={`h-8 w-8 ${c.iconColor}`} />
                        </motion.div>
                        <h4 className="font-semibold text-slate-900 mb-2 flex-shrink-0">{skill.name}</h4>
                        <p className="text-sm text-slate-700 mb-4 flex-1">{skill.description}</p>
                        <div className="flex flex-wrap gap-2 justify-center flex-shrink-0">
                          {skill.credentials.map((cred, credIndex) => (
                            <span
                              key={credIndex}
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.iconBg} ${c.iconColor} border border-opacity-20`}
                            >
                              {cred}
                            </span>
                          ))}
                        </div>
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
