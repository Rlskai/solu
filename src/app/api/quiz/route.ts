import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("solu");
  const quizzes = await db
    .collection("quizzes")
    .find({ userId: user.id })
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({
    quizzes: quizzes.map((q) => ({
      _id: q._id,
      summaryId: q.summaryId,
      summaryTitle: q.summaryTitle,
      questions: q.questions,
      createdAt: q.createdAt,
    })),
  });
}
