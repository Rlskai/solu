"use client";

import { Palette } from "lucide-react";

export default function DeprecationsSection() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Card mockup */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden md:-rotate-1">
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-gray-400">Brand Style Guide</span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 font-medium">Brand:</span>
                  <span className="text-[#7c5cfc] font-semibold">Acme Corp</span>
                </div>
                <div className="pl-2 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-[#7c5cfc]" />
                    <span className="text-gray-700 text-sm">Primary — #7C5CFC</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      in use
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-[#e879f9]" />
                    <span className="text-gray-700 text-sm">Accent — #E879F9</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      in use
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded bg-gray-300" />
                    <span className="text-gray-400 text-sm line-through">Legacy Teal — #14B8A6</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                      unused
                    </span>
                  </div>
                </div>
              </div>
              {/* Bottom bar */}
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-2">
                <span className="text-xs text-gray-500">consistency:</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                  94% on-brand
                </span>
              </div>
            </div>
          </div>

          {/* Right - Text content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Palette className="w-4 h-4 text-[#e879f9]" />
              <span className="text-[#e879f9] text-xs font-semibold tracking-[0.15em] uppercase">
                Brand Consistency
              </span>
            </div>
            <h2 className="text-3xl md:text-[2.25rem] font-bold text-gray-900 leading-tight mb-5">
              Keep every asset perfectly
              <br />
              on-brand, automatically
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-5">
              Upload your brand guidelines once and Solu enforces them across
              every piece of content you create. Colors, fonts, tone of voice —
              our AI checks everything in real time so your team never goes
              off-brand again.
            </p>
            <a
              href="#"
              className="text-[#7c5cfc] text-sm font-semibold hover:underline"
            >
              Learn More →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
