import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request);

  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/sol-summarise"))
  ) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    return NextResponse.redirect(new URL("/login", siteUrl));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard", "/sol-summarise"],
};
