"use client";

import React, { useEffect, useState } from "react";

type PromptStatus = "Active" | "Draft" | "Inactive";

export type AdminPromptFormValues = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  promptText: string;
  status: PromptStatus;
};

type AdminPromptModalProps = {
  open: boolean;
  onClose: () => void;
  initialValues?: (AdminPromptFormValues & { id?: string }) | null;
  onSave: (values: AdminPromptFormValues) => void;
  isSaving?: boolean;
};

export default function AdminPromptModal({
  open,
  onClose,
  initialValues,
  onSave,
  isSaving = false,
}: AdminPromptModalProps) {
  if (!open) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [category, setCategory] = useState("");
  const [promptText, setPromptText] = useState("");
  const [status, setStatus] = useState<PromptStatus>("Draft");

  useEffect(() => {
    if (!open) return;
    setTitle(initialValues?.title ?? "");
    setDescription(initialValues?.description ?? "");
    setTagsInput((initialValues?.tags ?? []).join(", "));
    setCategory(initialValues?.category ?? "");
    setPromptText(initialValues?.promptText ?? "");
    setStatus(initialValues?.status ?? "Draft");
  }, [open, initialValues]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    onSave({
      title: title.trim(),
      description: description.trim(),
      tags,
      category: category.trim(),
      promptText: promptText.trim(),
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[rgba(15,18,32,0.9)] p-6 shadow-[0_0_40px_rgba(90,120,255,0.25)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">
              {initialValues ? "Edit Prompt" : "Add New Prompt"}
            </p>
            <h2 className="text-2xl font-semibold text-white">
              {initialValues ? "Update Prompt" : "Create Prompt"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 hover:text-white"
            aria-label="Close modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Title
              </label>
              <input
                type="text"
                placeholder="Prompt title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Tags
              </label>
              <input
                type="text"
                placeholder="AI Writing, Content"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Category
              </label>
              <input
                type="text"
                placeholder="Marketing"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Status
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as PromptStatus)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Description
            </label>
            <input
              type="text"
              placeholder="Short description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
              Prompt Text
            </label>
            <textarea
              rows={5}
              placeholder="Write the full prompt here..."
              value={promptText}
              onChange={(event) => setPromptText(event.target.value)}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 hover:text-white"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(120,160,255,0.6)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Save Prompt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
