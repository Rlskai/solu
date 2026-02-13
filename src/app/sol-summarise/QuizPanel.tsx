"use client";

import { useState } from "react";

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

interface QuizPanelProps {
  quizzes: SavedQuiz[];
  loading: boolean;
  onRegenerate: (quizId: string, summaryId: string, summaryTitle: string, numQuestions: number) => void;
}

export default function QuizPanel({ quizzes, loading, onRegenerate }: QuizPanelProps) {
  const [expandedQuizIds, setExpandedQuizIds] = useState<Set<string>>(new Set());
  // Map of quizId -> Map of questionIdx -> selected optionIdx
  const [selectedAnswers, setSelectedAnswers] = useState<Map<string, Map<number, number>>>(new Map());

  function toggleQuiz(quizId: string) {
    setExpandedQuizIds((prev) => {
      const next = new Set(prev);
      if (next.has(quizId)) next.delete(quizId);
      else next.add(quizId);
      return next;
    });
  }

  function selectAnswer(quizId: string, questionIdx: number, optionIdx: number) {
    setSelectedAnswers((prev) => {
      const next = new Map(prev);
      const quizAnswers = new Map(next.get(quizId) || []);
      if (quizAnswers.has(questionIdx)) return prev; // locked
      quizAnswers.set(questionIdx, optionIdx);
      next.set(quizId, quizAnswers);
      return next;
    });
  }

  function handleRegenerate(quiz: SavedQuiz) {
    // Clear answers for this quiz
    setSelectedAnswers((prev) => {
      const next = new Map(prev);
      next.delete(quiz._id);
      return next;
    });
    onRegenerate(quiz._id, quiz.summaryId, quiz.summaryTitle, quiz.questions.length);
  }

  return (
    <div
      data-testid="quiz-panel"
      className="rounded-md border border-white/20 bg-white/5 p-4"
    >
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-white">
        Quizzes
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white/70">
          {quizzes.length}
        </span>
      </h2>

      {loading && (
        <p className="text-sm text-white/50">Generating quiz...</p>
      )}

      {!loading && quizzes.length === 0 && (
        <p className="text-sm text-white/50">Click &quot;Quiz&quot; on a saved summary to generate</p>
      )}

      <div className="flex flex-col gap-2">
        {quizzes.map((quiz) => {
          const isExpanded = expandedQuizIds.has(quiz._id);
          const quizAnswers = selectedAnswers.get(quiz._id) || new Map();

          return (
            <div
              key={quiz._id}
              data-testid="quiz-item"
              className="rounded-md border border-white/10 bg-white/5"
            >
              <button
                data-testid="quiz-question"
                onClick={() => toggleQuiz(quiz._id)}
                className="w-full px-3 py-2 text-left text-sm font-medium text-white hover:bg-white/10 transition-colors rounded-md"
              >
                {quiz.summaryTitle}
              </button>

              {isExpanded && (
                <div className="border-t border-white/10 px-3 py-3">
                  <div className="flex flex-col gap-3">
                    {quiz.questions.map((q, idx) => {
                      const selected = quizAnswers.get(idx);
                      const isAnswered = selected !== undefined;
                      const isCorrect = selected === q.correctIndex;

                      return (
                        <div key={idx} className="flex flex-col gap-1.5">
                          <p className={`text-sm font-medium ${
                            isAnswered
                              ? isCorrect ? "text-green-400" : "text-red-400"
                              : "text-white"
                          }`}>
                            {idx + 1}. {q.question}
                          </p>
                          <div className="flex flex-col gap-1">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = selected === optIdx;
                              const isCorrectOption = optIdx === q.correctIndex;
                              let optionClass = "rounded px-3 py-1.5 text-left text-sm transition-colors ";

                              if (isAnswered) {
                                if (isCorrectOption) {
                                  optionClass += "bg-green-500/20 text-green-400 border border-green-500/30";
                                } else if (isSelected) {
                                  optionClass += "bg-red-500/20 text-red-400 border border-red-500/30";
                                } else {
                                  optionClass += "bg-white/5 text-white/30 border border-transparent";
                                }
                              } else {
                                optionClass += "bg-white/5 text-white/80 hover:bg-white/10 border border-transparent cursor-pointer";
                              }

                              return (
                                <button
                                  key={optIdx}
                                  data-testid="quiz-option"
                                  onClick={() => selectAnswer(quiz._id, idx, optIdx)}
                                  disabled={isAnswered}
                                  className={optionClass}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                          {isAnswered && (
                            <p
                              data-testid="quiz-feedback"
                              className={`text-xs font-medium ${isCorrect ? "text-green-400" : "text-red-400"}`}
                            >
                              {isCorrect ? "Correct!" : `Incorrect — the answer is: ${q.options[q.correctIndex]}`}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    data-testid="quiz-regenerate-btn"
                    onClick={() => handleRegenerate(quiz)}
                    className="mt-3 rounded bg-white/10 px-2 py-1 text-xs text-white hover:bg-white/20 transition-colors"
                  >
                    Regenerate
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
