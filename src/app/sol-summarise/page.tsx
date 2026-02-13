import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import SolSummariseContent from "./SolSummariseContent";

export default async function SolSummarisePage() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} />
      <main data-testid="main-content" className="flex-1 bg-[#0f0826] p-4 pt-18 md:p-6 md:pt-18 xl:p-8 xl:pt-8 overflow-x-hidden">
        <h1
          data-testid="sol-summarise-heading"
          className="text-2xl md:text-3xl font-bold text-white"
        >
          SolSummarise
        </h1>
        <SolSummariseContent />
      </main>
    </div>
  );
}
