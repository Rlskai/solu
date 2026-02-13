"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wand2 } from "lucide-react";

function ImageGenTab() {
  return (
    <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 mt-8 items-start">
      {/* Left card - Model performance */}
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden md:-rotate-1 md:translate-y-2">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-900">Image Models</span>
            <span className="text-xs text-gray-400">performance</span>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-2.5 text-[11px] text-gray-400 font-medium uppercase tracking-wider">
            <span>Model</span>
            <span className="text-right">Quality</span>
            <span className="text-right">Speed</span>
          </div>
          {[
            { name: "Solu Vision XL", requests: 96, p95: "3.2s", bar: 96 },
            { name: "Solu Fast", requests: 82, p95: "0.8s", bar: 82 },
            { name: "Solu Artistic", requests: 91, p95: "4.1s", bar: 91 },
            { name: "Solu Realism", requests: 88, p95: "2.9s", bar: 88 },
            { name: "Solu Sketch", requests: 74, p95: "0.5s", bar: 74 },
          ].map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-2.5 items-center hover:bg-gray-50/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-gray-700 font-medium">
                  {field.name}
                </span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                  <div
                    className="h-full bg-gradient-to-r from-[#7c5cfc] to-[#e879f9] rounded-full transition-all"
                    style={{ width: `${field.bar}%` }}
                  />
                </div>
              </div>
              <span className="text-[13px] text-gray-600 tabular-nums text-right">
                {field.requests}%
              </span>
              <span className="text-[13px] text-gray-400 tabular-nums text-right">
                {field.p95}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-5 py-2.5 bg-gray-50/80 border-t border-gray-100">
          <span className="text-[11px] text-gray-400">Engine</span>
          <span className="text-[11px] font-mono text-[#7c5cfc] font-medium">
            v4.2.0
          </span>
          <div className="flex items-center gap-1 ml-auto">
            <span className="text-[11px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
              1024
            </span>
            <span className="text-[11px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
              2x
            </span>
            <span className="text-[11px] font-mono text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
              4K
            </span>
          </div>
        </div>
      </div>

      {/* Right card - Style breakdown */}
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden md:rotate-1 md:-translate-y-1">
        <div className="px-5 py-4 border-b border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
            Popular Styles
          </span>
        </div>
        <div className="p-5 space-y-4">
          {[
            { name: "Photorealistic", pct: 38, color: "#7c5cfc" },
            { name: "Digital Art", pct: 27, color: "#a78bfa" },
            { name: "Illustration", pct: 21, color: "#e879f9" },
            { name: "Abstract", pct: 14, color: "#f0abfc" },
          ].map((item) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[13px] font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-[11px] text-gray-400">{item.pct}%</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CopywritingTab() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-4 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {[
          { name: "Ad Copy", tone: "Persuasive", generated: "48K", percentage: 45 },
          { name: "Blog Posts", tone: "Informative", generated: "32K", percentage: 33 },
          { name: "Social Captions", tone: "Engaging", generated: "89K", percentage: 62 },
        ].map((item) => (
          <div key={item.name} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-900">{item.name}</span>
              <span className="text-xs text-gray-400">{item.tone}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{item.generated}</div>
            <div className="text-[11px] text-gray-400 mb-3">pieces generated</div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#7c5cfc] to-[#e879f9] rounded-full" style={{ width: `${item.percentage}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandKitsTab() {
  return (
    <div className="mt-8 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-50">
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-6 px-4 sm:px-6 py-3 text-[11px] text-gray-400 font-medium uppercase tracking-wider border-b border-gray-100">
          <span>Brand Kit</span>
          <span className="text-right">Assets</span>
          <span className="text-right hidden sm:block">Last Edited</span>
          <span className="text-right">Status</span>
        </div>
        {[
          { name: "Acme Corp Rebrand", assets: "142", edited: "2h ago", status: "Active" },
          { name: "Summer Campaign", assets: "87", edited: "1d ago", status: "Active" },
          { name: "Product Launch Q3", assets: "234", edited: "3d ago", status: "Draft" },
          { name: "Social Media Pack", assets: "56", edited: "5d ago", status: "Active" },
          { name: "Holiday Collection", assets: "312", edited: "1w ago", status: "Archived" },
        ].map((kit) => (
          <div key={kit.name} className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-6 px-4 sm:px-6 py-3.5 items-center hover:bg-gray-50/80 transition-colors">
            <span className="text-[13px] text-[#7c5cfc] font-medium truncate">{kit.name}</span>
            <span className="text-[13px] text-gray-600 tabular-nums text-right">{kit.assets}</span>
            <span className="text-[13px] text-gray-600 tabular-nums text-right hidden sm:block">{kit.edited}</span>
            <span className="text-[13px] text-gray-600 tabular-nums text-right">{kit.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Wand2 className="w-4 h-4 text-[#7c5cfc]" />
            <span className="text-[#7c5cfc] text-xs font-semibold tracking-[0.15em] uppercase">
              Creative Suite
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-bold text-gray-900 leading-tight">
            One platform for every
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            creative workflow
          </h2>
        </div>

        {/* Description */}
        <p className="text-center text-gray-500 text-[15px] max-w-2xl mx-auto mb-3 leading-relaxed">
          From generating stunning visuals to writing scroll-stopping copy and
          managing brand kits, Solu brings all your creative AI tools together
          so you can move faster and stay on-brand.
        </p>
        <div className="text-center mb-14">
          <a
            href="#"
            className="text-[#7c5cfc] text-sm font-semibold hover:underline"
          >
            Explore all tools
          </a>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="image-gen" className="w-full">
          <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start gap-0 h-auto p-0">
            <TabsTrigger
              value="image-gen"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gray-900 text-gray-400 px-5 py-3 text-sm font-medium transition-colors"
            >
              Image Generation
            </TabsTrigger>
            <TabsTrigger
              value="copywriting"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gray-900 text-gray-400 px-5 py-3 text-sm font-medium transition-colors"
            >
              Copywriting
            </TabsTrigger>
            <TabsTrigger
              value="brand-kits"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7c5cfc] data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-gray-900 text-gray-400 px-5 py-3 text-sm font-medium transition-colors"
            >
              Brand Kits
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
              Choose from multiple AI models optimized for different creative
              tasks. Each tool adapts to your style and brand guidelines
              automatically.
            </p>
          </div>

          <TabsContent value="image-gen">
            <ImageGenTab />
          </TabsContent>
          <TabsContent value="copywriting">
            <CopywritingTab />
          </TabsContent>
          <TabsContent value="brand-kits">
            <BrandKitsTab />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
