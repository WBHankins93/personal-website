'use client';

import React, { useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CVModal from "./CVModal";
import dynamic from 'next/dynamic';
import TypingAnimation from './TypingAnimation';
import FloatingTechParticles from './FloatingTechParticles';

const WordSphere = dynamic(() => import('./WordSphere').catch(() => ({ default: () => null })), { 
  ssr: false,
  loading: () => null
});

const roles = [
  "Solutions Engineer",
  "Technical Account Manager", 
  "Solutions Architect",
  "Customer Success Engineer",
  "Infrastructure Specialist"
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

      {/* Floating Tech Particles */}
      <FloatingTechParticles />

      {/* Enhanced Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#81B29A]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Enhanced Hero Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight font-sixtyfour">
            Ben Hankins
          </h1>

          <h2 className="text-lg sm:text-xl md:text-3xl font-medium text-white font-heading mb-4 md:mb-6">
            <TypingAnimation words={roles} className="text-blue-400 font-semibold" />
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 md:mb-10 leading-relaxed max-w-4xl mx-auto font-body px-4">
            Solutions Engineer translating complex business challenges into scalable technical solutions. I help enterprise teams move from &quot;what if&quot; to production with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 md:mb-16 px-4">
            <Button
              onClick={scrollToFooter}
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group font-heading shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => setShowModal(true)}
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg group font-heading shadow-xl hover:shadow-2xl transition-all duration-300 w-full sm:w-auto"
            >
              View Resume
            </Button>
          </div>

          {/* Enhanced Stats Grid - Customer Impact Focus */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 text-center px-4">
            <Stat title="12+" subtitle="Enterprise Clients" color="text-[#E07A5F]" />
            <Stat title="$10.1M" subtitle="Deal Closed" color="text-green-400" />
            <Stat title="70%" subtitle="Close Rate" color="text-[#81B29A]" />
            <Stat title="15+" subtitle="Client Presentations" color="text-blue-400" />
            <Stat title="6+" subtitle="Years Experience" color="text-purple-400" />
            <Stat title="85%" subtitle="Faster Deployments" color="text-pink-400" />
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
    <div className="text-white animate-float bg-gradient-to-br from-white/5 to-white/0 backdrop-blur rounded-2xl p-3 sm:p-4 ring-1 ring-white/20 hover:from-white/10 hover:to-white/5 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className={`text-xl sm:text-2xl md:text-3xl font-bold font-mono ${color} mb-1`}>{title}</div>
      <div className="text-slate-300 font-heading text-xs sm:text-sm md:text-base">{subtitle}</div>
    </div>
  );
}