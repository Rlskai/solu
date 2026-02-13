# Feature: google-oauth

## Build (for Coder)
- Routes: `/login` (public), `/dashboard` (protected), `/auth/callback` (API route)
- Layout: new routes inherit root layout (`src/app/layout.tsx`); wrap root with `<AuthProvider>`
- Components: reuse `Button` from `@/components/ui/button`, `Card` from `@/components/ui/card`
- Pattern: follow Navbar.tsx — `"use client"`, Lucide icons, gradient styling `#7c5cfc → #e879f9`
- Data: Supabase client via `@supabase/supabase-js` + `@supabase/ssr` for server/client helpers
- Files to create:
  - `src/lib/supabase/client.ts` (browser client)
  - `src/lib/supabase/server.ts` (server client)
  - `src/app/login/page.tsx` (Google sign-in button)
  - `src/app/dashboard/page.tsx` (user info + sign-out)
  - `src/app/auth/callback/route.ts` (OAuth code exchange)
  - `src/middleware.ts` (protect `/dashboard`)
  - `src/components/AuthProvider.tsx` (context provider)
- Test IDs: `google-signin-btn`, `signout-btn`, `user-email`, `user-avatar`, `dashboard-heading`
- Dependencies: `@supabase/supabase-js`, `@supabase/ssr`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Credential Checklist
| Var | Source |
|-----|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → anon/public key |
| Google OAuth | Supabase Dashboard → Auth → Providers → Google (user says already configured) |

## Test (for Playwright)
- Happy: click "Sign in with Google" → redirected to Google/Supabase OAuth URL (verify URL contains `accounts.google.com` or supabase auth endpoint)
- Edge: visit `/dashboard` unauthenticated → redirected to `/login`
- Edge: visit `/login` → page renders with sign-in button visible
- Error: invalid callback code → handled gracefully (no crash)
