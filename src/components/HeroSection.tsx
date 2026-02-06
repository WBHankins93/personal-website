'use client';

import React, { useState, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import CVModal from "./CVModal";
import dynamic from 'next/dynamic';
import TypingAnimation from './TypingAnimation';
import FloatingTechParticles from './FloatingTechParticles';
import CountUp from 'react-countup';
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TIMING } from "@/lib/animation-configs/timing";
import { SPRING } from "@/lib/animation-configs/spring";

const WordSphere = dynamic(() => import('./WordSphere').catch(() => ({ default: () => null })), { 
  ssr: false,
  loading: () => null
});

const roles = [
  "Senior Solutions Engineer",
  "Solutions Architect",
  "Customer Engineer",
  "Technical Solutions Lead",
  "Site Reliability Engineer"
];


export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  // Parallax offsets using useTransform (slower scroll for name/tagline, faster for stats)
  const nameY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const taglineY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const statsY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  
  // Fade out as user scrolls (0-20% scroll progress)
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Background gradient animation
  const [gradientOffset, setGradientOffset] = useState(0);
  
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setGradientOffset((prev) => (prev + 1) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: TIMING.normal / 1000,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: SPRING.gentle,
    },
  };

  return (
    <motion.section 
      id="home" 
      className="min-h-[90vh] flex items-center justify-center relative overflow-hidden"
      style={{ opacity: prefersReducedMotion ? 1 : opacity }}
    >
      {/* Enhanced Background with Animated Grid */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#2C2A2A] via-[#3D405B] to-[#2C2A2A]"
        animate={prefersReducedMotion ? {} : {
          background: [
            `linear-gradient(${gradientOffset}deg, #2C2A2A, #3D405B, #2C2A2A)`,
            `linear-gradient(${gradientOffset + 360}deg, #2C2A2A, #3D405B, #2C2A2A)`,
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: prefersReducedMotion ? 'none' : 'gridMove 20s linear infinite'
          }} 
        />
      </div>

      {/* Floating Tech Particles - Behind the image */}
      <FloatingTechParticles />

      {/* BH Hero Background Image - Particles disappear behind this */}
      <div 
        className="absolute inset-0 z-[2] opacity-20 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/bh-hero.png)'
        }}
      />

      {/* 3D Word Sphere Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-[5] opacity-60 pointer-events-none">
          <WordSphere />
        </div>
      </Suspense>

      {/* Enhanced Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#81B29A]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Enhanced Hero Content */}
      <motion.div 
        className="container mx-auto px-4 md:px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto">
          {/* Name with parallax and scale animation */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight font-sixtyfour"
            variants={nameVariants}
            style={prefersReducedMotion ? {} : {
              y: nameY,
            }}
          >
            Ben Hankins
          </motion.h1>

          {/* Tagline with parallax */}
          <motion.h2 
            className="text-lg sm:text-xl md:text-3xl font-medium text-white font-heading mb-4 md:mb-6"
            variants={itemVariants}
            style={prefersReducedMotion ? {} : {
              y: taglineY,
            }}
          >
            <TypingAnimation words={roles} className="text-blue-400 font-semibold" />
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 md:mb-10 leading-relaxed max-w-4xl mx-auto font-body px-4"
            variants={itemVariants}
          >
            Solutions Engineer translating complex business challenges into scalable technical solutions. I help enterprise teams move from &quot;what if&quot; to production with confidence
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16 px-4"
            variants={itemVariants}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group font-heading shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
            >
              <a
                href="https://github.com/WBHankins93"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
                <Github className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group font-heading shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
            >
              View Resume
            </Button>
          </motion.div>

          {/* Enhanced Stats Grid - Customer Impact Focus with stagger */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 text-center px-4"
            variants={statsContainerVariants}
            style={prefersReducedMotion ? {} : {
              y: statsY,
            }}
          >
            <motion.div variants={statItemVariants}>
              <Stat title="12+" subtitle="Enterprise Clients" color="text-[#E07A5F]" />
            </motion.div>
            <motion.div variants={statItemVariants}>
              <Stat title="$10.1M" subtitle="Deal Closed" color="text-green-400" />
            </motion.div>
            <motion.div variants={statItemVariants}>
              <Stat title="70%" subtitle="Close Rate" color="text-[#81B29A]" />
            </motion.div>
            <motion.div variants={statItemVariants}>
              <Stat title="15+" subtitle="Client Presentations" color="text-blue-400" />
            </motion.div>
            <motion.div variants={statItemVariants}>
              <Stat title="6+" subtitle="Years Experience" color="text-purple-400" />
            </motion.div>
            <motion.div variants={statItemVariants}>
              <Stat title="85%" subtitle="Faster Deployments" color="text-pink-400" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <CVModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
      {/* CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </motion.section>
  );
}

function Stat({
  title,
  subtitle,
  color,
}: {
  title: string;
  subtitle: string;
  color: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  // Extract number and suffix from title (e.g., "12+" -> 12, "+")
  const parseTitle = (titleStr: string) => {
    const match = titleStr.match(/^([\d.]+)(.*)$/);
    if (match) {
      return { number: parseFloat(match[1]), suffix: match[2] };
    }
    return { number: null, suffix: titleStr };
  };

  const { number, suffix } = parseTitle(title);
  const shouldAnimate = !prefersReducedMotion && number !== null;

  return (
    <motion.div 
      className="text-white bg-gradient-to-br from-white/5 to-white/0 backdrop-blur rounded-2xl p-3 sm:p-4 ring-1 ring-white/20 hover:from-white/10 hover:to-white/5 transition-all duration-300 shadow-sm hover:shadow-md"
      whileHover={{ scale: 1.05, y: -4 }}
      animate={prefersReducedMotion ? {} : {
        y: [0, -8, 0],
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className={`text-xl sm:text-2xl md:text-3xl font-bold font-mono ${color} mb-1`}>
        {shouldAnimate ? (
          <CountUp
            start={0}
            end={number}
            duration={2}
            decimals={number % 1 !== 0 ? 1 : 0}
            suffix={suffix}
            useEasing={true}
          />
        ) : (
          title
        )}
      </div>
      <div className="text-slate-300 font-heading text-xs sm:text-sm md:text-base">{subtitle}</div>
    </motion.div>
  );
}