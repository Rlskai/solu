"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

type Step = "downloading" | "transcribing" | "summarising";

const STEPS: { key: Step; label: string; testId: string }[] = [
  { key: "downloading", label: "Downloading audio", testId: "step-downloading" },
  { key: "transcribing", label: "Transcribing", testId: "step-transcribing" },
  { key: "summarising", label: "Summarising", testId: "step-summarising" },
];

export default function SolSummariseForm({ onSave }: { onSave?: () => void }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set());

  function getStepStatus(stepKey: Step): "active" | "completed" | "pending" {
    if (completedSteps.has(stepKey)) return "completed";
    if (currentStep === stepKey) return "active";
    return "pending";
  }

  async function handleSubmit() {
    if (!videoUrl.trim()) {
      setError("Please enter a video URL");
      return;
    }

    setError("");
    setSummary("");
    setLoading(true);
    setCurrentStep(null);
    setCompletedSteps(new Set());

    try {
      const res = await fetch("/api/sol-summarise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: videoUrl.trim() }),
      });

      // Validation errors come back as JSON with non-ok status
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Stream SSE events
      const reader = res.body?.getReader();
      if (!reader) {
        setError("Failed to connect to the server. Please try again.");
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last potentially incomplete line in the buffer
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          const json = line.slice(6);
          let event: { step: string; summary?: string; error?: string };
          try {
            event = JSON.parse(json);
          } catch {
            continue;
          }

          if (event.step === "downloading") {
            setCurrentStep("downloading");
          } else if (event.step === "transcribing") {
            setCompletedSteps((prev) => new Set(prev).add("downloading"));
            setCurrentStep("transcribing");
          } else if (event.step === "summarising") {
            setCompletedSteps((prev) => {
              const next = new Set(prev);
              next.add("downloading");
              next.add("transcribing");
              return next;
            });
            setCurrentStep("summarising");
          } else if (event.step === "done" && event.summary) {
            setCompletedSteps(
              new Set<Step>(["downloading", "transcribing", "summarising"])
            );
            setCurrentStep(null);
            setSummary(event.summary);
            setLoading(false);
          } else if (event.step === "error") {
            setError(event.error || "An unexpected error occurred.");
            setLoading(false);
            setCurrentStep(null);
          }
        }
      }
    } catch {
      setError("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/summaries/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, videoUrl }),
      });
      if (res.ok) {
        onSave?.();
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          data-testid="video-url-input"
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste video URL here..."
          className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-white/50 outline-none focus:border-white/40"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) handleSubmit();
          }}
        />
        <button
          data-testid="summarise-button"
          onClick={handleSubmit}
          disabled={loading}
          className="rounded-md bg-white/20 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Summarising..." : "Summarise"}
        </button>
      </div>

      {loading && (
        <div data-testid="loading-indicator" className="text-sm text-white/70">
          <div
            data-testid="progress-stepper"
            className="flex flex-col gap-3 py-2"
          >
            {STEPS.map((step, index) => {
              const status = getStepStatus(step.key);
              return (
                <div
                  key={step.key}
                  data-testid={step.testId}
                  className="flex items-center gap-3"
                >
                  {/* Connector line above (except first) */}
                  <div className="flex flex-col items-center">
                    {index > 0 && (
                      <div className="mb-1 h-3 w-px bg-white/20" />
                    )}
                    {/* Dot / Checkmark */}
                    {status === "completed" ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                        &#10003;
                      </span>
                    ) : status === "active" ? (
                      <span className="block h-5 w-5 animate-pulse rounded-full bg-white" />
                    ) : (
                      <span className="block h-5 w-5 rounded-full bg-white/30" />
                    )}
                    {index < STEPS.length - 1 && (
                      <div className="mt-1 h-3 w-px bg-white/20" />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={
                      status === "completed"
                        ? "text-sm text-white/50"
                        : status === "active"
                          ? "text-sm text-white"
                          : "text-sm text-white/30"
                    }
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {error && (
        <div
          data-testid="error-message"
          className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {summary && (
        <div
          data-testid="summary-output"
          className="animate-in fade-in rounded-md border border-white/20 bg-white/5 p-4 text-sm leading-relaxed text-white/90 prose prose-invert prose-sm max-w-none"
        >
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}

      {summary && !loading && (
        <button
          data-testid="save-summary-btn"
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-white/20 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Summary"}
        </button>
      )}
    </div>
  );
}
