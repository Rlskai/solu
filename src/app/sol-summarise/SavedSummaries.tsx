"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Summary {
  _id: string;
  title: string;
  summary: string;
  videoUrl: string;
  createdAt: string;
}

export default function SavedSummaries({ refreshKey, onQuizRequest, onDelete }: { refreshKey: number; onQuizRequest?: (summary: string) => void; onDelete?: (summaryId: string) => void }) {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectingQuizId, setSelectingQuizId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSummaries() {
      setLoading(true);
      try {
        const res = await fetch("/api/summaries");
        if (res.ok) {
          const data = await res.json();
          setSummaries(data.summaries || []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchSummaries();
  }, [refreshKey]);

  async function handleDelete(summaryId: string) {
    setDeletingId(summaryId);
    try {
      const res = await fetch("/api/summaries/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summaryId }),
      });
      if (res.ok) {
        setSummaries((prev) => prev.filter((s) => s._id !== summaryId));
        onDelete?.(summaryId);
      }
    } catch {
      // silently fail
    } finally {
      setDeletingId(null);
    }
  }

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div
      data-testid="saved-summaries-panel"
      className="rounded-md border border-white/20 bg-white/5 p-4"
    >
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
        Saved Summaries
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white/70">
          {summaries.length}
        </span>
      </h2>

      {loading && (
        <p className="text-sm text-white/50">Loading...</p>
      )}

      {!loading && summaries.length === 0 && (
        <p className="text-sm text-white/50">No saved summaries yet</p>
      )}

      <div className="flex flex-col gap-2">
        {summaries.map((s) => (
          <div
            key={s._id}
            data-testid="saved-summary-item"
            className="rounded-md border border-white/10 bg-white/5"
          >
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                data-testid="saved-summary-title"
                onClick={() => toggleExpanded(s._id)}
                className="flex-1 text-left text-sm font-medium text-white hover:bg-white/10 transition-colors rounded-md"
              >
                {s.title}
              </button>
              <button
                data-testid="quiz-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectingQuizId(selectingQuizId === s._id ? null : s._id);
                }}
                className="shrink-0 rounded bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-300 hover:bg-purple-500/30 transition-colors"
              >
                Quiz
              </button>
              <button
                data-testid="delete-summary-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(s._id);
                }}
                disabled={deletingId === s._id}
                className="shrink-0 rounded bg-red-500/20 px-2 py-1 text-xs font-medium text-red-300 hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {deletingId === s._id ? "..." : "Delete"}
              </button>
            </div>
            {selectingQuizId === s._id && (
              <div data-testid="quiz-count-selector" className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
                <span className="text-xs text-white/50">Questions:</span>
                {[3, 5, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      onQuizRequest?.(JSON.stringify({ summary: s.summary, numQuestions: n, summaryId: s._id, summaryTitle: s.title }));
                      setSelectingQuizId(null);
                    }}
                    className="rounded bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20 transition-colors"
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
            {expandedIds.has(s._id) && (
              <div
                data-testid="saved-summary-content"
                className="border-t border-white/10 px-3 py-2 text-sm text-white/80 prose prose-invert prose-sm max-w-none"
              >
                <ReactMarkdown>{s.summary}</ReactMarkdown>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
