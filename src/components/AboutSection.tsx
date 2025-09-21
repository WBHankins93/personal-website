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
  Award
} from "lucide-react";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);

  // Track mouse position for dynamic effects
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
      title: "Developer experience first",
      blurb: "Clear defaults and paved paths that help teams ship without friction",
      expandedDetails: "I prioritize intuitive APIs, comprehensive documentation, and automated workflows that reduce cognitive overhead for development teams.",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700"
    },
    {
      icon: Shield,
      title: "Security by design",
      blurb: "IAM, secrets, and RBAC baked into workflows, not bolted on later.",
      expandedDetails: "Security controls are integrated from day one, with automated policy enforcement and least-privilege access patterns built into every deployment pipeline.",
      color: "bg-gradient-to-br from-emerald-50 to-teal-50",
      iconBg: "bg-emerald-100", 
      iconColor: "text-emerald-700"
    },
    {
      icon: Award,
      title: "Reliability as a habit",
      blurb: "Simple, observable systems with automation that catches drift early.",
      expandedDetails: "Monitoring, alerting, and auto-remediation are built into infrastructure patterns, ensuring systems self-heal and teams get actionable insights.",
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
      icon: Cloud,
      name: "Cloud & Infra",
      description: "AWS, IBM Cloud, GCP, Kubernetes, OpenShift",
      key: "infrastructure",
      level: 90,
      experience: "6+ years"
    },
    {
      icon: Server,
      name: "Automation & DevOps", 
      description: "Terraform, Helm, Docker, GitHub Actions, Argo CD, Ansible",
      key: "automation",
      level: 95,
      experience: "5+ years"
    },
    {
      icon: Shield,
      name: "Security & Compliance",
      description: "AWS IAM, IRSA, least-privilege RBAC, SOC 2",
      key: "security",
      level: 85,
      experience: "4+ years"
    },
    {
      icon: Code,
      name: "Programming & Scripting",
      description: "Python, Go, JavaScript/Node.js, Bash",
      key: "ci-cd",
      level: 80,
      experience: "6+ years"
    },
    {
      icon: Monitor,
      name: "Observability",
      description: "OpenSearch, Vector, Prometheus, Grafana",
      key: "monitoring",
      level: 75,
      experience: "3+ years"
    },
    {
      icon: BrainCircuit,
      name: "Web & Databases", 
      description: "React, Next.js, Express, SQL, MongoDB",
      key: "cloud",
      level: 70,
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
              SRE, DevOps, and Infrastructure engineer focused on secure,
              automated platforms that let teams move fast with confidence.
            </p>
          </div>

          {/* Intro + Avatar */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">My journey</h3>
              
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  I started coding in college and gravitated toward web development, but quickly realized the bigger impact was in infrastructure. Watching teams struggle with deployment bottlenecks made it clear that the real work was building systems that just work.
                </p>
                <p>
                  My path took me from Mississippi to Texas to Oregon to Louisiana, picking up different perspectives along the way. Travel with my grandparents early on gave me a sense of wanderlust that still drives me today. Oregon remains my favorite place where mountains meet the sea.
                </p>
                <p>
                  Outside of work, I&apos;m usually hiking, paddleboarding, or in my workshop woodworking. I&apos;m also working on productivity tools designed for different mental frameworks. Plus I&apos;m a bit of a local history nerd and love hitting up concerts and festivals.
                </p>
                <p>
                  My philosophy is simple: wake up wanting to be better than yesterday and leave the world better than you found it.
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

          {/* Interactive Principles */}
          <div className="mb-20">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-slate-900 mb-8 text-center"
            >
              Principles I build with
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
                    
                    {/* Default content (show short blurb by default) */}
                    <motion.div
                      className="text-sm text-slate-600"
                      animate={{ 
                        opacity: hoveredPrinciple === index ? 0 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {principle.blurb}
                    </motion.div>
                    
                    {/* Hover content (show long expandedDetails on hover) */}
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

          {/* Technical expertise - No hover effects, always show proficiency bars */}
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-slate-900 mb-8 text-center"
          >
            Technical expertise
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
                      
                      {/* Always visible progress bar */}
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