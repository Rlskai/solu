# Feature: sol-summarise-progress (improvement)

## Build (for Coder)
- Files modified: `src/app/api/sol-summarise/route.ts`, `src/app/sol-summarise/SolSummariseForm.tsx`
- API: convert from JSON response to SSE via `ReadableStream` + `TextEncoderStream`
- Events streamed: `{ step: "downloading" }` → `{ step: "transcribing" }` → `{ step: "summarising" }` → `{ step: "done", summary }` | Errors: `{ step: "error", error }`
- Client: read stream with `fetch` + `getReader()`, parse SSE `data:` lines
- UI: vertical 3-step stepper (Downloading audio / Transcribing / Summarising)
- Active step: pulsing dot animation (`animate-pulse`), white text
- Completed step: green checkmark, muted text
- Pending step: grey dot, muted text
- Summary fade-in: `animate-in fade-in` from tw-animate-css
- Test IDs: `progress-stepper`, `step-downloading`, `step-transcribing`, `step-summarising`
- Validation 400 errors still returned as JSON (stream only starts after validation passes)
- Dependencies: none new

## Test (for Playwright)
- Happy: POST valid URL to SSE endpoint → response is `text/event-stream`, contains all 4 step events in order
- Edge: POST empty URL → still returns JSON 400 (not SSE)
- UI: stepper container visible when loading state is active (mock/intercept the SSE route)
