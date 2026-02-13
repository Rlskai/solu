import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { execSync } from "child_process";
import { readFileSync, unlinkSync, existsSync, readdirSync } from "fs";
import { createClient } from "@deepgram/sdk";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const summariserPrompt = `STRICT RULES:

No Preamble: Start DIRECTLY with the content. Do not use introductory phrases like "Here is a summary" or "This video covers."

Structure: Break the transcript down into chronological, logical segments.

Headings: Use ## [Clear, Descriptive Segment Title] for every section.

Bullet Points: Under each heading, use concise bullet points to capture the main ideas, key takeaways, and critical details.

Tone: Be highly objective, clear, and concise. Omit fluff, filler words, and repetitive examples.`
  const body = await request.json();
  const { url } = body;

  // Validation errors still return JSON
  if (!url || typeof url !== "string" || !url.trim()) {
    return NextResponse.json(
      { error: "Please provide a valid video URL" },
      { status: 400 }
    );
  }

  try {
    new URL(url);
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to download video. Please check the URL and try again.",
      },
      { status: 400 }
    );
  }

  // Validation passed — start SSE stream
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let audioPath = "";

      function send(data: Record<string, string>) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(data)}\n\n`)
        );
      }

      try {
        // Step 1: Download audio
        send({ step: "downloading" });

        const filePrefix = `sol-summarise-${Date.now()}`;
        let videoTitle = "";
        try {
          videoTitle = execSync(
            `yt-dlp --print title "${url}"`,
            { timeout: 30000, stdio: "pipe" }
          ).toString().trim();
        } catch {
          // title extraction is best-effort
        }
        try {
          execSync(
            `yt-dlp -f bestaudio -o "/tmp/${filePrefix}.%(ext)s" "${url}"`,
            { timeout: 120000, stdio: "pipe" }
          );
        } catch {
          send({
            step: "error",
            error:
              "Failed to download video. Please check the URL and try again.",
          });
          controller.close();
          return;
        }

        const tmpFiles = readdirSync("/tmp").filter((f) =>
          f.startsWith(filePrefix)
        );
        if (tmpFiles.length === 0) {
          send({ step: "error", error: "Failed to download video audio." });
          controller.close();
          return;
        }
        audioPath = `/tmp/${tmpFiles[0]}`;

        // Step 2: Transcribe with Deepgram
        send({ step: "transcribing" });

        const deepgram = createClient(process.env.DEEPGRAM_API_KEY!);
        const audioBuffer = readFileSync(audioPath);

        const { result } = await deepgram.listen.prerecorded.transcribeFile(
          audioBuffer,
          { model: "nova-2", smart_format: true }
        );

        const transcript =
          result?.results?.channels?.[0]?.alternatives?.[0]?.transcript;

        if (!transcript) {
          send({
            step: "error",
            error: "Failed to transcribe video audio.",
          });
          controller.close();
          return;
        }

        // Step 3: Summarize with Cerebras
        send({ step: "summarising" });

        const openai = new OpenAI({
          baseURL: "https://api.cerebras.ai/v1",
          apiKey: process.env.CEREBRAS_API_KEY!,
        });

        const completion = await openai.chat.completions.create({
          model: "llama-3.3-70b",
          messages: [
            {
              role: "system",
              content:
                summariserPrompt,
            },
            {
              role: "user",
              content: `Summarize this transcript:\n\n${transcript}`,
            },
          ],
        });

        const rawSummary = completion.choices[0]?.message?.content;

        if (!rawSummary) {
          send({ step: "error", error: "Failed to generate summary." });
          controller.close();
          return;
        }

        const header = `**${videoTitle || "Video"}**\n${url}\n\n---\n\n`;
        const summary = header + rawSummary;

        send({ step: "done", summary });
        controller.close();
      } catch (error) {
        console.error("SolSummarise error:", error);
        send({
          step: "error",
          error: "An unexpected error occurred. Please try again.",
        });
        controller.close();
      } finally {
        // Cleanup temp file
        if (audioPath && existsSync(audioPath)) {
          try {
            unlinkSync(audioPath);
          } catch {
            // Ignore cleanup errors
          }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
