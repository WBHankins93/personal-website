'use client';

import React, { useState } from "react";
import type { Project } from "@/data/projects";
import { projects as allProjects } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Star, ExternalLink, Briefcase, ChevronDown, Eye, Code2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

// FIXED: All 7 categories now have DISTINCT colors - no similar blues
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
    ring: "ring-pink-200",
    grad: "from-pink-50 to-rose-50",
    pill: "bg-pink-50 text-pink-700 border-pink-200",
    dot: "bg-pink-500",
    accent: "text-pink-600"
  },
  "ci-cd": {
    ring: "ring-blue-200",
    grad: "from-blue-50 to-indigo-50",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    accent: "text-blue-600"
  },
  cloud: {
    ring: "ring-cyan-200",
    grad: "from-cyan-50 to-sky-50",
    pill: "bg-cyan-50 text-cyan-700 border-cyan-200",
    dot: "bg-cyan-500",
    accent: "text-cyan-600"
  },
  security: {
    ring: "ring-red-200",
    grad: "from-red-50 to-red-50",
    pill: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    accent: "text-red-600"
  },
  "web-dev": {
    ring: "ring-violet-200",
    grad: "from-violet-50 to-fuchsia-50",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
    accent: "text-violet-600"
  }
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
    case 'Production': return 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-green-200/60';
    case 'Client Work': return 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-blue-200/60';
    case 'Open Source': return 'bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 ring-purple-200/60';
    case 'Learning': return 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 ring-orange-200/60';
    default: return 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 ring-slate-200/60';
  }
};

