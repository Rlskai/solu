# Buildspec: Google OAuth

Generated: 2026-02-12 | Status: Complete

## Summary (≤200 chars)
Google OAuth sign-in via Supabase Auth for Solu app users. Login page, protected dashboard, middleware route guard, OAuth callback handler.

## Architecture
- Routes: `/login` (public), `/dashboard` (protected), `/auth/callback` (API route)
- Layout: all routes inherit root layout (`src/app/layout.tsx`)
- Files:
  - `src/lib/supabase/client.ts` — browser Supabase client
  - `src/lib/supabase/server.ts` — server Supabase client
  - `src/lib/supabase/middleware.ts` — middleware session helper
  - `src/app/login/page.tsx` — Google sign-in UI
  - `src/app/dashboard/page.tsx` — protected user profile
  - `src/app/auth/callback/route.ts` — OAuth code exchange
  - `src/middleware.ts` — route protection
  - `src/components/SignOutButton.tsx` — client sign-out button
- Tests: `tests/google-oauth.spec.ts` — 4 cases
- Deps added: `@supabase/supabase-js`, `@supabase/ssr`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Components
| Component | Path | Reused/New |
|-----------|------|------------|
| Button | `src/components/ui/button.tsx` | Reused |
| Card, CardHeader, CardTitle, CardContent | `src/components/ui/card.tsx` | Reused |
| SignOutButton | `src/components/SignOutButton.tsx` | New |
| Navbar (updated) | `src/components/Navbar.tsx` | Modified |

## Data Flow
- Fetch: `supabase.auth.getUser()` server-side in dashboard + middleware
- Mutate: `supabase.auth.signInWithOAuth()` client-side, `supabase.auth.signOut()` client-side
- State: Supabase manages session via cookies (no React state)

## Test Coverage
| Test | Type | Status |
|------|------|--------|
| Login page renders with sign-in button | Happy | Pass |
| Sign-in button triggers OAuth redirect | Happy | Pass |
| Unauthenticated dashboard visit redirects to login | Edge | Pass |
| Auth callback without code redirects to login | Edge | Pass |

## Decisions
- Cookie-based auth via `@supabase/ssr`: recommended pattern for Next.js App Router SSR
- Middleware for route protection: intercepts before page render, handles session refresh
- Separate SignOutButton client component: dashboard is server component, sign-out needs client interactivity
- No AuthProvider context: Supabase cookie-based auth doesn't need React context wrapper

## Change Log
| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-12 | Initial implementation — Google OAuth with Supabase |
