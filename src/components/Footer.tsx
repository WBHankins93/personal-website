import React from "react";
import Image from "next/image";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

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
                <div className="inline-flex items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 p-2">
                  <Image src="/b-logo-fav.png" alt="Ben Hankins logo" width={48} height={48} />
                </div>
                <h3 className="text-2xl font-bold">Let&apos;s Connect</h3>
              </div>
              
              <p className="text-slate-400 mb-6 leading-relaxed">
                Have a project in mind or just want to talk about tech?
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center ring-1 ring-white/15">
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
                    className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 transition-all duration-200 ring-1 ring-white/10 ${
                      social.label === 'LinkedIn' ? 'hover:bg-emerald-500/10 hover:ring-emerald-500/30' :
                      social.label === 'GitHub' ? 'hover:bg-amber-500/10 hover:ring-amber-500/30' :
                      'hover:bg-violet-500/10 hover:ring-violet-500/30'
                    }`}
                    title={social.label}
                  >
                    <div className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                      social.label === 'LinkedIn' ? 'group-hover:bg-emerald-500/20' :
                      social.label === 'GitHub' ? 'group-hover:bg-amber-500/20' :
                      'group-hover:bg-violet-500/20'
                    }`}>
                      <social.icon className={`w-5 h-5 text-slate-300 transition-colors duration-200 ${
                        social.label === 'LinkedIn' ? 'hover:text-emerald-400' :
                        social.label === 'GitHub' ? 'hover:text-amber-400' :
                        'hover:text-violet-400'
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
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Ben Hankins. All rights reserved.
            </p>
            <p className="text-sm text-slate-500 mt-2 italic">
              Built with code, coffee, and a touch of automation.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}