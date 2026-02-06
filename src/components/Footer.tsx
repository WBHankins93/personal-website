'use client';

import React, { useState } from "react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TIMING } from "@/lib/animation-configs/timing";
import { SPRING } from "@/lib/animation-configs/spring";
import { EASE } from "@/lib/animation-configs/ease";

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredEmail, setHoveredEmail] = useState(false);
  const socialLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ben-hankins/",
      description: "Professional updates & connections"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/WBHankins93",
      description: "Open source projects & code"
    },
    {
      icon: FaInstagram,
      label: "Instagram", 
      href: "https://www.instagram.com/all_about_the_benjamins93/",
      description: "Life outside of tech"
    }
  ];

  return (
    <motion.footer
      className="bg-slate-900 text-white pt-20 pb-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: TIMING.slow / 1000, // 800ms as per plan
        ease: EASE.easeOut,
      }}
    >
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          duration: TIMING.slow / 1000,
          ease: EASE.easeOut,
        }}
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: 0.5, // 500ms as per plan
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center rounded-2xl bg-slate-800 ring-1 ring-white/20 p-2.5 shadow-sm">
                  <Image src="/b-logo-fav.png" alt="Ben Hankins logo" width={48} height={48} />
                </div>
                <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                Have a project in mind or just want to talk about tech?
              </p>

              {/* Email - Stagger from left */}
              <motion.div
                className="flex items-center gap-4 mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: 0.6,
                  duration: TIMING.normal / 1000,
                  ease: EASE.easeOut,
                }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-sm">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Email</p>
                  <a
                    href="mailto:benhankins.work@gmail.com"
                    className="text-white hover:text-slate-300 transition-colors font-medium relative inline-block"
                    onMouseEnter={() => setHoveredEmail(true)}
                    onMouseLeave={() => setHoveredEmail(false)}
                  >
                    benhankins.work@gmail.com
                    {/* Animated underline */}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                      initial={{ scaleX: 0 }}
                      animate={hoveredEmail ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{
                        duration: TIMING.normal / 1000, // 300ms as per plan
                        ease: EASE.easeOut,
                      }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </a>
                </div>
              </motion.div>

              {/* Resume Download - Stagger from left */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: 0.7, // 100ms after email
                  duration: TIMING.normal / 1000,
                  ease: EASE.easeOut,
                }}
              >
                <div className="w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-sm">
                  <FileText className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Resume</p>
                  <motion.a
                    href="/Ben_Hankins_Solutions_Resume_Jan_2026.pdf"
                    download="Ben_Hankins_Solutions_Resume_Jan_2026.pdf"
                    className="text-white hover:text-slate-300 transition-colors font-medium inline-block"
                    whileHover={prefersReducedMotion ? {} : {
                      scale: 1.05,
                    }}
                    transition={SPRING.gentle}
                  >
                    Download PDF
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Social Links Section */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                delay: 0.5,
                duration: TIMING.normal / 1000,
                ease: EASE.easeOut,
              }}
            >
              <h3 className="text-xl font-bold mb-6">Follow My Work</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      delay: 0.5 + index * 0.05, // 50ms stagger as per plan
                      ...SPRING.bouncy,
                    }}
                    className={`group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 transition-all duration-200 ring-1 ring-white/20 shadow-sm ${
                      social.label === 'LinkedIn' ? 'hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-emerald-500/5 hover:ring-emerald-500/40' :
                      social.label === 'GitHub' ? 'hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-amber-500/5 hover:ring-amber-500/40' :
                      'hover:bg-gradient-to-br hover:from-violet-500/10 hover:to-violet-500/5 hover:ring-violet-500/40'
                    }`}
                    title={social.label}
                  >
                    <motion.div
                      className={`w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center transition-colors duration-200 ring-1 ring-white/20 shadow-sm ${
                        social.label === 'LinkedIn' ? 'group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 group-hover:ring-emerald-500/30' :
                        social.label === 'GitHub' ? 'group-hover:from-amber-500/20 group-hover:to-amber-500/10 group-hover:ring-amber-500/30' :
                        'group-hover:from-violet-500/20 group-hover:to-violet-500/10 group-hover:ring-violet-500/30'
                      }`}
                    >
                      <social.icon className={`w-5 h-5 text-slate-300 transition-colors duration-200 ${
                        social.label === 'LinkedIn' ? 'group-hover:text-emerald-400' :
                        social.label === 'GitHub' ? 'group-hover:text-amber-400' :
                        'group-hover:text-violet-400'
                      }`} />
                    </motion.div>
                    <div>
                      <p className="font-medium text-white">{social.label}</p>
                      <p className="text-sm text-slate-400">{social.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar - Delayed credit animation */}
          <motion.div
            className="text-center pt-4 border-t border-slate-800/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              delay: 2, // 2 second delay as per plan
              duration: TIMING.normal / 1000,
              ease: EASE.easeOut,
            }}
          >
            <p className="text-sm text-slate-500">
              Crafted with care by{' '}
              <a 
                href="https://sproutflow.vercel.app" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                Sproutflow Studio 🌱
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}