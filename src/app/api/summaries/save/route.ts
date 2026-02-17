import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import clientPromise from "@/lib/mongodb";
import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { summary, videoUrl } = body;

  if (!summary || !videoUrl) {
    return NextResponse.json(
      { error: "Missing summary or videoUrl" },
      { status: 400 }
    );
  }

  try {
    const openai = new OpenAI({
      baseURL: "https://api.cerebras.ai/v1",
      apiKey: process.env.CEREBRAS_API_KEY!,
    });

    const completion = await openai.chat.completions.create({
      model: "llama3.1-8b",
      messages: [
        {
          role: "system",
          content:
            "Generate a descriptive title (under 50 characters) for this video summary that captures the main topic and key takeaway. Be specific — avoid generic words like 'Summary' or 'Overview'. Return ONLY the title, no quotes or extra text.",
        },
        {
          role: "user",
          content: summary,
        },
      ],
    });

    const title = completion.choices[0]?.message?.content?.trim() || "Untitled";

    const client = await clientPromise();
    const db = client.db("solu");
    const result = await db.collection("summaries").insertOne({
      userId: user.id,
      title,
      summary,
      videoUrl,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId, title });
  } catch (error) {
    console.error("Save summary error:", error);
    return NextResponse.json(
      { error: "Failed to save summary" },
      { status: 500 }
    );
  }
}
