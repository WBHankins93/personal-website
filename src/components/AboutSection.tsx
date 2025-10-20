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
  BrainCircuit,
  Code,
  Users,
  Lightbulb,
  Handshake,
  Target
} from "lucide-react";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);

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

  const principles = [
    {
      icon: Users,
      title: "Customer discovery first",
      blurb: "Understanding the business problem before jumping to technical solutions",
      expandedDetails: "What's the real pain point? What does success look like? These questions shape every technical decision.",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700"
    },
    {
      icon: Lightbulb,
      title: "Prove it works",
      blurb: "Building working proof-of-concepts that validate feasibility and ROI",
      expandedDetails: "I build functional POCs that let you touch, test, and validate before committing. Seeing is believing.",
      color: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100", 
      iconColor: "text-emerald-700"
    },
    {
      icon: Handshake,
      title: "Partnership, not handoffs",
      blurb: "Supporting customers through implementation and beyond",
      expandedDetails: "I stay engaged through deployment, provide optimization guidance, and ensure your team owns the solution.",
      color: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-700"
    },
  ];

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
      key: "ci-cd",
      level: 95,
      experience: "5+ years"
    },
    {
      icon: Cloud,
      name: "Cloud & Multi-Cloud",
      description: "AWS, GCP, IBM Cloud, Azure - architecture, migration, optimization",
      key: "infrastructure",
      level: 90,
      experience: "6+ years"
    },
    {
      icon: Server,
      name: "Container Platforms", 
      description: "Kubernetes, OpenShift, Docker, Helm, service mesh, microservices",
      key: "automation",
      level: 95,
      experience: "5+ years"
    },
    {
      icon: Code,
      name: "DevOps & Automation",
      description: "Terraform, Ansible, CI/CD pipelines, GitOps, infrastructure-as-code",
      key: "automation",
      level: 90,
      experience: "5+ years"
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "IAM, RBAC, SOC 2, compliance frameworks, security controls",
      key: "security",
      level: 85,
      experience: "4+ years"
    },
    {
      icon: Monitor,
      name: "Observability & SRE",
      description: "Monitoring, logging, alerting, SLO/SLI design, incident response",
      key: "monitoring",
      level: 85,
      experience: "4+ years"
    },
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
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
                  I started in web development but quickly realized the real impact was in infrastructure. Watching teams struggle with deployment bottlenecks made it clear where I could help most.
                </p>
                <p>
                  At IBM, I worked with 12+ enterprise clients across energy, financial services, and healthcare. The highlight was leading technical delivery for a $10.1M SAP RISE deal with CenterPoint Energy. We proved we could automate their complex infrastructure 85% faster than their manual process, which closed the deal.
                </p>
                <p>
                  At Prove AI, I owned production infrastructure and took us from 34% to 100% SOC 2 compliance while keeping 99.9% uptime on customer-facing services. Building systems that just work under pressure is what I do.
                </p>
                <p>
                  What gets me up in the morning is solving real problems for real teams. Whether that's a POC that proves feasibility, architecture that avoids expensive mistakes, or automation that lets engineers ship without second-guessing their tools.
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

          {/* How I Work - NEW SECTION */}
          <div className="mb-20">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-slate-900 mb-8 text-center"
            >
              How I Work
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPrinciple(index)}
                  onHoverEnd={() => setHoveredPrinciple(null)}
                  className="group relative"
                >
                  <motion.div
                    className={`rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] ${principle.color} relative overflow-hidden`}
                    style={{
                      minHeight: '200px'
                    }}
                  >
                    <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${principle.iconBg} transition-transform group-hover:scale-[1.05]`}>
                      <principle.icon className={`h-6 w-6 ${principle.iconColor}`} />
                    </div>
                    <div className="font-semibold text-slate-900 mb-2">{principle.title}</div>
                    
                    <motion.div
                      className="text-sm text-slate-600"
                      animate={{ 
                        opacity: hoveredPrinciple === index ? 0 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {principle.blurb}
                    </motion.div>
                    
                    <motion.div
                      className="text-sm text-slate-700 absolute inset-x-6"
                      style={{ top: '120px' }}
                      animate={{ 
                        opacity: hoveredPrinciple === index ? 1 : 0
                      }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {principle.expandedDetails}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Core Capabilities */}
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
                >
                  <Card
                    className={[
                      "overflow-hidden rounded-2xl border-0 ring-1 h-full",
                      c.ring,
                      c.bg,
                    ].join(" ")}
                    style={{ minHeight: '280px' }}
                  >
                    <CardContent className="bg-transparent p-6 text-center">
                      <div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ${c.ring} shadow-inner`}
                      >
                        <skill.icon className="h-8 w-8 text-slate-800" />
                      </div>
                      <h4 className="font-semibold text-slate-900 mb-2">{skill.name}</h4>
                      <p className="text-sm text-slate-700 mb-4">{skill.description}</p>
                      
                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-slate-500">{skill.experience}</span>
                          <span className="text-xs text-slate-600 font-medium">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-white/50 rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
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