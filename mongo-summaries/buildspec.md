# Buildspec: MongoDB Summaries
Generated: 2026-02-13 | Status: Complete

## Summary (≤200 chars)
Persists video summaries per user in MongoDB Atlas. Save button + collapsible saved summaries panel on /sol-summarise. Cerebras LLM generates titles. Auth-gated APIs.

## Architecture
- Route: /sol-summarise (enhanced, no new route)
- API routes: POST /api/summaries/save, GET /api/summaries
- Files:
  - `src/lib/mongodb.ts` — MongoClient singleton
  - `src/app/api/summaries/save/route.ts` — save endpoint
  - `src/app/api/summaries/route.ts` — list endpoint
  - `src/app/sol-summarise/SavedSummaries.tsx` — collapsible list panel
  - `src/app/sol-summarise/SolSummariseContent.tsx` — 2-column layout wrapper
  - `src/app/sol-summarise/SolSummariseForm.tsx` — modified (save button + onSave)
  - `src/app/sol-summarise/page.tsx` — modified (uses SolSummariseContent)
  - `src/app/api/sol-summarise/route.ts` — modified (Cerebras instead of OpenAI)
- Tests: `tests/mongo-summaries.spec.ts` — 5 cases
- Deps added: `mongodb`
- Env vars: `MONGODB_URI`, `CEREBRAS_API_KEY` (replaces `OPENAI_API_KEY`)

## Components
| Component | Path | Reused/New |
|-----------|------|------------|
| SavedSummaries | src/app/sol-summarise/SavedSummaries.tsx | New (modified v1.1: Quiz btn + count selector) |
| SolSummariseContent | src/app/sol-summarise/SolSummariseContent.tsx | New (modified v1.1: quiz state + QuizPanel) |
| SolSummariseForm | src/app/sol-summarise/SolSummariseForm.tsx | Modified |
| QuizPanel | src/app/sol-summarise/QuizPanel.tsx | New (v1.1) |

## Data Flow
- Fetch: `GET /api/summaries` → MongoDB query by userId → JSON response
- Mutate: `POST /api/summaries/save` → Cerebras title gen → MongoDB insert → JSON response
- State: `refreshKey` in SolSummariseContent triggers SavedSummaries refetch on save
- Collection: `solu.summaries` — `{ userId, title, summary, videoUrl, createdAt }`

## Test Coverage
| Test | Type | Status |
|------|------|--------|
| POST /api/summaries/save returns 401 without auth | Error | Pass |
| GET /api/summaries returns 401 without auth | Error | Pass |
| POST /api/summaries/save returns valid JSON error | Edge | Pass |
| POST /api/summaries/save with empty body returns non-200 | Edge | Pass |
| Unauthenticated access to sol-summarise redirects to login | Edge | Pass |

## Decisions
- Cerebras over OpenAI: User requested refactor; uses OpenAI SDK with baseURL override, model `llama-3.3-70b`
- Client wrapper component: Server component (page.tsx) can't hold state, so SolSummariseContent.tsx manages refreshKey
- No new route: Summaries panel lives on existing /sol-summarise as a right column

## Change Log
| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-13 | Initial implementation — MongoDB integration + Cerebras refactor |
| 1.1 | 2026-02-13 | Quiz feature — Cerebras-generated MCQ quizzes from saved summaries, 3rd column UI |
