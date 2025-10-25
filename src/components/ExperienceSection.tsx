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

  // Map string icon names to actual icon components
  const experiences = experiencesData.map(exp => ({
    ...exp,
    highlights: exp.highlights.map(h => ({
      ...h,
      icon: iconMap[h.icon] || Code // Fallback to Code icon if not found
    }))
  }));

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
              Professional Experience
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto"
            >
              Helping enterprise customers succeed through technical expertise, consultative problem-solving, and customer-focused solution delivery.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-blue-200 via-purple-200 to-green-200"></div>

            <div className="space-y-16">
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
                    <div className={`absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg bg-gradient-to-r ${cardStyle.gradientFrom} ${cardStyle.gradientTo} transition-all duration-300 ${
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
                    <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                      index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                    }`}>
                      <Card className={`border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-visible relative ${
                        hoveredIndex === index ? 'transform scale-105' : ''
                      } ${cardStyle.bgGradient} ${exp.type === 'side-business' ? 'border-2 border-amber-200' : ''}`}>
                        <CardContent className="p-0">
                          {/* Header Section */}
                          <div className="p-6 border-b border-gray-100">
                            <div className="flex items-start gap-4">
                              {/* Company Logo */}
                              <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center p-2 shadow-sm ${
                                exp.type === 'side-business' 
                                  ? 'bg-gradient-to-br from-amber-50 to-orange-100' 
                                  : 'bg-gradient-to-br from-gray-50 to-gray-100'
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
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                      exp.type === 'side-business' 
                                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                                        : 'bg-blue-100 text-blue-800 border border-blue-300'
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
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                                    exp.type === 'side-business'
                                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                      : highlight.metric 
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
                                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300' 
                                    : 'bg-white border-2 border-blue-200'
                                } ${
                                  index % 2 === 0 
                                    ? 'left-full rounded-r-xl border-l-0'
                                    : 'right-full rounded-l-xl border-r-0'
                                }`}
                                style={{ width: "480px" }}
                              >
                                <div className="p-5 h-full overflow-y-auto" style={{ width: "480px" }}>
                                  <h4 className={`font-semibold mb-3 text-base sticky top-0 pb-2 ${
                                    exp.type === 'side-business' 
                                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 text-amber-900' 
                                      : 'bg-white text-slate-900'
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
                                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 hover:scale-105 cursor-default ${
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