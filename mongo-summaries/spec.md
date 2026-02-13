# MongoDB Summaries

## What
Integrate MongoDB Atlas to persist video summaries per user. After a summary is generated on `/sol-summarise`, a "Save" button lets the user store it. A collapsible sidebar column on the right displays all saved summaries — each with an AI-generated title (<50 chars). Clicking a title toggles the full summary open/closed.

## Who
Authenticated users who generate video summaries via SolSummarise.

## Key Interactions
1. Summary generated → "Save Summary" button appears
2. User clicks Save → OpenAI generates a short title → summary + title + metadata saved to MongoDB
3. Right column shows saved summaries as collapsible list (title-only by default)
4. Click title → expand/collapse full summary text
5. Summaries scoped to authenticated user (Supabase user ID)
