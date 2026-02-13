# Feature: summary-quiz

## Build (for Coder)
- Route: none — enhances existing /sol-summarise 3rd column
- New API: POST /api/quiz/generate — accepts { summary, numQuestions }, returns structured quiz JSON
- Components:
  - Modify `SavedSummaries.tsx` — add "Quiz" button right-aligned in each title row + question count selector
  - Create `QuizPanel.tsx` — 3rd column, mirrors SavedSummaries UI (panel, collapsible items, same card styling)
- Pattern: mirror SavedSummaries.tsx structure exactly (panel wrapper, collapsible items, expand/collapse toggle)
- Data: Cerebras returns `{ questions: [{ question, options: [string x4], correctIndex: number }] }`
- Quiz state: client-only (no persistence). selectedAnswers map, locked after selection, instant feedback
- Regenerate: clears all answers, re-calls API with same summary + count
- Test IDs: `quiz-btn`, `quiz-count-selector`, `quiz-panel`, `quiz-item`, `quiz-question`, `quiz-option`, `quiz-feedback`, `quiz-regenerate-btn`
- Env vars: none new (CEREBRAS_API_KEY already set)

## Test (for Playwright)
- Happy: POST /api/quiz/generate with valid summary returns structured quiz JSON with correct shape
- Edge: POST /api/quiz/generate returns 401 unauthenticated
- Edge: POST /api/quiz/generate returns 400 for missing summary
