"use client";

import React, { useState, useEffect } from "react";
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
  Monitor,
  Code,
  Users,
} from "lucide-react";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
    };
    return gradients[key];
  };

  const skills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    description: string;
    key: CategoryKey;
    credentials: string[];
  }> = [
    {
      icon: Users,
      name: "Customer-Facing Technical Leadership",
      description:
        "Discovery, architecture workshops, POC strategy, executive communication, stakeholder alignment",
      key: "ci-cd", // Blue
      credentials: ["Customer-led", "POC → production"],
    },
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud Architecture",
      description:
        "AWS / GCP / IBM Cloud architectures, migration planning, optimization, production readiness",
      key: "infrastructure", // Cyan
      credentials: ["Enterprise-scale", "Production ownership"],
    },
    {
      icon: Server,
      name: "Kubernetes & Platform Engineering",
      description:
        "Kubernetes/OpenShift, multi-cluster patterns, networking/security primitives, delivery workflows",
      key: "containers", // Purple
      credentials: ["Enterprise-scale", "Production ownership"],
    },
    {
      icon: Code,
      name: "DevOps & Automation (IaC + CI/CD)",
      description:
        "Terraform, GitOps, CI/CD automation, repeatable delivery frameworks",
      key: "automation", // Orange
      credentials: ["Production ownership"],
    },
    {
      icon: Shield,
      name: "Security & Compliance Enablement",
      description:
        "SOC 2 readiness, IAM/RBAC patterns, controls + evidence, security-conscious architectures",
      key: "security", // Orange
      credentials: ["Compliance-ready", "Enterprise-ready"],
    },
    {
      icon: Code,
      name: "Web Development & Fullstack",
      description:
        "Modern web development, fullstack applications, TypeScript/React/Next.js, production deployments",
      key: "web-dev", // Purple/Fuchsia
      credentials: ["Modern stack", "Production-ready"],
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: 0.1,
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
              className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4"
            >
              Solutions engineer at heart — I like sitting at the intersection of technical depth and real customer problems. My background spans cloud infrastructure, reliability engineering, and building things from scratch.
            </motion.p>
          </div>

          {/* About + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1, // 100ms each paragraph
                  },
                },
              }}
            >
              <motion.h3
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-2xl font-bold text-slate-900 mb-4"
              >
                My Journey
              </motion.h3>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                {[
                  "I started building websites because I loved creating things people actually use. That feeling stuck with me.",
                  "At IBM, I spent three years helping enterprise customers deploy cloud infrastructure across AWS, GCP, and IBM Cloud. I learned how to understand what they really needed, design solutions that would survive production, and guide teams through the whole process. The work I enjoyed most was when I could own it end to end: discovery, architecture, implementation, and making sure the team felt confident running it.",
                  "I took an SRE role at Prove AI to deepen my operational expertise. Owned reliability and SOC 2 compliance across four production Kubernetes clusters while maintaining 99.9% uptime. Made me better at customer-facing work because I've lived what they're dealing with.",
                  "Founded Sproutflow Studio in 2024 to stay close to what I love: building clean, modern websites for small businesses. Direct customer feedback, great UX, shipping something people enjoy using.",
                  "I'm looking for my next role in solutions engineering or customer-facing product work where I can combine technical depth with real customer impact.",
                ].map((text, index) => (
                  <motion.p
                    key={index}
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
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: 0.3, // 300ms delay as per plan
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
            >
              <motion.div
                className="relative rounded-3xl p-1 bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-slate-200 shadow-sm"
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                style={{
                  boxShadow: `${20 + mousePosition.x * 0.1}px ${
                    20 + mousePosition.y * 0.1
                  }px 60px rgba(0,0,0,0.1)`,
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c43e712a7_62696b86-1380-4132-bee7-5150b48ef3a9.png"
                    alt="Ben Hankins"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                </div>
              </motion.div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const c = CATEGORY[skill.key];
              // Stagger wave pattern: Row 1 (0,1,2): 0ms, 100ms, 200ms; Row 2 (3,4,5): 100ms, 200ms, 300ms
              const row = Math.floor(index / 3);
              const col = index % 3;
              const delay = (row * 100 + col * 100) / 1000; // Convert to seconds
              
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
                      y: -4, // Lift 4px
                      scale: 1.02,
                      transition: SPRING.gentle,
                    }}
                  >
                    <Card
                      className={[
                        "overflow-hidden rounded-2xl ring-2 h-full transition-all duration-300 shadow-xl relative flex flex-col",
                        "group-hover:shadow-2xl group-hover:ring-4", // Shadow and ring increase on hover
                        c.ring,
                      ].join(" ")}
                    >
                      {/* Moving gradient background with unique animation */}
                      <div 
                        className="absolute inset-0 opacity-90"
                        style={{
                          backgroundSize: '200% 200%, 200% 200%, 200% 200%, 100% 100%',
                          backgroundImage: getGradientForCategory(skill.key),
                          animation: `gradient-${index % 6} ${8 + index * 1.5}s ease-in-out infinite`,
                        }}
                      />
                      <CardContent className="relative bg-white/60 backdrop-blur-md p-6 text-center flex flex-col flex-1">
                        {/* Vibrant icon circle with rotation/pulse on hover */}
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
                        
                        {/* Title - dark text on light background */}
                        <h4 className="font-semibold text-slate-900 mb-2 flex-shrink-0">{skill.name}</h4>
                        
                        {/* Description */}
                        <p className="text-sm text-slate-700 mb-4 flex-1">{skill.description}</p>
                        
                        {/* Proof-based micro-credentials */}
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
