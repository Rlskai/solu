# Google OAuth with Supabase

## What
Google OAuth sign-in flow using Supabase Auth. Users click "Sign in with Google" on a login page, are redirected to Google's consent screen, and returned to the app authenticated. A protected dashboard page shows user info and a sign-out button.

## Who
End users of the Solu app who need to authenticate.

## Key Interactions
1. `/login` page with "Sign in with Google" button
2. Button triggers Supabase `signInWithOAuth({ provider: 'google' })`
3. `/auth/callback` route handles the OAuth redirect and exchanges code for session
4. Authenticated users redirected to `/dashboard` showing email + avatar
5. Sign-out button clears session and redirects to `/login`
6. Middleware protects `/dashboard` — unauthenticated users redirected to `/login`
