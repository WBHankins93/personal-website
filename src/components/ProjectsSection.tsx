'use client';

import React, { useState } from "react";
import type { Project } from "@/data/projects";
import { projects as allProjects } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Star, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const CATEGORY = {
  infrastructure: {
    ring: "ring-emerald-200",
    grad: "from-emerald-50 to-teal-50",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    accent: "text-emerald-600"
  },
  automation: {
    ring: "ring-amber-200",
    grad: "from-amber-50 to-yellow-50",
    pill: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    accent: "text-amber-600"
  },
  monitoring: {
    ring: "ring-violet-200",
    grad: "from-violet-50 to-fuchsia-50",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    accent: "text-violet-600"
  },
  "ci-cd": {
    ring: "ring-sky-200",
    grad: "from-sky-50 to-cyan-50",
    pill: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    accent: "text-sky-600"
  },
  cloud: {
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-blue-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    accent: "text-cyan-600"
  },
  security: {
    ring: "ring-rose-200",
    grad: "from-rose-50 to-orange-50",
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    accent: "text-rose-600"
  },
} as const;

type CategoryKey = Project["category"];

function cat(c: CategoryKey) {
  return CATEGORY[c] ?? CATEGORY.infrastructure;
}

function truncateTech(list: string[], max = 5) {
  if (!list) return [];
  if (list.length <= max) return list;
  const head = list.slice(0, max);
  const rest = list.length - max;
  return [...head, `+${rest} more`];
}

