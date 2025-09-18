'use client';

import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CVModal from "./CVModal";
import dynamic from 'next/dynamic';
import TypingAnimation from './TypingAnimation';
import FloatingTechParticles from './FloatingTechParticles';

// Fixed WordSphere import with proper error handling
const WordSphere = dynamic(() => import('./WordSphere').catch(() => ({ default: () => null })), { 
  ssr: false,
  loading: () => null
});

const roles = [
  "Site Reliability Engineer",
  "DevOps Engineer", 
  "Infrastructure Engineer",
  "Cloud Engineer",
  "Automation Wizard",
  "Platform Engineer"
];

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);

  const scrollToFooter = () => {
    const contact = document.getElementById("footer");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background with Animated Grid */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C2A2A] via-[#3D405B] to-[#2C2A2A]" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }} />
      </div>

      {/* 3D Word Sphere Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-5 opacity-40">
          <WordSphere />
        </div>
      </Suspense>

      {/* Floating Tech Particles - Asteroids Style */}
      <FloatingTechParticles />

      {/* Enhanced Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#81B29A]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Enhanced Hero Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-heading">
            Ben Hankins  
          </h1>

          <h2 className="text-xl md:text-3xl font-medium text-white font-heading mb-6">
            <TypingAnimation words={roles} className="text-blue-400 font-semibold" />
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto font-body">
            Experienced SRE/DevOps engineer building infrastructure that stays out of the way and helps engineers move quickly without second-guessing their tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={scrollToFooter}
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-8 py-4 text-lg group font-body shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <button
              onClick={() => setShowModal(true)}
              className="px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 font-body shadow-xl"
            >
              View Resume
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <Stat title="6+" subtitle="Years Experience" color="text-[#E07A5F]" />
            <Stat title="90%" subtitle="Faster Deployments" color="text-[#81B29A]" />
            <Stat title="$9M+" subtitle="Cloud Deals Closed" color="text-green-400" />
            <Stat title="40%" subtitle="Cost Reduction" color="text-purple-400" />
            <Stat title="500+" subtitle="CI/CD Executions" color="text-blue-400" />
            <Stat title="0" subtitle="Critical Incidents" color="text-pink-400" />
          </div>
        </div>
      </div>

      <CVModal isOpen={showModal} onClose={() => setShowModal(false)} />
      
      {/* CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </section>
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
  return (
    <div className="text-white animate-float bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className={`text-2xl md:text-3xl font-bold font-mono ${color} mb-1`}>{title}</div>
      <div className="text-slate-300 font-body text-sm md:text-base">{subtitle}</div>
    </div>
  );
}