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

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Gradient colors for each category - two-tone fluid gradients
  const getGradientForCategory = (key: CategoryKey): string => {
    const gradients: Record<CategoryKey, string> = {
      'ci-cd': 'radial-gradient(circle at 20% 50%, #1e40af 0%, transparent 50%), radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 40% 80%, #3b82f6 0%, transparent 50%), linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      infrastructure: 'radial-gradient(circle at 20% 50%, #0e7490 0%, transparent 50%), radial-gradient(circle at 80% 20%, #22d3ee 0%, transparent 50%), radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%), linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
      containers: 'radial-gradient(circle at 20% 50%, #7e22ce 0%, transparent 50%), radial-gradient(circle at 80% 20%, #c084fc 0%, transparent 50%), radial-gradient(circle at 40% 80%, #a855f7 0%, transparent 50%), linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
      automation: 'radial-gradient(circle at 20% 50%, #c2410c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fb923c 0%, transparent 50%), radial-gradient(circle at 40% 80%, #f97316 0%, transparent 50%), linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)',
      security: 'radial-gradient(circle at 20% 50%, #b91c1c 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f87171 0%, transparent 50%), radial-gradient(circle at 40% 80%, #ef4444 0%, transparent 50%), linear-gradient(135deg, #fecaca 0%, #fca5a5 100%)',
      monitoring: 'radial-gradient(circle at 20% 50%, #047857 0%, transparent 50%), radial-gradient(circle at 80% 20%, #34d399 0%, transparent 50%), radial-gradient(circle at 40% 80%, #10b981 0%, transparent 50%), linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
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
      description: "Discovery, architecture workshops, POC strategy, executive communication, stakeholder alignment",
      key: "ci-cd", // Blue
      credentials: ["Customer-led", "POC → production"]
    },
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud Architecture",
      description: "AWS / GCP / IBM Cloud architectures, migration planning, optimization, production readiness",
      key: "infrastructure", // Cyan
      credentials: ["Enterprise-scale", "Production ownership"]
    },
    {
      icon: Server,
      name: "Kubernetes & Platform Engineering", 
      description: "Kubernetes/OpenShift, multi-cluster patterns, networking/security primitives, delivery workflows",
      key: "containers", // Purple
      credentials: ["Enterprise-scale", "Production ownership"]
    },
    {
      icon: Code,
      name: "DevOps & Automation (IaC + CI/CD)",
      description: "Terraform, GitOps, CI/CD automation, repeatable delivery frameworks",
      key: "automation", // Orange
      credentials: ["Production ownership"]
    },
    {
      icon: Shield,
      name: "Security & Compliance Enablement",
      description: "SOC 2 readiness, IAM/RBAC patterns, controls + evidence, security-conscious architectures",
      key: "security", // Red
      credentials: ["Compliance-ready", "Enterprise-scale"]
    },
    {
      icon: Monitor,
      name: "Observability & SRE Practices",
      description: "Logging/metrics/alerts, SLO thinking, incident response, reducing MTTD/MTTR",
      key: "monitoring", // Emerald
      credentials: ["Production ownership"]
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-white">
      <style jsx>{`
        @keyframes gradient-0 {
          0% { background-position: 0% 0%, 100% 0%, 50% 100%; }
          33% { background-position: 100% 50%, 0% 100%, 100% 0%; }
          66% { background-position: 0% 100%, 100% 50%, 0% 50%; }
          100% { background-position: 0% 0%, 100% 0%, 50% 100%; }
        }
        @keyframes gradient-1 {
          0% { background-position: 100% 100%, 0% 0%, 100% 50%; }
          33% { background-position: 0% 50%, 100% 100%, 50% 0%; }
          66% { background-position: 100% 0%, 0% 50%, 0% 100%; }
          100% { background-position: 100% 100%, 0% 0%, 100% 50%; }
        }
        @keyframes gradient-2 {
          0% { background-position: 50% 0%, 50% 100%, 0% 50%; }
          50% { background-position: 50% 100%, 50% 0%, 100% 50%; }
          100% { background-position: 50% 0%, 50% 100%, 0% 50%; }
        }
        @keyframes gradient-3 {
          0% { background-position: 0% 50%, 100% 50%, 50% 0%; }
          25% { background-position: 100% 0%, 0% 100%, 100% 100%; }
          50% { background-position: 0% 100%, 100% 0%, 0% 0%; }
          75% { background-position: 100% 50%, 0% 50%, 50% 100%; }
          100% { background-position: 0% 50%, 100% 50%, 50% 0%; }
        }
        @keyframes gradient-4 {
          0% { background-position: 100% 0%, 0% 100%, 50% 50%; }
          50% { background-position: 0% 100%, 100% 0%, 50% 50%; }
          100% { background-position: 100% 0%, 0% 100%, 50% 50%; }
        }
        @keyframes gradient-5 {
          0% { background-position: 50% 100%, 50% 0%, 100% 50%; }
          33% { background-position: 0% 0%, 100% 100%, 50% 50%; }
          66% { background-position: 100% 100%, 0% 0%, 0% 100%; }
          100% { background-position: 50% 100%, 50% 0%, 100% 50%; }
        }
      `}</style>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Solutions Engineer and infrastructure specialist helping enterprise customers solve complex cloud and platform challenges.
            </p>
          </div>

          {/* Intro + Avatar */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">My journey</h3>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Started in web development, then moved into Solutions Engineering at IBM
                  when I realized I preferred solving problems with customers, not just for them.
                </p>

                <p>
                  Served as technical advisor for 12+ enterprise clients including CenterPoint
                  Energy, AT&T, Cencora, and Pepsi. Led technical delivery for CenterPoint&apos;s
                  11-month SAP RISE evaluation and designed automation that cut environment
                  provisioning by 85%. That work helped close the $10.1M deal and expanded into
                  a multi-year engagement.
                </p>

                <p>
                  After proving I could drive outcomes in customer-facing roles, I intentionally went deeper on
                  production infrastructure inside the same Client Engineering org. Most SE teams hand off after
                  a sale closes. I wanted to own more of the path from POC to production and build solutions that
                  hold up under real constraints.
                </p>

                <p>
                  At Prove AI, I was part of a two-person team responsible for platform reliability and operational readiness.
                  I led SOC 2 compliance from 34% to 100% while maintaining 99.9% uptime.
                  I also mentored 8 Solutions Engineers at IBM, 3 earned promotions and 2 received performance awards.
                </p>

                <p>
                  Founded <span className="font-semibold text-amber-700">Sproutflow Studio</span> in
                  late 2024 to apply SE methodology to small businesses. Built my portfolio
                  site as a proof of concept that landed my first paying client. It is a side venture,
                  but it reinforces the consultative approach I bring to Solutions Engineering.
                </p>

                <p>
                  What drives me: solving real problems for real teams. POCs that prove
                  feasibility, architecture that avoids expensive mistakes, automation that
                  lets engineers ship confidently.
                </p>
              </div>
            </div>


            <div className="relative">
              <motion.div 
                className="relative rounded-3xl p-1 bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-slate-200 shadow-sm"
                whileHover={{ scale: 1.02 }}
                style={{
                  boxShadow: `${20 + mousePosition.x * 0.1}px ${20 + mousePosition.y * 0.1}px 60px rgba(0,0,0,0.1)`
                }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c43e712a7_62696b86-1380-4132-bee7-5150b48ef3a9.png"
                    alt="Ben Hankins cartoon avatar"
                    fill
                    sizes="(min-width: 1024px) 480px, 100vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Core Capabilities - LIGHT CARDS WITH VIBRANT ICONS */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 mb-8 text-center"
          >
            Core Capabilities
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => {
              const c = CATEGORY[skill.key];
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card
                    className={[
                      "overflow-hidden rounded-2xl ring-1 h-full transition-all duration-300 hover:shadow-xl shadow-lg relative",
                      c.ring,
                    ].join(" ")}
                    style={{ minHeight: '280px' }}
                  >
                    {/* Moving gradient background with unique animation */}
                    <div 
                      className="absolute inset-0 opacity-80"
                      style={{
                        backgroundSize: '200% 200%, 200% 200%, 200% 200%, 100% 100%',
                        backgroundImage: getGradientForCategory(skill.key),
                        animation: `gradient-${index % 6} ${8 + index * 1.5}s ease-in-out infinite`,
                      }}
                    />
                    <CardContent className="relative bg-white/50 backdrop-blur-sm p-6 text-center">
                      {/* Vibrant icon circle */}
                      <div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${c.iconBg} shadow-md`}
                      >
                        <skill.icon className={`h-8 w-8 ${c.iconColor}`} />
                      </div>
                      
                      {/* Title - dark text on light background */}
                      <h4 className="font-semibold text-slate-900 mb-2">{skill.name}</h4>
                      
                      {/* Description */}
                      <p className="text-sm text-slate-700 mb-4">{skill.description}</p>
                      
                      {/* Proof-based micro-credentials */}
                      <div className="flex flex-wrap gap-2 justify-center">
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}