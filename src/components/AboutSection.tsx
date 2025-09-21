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
  CheckCircle2,
  Target,
  DollarSign,
  Zap,
  Users,
  Award
} from "lucide-react";

export default function AboutSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredPrinciple, setHoveredPrinciple] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

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

  const impactMetrics = [
    {
      icon: Target,
      title: "99.9% Uptime",
      blurb: "Reliability focus across all production environments",
      color: "bg-emerald-50 text-emerald-700",
      iconBg: "bg-emerald-100",
    },
    {
      icon: DollarSign,
      title: "$10.1M Deal",
      blurb: "Business impact through technical excellence at IBM",
      color: "bg-blue-50 text-blue-700", 
      iconBg: "bg-blue-100",
    },
    {
      icon: Zap,
      title: "90% Faster",
      blurb: "Deployment efficiency improvement through automation",
      color: "bg-purple-50 text-purple-700",
      iconBg: "bg-purple-100",
    },
  ];

  const principles = [
    {
      icon: Users,
      title: "Developer experience first",
      blurb: "20% PRODUCTIVITY BOOST",
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
              
              {/* Impact Metrics under My journey */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {impactMetrics.map((metric) => (
                  <div
                    key={metric.title}
                    className={`rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow ${metric.color}`}
                  >
                    <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full ${metric.iconBg}`}>
                      <metric.icon className="h-5 w-5" />
                    </div>
                    <div className="font-bold text-sm mb-1">{metric.title}</div>
                    <div className="text-xs opacity-80">{metric.blurb}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  I started in web development and leaned into platform work after
                  seeing how much time teams lose to tooling. My focus is building
                  systems that feel simple to use and safe to ship.
                </p>
                <p>
                  At IBM I codified cloud environments and helped win a{" "}
                  <span className="font-medium text-blue-600">$10.1M</span> SAP RISE deal by proving speed and safety.
                  At Prove AI I owned deployment and operations for production services,
                  using Terraform, Helm, and GitHub Actions to remove bottlenecks.
                </p>
                <p>
                  The result I care about most is clear ownership and fewer surprises
                  from idea to production.
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

          {/* Interactive Principles with expandedDetails */}
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
                    
                    {/* Default content (show expandedDetails first) */}
                    <motion.div
                      className="text-sm text-slate-700 absolute inset-x-6"
                      style={{ top: '120px' }}
                      animate={{ 
                        opacity: hoveredPrinciple === index ? 0 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {principle.expandedDetails}
                    </motion.div>
                    
                    {/* Hover content (show blurb/stat on hover) */}
                    <motion.div
                      className="text-sm text-slate-600 font-medium absolute inset-x-6"
                      style={{ top: '120px' }}
                      animate={{ 
                        opacity: hoveredPrinciple === index ? 1 : 0
                      }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {principle.blurb}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interactive Skills with Progress Bars */}
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
                  onHoverStart={() => setHoveredSkill(index)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="group"
                >
                  <Card
                    className={`overflow-hidden rounded-2xl border-0 ring-1 transition-all duration-300 h-full ${c.ring} ${c.bg}`}
                    style={{
                      transform: hoveredSkill === index ? 'translateY(-4px)' : 'translateY(0px)',
                      boxShadow: hoveredSkill === index ? '0 20px 40px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                  >
                    <CardContent className="bg-transparent p-6 text-center">
                      <motion.div
                        className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white ring-1 ${c.ring} shadow-inner transition-all duration-300`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0]
                        }}
                      >
                        <skill.icon className="h-8 w-8 text-slate-800" />
                      </motion.div>
                      
                      <h4 className="font-semibold text-slate-900 mb-1">{skill.name}</h4>
                      
                      {/* Experience badge */}
                      <div className="text-xs text-slate-500 mb-3 font-medium">{skill.experience}</div>
                      
                      {/* Animated progress bar - only show on hover */}
                      <motion.div 
                        className="mb-3"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ 
                          opacity: hoveredSkill === index ? 1 : 0,
                          height: hoveredSkill === index ? "auto" : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-full bg-white/50 rounded-full h-2">
                          <motion.div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: hoveredSkill === index ? `${skill.level}%` : 0 }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        <div className="text-xs text-slate-600 mt-1 text-center">{skill.level}% proficiency</div>
                      </motion.div>
                      
                      <p className="text-sm text-slate-700">{skill.description}</p>
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