// Get status styling
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 ring-emerald-200/60';
    case 'Complete': return 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 ring-slate-200/60';
    case 'Maintained': return 'bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 ring-amber-200/60';
    case 'Archived': return 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 ring-red-200/60';
    default: return 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 ring-gray-200/60';
  }
};

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | CategoryKey>("all");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const categories: { id: "all" | CategoryKey; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: allProjects.length },
    { id: "infrastructure", label: "Infrastructure", count: allProjects.filter(p => p.category === "infrastructure").length },
    { id: "automation", label: "Automation", count: allProjects.filter(p => p.category === "automation").length },
    { id: "monitoring", label: "Monitoring", count: allProjects.filter(p => p.category === "monitoring").length },
    { id: "ci-cd", label: "CI/CD", count: allProjects.filter(p => p.category === "ci-cd").length },
    { id: "cloud", label: "Cloud", count: allProjects.filter(p => p.category === "cloud").length },
    { id: "security", label: "Security", count: allProjects.filter(p => p.category === "security").length },
    { id: "web-dev", label: "Web Dev", count: allProjects.filter(p => p.category === "web-dev").length },
  ];

  const filteredProjects = selectedCategory === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  // Sort projects to show DevOps Studio first
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.id === 'devops-studio') return -1;
    if (b.id === 'devops-studio') return 1;
    return 0;
  });

  const toggleProject = (projectId: string) => {
    setExpandedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6"
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4"
            >
              Real-world solutions I&apos;ve architected, from infrastructure automation to platform engineering that powers production systems.
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12 px-2">
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
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setSelectedCategory(category.id)}
                    className={clsx(
                      "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 border shadow-sm",
                      styles
                    )}
                    variant="ghost"
                  >
                    {category.label}
                    <span className="ml-2 rounded-full bg-white/30 px-2 py-0.5 text-xs">
                      {category.count}
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <Folder className="w-16 h-16 mx-auto text-slate-400 mb-4" />
                <p className="text-slate-600 text-lg">No projects found in this category.</p>
              </motion.div>
            ) : (
              <>
                {/* Mobile List View */}
                <div className="md:hidden space-y-3">
                  {sortedProjects.map((project, idx) => {
                    const c = cat(project.category);
                    const isExpanded = expandedProjects.has(project.id);
                    const techs = project.technologies ?? [];
                    
                    return (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <Card 
                          className={`rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden ${
                            isExpanded ? 'border-slate-300' : 'border-slate-200'
                          }`}
                        >
                          {/* Collapsed View - Title & Category Only */}
                          <div
                            onClick={() => toggleProject(project.id)}
                            className="p-3 cursor-pointer flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className={clsx("inline-block h-2.5 w-2.5 rounded-full flex-shrink-0", c.dot)} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    {project.category === 'web-dev' ? 'Web Dev' : project.category.replace('-', '/')}
                                  </span>
                                  {project.id === 'devops-studio' && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-medium rounded-full ring-1 ring-amber-200/60">
                                      <Star className="w-3 h-3" />
                                      Featured
                                    </div>
                                  )}
                                </div>
                                <h3 className="font-bold text-base text-slate-900 leading-tight truncate">
                                  {project.name}
                                </h3>
                              </div>
                            </div>
                            <ChevronDown 
                              className={clsx(
                                "w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ml-2",
                                isExpanded && "rotate-180"
                              )} 
                            />
                          </div>

                          {/* Expanded View */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="px-4 pb-4 border-t border-slate-200/60 pt-3 space-y-3">
                                  {/* Type & Status Badges */}
                                  <div className="flex gap-2 flex-wrap">
                                    <span className={clsx(
                                      "px-2.5 py-1 text-xs font-medium rounded-full ring-1 shadow-sm",
                                      getProjectTypeStyle(project.projectType)
                                    )}>
                                      {project.projectType}
                                    </span>
                                    <span className={clsx(
                                      "px-2.5 py-1 text-xs font-medium rounded-full ring-1 shadow-sm",
                                      getStatusStyle(project.status)
                                    )}>
                                      {project.status}
                                    </span>
                                    {project.projectType === 'Client Work' && (
                                      <div className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-full ring-1 ring-blue-200/60 shadow-sm">
                                        <Briefcase className="w-3 h-3" />
                                        Client Work
                                      </div>
                                    )}
                                  </div>

                                  {/* Description */}
                                  <p className="text-slate-600 leading-relaxed text-sm">
                                    {project.description}
                                  </p>

                                  {/* Tech Stack - Flex Wrap */}
                                  <div className="flex flex-wrap gap-1.5 mb-0">
                                    {techs.map((tech, index) => (
                                      <span
                                        key={index}
                                        className={clsx(
                                          "inline-flex items-center gap-1 rounded-full ring-1 px-2.5 py-1 text-xs font-medium",
                                          c.pill
                                        )}
                                      >
                                        <span className={clsx("h-1.5 w-1.5 rounded-full", c.dot)} />
                                        {tech}
                                      </span>
                                    ))}
                                  </div>

                                  {/* Icon-Only Action Buttons */}
                                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 mt-0">
                                    {project.github_url && (
                                      <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                                        title="View Code"
                                      >
                                        <Code2 className="w-4 h-4" />
                                      </a>
                                    )}
                                    {project.live_url && project.live_url.trim() !== '' && (
                                      <a
                                        href={project.live_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                                        title="Live Demo"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Desktop Grid View - Masonry Layout */}
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr"
                >
                  {sortedProjects.map((project, idx) => {
                    const c = cat(project.category);
                    const techs = project.technologies ?? [];
                    
                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        onHoverStart={() => setHoveredProject(project.id)}
                        onHoverEnd={() => setHoveredProject(null)}
                        className="group flex"
                      >
                        <Card className={clsx(
                          "group rounded-2xl bg-white transition-all duration-300 overflow-hidden flex flex-col w-full",
                          "border-2 shadow-lg",
                          hoveredProject === project.id ? "shadow-xl scale-[1.02] border-slate-300" : "border-slate-200 hover:border-slate-300 hover:shadow-xl"
                        )}>
                          {/* Visual Banner */}
                          <div className={clsx(
                            "h-24 bg-gradient-to-br",
                            c.grad,
                            "relative overflow-hidden"
                          )}>
                            {project.image_url ? (
                              <img 
                                src={project.image_url} 
                                alt={project.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <Folder className={clsx("w-12 h-12", c.accent)} />
                              </div>
                            )}
                          </div>

                          <CardHeader className="p-4 pb-3">
                            {/* Category & Badges */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className={clsx("inline-block h-2 w-2 rounded-full", c.dot)} />
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                {project.category === 'web-dev' ? 'Web Dev' : project.category.replace('-', '/')}
                              </span>
                              
                              {project.id === 'devops-studio' && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-medium rounded-full ring-1 ring-amber-200/60">
                                  <Star className="w-3 h-3" />
                                  Featured
                                </div>
                              )}
                              
                              {project.projectType === 'Client Work' && (
                                <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-full ring-1 ring-blue-200/60">
                                  <Briefcase className="w-3 h-3" />
                                  Client Work
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="font-bold text-lg text-slate-900 group-hover:text-slate-950 leading-tight mb-2">
                              {project.name}
                            </h3>

                            {/* Type & Status Badges */}
                            <div className="flex gap-1.5 mb-2">
                              <span className={clsx(
                                "px-2 py-0.5 text-xs font-medium rounded-full ring-1",
                                getProjectTypeStyle(project.projectType)
                              )}>
                                {project.projectType}
                              </span>
                              <span className={clsx(
                                "px-2 py-0.5 text-xs font-medium rounded-full ring-1",
                                getStatusStyle(project.status)
                              )}>
                                {project.status}
                              </span>
                            </div>

                            {/* Description - Reduced spacing */}
                            <p className="text-slate-600 leading-relaxed text-sm mb-3 line-clamp-2">
                              {project.description}
                            </p>
                          </CardHeader>

                          <CardContent className="px-4 pb-4 pt-0 flex flex-col flex-1">
                            {/* Tags - Flex Wrap */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {techs.map((tech, index) => (
                                <span
                                  key={index}
                                  className={clsx(
                                    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                                    c.pill,
                                    "ring-1"
                                  )}
                                >
                                  <span className={clsx("h-1.5 w-1.5 rounded-full", c.dot)} />
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Icon-Only Buttons Footer */}
                            <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                              {project.github_url && (
                                <a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200"
                                  title="View Code"
                                >
                                  <Code2 className="w-4 h-4" />
                                </a>
                              )}
                              
                              {project.live_url && project.live_url.trim() !== '' && (
                                <a
                                  href={project.live_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                                  title="Live Demo"
                                >
                                  <Eye className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Project Stats Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg ring-1 ring-slate-200/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">{allProjects.length}</div>
                <div className="text-sm text-slate-600">Total Projects</div>
              </div>
              <div className="w-px h-8 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {allProjects.filter(p => p.projectType === 'Production').length}
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
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">
                  {allProjects.filter(p => p.projectType === 'Client Work').length}
                </div>
                <div className="text-sm text-slate-600">Client Work</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}