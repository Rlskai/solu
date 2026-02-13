# Summary Quiz

## What
Quiz feature within sol-summarise. Each saved summary gets a "Quiz" button (right-aligned in title row). Clicking it shows a question count selector, then generates a multiple-choice quiz via Cerebras. Quiz populates the 3rd column. Collapsible quiz items (like saved summaries). 4-option MCQs with instant feedback per question. No per-question retry — only full refresh/regenerate.

## Who
Authenticated users with saved summaries on /sol-summarise.

## Key Interactions
1. User clicks "Quiz" button on a saved summary title row
2. Dropdown/selector appears to pick number of questions (e.g. 3, 5, 10)
3. Cerebras generates structured quiz JSON from the summary text
4. Quiz interface appears in column 3 — mirrors SavedSummaries UI (same panel, collapsible items, title-click expand/collapse, card styling)
5. User selects an answer → instant correct/incorrect feedback (color + text)
6. Answers are locked after selection — no per-question retry
7. "Regenerate Quiz" button refreshes all questions at once
