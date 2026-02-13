"use client";

import { useState, useEffect } from "react";
import SolSummariseForm from "./SolSummariseForm";
import SavedSummaries from "./SavedSummaries";
import QuizPanel from "./QuizPanel";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface SavedQuiz {
  _id: string;
  summaryId: string;
  summaryTitle: string;
  questions: QuizQuestion[];
  createdAt: string;
}

export default function SolSummariseContent() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);

  // Load saved quizzes on mount
  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      const res = await fetch("/api/quiz");
      if (res.ok) {
        const data = await res.json();
        setQuizzes(data.quizzes || []);
      }
    } catch {
      // silently fail
    }
  }

  async function handleQuizRequest(payload: string) {
    const { summary, numQuestions, summaryId, summaryTitle } = JSON.parse(payload);
    setQuizLoading(true);
    try {
      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, numQuestions, summaryId, summaryTitle }),
      });
      if (res.ok) {
        const newQuiz = await res.json();
        // Replace existing quiz for this summary, or prepend if new
        setQuizzes((prev) => {
          const existing = prev.findIndex((q) => q.summaryId === summaryId);
          if (existing !== -1) {
            return prev.map((q) => (q.summaryId === summaryId ? newQuiz : q));
          }
          return [newQuiz, ...prev];
        });
      }
    } catch {
      // silently fail
    } finally {
      setQuizLoading(false);
    }
  }

  async function handleRegenerate(quizId: string, summaryId: string, summaryTitle: string, numQuestions: number) {
    setQuizLoading(true);
    try {
      // Get the summary text
      const summariesRes = await fetch("/api/summaries");
      if (!summariesRes.ok) return;
      const summariesData = await summariesRes.json();
      const summary = summariesData.summaries?.find((s: { _id: string }) => s._id === summaryId);
      if (!summary) return;

      const res = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: summary.summary, numQuestions, summaryId, summaryTitle }),
      });
      if (res.ok) {
        const newQuiz = await res.json();
        // Replace the old quiz for this summary
        setQuizzes((prev) => prev.map((q) => (q.summaryId === summaryId ? newQuiz : q)));
      }
    } catch {
      // silently fail
    } finally {
      setQuizLoading(false);
    }
  }

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">
      <div className="min-w-0">
        <SolSummariseForm onSave={() => setRefreshKey((k) => k + 1)} />
      </div>
      <div className="min-w-0">
        <SavedSummaries
          refreshKey={refreshKey}
          onQuizRequest={handleQuizRequest}
          onDelete={(summaryId) => setQuizzes((prev) => prev.filter((q) => q.summaryId !== summaryId))}
        />
      </div>
      <div className="min-w-0">
        <QuizPanel quizzes={quizzes} loading={quizLoading} onRegenerate={handleRegenerate} />
      </div>
    </div>
  );
}
