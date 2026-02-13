# Feature: mongo-summaries

## Build (for Coder)
- Route: No new route — enhances existing `/sol-summarise` page + adds 2 API routes
- New API routes: `POST /api/summaries/save`, `GET /api/summaries`
- Components: `SavedSummaries.tsx` (client) — right column with collapsible saved summary list + save button
- Pattern: follow `SolSummariseForm.tsx` (client component, fetch to API, testid conventions)
- Layout: `page.tsx` becomes 2-column flex — left: existing form+output, right: `SavedSummaries`
- Data: MongoDB via `mongodb` npm package. Collection `summaries` with fields: `{ userId, title, summary, videoUrl, createdAt }`
- MongoDB client: `src/lib/mongodb.ts` — cached MongoClient singleton
- Title generation: Cerebras `llama-4-scout-17b-16e-instruct` call in save endpoint (≤50 chars)
- LLM refactor: Replace OpenAI with Cerebras in existing `/api/sol-summarise/route.ts` (same OpenAI SDK, base URL `https://api.cerebras.ai/v1`, key `CEREBRAS_API_KEY`)
- Auth: Extract Supabase user ID server-side in API routes via `createServerClient().auth.getUser()`
- Test IDs: `save-summary-btn`, `saved-summaries-panel`, `saved-summary-item`, `saved-summary-title`, `saved-summary-content`
- Dependencies: `mongodb` npm package (openai already installed)
- Env vars: `MONGODB_URI` (user-provided), `CEREBRAS_API_KEY` (replaces `OPENAI_API_KEY`)

## Test (for Playwright)
- Happy: Save a summary → verify it appears in saved list with a title → click title → content expands
- Edge: No saved summaries → panel shows empty state
- Edge: Save button only visible after summary is generated
- Error: Save API returns 401 when unauthenticated

## Integration (for pre-test verification)
- MongoDB: `mongosh "MONGODB_URI" --eval "db.runCommand({ping:1})"` → `{ ok: 1 }`
- OpenAI: Already verified (used by existing sol-summarise feature)
- Supabase auth: Already verified (used by existing auth flow)
