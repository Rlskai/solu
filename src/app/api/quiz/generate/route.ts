import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import OpenAI from "openai";
import clientPromise from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { summary, numQuestions, summaryId, summaryTitle } = body;

  if (!summary || !numQuestions) {
    return NextResponse.json({ error: "Missing summary or numQuestions" }, { status: 400 });
  }

  try {
    const openai = new OpenAI({
      baseURL: "https://api.cerebras.ai/v1",
      apiKey: process.env.CEREBRAS_API_KEY!,
    });

    const completion = await openai.chat.completions.create({
      model: "llama-3.3-70b",
      messages: [
        {
          role: "system",
          content: `Generate exactly ${numQuestions} multiple-choice quiz questions based on the provided summary. Return ONLY valid JSON in this exact format, no other text:
{"questions":[{"question":"...","options":["A","B","C","D"],"correctIndex":0}]}
Each question must have exactly 4 options. correctIndex is 0-3 indicating the correct option.`,
        },
        { role: "user", content: summary },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim() || "";
    // Parse — handle possible markdown code fences
    const jsonStr = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const quiz = JSON.parse(jsonStr);

    const client = await clientPromise();
    const db = client.db("solu");
    const doc = {
      userId: user.id,
      summaryId,
      summaryTitle: summaryTitle || "Untitled",
      questions: quiz.questions,
      createdAt: new Date(),
    };
    const result = await db.collection("quizzes").replaceOne(
      { userId: user.id, summaryId },
      doc,
      { upsert: true }
    );
    const _id = result.upsertedId || (await db.collection("quizzes").findOne({ userId: user.id, summaryId }))?._id;

    return NextResponse.json({
      _id,
      summaryId,
      summaryTitle: summaryTitle || "Untitled",
      questions: quiz.questions,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
