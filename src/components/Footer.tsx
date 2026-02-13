"use client";

import { Github, Twitter, Linkedin, Youtube, Sparkles } from "lucide-react";

const footerLinks = {
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Product: ["Image Generation", "AI Copywriter", "Brand Kits", "Workflows", "API Access"],
  Community: ["Creator Hub", "Discord", "Showcase Gallery", "Solu Summit", "Open Source"],
  Resources: ["Documentation", "Tutorials", "Templates", "Changelog", "Status"],
  Help: ["Contact Support", "FAQ", "Privacy Policy", "Terms of Service", "Cookie Settings"],
};

export default function Footer() {
  return (
    <footer className="bg-[#0f0826] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 sm:gap-8">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#e879f9] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                Solu
              </span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              © 2024 Solu AI, Inc.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/40 hover:text-white text-xs transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
