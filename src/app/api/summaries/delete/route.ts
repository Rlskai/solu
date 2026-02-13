import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { summaryId } = body;

  if (!summaryId) {
    return NextResponse.json({ error: "Missing summaryId" }, { status: 400 });
  }

  try {
    const client = await clientPromise();
    const db = client.db("solu");

    // Delete the summary (scoped to user)
    await db.collection("summaries").deleteOne({
      _id: new ObjectId(summaryId),
      userId: user.id,
    });

    // Delete any associated quizzes
    const quizResult = await db.collection("quizzes").deleteMany({
      summaryId,
      userId: user.id,
    });

    return NextResponse.json({ deleted: true, quizzesRemoved: quizResult.deletedCount });
  } catch (error) {
    console.error("Delete summary error:", error);
    return NextResponse.json({ error: "Failed to delete summary" }, { status: 500 });
  }
}
