"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, Menu, X, Sparkles } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";

interface SidebarProps {
  user: {
    email?: string;
    user_metadata?: {
      avatar_url?: string;
      full_name?: string;
    };
  };
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const displayName = user.user_metadata?.full_name || user.email || "";

  const sidebarContent = (
    <>
      {/* Profile Card — Top Section */}
      <div className="flex flex-col items-center gap-3 border-b border-white/10 p-6">
        {user.user_metadata?.avatar_url ? (
          <img
            data-testid="user-avatar"
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="size-12 rounded-full"
          />
        ) : (
          <div
            data-testid="user-avatar"
            className="flex size-12 items-center justify-center rounded-full bg-white/20"
          >
            <span className="text-sm text-white/50" aria-hidden="true">
              ?
            </span>
          </div>
        )}
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-sm font-medium text-white">{displayName}</span>
          <span data-testid="user-email" className="text-xs text-white/70">
            {user.email}
          </span>
        </div>
        <SignOutButton />
      </div>

      {/* Navigation — Bottom Section */}
      <nav data-testid="sidebar-nav" className="flex-1 p-4">
        <Link
          href="/dashboard"
          data-testid="sidebar-link-dashboard"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
            pathname === "/dashboard"
              ? "bg-white/10 text-white"
              : "text-white/70"
          }`}
        >
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
        <Link
          href="/sol-summarise"
          data-testid="sidebar-link-sol-summarise"
          onClick={() => setOpen(false)}
          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
            pathname === "/sol-summarise"
              ? "bg-white/10 text-white"
              : "text-white/70"
          }`}
        >
          <Video className="size-4" />
          SolSummarise
        </Link>
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="xl:hidden fixed top-0 left-0 right-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#0f0826] px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#e879f9] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white font-bold text-base tracking-tight">Solu</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-white/70 hover:text-white p-2"
          aria-label="Toggle sidebar"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="xl:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        data-testid="sidebar"
        className={`fixed top-14 left-0 bottom-0 z-30 w-64 flex-col border-r border-white/10 bg-[#0f0826] transition-transform xl:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        data-testid="sidebar"
        className="hidden xl:flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0f0826]"
      >
        {sidebarContent}
      </aside>
    </>
  );
}
