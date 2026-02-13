# Buildspec: SolSummarise
Generated: 2026-02-13 | Status: Complete

## Summary (≤200 chars)
Video summariser for authenticated dashboard users. Paste a URL → yt-dlp downloads audio → Deepgram transcribes → OpenAI summarises → result displayed.

## Architecture
- Route: `/sol-summarise` → inherits root layout, same Sidebar pattern as `/dashboard`
- Files:
  - `src/app/sol-summarise/page.tsx` — server page (auth + layout)
  - `src/app/sol-summarise/SolSummariseForm.tsx` — client form component
  - `src/app/api/sol-summarise/route.ts` — backend pipeline API
  - `src/components/Sidebar.tsx` — modified (added nav link)
  - `src/middleware.ts` — modified (added route protection)
- Tests: `tests/sol-summarise.spec.ts` — 7 cases
- Deps added: `openai`, `@deepgram/sdk`, `react-markdown`, `@tailwindcss/typography`
- Env vars: `DEEPGRAM_API_KEY`, `OPENAI_API_KEY`
- System deps: `yt-dlp` binary

## Components
| Component | Path | Reused/New |
|-----------|------|------------|
| SolSummarisePage | `src/app/sol-summarise/page.tsx` | New |
| SolSummariseForm | `src/app/sol-summarise/SolSummariseForm.tsx` | New |
| API Route | `src/app/api/sol-summarise/route.ts` | New |
| Sidebar | `src/components/Sidebar.tsx` | Modified |

## Data Flow
- Fetch: client `POST /api/sol-summarise` with `{ url }` → SSE stream | State: `useState` for videoUrl, summary, error, loading, currentStep, completedSteps
- SSE events: `{ step: "downloading" }` → `{ step: "transcribing" }` → `{ step: "summarising" }` → `{ step: "done", summary }` | Errors: `{ step: "error", error }`

## Pipeline (API Route — SSE stream)
1. Validate URL (empty check + `new URL()` parse) → 400 JSON if invalid
2. Start SSE `ReadableStream` → emit `{ step: "downloading" }`
3. `yt-dlp -f bestaudio` → `/tmp/sol-summarise-{ts}.{ext}` → emit `{ step: "transcribing" }`
4. `deepgram.listen.prerecorded.transcribeFile(buffer, { model: "nova-2" })` → emit `{ step: "summarising" }`
5. `openai.chat.completions.create({ model: "gpt-4o-mini" })` → emit `{ step: "done", summary }`
6. Cleanup temp file in `finally`

## Test Coverage
| Test | Type | Status |
|------|------|--------|
| unauthenticated access redirects to login | happy | pass |
| API returns 400 for empty URL | edge | pass |
| API returns 400 for missing body | edge | pass |
| API returns 400 for invalid URL | error | pass |
| SSE content type + all step events in order | happy | pass |
| Validation errors return JSON content type | edge | pass |
| Invalid video URL returns SSE with error event | error | pass |

## Decisions
- URL validation before yt-dlp: prevents 30s+ timeout on obviously invalid URLs
- `execSync` for yt-dlp: simpler than child_process spawn, 120s timeout sufficient
- `gpt-4o-mini` model: fast + cheap for summarisation, upgradeable
- Temp files in `/tmp/`: auto-cleaned by OS, explicit cleanup in `finally`
- SSE streaming: real-time step progress via ReadableStream + TextEncoder
- Vertical stepper UI: pulsing active dot, green checkmark on complete, grey pending dot
- Summary fade-in via tw-animate-css (`animate-in fade-in`)

## Change Log
| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-02-13 | Initial implementation — full pipeline |
| 1.1 | 2026-02-13 | SSE streaming progress + stepper UI with animations |
| 1.2 | 2026-02-13 | Markdown parsing for summary output (react-markdown + prose) |
