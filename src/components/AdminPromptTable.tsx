"use client";

import React from "react";

export type AdminPrompt = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  promptText: string;
  status: "Active" | "Draft" | "Inactive";
};

type AdminPromptTableProps = {
  prompts: AdminPrompt[];
  onEdit: (prompt: AdminPrompt) => void;
  onDelete: (prompt: AdminPrompt) => void;
};

const statusStyles: Record<AdminPrompt["status"], string> = {
  Active: "bg-emerald-500/20 text-emerald-100 border-emerald-400/30",
  Draft: "bg-amber-500/20 text-amber-100 border-amber-400/30",
  Inactive: "bg-violet-500/20 text-violet-100 border-violet-400/30",
};

const categoryStyles: Record<string, string> = {
  "AI Writing": "bg-blue-500/20 text-blue-100 border-blue-400/30",
  Marketing: "bg-rose-500/20 text-rose-100 border-rose-400/30",
  Productivity: "bg-emerald-500/20 text-emerald-100 border-emerald-400/30",
  Creative: "bg-amber-500/20 text-amber-100 border-amber-400/30",
  Business: "bg-indigo-500/20 text-indigo-100 border-indigo-400/30",
};

export default function AdminPromptTable({
  prompts,
  onEdit,
  onDelete,
}: AdminPromptTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(20,30,60,0.35)] backdrop-blur-xl">
      <div className="grid grid-cols-[1.6fr_1fr_0.9fr_0.7fr_0.7fr] gap-4 border-b border-white/10 bg-white/5 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
        <div className="flex items-center gap-2">
          Title
          <ChevronDown className="h-3 w-3 text-white/40" />
        </div>
        <div className="flex items-center gap-2">
          Category
          <ChevronDown className="h-3 w-3 text-white/40" />
        </div>
        <div className="flex items-center gap-2">
          Tags
          <ChevronDown className="h-3 w-3 text-white/40" />
        </div>
        <div>Status</div>
        <div className="flex items-center gap-2">
          Actions
          <ChevronDown className="h-3 w-3 text-white/40" />
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {prompts.map((prompt) => (
          <div
            key={prompt.id}
            className="grid grid-cols-[1.6fr_1fr_0.9fr_0.7fr_0.7fr] items-center gap-4 px-5 py-4 text-sm text-white/80 transition hover:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-white/20 to-white/5 text-sm font-semibold text-white/80 shadow-[0_0_16px_rgba(90,120,255,0.25)]">
                {prompt.title[0]}
              </div>
              <span className="font-medium text-white">{prompt.title}</span>
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${categoryStyles[prompt.category] ?? "border-white/10 bg-white/10 text-white/70"}`}
              >
                {prompt.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[prompt.status]}`}
              >
                {prompt.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(prompt)}
                className="rounded-lg border border-blue-400/40 bg-blue-500/20 p-2 text-blue-100 shadow-[0_0_16px_rgba(90,120,255,0.5)] transition hover:bg-blue-500/30"
              >
                <EditIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(prompt)}
                className="rounded-lg border border-rose-400/40 bg-rose-500/20 p-2 text-rose-100 shadow-[0_0_16px_rgba(255,110,150,0.35)] transition hover:bg-rose-500/30"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 border-t border-white/10 px-5 py-4 text-sm text-white/60">
        <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 hover:text-white">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-2">
          Page 1 of 16
        </div>
        <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-white/70 hover:text-white">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M6 6l1 14h10l1-14" />
    </svg>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
