"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY, type CategoryKey } from "@/lib/colors";
import { motion } from "framer-motion";
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

  // Gradient colors for each category - two-tone fluid gradients
  const getGradientForCategory = (key: CategoryKey): string => {
    const gradients: Record<CategoryKey, string> = {
      "ci-cd":
        "radial-gradient(circle at 20% 50%, #1e40af 0%, transparent 50%), radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 40% 80%, #3b82f6 0%, transparent 50%), linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      infrastructure:
        "radial-gradient(circle at 20% 50%, #0e7490 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 50%), radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%), linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)",
      containers:
        "radial-gradient(circle at 20% 50%, #7e22ce 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c084fc 0%, transparent 50%), radial-gradient(circle at 40% 80%, #a855f7 0%, transparent 50%), linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
      automation:
        "radial-gradient(circle at 20% 50%, #c2410c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fb923c 0%, transparent 50%), radial-gradient(circle at 40% 80%, #f97316 0%, transparent 50%), linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)",
      security:
        "radial-gradient(circle at 20% 50%, #b91c1c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f87171 0%, transparent 50%), radial-gradient(circle at 40% 80%, #ef4444 0%, transparent 50%), linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)",
      monitoring:
        "radial-gradient(circle at 20% 50%, #047857 0%, transparent 50%), radial-gradient(circle at 80% 20%, #34d399 0%, transparent 50%), radial-gradient(circle at 40% 80%, #10b981 0%, transparent 50%), linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
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
      key: "security", // Red
      credentials: ["Compliance-ready", "Enterprise-ready"],
    },
    {
      icon: Monitor,
      name: "Observability & SRE Practices",
      description:
        "Logging/metrics/alerts, SLO thinking, incident response, reducing MTTD/MTTR",
      key: "monitoring", // Green
      credentials: ["Production ownership"],
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
          <div className="text-center mb-10 md:mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4"
            >
              About Me
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Senior Cloud Engineer focused on Kubernetes, multi-cloud infrastructure, and production reliability &mdash; with a proven track record delivering outcomes in customer-facing enterprise environments.
            </motion.p>
          </div>

          {/* About + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                My journey
              </h3>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  I started in web development, then moved into cloud engineering inside IBM&apos;s client-facing org &mdash; where I learned how to build infrastructure that holds up under real enterprise constraints (security, networking, compliance, and delivery pressure).
                </p>

                <p>
                  Over time, my scope expanded from building repeatable Kubernetes/OpenShift environments to leading high-stakes engagements: validating architectures, accelerating migrations, and turning POCs into production platforms across AWS, GCP, and IBM Cloud.
                </p>

                <p>
                  I&apos;m strongest at the intersection of <span className="font-semibold">hands-on platform execution</span> and <span className="font-semibold">clear technical leadership</span>: I can run the workshop, build the automation, and own the path from &quot;it works in a demo&quot; to &quot;it&apos;s stable in production.&quot;
                </p>

                <p>
                  At Prove AI, I joined a lean two-person infra team and owned reliability, CI/CD, and operational readiness &mdash; including leading SOC 2 Type II readiness from 34% to 100% while maintaining 99.9% uptime.
                </p>

                <p>
                  Founded <span className="font-semibold text-amber-700">Sproutflow Studio</span> in late 2024 as a small consultancy for full-stack web work. It&apos;s separate from my cloud track &mdash; but it reinforces how I think: pragmatic delivery, clean systems, and outcomes that customers can feel.
                </p>

                <p>
                  What drives me: building durable cloud platforms, reducing toil through automation, and helping teams ship confidently &mdash; whether the &quot;customer&quot; is external enterprise stakeholders or internal engineering teams.
                </p>
              </div>
            </div>

            <div className="relative">
              <motion.div
                className="relative rounded-3xl p-1 bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-slate-200 shadow-sm"
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: `${20 + mousePosition.x * 0.1}px ${
                    20 + mousePosition.y * 0.1
                  }px 60px rgba(0,0,0,0.1)`,
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base/ben-cartoon.png"
                    alt="Ben Hankins"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="mt-14 md:mt-18">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                Core Capabilities
              </h3>
              <p className="text-slate-600 mt-2">
                The work I&apos;m known for &mdash; production ownership, cloud architecture, automation, and technical leadership.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {skills.map((skill, idx) => {
                const Icon = skill.icon;
                const gradient = getGradientForCategory(skill.key);
                const category = CATEGORY[skill.key];

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <Card className="rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <CardContent
                        className="p-0"
                        style={{
                          background: gradient,
                        }}
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ring-1 ring-white/60"
                              style={{
                                background: "rgba(255,255,255,0.55)",
                              }}
                            >
                              <Icon className="w-6 h-6 text-slate-900" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-lg">
                                {skill.name}
                              </div>
                              <div className="text-slate-700 text-sm mt-0.5">
                                {skill.description}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mt-4">
                            {skill.credentials.map((c, cIdx) => (
                              <span
                                key={cIdx}
                                className="px-3 py-1 rounded-full text-xs font-semibold shadow-sm ring-1 ring-white/60"
                                style={{
                                  background: "rgba(255,255,255,0.55)",
                                  color: "#0f172a",
                                }}
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
