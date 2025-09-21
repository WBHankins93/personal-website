'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Code, TrendingUp, Users, Award } from "lucide-react";
import Image from "next/image";

export default function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const experiences = [
    {
      title: "Site Reliability Engineer",
      company: "Prove AI",
      period: "Jan 2024 - Present",
      location: "Remote",
      logo: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ef8062d24_image.png",
      type: "current",
      highlights: [
        { icon: TrendingUp, text: "90% reduction in deployment time", metric: true },
        { icon: Award, text: "SOC 2 compliance: 34% → 100%", metric: true },
        { icon: Code, text: "4 production services with Helm", metric: true }
      ],
      achievements: [
        "Built GitHub Actions workflows to automate Terraform for AWS and Kubernetes, reducing deployment time by 90% across 4 environments.",
        "Deployed and maintained 4 production services using Helm with chart templating and secrets integration.",
        "Managed IAM roles, GitHub Secrets, and IRSA to securely provision workloads with least-privilege access.",
        "Drove SOC 2 readiness from 34% to 100% compliance.",
        "Optimized OpenSearch visibility through Vector transforms and dashboard filters, improving log quality.",
        "Automated IAM policy validation and RBAC auditing with Python scripts."
      ],
      technologies: ["AWS", "Kubernetes", "Terraform", "GitHub Actions", "Helm", "OpenSearch", "Vector", "Python"]
    },
    {
      title: "Cloud Infrastructure Engineer",
      company: "IBM",
      period: "Feb 2022 - Aug 2024",
      location: "Remote",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      type: "past",
      highlights: [
        { icon: TrendingUp, text: "85% faster deployments", metric: true },
        { icon: Award, text: "$10.1M SAP RISE deal", metric: true },
        { icon: Users, text: "20% team productivity gain", metric: true }
      ],
      achievements: [
        "Architected and automated cloud environments on IBM Cloud, reducing deployment times by 85% through Terraform automation.",
        "Led technical client sessions, collaborating on public and hybrid cloud solutions, resulting in a $10.1M SAP RISE IBM Cloud deal.",
        "Developed monitoring systems to ensure 99.9% uptime and optimized performance across cloud infrastructures.",
        "Mentored junior engineers, improving team productivity by 20%."
      ],
      technologies: ["IBM Cloud", "Terraform", "Automation", "Monitoring", "Mentorship", "Client Delivery"]
    },
    {
      title: "Cloud Engineer",
      company: "IBM",
      period: "Feb 2021 - Jun 2022",
      location: "Austin, TX",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      type: "past",
      highlights: [
        { icon: TrendingUp, text: "40% build time reduction", metric: true },
        { icon: Code, text: "Microservices on OpenShift", metric: false },
        { icon: Award, text: "CI/CD pipeline automation", metric: false }
      ],
      achievements: [
        "Provisioned scalable cloud infrastructure using Terraform, significantly improving deployment efficiency.",
        "Deployed microservices on Red Hat OpenShift, enabling seamless CI/CD integration.",
        "Engineered Argo CD container pipelines, reducing build times by 40%.",
        "Deployed and configured Cloud Pak for Data."
      ],
      technologies: ["Terraform", "Red Hat OpenShift", "Argo CD", "Microservices", "Cloud Pak for Data"]
    },
    {
      title: "Pre-Sales Technical Engineer",
      company: "IBM",
      period: "Dec 2019 - Feb 2021",
      location: "Austin, TX",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      type: "past",
      highlights: [
        { icon: Users, text: "Client cloud modernization", metric: false },
        { icon: Code, text: "Tekton CI/CD optimization", metric: false },
        { icon: Award, text: "Successful migrations", metric: false }
      ],
      achievements: [
        "Guided clients in cloud modernization and migration, enhancing Java applications for cloud environments.",
        "Managed Tekton container pipelines for CI/CD, optimizing deployment processes.",
        "Designed cloud migration strategies using Red Hat OpenShift, leading to successful project completions."
      ],
      technologies: ["Cloud Modernization", "Tekton", "CI/CD", "Red Hat OpenShift", "Java", "Pre-Sales"]
    },
    {
      title: "Web Developer",
      company: "Kortivity",
      period: "May 2019 - Dec 2019",
      location: "Austin, TX",
      logo: null,
      type: "past",
      highlights: [
        { icon: Code, text: "Chrome Extension Development", metric: false },
        { icon: Award, text: "Production Client Usage", metric: false },
        { icon: TrendingUp, text: "Vue.js Expertise", metric: false }
      ],
      achievements: [
        "Responsible for the SDLC of a Google Chrome extension using Vue.js framework to build a recruiter talent pool database.",
        "Contributed to a product currently being used by Kortivity clients."
      ],
      technologies: ["Vue.js", "Google Chrome Extension", "SDLC", "JavaScript"]
    }
  ];

  const techColors = [
    "bg-blue-50 text-blue-700 border-blue-200",
    "bg-green-50 text-green-700 border-green-200",
    "bg-purple-50 text-purple-700 border-purple-200",
    "bg-orange-50 text-orange-700 border-orange-200",
    "bg-cyan-50 text-cyan-700 border-cyan-200",
    "bg-pink-50 text-pink-700 border-pink-200",
    "bg-indigo-50 text-indigo-700 border-indigo-200",
    "bg-teal-50 text-teal-700 border-teal-200",
    "bg-yellow-50 text-yellow-700 border-yellow-200",
    "bg-red-50 text-red-700 border-red-200",
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Professional Journey
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              From web development to infrastructure engineering, building scalable systems 
              and fostering DevOps culture across innovative companies.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-purple-200 to-green-200"></div>

            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-8`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg ${
                    exp.type === 'current' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  } transition-all duration-300 ${
                    hoveredIndex === index ? 'scale-125 opacity-0 z-0' : 'opacity-100 z-10'
                  }`}>
                    {exp.type === 'current' && hoveredIndex !== index && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse opacity-75"></div>
                    )}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-visible relative ${
                      hoveredIndex === index ? 'transform scale-105' : ''
                    }`}>
                      <CardContent className="p-0">
                        {/* Header Section */}
                        <div className="p-6 border-b border-gray-100">
                          <div className="flex items-start gap-4">
                            {/* Company Logo */}
                            <div className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center p-2 shadow-sm">
                              {exp.logo ? (
                                <Image 
                                  src={exp.logo} 
                                  alt={`${exp.company} logo`} 
                                  className="object-contain w-full h-full"
                                />
                              ) : (
                                <Code className="w-8 h-8 text-gray-500" />
                              )}
                            </div>

                            {/* Job Details */}
                            <div className="flex-1">
                              <h3 className="font-bold text-xl text-slate-900 mb-1">
                                {exp.title}
                              </h3>
                              <p className="text-blue-600 font-semibold text-lg mb-2">{exp.company}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {exp.period}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" />
                                  {exp.location}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="mt-4 flex flex-wrap gap-3">
                            {exp.highlights.map((highlight, hIndex) => (
                              <div 
                                key={hIndex}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                                  highlight.metric 
                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                }`}
                              >
                                <highlight.icon className="w-4 h-4" />
                                {highlight.text}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Smart Horizontal Expansion */}
                        <AnimatePresence>
                          {hoveredIndex === index && (
                            <motion.div
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: "500px", opacity: 1 }}
                              exit={{ width: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: "easeInOut" }}
                              className={`overflow-hidden absolute top-0 bg-white shadow-2xl border-2 border-blue-200 z-20 ${
                                index % 2 === 0 
                                  ? 'left-full rounded-r-xl border-l-0' // Right side of timeline expands toward center (leftward)
                                  : 'right-full rounded-l-xl border-r-0' // Left side of timeline expands toward center (rightward)
                              }`}
                              style={{ minHeight: "100%", width: "500px" }}
                            >
                              <div className="p-6" style={{ width: "500px" }}>
                                <h4 className="font-semibold text-slate-900 mb-4 text-lg">Key Achievements:</h4>
                                <ul className="space-y-3">
                                  {exp.achievements.map((achievement, achIndex) => (
                                    <motion.li 
                                      key={achIndex} 
                                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: achIndex * 0.1 }}
                                      className="flex items-start gap-3"
                                    >
                                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                      <span className="text-gray-700 text-sm leading-relaxed">{achievement}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Technologies */}
                        <div className="p-6 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span 
                                key={techIndex}
                                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 ${
                                  techColors[techIndex % techColors.length]
                                } hover:scale-105 cursor-default`}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}