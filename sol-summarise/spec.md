# SolSummarise

## What
A video summariser accessible from the dashboard sidebar. Users paste a video URL, and the system downloads the video (yt-dlp), transcribes the audio (Deepgram), and generates a summary (OpenAI), returning it to the user.

## Who
Authenticated dashboard users who want quick text summaries of video content.

## Key Interactions
1. User clicks "SolSummarise" in the sidebar → navigates to `/sol-summarise`
2. User pastes a video URL into the input field and clicks "Summarise"
3. UI shows a loading/progress state while backend processes
4. Backend pipeline: yt-dlp download → Deepgram transcription → OpenAI summary
5. Summary text is displayed on the page
6. Errors (invalid URL, download failure, API errors) shown as user-friendly messages
