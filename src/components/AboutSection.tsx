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

  const skills: Array<{
    icon: React.ComponentType<{ className?: string }>;
    name: string;
    description: string;
    key: CategoryKey;
    level: number;
    experience: string;
  }> = [
    {
      icon: Users,
      name: "Customer Engagement",
      description: "Technical presentations, POC delivery, solution architecture, stakeholder management",
      key: "ci-cd", // Blue
      level: 95,
      experience: "5+ years"
    },
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud",
      description: "AWS, GCP, IBM Cloud, Azure - architecture, migration, optimization",
      key: "infrastructure", // Cyan
      level: 90,
      experience: "6+ years"
    },
    {
      icon: Server,
      name: "Container Platforms", 
      description: "Kubernetes, OpenShift, Docker, Helm, service mesh, microservices",
      key: "containers", // Purple
      level: 95,
      experience: "5+ years"
    },
    {
      icon: Code,
      name: "DevOps & Automation",
      description: "Terraform, Ansible, CI/CD pipelines, GitOps, infrastructure-as-code",
      key: "automation", // Orange
      level: 90,
      experience: "5+ years"
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "IAM, RBAC, SOC 2, compliance frameworks, security controls",
      key: "security", // Red
      level: 85,
      experience: "4+ years"
    },
    {
      icon: Monitor,
      name: "Observability & SRE",
      description: "Monitoring, logging, alerting, SLO/SLI design, incident response",
      key: "monitoring", // Emerald
      level: 85,
      experience: "4+ years"
    },
  ];

  return (
    <section id="about" className="py-12 md:py-16 bg-white">
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
                  11-month SAP RISE evaluation—designed automation that cut environment 
                  provisioning by 85%, which helped close the $10.1M deal and expanded into 
                  a multi-year engagement.
                </p>
                <p>
                  After proving I could drive deals, I went deeper on infrastructure (promoted 
                  to Cloud Infrastructure Engineer, then SRE contract at Prove AI). Most SEs 
                  hand off to implementation teams after the sale closes. I wanted to own the 
                  full stack—POC to production.
                </p>
                <p>
                  At Prove AI, led SOC 2 compliance from 34% to 100% while maintaining 99.9% 
                  uptime. Also mentored 8 Solutions Engineers at IBM—3 earned promotions, 2 
                  received performance awards.
                </p>
                <p>
                  Founded <span className="font-semibold text-amber-700">Sproutflow Studio</span> in 
                  late 2024 to apply SE methodology to small businesses. Built my portfolio 
                  site as proof-of-concept, which landed my first paying client. Side venture, 
                  but reinforces the consultative approach I bring to Solutions Engineering.
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
                      "overflow-hidden rounded-2xl border border-slate-200 ring-1 h-full transition-all duration-300 hover:shadow-lg",
                      c.ring,
                      c.bg,
                    ].join(" ")}
                    style={{ minHeight: '280px' }}
                  >
                    <CardContent className="bg-transparent p-6 text-center">
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
                      
                      {/* Progress bar matching icon color */}
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-slate-500">{skill.experience}</span>
                          <span className="text-xs text-slate-600 font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            className={`h-2 rounded-full ${c.iconBg}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                          />
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
    </section>
  );
}