// Get project type styling
const getProjectTypeStyle = (type: string) => {
  switch (type) {
    case 'Production': return 'bg-green-100 text-green-700 border-green-200';
    case 'Client Work': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Open Source': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'Learning': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

// Get status styling
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-emerald-100 text-emerald-700';
    case 'Complete': return 'bg-slate-100 text-slate-700';
    case 'Maintained': return 'bg-amber-100 text-amber-700';
    case 'Archived': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | CategoryKey>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories: { id: "all" | CategoryKey; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: allProjects.length },
    { id: "infrastructure", label: "Infrastructure", count: allProjects.filter(p => p.category === "infrastructure").length },
    { id: "automation", label: "Automation", count: allProjects.filter(p => p.category === "automation").length },
    { id: "monitoring", label: "Monitoring", count: allProjects.filter(p => p.category === "monitoring").length },
    { id: "ci-cd", label: "CI/CD", count: allProjects.filter(p => p.category === "ci-cd").length },
    { id: "cloud", label: "Cloud", count: allProjects.filter(p => p.category === "cloud").length },
    { id: "security", label: "Security", count: allProjects.filter(p => p.category === "security").length },
  ];

  const filteredProjects = selectedCategory === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  // Sort projects to show featured ones first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Define the 3 featured projects
    const featuredProjects = [
      'terraform-infra-platform',
      'automated-vpc-deployment-centerpoint', 
      'devops-studio'
    ];
    
    const aIsFeatured = featuredProjects.includes(a.id);
    const bIsFeatured = featuredProjects.includes(b.id);
    
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    return 0;
  });

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Real-world solutions I've architected, from infrastructure automation to platform engineering that powers production systems.
            </motion.p>
          </div>

          {/* Enhanced Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const isActive = selectedCategory === category.id;
              const styles = isActive
                ? category.id === "all"
                  ? "bg-slate-900 text-white shadow-lg scale-105"
                  : `bg-gradient-to-r ${cat(category.id).grad} ${cat(category.id).ring} ring-2 shadow-lg scale-105 ${cat(category.id).accent}`
                : "bg-white hover:bg-slate-50 hover:shadow-md text-slate-600 hover:text-slate-900";

              return (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(category.id)}
                    className={clsx(
                      "rounded-full transition-all duration-300 font-medium px-6 py-2",
                      styles
                    )}
                  >
                    {category.label}
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white/20">
                      {category.count}
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          {/* Enhanced Projects Grid */}
          <AnimatePresence mode="wait">
            {sortedProjects.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <Folder className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No Projects Yet</h3>
                <p className="text-slate-500">
                  Projects will be displayed here once they're added to the portfolio.
                </p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {sortedProjects.map((project, idx) => {
                  const c = cat(project.category);
                  const techs = truncateTech(project.technologies ?? [], 5);
                  
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      onHoverStart={() => setHoveredProject(project.id)}
                      onHoverEnd={() => setHoveredProject(null)}
                      className="group"
                    >
                      <div className={clsx("p-[1px] rounded-2xl ring-1 transition-all duration-300", 
                        c.ring, 
                        "bg-gradient-to-br", 
                        c.grad,
                        hoveredProject === project.id ? "ring-2 shadow-xl scale-[1.02]" : "hover:ring-2 hover:shadow-lg"
                      )}>
                        <Card className="group rounded-2xl border-0 bg-white/90 backdrop-blur-sm supports-[backdrop-filter]:bg-white/70 shadow-sm transition-all duration-300 overflow-hidden h-full">
                          <CardHeader className="pb-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={clsx("inline-block h-2.5 w-2.5 rounded-full", c.dot)} />
                                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    {project.category.replace('-', '/')}
                                  </span>
                                  {['terraform-infra-platform', 'automated-vpc-deployment-centerpoint', 'devops-studio'].includes(project.id) && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                                      <Star className="w-3 h-3" />
                                      Featured
                                    </div>
                                  )}
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 group-hover:text-slate-950 leading-tight">
                                  {project.name}
                                </h3>
                              </div>
                            </div>

                            {/* Authentic Project Metadata */}
                            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 rounded-lg p-3 mb-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500">Technologies:</span>
                                <span className="font-medium text-slate-700">{project.techCount}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500">Scale:</span>
                                <span className="font-medium text-slate-700">{project.scale}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500">Architecture:</span>
                                <span className="font-medium text-slate-700">{project.architecture}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-slate-500">Environment:</span>
                                <span className="font-medium text-slate-700">{project.environment}</span>
                              </div>
                            </div>

                            {/* Project Type and Status Badges */}
                            <div className="flex gap-2 mb-3">
                              <span className={clsx(
                                "px-2 py-1 text-xs font-medium rounded-full border",
                                getProjectTypeStyle(project.projectType)
                              )}>
                                {project.projectType}
                              </span>
                              <span className={clsx(
                                "px-2 py-1 text-xs font-medium rounded-full",
                                getStatusStyle(project.status)
                              )}>
                                {project.status}
                              </span>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <p className="text-slate-600 mb-6 leading-relaxed text-sm">
                              {project.description}
                            </p>

                            {/* Enhanced Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {techs.map((tech, index) => (
                                <span
                                  key={index}
                                  className={clsx(
                                    "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
                                    c.pill,
                                    "hover:scale-105 cursor-default"
                                  )}
                                >
                                  <span className={clsx("h-1.5 w-1.5 rounded-full", c.dot)} />
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                              {project.github_url && (
                                <a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2.5 text-sm font-medium hover:bg-slate-800 transition-colors duration-200"
                                >
                                  <FaGithub className="w-4 h-4" />
                                  View Code
                                </a>
                              )}
                              
                              {/* Placeholder for Live Demo (when available) */}
                              <button
                                disabled
                                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 text-slate-400 px-4 py-2.5 text-sm font-medium cursor-not-allowed"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Demo
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Stats Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-slate-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{allProjects.length}</div>
                <div className="text-sm text-slate-600">Total Projects</div>
              </div>
              <div className="w-px h-8 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {allProjects.filter(p => p.projectType === 'Production' || p.projectType === 'Client Work').length}
                </div>
                <div className="text-sm text-slate-600">Production</div>
              </div>
              <div className="w-px h-8 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {allProjects.filter(p => p.projectType === 'Open Source').length}
                </div>
                <div className="text-sm text-slate-600">Open Source</div>
              </div>
              <div className="w-px h-8 bg-slate-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}