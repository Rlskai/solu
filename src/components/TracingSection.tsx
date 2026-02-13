"use client";

import { Zap } from "lucide-react";

export default function TracingSection() {
  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-[#7c5cfc]" />
              <span className="text-[#7c5cfc] text-xs font-semibold tracking-[0.15em] uppercase">
                AI Workflows
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.25rem] font-bold text-gray-900 leading-tight mb-5">
              Automate creative pipelines
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              from prompt to publish
            </h2>
            <p className="text-gray-500 text-[15px] leading-relaxed mb-5">
              Chain together image generation, copy creation, and asset
              formatting into reusable workflows. Solu handles the heavy
              lifting so your team can focus on the creative direction
              while AI executes at scale.
            </p>
            <a
              href="#"
              className="text-[#7c5cfc] text-sm font-semibold hover:underline"
            >
              Learn More →
            </a>
          </div>

          {/* Right - Workflow pipeline card */}
          <div className="relative">
            <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden md:rotate-1">
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-gray-400">
                    Workflow: Social Campaign #128
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {/* Pipeline step bars */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 sm:w-28 text-right shrink-0 font-medium">
                      Prompt → Image
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#7c5cfc] to-[#a78bfa] rounded"
                        style={{ width: "100%" }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white font-medium">
                        3.2s
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 sm:w-28 text-right shrink-0 font-medium">
                      Image → Caption
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#a78bfa] to-[#e879f9] rounded"
                        style={{ width: "38%" }}
                      />
                      <span className="absolute left-[39%] top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-600 font-medium ml-2">
                        1.2s
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-20 sm:w-28 text-right shrink-0 font-medium">
                      Format → Export
                    </span>
                    <div className="flex-1 h-6 bg-gray-100 rounded overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-[#e879f9] to-[#f0abfc] rounded"
                        style={{ width: "12%" }}
                      />
                      <span className="absolute left-[13%] top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-600 font-medium ml-1">
                        0.4s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timeline bar */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono mb-2">
                    <span>0s</span>
                    <span>2s</span>
                    <span>4s</span>
                    <span>6s</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#7c5cfc] via-[#e879f9] to-[#f0abfc]"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
