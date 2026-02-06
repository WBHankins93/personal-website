'use client';

import React, { useState } from "react";
import type { Project } from "@/data/projects";
import { projects as allProjects } from "@/data/projects";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Star, Briefcase, ChevronDown, Eye, Code2, Server, Workflow, Activity, GitBranch, Shield, Globe, BookOpen, Users, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { cat, type CategoryKey } from "@/lib/colors";
import Image from "next/image";

// Get category icon for project
const getCategoryIcon = (project: Project) => {
  if (project.showcase) {
    if (project.id === 'implementation-studio') return BookOpen;
    if (project.id === 'solutions-playbook') return Users;
    if (project.id === 'devops-studio') return Code2;
  }
  
  switch (project.category) {
    case 'infrastructure': return Server;
    case 'automation': return Workflow;
    case 'monitoring': return Activity;
    case 'ci-cd': return GitBranch;
    case 'security': return Shield;
    case 'web-dev': return Globe;
    case 'education': return GraduationCap;
    default: return Server;
  }
};

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
  const [expandedTags, setExpandedTags] = useState<Set<string>>(new Set());
  const [tagCarouselPages, setTagCarouselPages] = useState<Record<string, number>>({});

  const categories: { id: "all" | CategoryKey; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: allProjects.length },
    { id: "infrastructure", label: "Infrastructure", count: allProjects.filter(p => p.category === "infrastructure").length },
    { id: "automation", label: "Automation", count: allProjects.filter(p => p.category === "automation").length },
    { id: "monitoring", label: "Monitoring", count: allProjects.filter(p => p.category === "monitoring").length },
    { id: "ci-cd", label: "CI/CD", count: allProjects.filter(p => p.category === "ci-cd").length },
    { id: "security", label: "Security", count: allProjects.filter(p => p.category === "security").length },
    { id: "education", label: "Education", count: allProjects.filter(p => p.category === "education").length },
    { id: "web-dev", label: "Web Dev", count: allProjects.filter(p => p.category === "web-dev").length },
  ];

  const filteredProjects = selectedCategory === "all"
    ? allProjects
    : allProjects.filter((p) => p.category === selectedCategory);

  // Sort projects: showcase first, then featured, then regular
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    // Showcase projects first
    if (a.showcase && !b.showcase) return -1;
    if (!a.showcase && b.showcase) return 1;
    
    // Then featured projects
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
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

  const toggleTagCarousel = (projectId: string) => {
    setExpandedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
        // Reset carousel page when closing
        setTagCarouselPages(prevPages => {
          const newPages = { ...prevPages };
          delete newPages[projectId];
          return newPages;
        });
      } else {
        newSet.add(projectId);
        // Initialize carousel page to 0
        setTagCarouselPages(prevPages => ({
          ...prevPages,
          [projectId]: 0
        }));
      }
      return newSet;
    });
  };

  const nextTagPage = (projectId: string, totalPages: number) => {
    setTagCarouselPages(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalPages
    }));
  };

  const prevTagPage = (projectId: string, totalPages: number) => {
    setTagCarouselPages(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalPages) % totalPages
    }));
  };

  return (
    <section id="projects" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-8 md:mb-10">
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

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 md:mb-8 px-2">
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
                          className={clsx(
                            "rounded-2xl shadow-lg border-2 transition-all duration-300 overflow-hidden",
                            (project.featured || project.showcase)
                              ? clsx(
                                  c.bg,
                                  `ring-2 ${c.ring}`,
                                  isExpanded ? `ring-4 ${c.ring}` : ""
                                )
                              : clsx(
                                  isExpanded ? 'border-slate-300' : 'border-slate-200'
                                )
                          )}
                        >
                          {/* Collapsed View - Title & Category Only */}
                          <div
                            onClick={() => toggleProject(project.id)}
                            className={clsx(
                              "p-3 cursor-pointer flex items-center justify-between",
                              (project.featured || project.showcase) && "bg-white/60 backdrop-blur-sm"
                            )}
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <span className={clsx("inline-block h-2.5 w-2.5 rounded-full flex-shrink-0", c.dot)} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className={clsx(
                                    "text-xs font-semibold uppercase tracking-wide",
                                    (project.featured || project.showcase) ? c.accent : "text-slate-500"
                                  )}>
                                    {project.category === 'web-dev' ? 'Web Dev' : project.category.replace('-', '/')}
                                  </span>
                                  {project.showcase && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-medium rounded-full ring-1 ring-amber-200/60">
                                      <Star className="w-3 h-3 fill-current" />
                                      Showcase
                                    </div>
                                  )}
                                  {project.featured && !project.showcase && (
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-full ring-1 ring-blue-200/60">
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
                                <div className={clsx(
                                  "px-4 pb-4 border-t pt-3 space-y-3",
                                  (project.featured || project.showcase) 
                                    ? "bg-white/40 backdrop-blur-sm border-slate-200/60" 
                                    : "border-slate-200/60"
                                )}>
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
                  className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 auto-rows-fr"
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
                          "group rounded-2xl transition-all duration-300 overflow-hidden flex flex-col w-full",
                          "border-2 shadow-lg",
                          // Apply category colors to ALL cards
                          `bg-gradient-to-br ${c.grad}`,
                          `ring-2 ${c.ring}`,
                          hoveredProject === project.id 
                            ? `shadow-2xl scale-[1.03] ring-4 ${c.ring} transition-all duration-300` 
                            : `shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:ring-4 ${c.ring} transition-all duration-300`
                        )}>

                          <CardHeader className="p-2.5">
                            {/* Category & Badges */}
                            <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                              <span className={clsx("inline-block h-1.5 w-1.5 rounded-full", c.dot)} />
                              <span className={clsx(
                                "text-[10px] font-semibold uppercase tracking-wide",
                                (project.featured || project.showcase) ? c.accent : "text-slate-500"
                              )}>
                                {project.category === 'web-dev' ? 'Web Dev' : project.category.replace('-', '/')}
                              </span>
                              
                              {project.showcase && (
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-[10px] font-medium rounded-full ring-1 ring-amber-200/60">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  Showcase
                                </div>
                              )}
                              
                              {project.featured && !project.showcase && (
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-[10px] font-medium rounded-full ring-1 ring-blue-200/60">
                                  <Star className="w-2.5 h-2.5" />
                                  Featured
                                </div>
                              )}
                              
                              {project.projectType === 'Client Work' && (
                                <div className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-[10px] font-medium rounded-full ring-1 ring-blue-200/60">
                                  <Briefcase className="w-2.5 h-2.5" />
                                  Client Work
                                </div>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className={clsx(
                              "font-bold text-sm leading-tight mb-1.5",
                              (project.featured || project.showcase) 
                                ? "text-slate-900 group-hover:text-slate-950" 
                                : "text-slate-900 group-hover:text-slate-950"
                            )}>
                              {project.name}
                            </h3>

                            {/* Type & Status Badges */}
                            <div className="flex gap-1 mb-1.5">
                              <span className={clsx(
                                "px-1.5 py-0.5 text-[10px] font-medium rounded-full ring-1",
                                getProjectTypeStyle(project.projectType)
                              )}>
                                {project.projectType}
                              </span>
                              <span className={clsx(
                                "px-1.5 py-0.5 text-[10px] font-medium rounded-full ring-1",
                                getStatusStyle(project.status)
                              )}>
                                {project.status}
                              </span>
                            </div>

                            {/* Description - Truncated for compact layout */}
                            <p className="text-slate-600 leading-snug text-xs mb-2 line-clamp-2">
                              {project.description}
                            </p>
                          </CardHeader>

                          <CardContent className="px-2.5 pb-2.5 pt-0 flex flex-col flex-1">
                            {/* Tags - 2-Row Carousel */}
                            <div className="relative mb-0">
                              {/* Fixed height container for 2 rows */}
                              <div className="overflow-hidden" style={{ maxHeight: '2.5rem' }}>
                                <AnimatePresence mode="wait">
                                  {(() => {
                                  const isExpanded = expandedTags.has(project.id);
                                  const initialTagCount = 8; // Tags that fit in 2 rows
                                  const remainingTags = techs.length - initialTagCount;
                                  const tagsPerPage = 4; // Tags per carousel page
                                  const totalPages = Math.ceil(remainingTags / tagsPerPage);
                                  const currentPage = tagCarouselPages[project.id] || 0;
                                  
                                  if (!isExpanded) {
                                    // Show initial tags that fit in 2 rows
                                    return (
                                      <div className="flex flex-wrap gap-1">
                                        {techs.slice(0, initialTagCount).map((tech, index) => (
                                          <span
                                            key={index}
                                            className={clsx(
                                              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                                              c.pill,
                                              "ring-1"
                                            )}
                                          >
                                            <span className={clsx("h-1 w-1 rounded-full", c.dot)} />
                                            {tech}
                                          </span>
                                        ))}
                                        {remainingTags > 0 && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTagCarousel(project.id);
                                            }}
                                            className="text-[10px] text-slate-600 hover:text-slate-900 px-1.5 py-0.5 cursor-pointer transition-colors"
                                          >
                                            +{remainingTags}
                                          </button>
                                        )}
                                      </div>
                                    );
                                  } else {
                                    // Show carousel with all tags
                                    const startIdx = initialTagCount + (currentPage * tagsPerPage);
                                    const endIdx = Math.min(startIdx + tagsPerPage, techs.length);
                                    const visibleTags = techs.slice(startIdx, endIdx);
                                    const hasMore = endIdx < techs.length;
                                    const hasPrev = currentPage > 0;
                                    
                                    return (
                                      <motion.div
                                        key={currentPage}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex flex-wrap gap-1 items-center"
                                      >
                                        {/* Show initial tags */}
                                        {techs.slice(0, initialTagCount).map((tech, index) => (
                                          <span
                                            key={index}
                                            className={clsx(
                                              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                                              c.pill,
                                              "ring-1"
                                            )}
                                          >
                                            <span className={clsx("h-1 w-1 rounded-full", c.dot)} />
                                            {tech}
                                          </span>
                                        ))}
                                        
                                        {/* Carousel tags */}
                                        {visibleTags.map((tech, index) => (
                                          <motion.span
                                            key={`carousel-${startIdx + index}`}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className={clsx(
                                              "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                                              c.pill,
                                              "ring-1"
                                            )}
                                          >
                                            <span className={clsx("h-1 w-1 rounded-full", c.dot)} />
                                            {tech}
                                          </motion.span>
                                        ))}
                                        
                                        {/* Navigation */}
                                        <div className="flex items-center gap-1 ml-1">
                                          {hasPrev && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                prevTagPage(project.id, totalPages);
                                              }}
                                              className="text-[10px] text-slate-600 hover:text-slate-900 px-1 cursor-pointer"
                                            >
                                              ←
                                            </button>
                                          )}
                                          {hasMore && (
                                            <button
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                nextTagPage(project.id, totalPages);
                                              }}
                                              className="text-[10px] text-slate-600 hover:text-slate-900 px-1 cursor-pointer"
                                            >
                                              →
                                            </button>
                                          )}
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTagCarousel(project.id);
                                            }}
                                            className="text-[10px] text-slate-600 hover:text-slate-900 px-1 cursor-pointer"
                                          >
                                            ×
                                          </button>
                                        </div>
                                      </motion.div>
                                    );
                                  }
                                  })()}
                                </AnimatePresence>
                              </div>
                            </div>

                            {/* Icon-Only Buttons Footer */}
                            <div className="flex items-center gap-1.5 mt-auto pt-1.5 border-t border-slate-100">
                              {project.github_url && (
                                <a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors duration-200"
                                  title="View Code"
                                >
                                  <Code2 className="w-3.5 h-3.5" />
                                </a>
                              )}
                              
                              {project.live_url && project.live_url.trim() !== '' && (
                                <a
                                  href={project.live_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors duration-200"
                                  title="Live Demo"
                                >
                                  <Eye className="w-3.5 h-3.5" />
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