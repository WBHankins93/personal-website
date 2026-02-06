'use client';

import React, { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useInView as useIntersectionObserver } from "react-intersection-observer";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TIMING } from "@/lib/animation-configs/timing";
import { SPRING } from "@/lib/animation-configs/spring";
import { EASE } from "@/lib/animation-configs/ease";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Code, 
  TrendingUp, 
  Users, 
  Award, 
  Briefcase, 
  Palette, 
  Sparkles, 
  Zap, 
  Target, 
  Rocket, 
  CheckCircle,
  ChevronDown,
  type LucideIcon 
} from "lucide-react";
import Image from "next/image";
import { experiencesData } from "@/data/experiences";

// Icon mapping object
const iconMap: Record<string, LucideIcon> = {
  Award,
  TrendingUp,
  Code,
  Users,
  Briefcase,
  Palette,
  Sparkles,
  Zap,
  Target,
  Rocket,
  CheckCircle
};

type ExperienceItem = typeof experiencesData[number];
type ExperienceWithIcons = Omit<ExperienceItem, 'highlights'> & {
  highlights: Array<Omit<ExperienceItem['highlights'][number], 'icon'> & { icon: LucideIcon }>;
};

// Helper function to generate work summary from achievements
function generateWorkSummary(achievements: string[]): string {
  if (achievements.length === 0) return '';
  
  // Take first 1-2 achievements and create concise summary
  const firstAchievement = achievements[0];
  
  // Extract key points: look for impact metrics, scope, and outcomes
  // Create a 1-2 sentence summary focusing on what was accomplished
  const sentences = firstAchievement.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  if (sentences.length >= 2) {
    // Use first two sentences if they're concise
    return `${sentences[0].trim()}. ${sentences[1].trim()}.`;
  } else if (sentences.length === 1) {
    // If only one sentence, try to split it or use as-is if short enough
    const sentence = sentences[0].trim();
    if (sentence.length < 200) {
      return `${sentence}.`;
    }
    // If too long, take first part
    const parts = sentence.split(';');
    if (parts.length >= 2) {
      return `${parts[0].trim()}; ${parts[1].trim()}.`;
    }
    return `${sentence.substring(0, 180)}...`;
  }
  
  return firstAchievement.substring(0, 200);
}

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [timelineRef, timelineInView] = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Map string icon names to actual icon components and sort chronologically
  const experiences: ExperienceWithIcons[] = experiencesData
    .map((exp: ExperienceItem) => ({
      ...exp,
      highlights: exp.highlights.map(h => ({
        ...h,
        icon: iconMap[h.icon] || Code // Fallback to Code icon if not found
      }))
    }))
    .sort((a, b) => {
      // Sort by period - extract year and month for comparison
      const getDateValue = (period: string) => {
        // Extract year and month from period string like "Jan 2025 – Sep 2025" or "Feb 2021 – Aug 2024"
        const match = period.match(/(\w+)\s+(\d{4})/);
        if (match) {
          const month = match[1];
          const year = parseInt(match[2]);
          const monthMap: Record<string, number> = {
            'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
            'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
          };
          return year * 12 + (monthMap[month] || 0);
        }
        return 0;
      };
      return getDateValue(b.period) - getDateValue(a.period); // Most recent first
    });

  const techColors = [
    "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-blue-200/60",
    "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-green-200/60",
    "bg-gradient-to-r from-purple-50 to-violet-50 text-purple-700 ring-purple-200/60",
    "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 ring-orange-200/60",
    "bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700 ring-cyan-200/60",
    "bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 ring-pink-200/60",
    "bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 ring-indigo-200/60",
    "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 ring-teal-200/60",
    "bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 ring-yellow-200/60",
    "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 ring-red-200/60",
  ];

  // Color scheme for Sproutflow (warm tones)
  const getCardStyle = (type: string) => {
    if (type === 'side-business') {
      return {
        borderColor: 'border-amber-200',
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-orange-500',
        bgGradient: 'bg-gradient-to-br from-amber-50 to-orange-50'
      };
    }
    return {
      borderColor: '',
      gradientFrom: type === 'current' ? 'from-blue-500' : 'from-gray-400',
      gradientTo: type === 'current' ? 'to-purple-500' : 'to-gray-500',
      bgGradient: 'bg-white'
    };
  };


  return (
    <section id="experience" className="py-12 md:py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6"
            >
              Professional Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4"
            >
              Helping enterprise customers succeed through technical expertise, consultative problem-solving, and customer-focused solution delivery.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Vertical Timeline Line - Hidden on mobile, visible on desktop - Animated draw */}
            <motion.div
              className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-blue-200 via-purple-200 to-green-200"
              initial={{ scaleY: 0 }}
              animate={timelineInView && !prefersReducedMotion ? { scaleY: 1 } : { scaleY: 1 }}
              transition={{
                duration: 1.5,
                ease: EASE.easeOut,
              }}
              style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-6 md:space-y-8">
              {experiences.map((exp, index) => {
                const cardStyle = getCardStyle(exp.type);
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: TIMING.normal / 1000,
                      delay: index * 0.1,
                      ease: EASE.easeOut,
                    }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-8`}
                  >
                    {/* Timeline Dot with pulse and glow */}
                    <motion.div
                      className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo} z-10`}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: TIMING.normal / 1000,
                        delay: index * 0.1 + 0.3,
                        ease: EASE.easeOut,
                      }}
                    >
                      {/* Glowing ring animation */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo}`}
                        animate={prefersReducedMotion ? {} : {
                          scale: [1, 1.5, 1],
                          opacity: [0.75, 0, 0.75],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>
                    
                    {/* Year Label on Timeline */}
                    {(() => {
                      const yearMatch = exp.period.match(/\d{4}/);
                      const year = yearMatch ? yearMatch[0] : null;
                      return year ? (
                        <motion.div
                          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: TIMING.normal / 1000,
                            delay: index * 0.1 + 0.5,
                            ease: EASE.easeOut,
                          }}
                          style={{ top: 'calc(50% + 12px)' }}
                        >
                          <span className="text-xs font-semibold text-slate-600 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-slate-200">
                            {year}
                          </span>
                        </motion.div>
                      ) : null;
                    })()}

                    {/* Content Card */}
                    <div className={`w-full md:w-[48%] ${
                      index % 2 === 0 ? 'md:pr-4' : 'md:pl-4'
                    } relative`}>
                      {/* Mobile: Simplified Card */}
                      <div className="md:hidden relative mb-4">
                        <Card className={`rounded-3xl shadow-xl ${cardStyle.bgGradient} ${
                          exp.type === 'side-business' 
                            ? 'ring-2 ring-amber-200 ring-offset-2 ring-offset-transparent' 
                            : 'ring-1 ring-gray-200/50'
                        }`}>
                          <CardContent className="p-5 bg-gradient-to-br from-white/60 to-transparent rounded-3xl">
                                {/* Header Section */}
                                <div className="flex items-start gap-3 mb-3">
                                  {/* Company Logo with spin animation */}
                                  <motion.div
                                    className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center p-2.5 shadow-md overflow-hidden ${
                                      exp.type === 'side-business' 
                                        ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 ring-2 ring-amber-200/50' 
                                        : 'bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50 ring-1 ring-gray-200/50'
                                    }`}
                                    initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                    whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{
                                      duration: 0.8,
                                      delay: index * 0.1 + 0.2,
                                      ease: EASE.easeOut,
                                    }}
                                  >
                                    {exp.logo ? (
                                      <Image 
                                        src={exp.logo} 
                                        alt={`${exp.company} logo`} 
                                        width={56}
                                        height={56}
                                        className={
                                          exp.company === 'Prove AI' 
                                            ? 'object-cover w-full h-full scale-150'
                                            : (exp.company === 'Sproutflow Studio' || exp.company === 'General Assembly')
                                              ? 'object-cover w-full h-full scale-110'
                                              : 'object-contain w-full h-full'
                                        }
                                      />
                                    ) : (
                                      <Code className={`w-7 h-7 ${exp.type === 'side-business' ? 'text-amber-600' : 'text-gray-500'}`} />
                                    )}
                                  </motion.div>

                                  {/* Job Details */}
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-sm leading-tight text-slate-900 mb-1 line-clamp-2">
                                      {exp.title}
                                    </h3>
                                    <p className={`font-semibold text-xs mb-1.5 truncate ${
                                      exp.type === 'side-business' ? 'text-amber-600' : 'text-blue-600'
                                    }`}>
                                      {exp.company}
                                    </p>
                                    
                                    <div className="flex flex-col gap-1 text-[10px] text-gray-600">
                                      <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{exp.period}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{exp.location}</span>
                                      </div>
                                    </div>

                                    {/* Optional Note Badge */}
                                    {exp.note && (
                                      <div className="mt-2">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold shadow-sm ${
                                          exp.type === 'side-business' 
                                            ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 ring-1 ring-amber-300/50' 
                                            : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 ring-1 ring-blue-300/50'
                                        }`}>
                                          {exp.note}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Highlights - Left aligned, fit content - Stagger pop in */}
                                <div className="mt-3.5 flex flex-wrap gap-2">
                                  {exp.highlights.slice(0, 4).map((highlight, hIndex) => (
                                    <motion.div
                                      key={hIndex}
                                      initial={{ opacity: 0, scale: 0 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true, amount: 0.3 }}
                                      transition={{
                                        delay: index * 0.1 + hIndex * 0.05,
                                        duration: TIMING.fast / 1000,
                                        ease: EASE.easeOut,
                                      }}
                                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm w-fit ${
                                        exp.type === 'side-business'
                                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/60'
                                          : highlight.metric 
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200/60' 
                                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-200/60'
                                      }`}
                                    >
                                      <highlight.icon className="w-3 h-3 flex-shrink-0" />
                                      <span>{highlight.text}</span>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Work Summary */}
                                <div className="mt-3.5 mb-3.5">
                                  <p className="text-slate-600 text-xs leading-relaxed">
                                    {generateWorkSummary(exp.achievements)}
                                  </p>
                                </div>

                                {/* Technologies - Show top 6 - Stagger slide up */}
                                <div className="mt-3.5">
                                  <div className="flex flex-wrap gap-1.5">
                                    {exp.technologies.slice(0, 6).map((tech, techIndex) => (
                                      <motion.span
                                        key={techIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{
                                          delay: index * 0.1 + techIndex * 0.03,
                                          duration: TIMING.fast / 1000,
                                          ease: EASE.easeOut,
                                        }}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm ring-1 ${
                                          techColors[techIndex % techColors.length]
                                        }`}
                                      >
                                        {tech}
                                      </motion.span>
                                    ))}
                                    {exp.technologies.length > 6 && (
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 ring-1 ring-slate-200/60">
                                        +{exp.technologies.length - 6}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                      {/* Desktop: Simplified Card */}
                      <Card className={`hidden md:block rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible relative ${cardStyle.bgGradient} ${
                        exp.type === 'side-business' 
                          ? 'ring-2 ring-amber-200/50' 
                          : 'ring-1 ring-gray-200/30'
                      }`}>
                        <CardContent className="p-0">
                          {/* Header Section */}
                          <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                              {/* Company Logo with spin animation */}
                              <motion.div
                                className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 shadow-md overflow-hidden ${
                                  exp.type === 'side-business' 
                                    ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 ring-2 ring-amber-200/50' 
                                    : 'bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50 ring-1 ring-gray-200/50'
                                }`}
                                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                  duration: 0.8,
                                  delay: index * 0.1 + 0.2,
                                  ease: EASE.easeOut,
                                }}
                              >
                                {exp.logo ? (
                                  <Image 
                                    src={exp.logo} 
                                    alt={`${exp.company} logo`} 
                                    width={56}
                                    height={56}
                                    className={
                                      exp.company === 'Prove AI' 
                                        ? 'object-cover w-full h-full scale-150'
                                        : (exp.company === 'Sproutflow Studio' || exp.company === 'General Assembly')
                                          ? 'object-cover w-full h-full scale-110'
                                          : 'object-contain w-full h-full'
                                    }
                                  />
                                ) : (
                                  <Code className={`w-8 h-8 ${exp.type === 'side-business' ? 'text-amber-600' : 'text-gray-500'}`} />
                                )}
                              </motion.div>

                              {/* Job Details */}
                              <div className="flex-1">
                                <h3 className="font-bold text-xl text-slate-900 mb-1">
                                  {exp.title}
                                </h3>
                                <p className={`font-semibold text-lg mb-2 ${
                                  exp.type === 'side-business' ? 'text-amber-600' : 'text-blue-600'
                                }`}>
                                  {exp.company}
                                </p>
                                
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

                                {/* Optional Note Badge */}
                                {exp.note && (
                                  <div className="mt-2">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
                                      exp.type === 'side-business' 
                                        ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 ring-1 ring-amber-300/50' 
                                        : 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 ring-1 ring-blue-300/50'
                                    }`}>
                                      {exp.note}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Highlights - Left aligned, fit content - Stagger pop in */}
                            <div className="mt-4 flex flex-wrap gap-3">
                              {exp.highlights.map((highlight, hIndex) => (
                                <motion.div
                                  key={hIndex}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  transition={{
                                    delay: index * 0.1 + hIndex * 0.05,
                                    duration: TIMING.fast / 1000,
                                    ease: EASE.easeOut,
                                  }}
                                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm w-fit ${
                                    exp.type === 'side-business'
                                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/60'
                                      : highlight.metric 
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200/60' 
                                        : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-200/60'
                                  }`}
                                >
                                  <highlight.icon className="w-4 h-4 flex-shrink-0" />
                                  <span>{highlight.text}</span>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Work Summary */}
                            <div className="mt-4">
                              <p className="text-slate-600 text-sm leading-relaxed">
                                {generateWorkSummary(exp.achievements)}
                              </p>
                            </div>
                          </div>


                          {/* Technologies - Stagger slide up */}
                          <div className="p-6 pt-4">
                            <div className="flex flex-wrap gap-2">
                              {exp.technologies.map((tech, techIndex) => (
                                <motion.span
                                  key={techIndex}
                                  initial={{ opacity: 0, y: 10 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true, amount: 0.3 }}
                                  transition={{
                                    delay: index * 0.1 + techIndex * 0.03, // 30ms apart as per plan
                                    duration: TIMING.fast / 1000,
                                    ease: EASE.easeOut,
                                  }}
                                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ring-1 transition-colors duration-200 cursor-default ${
                                    techColors[techIndex % techColors.length]
                                  }`}
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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