"use client";

import React, { useState } from "react";

type PromptStatus = "Active" | "Draft" | "Inactive";

export type AdminPromptFormValues = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  promptText: string;
  imageUrl?: string;
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

  return (
    <AdminPromptModalContent
      key={initialValues?.id ?? "new"}
      onClose={onClose}
      initialValues={initialValues}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
}

function AdminPromptModalContent({
  onClose,
  initialValues,
  onSave,
  isSaving,
}: Omit<AdminPromptModalProps, "open">) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [tagsInput, setTagsInput] = useState(
    (initialValues?.tags ?? []).join(", ")
  );
  const [category, setCategory] = useState(initialValues?.category ?? "");
  const [promptText, setPromptText] = useState(
    initialValues?.promptText ?? ""
  );
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl ?? "");
  const [status, setStatus] = useState<PromptStatus>(
    initialValues?.status ?? "Active"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error("Upload failed");
      }

      setImageUrl(String(data.url));
    } catch {
      setUploadError("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

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
      imageUrl: imageUrl.trim(),
      status,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 py-10 backdrop-blur-sm">
      <div className="surface max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/55">
              {initialValues ? "Edit Prompt" : "Add New Prompt"}
            </p>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white">
              {initialValues ? "Update Prompt" : "Create Prompt"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white/64 hover:text-white"
            aria-label="Close modal"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Title
              </label>
              <input
                type="text"
                placeholder="Prompt title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Tags
              </label>
              <input
                type="text"
                placeholder="AI Writing, Content"
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Category
              </label>
              <input
                type="text"
                placeholder="Marketing"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                Status
              </label>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as PromptStatus)
                }
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
              >
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_180px]">
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  Prompt Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/70 file:mr-3 file:rounded-md file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#17130b] focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)] disabled:cursor-not-allowed disabled:opacity-70"
                />
                <p className="text-xs text-white/42">
                  Upload a JPG, PNG, WebP, or GIF image up to 5MB.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  Image URL
                </label>
                <input
                  type="text"
                  placeholder="/uploads/prompts/example.webp"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
                />
              </div>

              {isUploading && (
                <p className="text-xs font-semibold text-[var(--accent-strong)]">
                  Uploading image...
                </p>
              )}
              {uploadError && (
                <p className="text-xs font-semibold text-rose-200">
                  {uploadError}
                </p>
              )}
            </div>

            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
              {imageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Prompt preview"
                    className="h-44 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="w-full border-t border-white/10 px-3 py-2 text-xs font-semibold text-white/60 transition hover:text-white"
                  >
                    Remove image
                  </button>
                </>
              ) : (
                <div className="flex h-full min-h-44 flex-col items-center justify-center px-4 text-center">
                  <div className="mb-3 h-10 w-10 rounded-full border border-white/10 bg-white/[0.06]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/42">
                    Image preview
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Description
            </label>
            <input
              type="text"
              placeholder="Short description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
              Prompt Text
            </label>
            <textarea
              rows={5}
              placeholder="Write the full prompt here..."
              value={promptText}
              onChange={(event) => setPromptText(event.target.value)}
              className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white/90 placeholder:text-white/36 focus:outline-none focus:ring-2 focus:ring-[rgba(216,181,109,0.22)]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/70 hover:text-white"
              disabled={isSaving || isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="rounded-lg border border-[rgba(216,181,109,0.38)] bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#17130b] transition hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isUploading
                ? "Uploading..."
                : isSaving
                  ? "Saving..."
                  : "Save Prompt"}
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
