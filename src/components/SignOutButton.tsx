"use client";

import { Button } from "@/components/ui/button";
import { createBrowserClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const handleSignOut = async () => {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <Button
      data-testid="signout-btn"
      variant="outline"
      size="sm"
      className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white text-sm"
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
