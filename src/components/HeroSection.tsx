'use client';

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C2A2A] via-[#3D405B] to-[#2C2A2A] z-0" />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#E07A5F]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#81B29A]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Ben Hankins
            <span className="block gradient-text text-4xl md:text-6xl mt-2">
              SRE/DevOps Engineer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Experienced SRE/DevOps engineer building infrastructure that stays out of the way and helps engineers move quickly without second-guessing their tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToContact}
              size="lg"
              className="bg-[#E07A5F] hover:bg-opacity-90 text-white px-8 py-3 text-lg group"
            >
              Get In Touch
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a
              href="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/2e73f98b9_Ben-Hankins-SREDevOpsEngineer-7-23.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#3D405B] text-white hover:bg-opacity-90 px-8 py-3 text-lg"
              >
                <Download className="mr-2 w-5 h-5" />
                View CV
              </Button>
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat title="6+" subtitle="Years Experience" color="text-[#E07A5F]" />
            <Stat title="90%" subtitle="Faster Deployments" color="text-[#81B29A]" />
            <Stat title="$10M+" subtitle="Cloud Deals Closed" color="text-green-400" />
            <Stat title="40%" subtitle="Cost Reduction" color="text-purple-400" />
          </div>
        </div>
      </div>
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
    <div className="text-white">
      <div className={`text-3xl font-bold ${color}`}>{title}</div>
      <div className="text-slate-300">{subtitle}</div>
    </div>
  );
}
