"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video } from "lucide-react";
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

  const displayName = user.user_metadata?.full_name || user.email || "";

  return (
    <aside
      data-testid="sidebar"
      className="flex min-h-screen w-64 flex-col border-r border-white/10 bg-[#0f0826]"
    >
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
    </aside>
  );
}
