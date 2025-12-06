'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  // Map string icon names to actual icon components
  const experiences = experiencesData.map(exp => ({
    ...exp,
    highlights: exp.highlights.map(h => ({
      ...h,
      icon: iconMap[h.icon] || Code // Fallback to Code icon if not found
    }))
  }));

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

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const isFlipped = (index: number) => flippedCards.has(index);

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
          <div className="relative">
            {/* Vertical Timeline Line - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-blue-200 via-purple-200 to-green-200"></div>

            <div className="space-y-8 md:space-y-16">
              {experiences.map((exp, index) => {
                const cardStyle = getCardStyle(exp.type);
                
                return (
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
                    <div className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo} transition-all duration-300 ${
                      hoveredIndex === index ? 'scale-125 opacity-0 z-0' : 'opacity-100 z-10'
                    }`}>
                      {exp.type === 'current' && hoveredIndex !== index && (
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo} animate-pulse opacity-75`}></div>
                      )}
                      {exp.type === 'side-business' && hoveredIndex !== index && (
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo} animate-pulse opacity-75`}></div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}>
                      {/* Mobile: Flip Card Container */}
                      <div 
                        className="md:hidden relative cursor-pointer mb-4"
                        style={{ 
                          perspective: '1000px'
                        }}
                        onClick={() => handleCardClick(index)}
                      >
                        <div
                          className="relative w-full transition-transform duration-700"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: isFlipped(index) ? 'rotateY(180deg)' : 'rotateY(0deg)'
                          }}
                        >
                          {/* Front of Card */}
                          <div
                            className="w-full"
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              transform: 'rotateY(0deg)'
                            }}
                          >
                            <Card className={`rounded-3xl shadow-xl ${cardStyle.bgGradient} ${
                              exp.type === 'side-business' 
                                ? 'ring-2 ring-amber-200 ring-offset-2 ring-offset-transparent' 
                                : 'ring-1 ring-gray-200/50'
                            }`}>
                              <CardContent className="p-5 bg-gradient-to-br from-white/60 to-transparent rounded-3xl">
                                {/* Header Section */}
                                <div className="flex items-start gap-3 mb-3">
                                  {/* Company Logo */}
                                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center p-2.5 shadow-md ${
                                    exp.type === 'side-business' 
                                      ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 ring-2 ring-amber-200/50' 
                                      : 'bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50 ring-1 ring-gray-200/50'
                                  }`}>
                                    {exp.logo ? (
                                      <Image 
                                        src={exp.logo} 
                                        alt={`${exp.company} logo`} 
                                        width={56}
                                        height={56}
                                        className="object-contain w-full h-full"
                                      />
                                    ) : (
                                      <Code className={`w-7 h-7 ${exp.type === 'side-business' ? 'text-amber-600' : 'text-gray-500'}`} />
                                    )}
                                  </div>

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

                                {/* Highlights - Show top 4 only */}
                                <div className="mt-3.5 flex flex-wrap gap-2">
                                  {exp.highlights.slice(0, 4).map((highlight, hIndex) => (
                                    <div 
                                      key={hIndex}
                                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm ${
                                        exp.type === 'side-business'
                                          ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/60'
                                          : highlight.metric 
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200/60' 
                                            : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-200/60'
                                      }`}
                                    >
                                      <highlight.icon className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate">{highlight.text}</span>
                                    </div>
                                  ))}
                                </div>

                                {/* Technologies - Show top 6 */}
                                <div className="mt-3.5">
                                  <div className="flex flex-wrap gap-1.5">
                                    {exp.technologies.slice(0, 6).map((tech, techIndex) => (
                                      <span 
                                        key={techIndex}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm ring-1 ${
                                          techColors[techIndex % techColors.length]
                                        }`}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {exp.technologies.length > 6 && (
                                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 ring-1 ring-slate-200/60">
                                        +{exp.technologies.length - 6}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Arrow Indicator */}
                                <div className="mt-4 pt-3.5 border-t border-gray-200/60 flex items-center justify-center">
                                  <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-gray-500 font-medium">Tap to see details</span>
                                    <ChevronDown className="w-4 h-4 text-gray-400 animate-bounce" />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>

                          {/* Back of Card */}
                          <div
                            className="absolute top-0 left-0 w-full"
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)'
                            }}
                          >
                            <Card className={`rounded-3xl shadow-xl ${
                              exp.type === 'side-business' 
                                ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 ring-2 ring-amber-300 ring-offset-2 ring-offset-transparent' 
                                : 'bg-gradient-to-br from-white via-blue-50/30 to-white ring-2 ring-blue-200 ring-offset-2 ring-offset-transparent'
                            }`}>
                              <CardContent className="p-5 bg-gradient-to-br from-white/40 to-transparent rounded-3xl">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className={`font-semibold text-sm ${
                                    exp.type === 'side-business' ? 'text-amber-900' : 'text-slate-900'
                                  }`}>
                                    Key Achievements
                                  </h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCardClick(index);
                                    }}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                    aria-label="Close"
                                  >
                                    <ChevronDown className="w-4 h-4 rotate-180" />
                                  </button>
                                </div>
                                
                                {/* Achievements - Show top 5 */}
                                <ul className="space-y-2.5 mb-3.5">
                                  {exp.achievements.slice(0, 5).map((achievement, achIndex) => (
                                    <li 
                                      key={achIndex}
                                      className="flex items-start gap-2.5"
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm ${
                                        exp.type === 'side-business'
                                          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                      }`}></div>
                                      <span className="text-gray-700 text-[11px] leading-snug">{achievement}</span>
                                    </li>
                                  ))}
                                  {exp.achievements.length > 5 && (
                                    <li className="flex items-start gap-2.5">
                                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                        exp.type === 'side-business'
                                          ? 'bg-gradient-to-r from-amber-400 to-orange-400 opacity-50'
                                          : 'bg-gradient-to-r from-blue-400 to-purple-400 opacity-50'
                                      }`}></div>
                                      <span className="text-gray-500 text-[11px] italic leading-snug">
                                        +{exp.achievements.length - 5} more achievements
                                      </span>
                                    </li>
                                  )}
                                </ul>
                                
                                {/* Footer - All tech tags */}
                                <div className="pt-3.5 border-t border-gray-200/60">
                                  <div className="flex flex-wrap gap-1.5">
                                    {exp.technologies.map((tech, techIndex) => (
                                      <span 
                                        key={techIndex}
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-medium shadow-sm ring-1 ${
                                          techColors[techIndex % techColors.length]
                                        }`}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>

                      {/* Desktop: Original Hover Card */}
                      <Card className={`hidden md:block rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible relative ${
                        hoveredIndex === index ? 'transform scale-105' : ''
                      } ${cardStyle.bgGradient} ${
                        exp.type === 'side-business' 
                          ? 'ring-2 ring-amber-200/50' 
                          : 'ring-1 ring-gray-200/30'
                      }`}>
                        <CardContent className="p-0">
                          {/* Header Section */}
                          <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                              {/* Company Logo */}
                              <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 shadow-md ${
                                exp.type === 'side-business' 
                                  ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50 ring-2 ring-amber-200/50' 
                                  : 'bg-gradient-to-br from-blue-50 via-gray-50 to-slate-50 ring-1 ring-gray-200/50'
                              }`}>
                                {exp.logo ? (
                                  <Image 
                                    src={exp.logo} 
                                    alt={`${exp.company} logo`} 
                                    width={56}
                                    height={56}
                                    className="object-contain w-full h-full"
                                  />
                                ) : (
                                  <Code className={`w-8 h-8 ${exp.type === 'side-business' ? 'text-amber-600' : 'text-gray-500'}`} />
                                )}
                              </div>

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

                            {/* Highlights */}
                            <div className="mt-4 flex flex-wrap gap-3">
                              {exp.highlights.map((highlight, hIndex) => (
                                <div 
                                  key={hIndex}
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm ${
                                    exp.type === 'side-business'
                                      ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 ring-1 ring-amber-200/60'
                                      : highlight.metric 
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 ring-1 ring-green-200/60' 
                                        : 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-200/60'
                                  }`}
                                >
                                  <highlight.icon className="w-4 h-4" />
                                  {highlight.text}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Smart Horizontal Expansion - Clean, No Overlap */}
                          <AnimatePresence>
                            {hoveredIndex === index && (
                              <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "480px", opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className={`overflow-hidden absolute top-0 bottom-0 shadow-2xl z-30 ${
                                  exp.type === 'side-business' 
                                    ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 ring-2 ring-amber-300' 
                                    : 'bg-gradient-to-br from-white via-blue-50/30 to-white ring-2 ring-blue-200'
                                } ${
                                  index % 2 === 0 
                                    ? 'left-full rounded-r-2xl ring-l-0'
                                    : 'right-full rounded-l-2xl ring-r-0'
                                }`}
                                style={{ width: "480px" }}
                              >
                                <div className="p-5 h-full overflow-y-auto" style={{ width: "480px" }}>
                                  <h4 className={`font-semibold mb-3 text-base sticky top-0 pb-2 ${
                                    exp.type === 'side-business' 
                                      ? 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 text-amber-900' 
                                      : 'bg-gradient-to-br from-white via-blue-50/30 to-white text-slate-900'
                                  }`}>
                                    Key Achievements:
                                  </h4>
                                  <ul className="space-y-2.5">
                                    {exp.achievements.map((achievement, achIndex) => (
                                      <motion.li 
                                        key={achIndex} 
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -15 : 15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: achIndex * 0.08 }}
                                        className="flex items-start gap-2.5"
                                      >
                                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                                          exp.type === 'side-business'
                                            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                        }`}></div>
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
                                  className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ring-1 transition-colors duration-200 hover:scale-105 cursor-default ${
                                    techColors[techIndex % techColors.length]
                                  }`}
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
                );
              })}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}