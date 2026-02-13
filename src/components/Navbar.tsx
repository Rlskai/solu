"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0826]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#e879f9] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              Solu
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {["Products", "Solutions", "Pricing", "Resources", "Enterprise"].map(
              (item) => (
                <button
                  key={item}
                  className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 rounded-md transition-colors flex items-center gap-1"
                >
                  {item}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              )
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 transition-colors hidden md:block">
            Blog
          </button>
          <button className="text-white/70 hover:text-white text-sm font-medium px-3 py-2 transition-colors hidden md:block">
            Contact
          </button>
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white text-sm"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="sm"
              className="bg-gradient-to-r from-[#7c5cfc] to-[#e879f9] hover:opacity-90 text-white text-sm"
            >
              Start Creating
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
