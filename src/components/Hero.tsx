"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const stars = [
  { x: 5, y: 12, s: 1 }, { x: 12, y: 45, s: 1.5 }, { x: 18, y: 8, s: 1 },
  { x: 25, y: 72, s: 2 }, { x: 30, y: 30, s: 1 }, { x: 35, y: 55, s: 1.5 },
  { x: 42, y: 15, s: 1 }, { x: 48, y: 80, s: 2 }, { x: 55, y: 25, s: 1 },
  { x: 60, y: 60, s: 1.5 }, { x: 65, y: 10, s: 1 }, { x: 70, y: 42, s: 2 },
  { x: 75, y: 75, s: 1 }, { x: 80, y: 20, s: 1.5 }, { x: 85, y: 50, s: 1 },
  { x: 90, y: 35, s: 2 }, { x: 95, y: 65, s: 1 }, { x: 8, y: 85, s: 1.5 },
  { x: 22, y: 18, s: 1 }, { x: 38, y: 90, s: 2 }, { x: 52, y: 5, s: 1 },
  { x: 68, y: 88, s: 1.5 }, { x: 78, y: 62, s: 1 }, { x: 88, y: 8, s: 2 },
  { x: 15, y: 65, s: 1 }, { x: 45, y: 38, s: 1.5 }, { x: 72, y: 28, s: 1 },
  { x: 92, y: 78, s: 2 }, { x: 3, y: 40, s: 1 }, { x: 58, y: 70, s: 1.5 },
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#0f0826] via-[#1a0e45] to-[#251260] pt-24 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
            }}
          />
        ))}
      </div>

      {/* Radial glow behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#7c5cfc]/10 to-[#e879f9]/10 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-5">
          <span className="text-[#c4a8ff] text-[11px] font-bold tracking-[0.25em] uppercase">
            Solu Creative AI
          </span>
        </div>

        {/* Tier labels */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span className="text-white/40 text-[13px] font-medium tracking-wide uppercase">
            Individuals
          </span>
          <span className="text-white/30 text-[13px]">·</span>
          <span className="text-white/40 text-[13px] font-medium tracking-wide uppercase">
            Teams
          </span>
          <span className="text-white/30 text-[13px]">·</span>
          <span className="text-white/40 text-[13px] font-medium tracking-wide uppercase">
            Enterprise
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-6">
          Turn your wildest ideas into
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          stunning creative reality.
        </h1>

        {/* Subtitle */}
        <p className="text-white/50 text-[15px] md:text-base max-w-xl mx-auto leading-relaxed mb-10">
          Solu gives creators, designers, and teams AI-powered tools to
          generate images, write compelling copy, build brand assets, and
          ship creative projects — all from a single, intuitive platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#7c5cfc] to-[#e879f9] hover:opacity-90 text-white px-8 h-12 text-[15px] font-semibold rounded-md shadow-lg shadow-[#7c5cfc]/25"
            >
              Start creating free
            </Button>
          </Link>
          <button className="text-white/70 hover:text-white text-[15px] font-medium flex items-center gap-2 transition-colors group">
            Watch a demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
