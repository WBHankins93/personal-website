import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const socialLinks = [
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ben-hankins/",
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/WBHankins93",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/all_about_the_benjamins93/",
    }
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4">{`Let's Connect`}</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Have a project in mind or just want to talk about tech? <br/> My inbox is always open.
            </p>
            <a href="mailto:benhankins.work@gmail.com">
              <button className="bg-[#E07A5F] hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
                benhankins.work@gmail.com
              </button>
            </a>
            
            <div className="flex justify-center gap-6 my-10">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                  title={social.label}
                >
                  <social.icon className="w-12 h-12" />
                </a>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8 text-sm text-slate-500">
              © {new Date().getFullYear()} Ben Hankins. All rights reserved. <br/>
              <span className="italic">Built with code, coffee, and a touch of automation.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}