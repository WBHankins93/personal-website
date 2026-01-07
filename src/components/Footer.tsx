import React from "react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail, FileText } from "lucide-react";

export default function Footer() {
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
    <footer className="bg-slate-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Contact Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 p-2.5 shadow-sm">
                  <Image src="/b-logo-fav.png" alt="Ben Hankins logo" width={48} height={48} />
                </div>
                <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                Have a project in mind or just want to talk about tech?
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-sm">
                  <Mail className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Email</p>
                  <a 
                    href="mailto:benhankins.work@gmail.com"
                    className="text-white hover:text-slate-300 transition-colors font-medium"
                  >
                    benhankins.work@gmail.com
                  </a>
                </div>
              </div>

              {/* Resume Download */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center ring-1 ring-white/20 shadow-sm">
                  <FileText className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">Resume</p>
                  <a 
                    href="/Ben_Hankins_Cloud_Resume_2026.pdf"
                    download="Ben_Hankins_Cloud_Resume_2026.pdf"
                    className="text-white hover:text-slate-300 transition-colors font-medium"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col justify-center">
              <h3 className="text-xl font-bold mb-6">Follow My Work</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 transition-all duration-200 ring-1 ring-white/20 shadow-sm ${
                      social.label === 'LinkedIn' ? 'hover:bg-gradient-to-br hover:from-emerald-500/10 hover:to-emerald-500/5 hover:ring-emerald-500/40' :
                      social.label === 'GitHub' ? 'hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-amber-500/5 hover:ring-amber-500/40' :
                      'hover:bg-gradient-to-br hover:from-violet-500/10 hover:to-violet-500/5 hover:ring-violet-500/40'
                    }`}
                    title={social.label}
                  >
                    <div className={`w-11 h-11 bg-gradient-to-br from-white/10 to-white/5 rounded-xl flex items-center justify-center transition-colors duration-200 ring-1 ring-white/20 shadow-sm ${
                      social.label === 'LinkedIn' ? 'group-hover:from-emerald-500/20 group-hover:to-emerald-500/10 group-hover:ring-emerald-500/30' :
                      social.label === 'GitHub' ? 'group-hover:from-amber-500/20 group-hover:to-amber-500/10 group-hover:ring-amber-500/30' :
                      'group-hover:from-violet-500/20 group-hover:to-violet-500/10 group-hover:ring-violet-500/30'
                    }`}>
                      <social.icon className={`w-5 h-5 text-slate-300 transition-colors duration-200 ${
                        social.label === 'LinkedIn' ? 'group-hover:text-emerald-400' :
                        social.label === 'GitHub' ? 'group-hover:text-amber-400' :
                        'group-hover:text-violet-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-white">{social.label}</p>
                      <p className="text-sm text-slate-400">{social.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="text-center pt-4 border-t border-slate-800/50">
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
          </div>
        </div>
      </div>
    </footer>
  );
}