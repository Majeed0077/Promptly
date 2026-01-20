"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import AdminPromptTable, { AdminPrompt } from "@/components/AdminPromptTable";
import AdminPromptModal, {
  AdminPromptFormValues,
} from "@/components/AdminPromptModal";
import AdminUserActions from "@/components/AdminUserActions";

const adminNavItems = [
  { name: "Dashboard", active: false, href: "/admin" },
  { name: "Prompts", active: true, href: "/admin/prompts" },
  { name: "Categories", active: false, href: "/admin/categories" },
  { name: "Users", active: false, href: "/admin/users" },
  { name: "Settings", active: false, href: "/admin/settings" },
];

const statusOptions = ["All", "Active", "Draft", "Inactive"];

export default function AdminPromptsPage() {
  const [prompts, setPrompts] = useState<AdminPrompt[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<AdminPrompt | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPrompts = async () => {
      try {
        const response = await fetch("/api/prompts");
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        if (!isMounted) return;
        const mapped = (data.prompts as Array<any>).map((prompt) =>
          mapPrompt(prompt)
        ) as AdminPrompt[];
        setPrompts(mapped);
      } catch {
        if (!isMounted) return;
        setPrompts([]);
      }
    };
    loadPrompts();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPrompts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return prompts.filter((prompt) => {
      const matchesSearch = prompt.title.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All" || prompt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [prompts, searchQuery, statusFilter]);

  const handleOpenCreate = () => {
    setEditingPrompt(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prompt: AdminPrompt) => {
    setEditingPrompt(prompt);
    setIsModalOpen(true);
  };

  const handleSave = async (values: AdminPromptFormValues) => {
    setIsSaving(true);
    try {
      const response = await fetch(
        editingPrompt ? `/api/prompts/${editingPrompt.id}` : "/api/prompts",
        {
          method: editingPrompt ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Save failed");
      }

      const data = await response.json();
      const mapped = mapPrompt(data.prompt ?? values);

      setPrompts((current) => {
        if (!editingPrompt) {
          return [mapped, ...current];
        }
        return current.map((prompt) =>
          prompt.id === editingPrompt.id ? mapped : prompt
        );
      });
      setIsModalOpen(false);
      setEditingPrompt(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (prompt: AdminPrompt) => {
    const confirmed = window.confirm(
      `Delete "${prompt.title}"? This cannot be undone.`
    );
    if (!confirmed) return;

    const response = await fetch(`/api/prompts/${prompt.id}`, {
      method: "DELETE",
    });

    if (!response.ok) return;
    setPrompts((current) =>
      current.filter((currentPrompt) => currentPrompt.id !== prompt.id)
    );
  };

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar
        items={adminNavItems}
        activeItem="Prompts"
        footerProfile={
          <Link
            href="/admin"
            className="block w-full rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur transition hover:border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white/30 to-white/10"></div>
              <div>
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-xs text-white/60">Administrator</p>
              </div>
            </div>
          </Link>
        }
        footerAction={
          <button
            onClick={handleOpenCreate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.55)] transition hover:brightness-110"
          >
            <PlusIcon className="h-4 w-4" />
            New Prompt
          </button>
        }
      />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">Admin</h1>
            <AdminUserActions />
          </div>

          <Topbar
            categories={[]}
            activeCategory=""
            onCategoryChange={() => {}}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            showChips={false}
            rightSlot={
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2 pr-9 text-xs font-semibold text-white/80 backdrop-blur transition hover:border-white/30 focus:outline-none"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/50" />
                </div>
                <button
                  onClick={handleOpenCreate}
                  className="flex items-center gap-2 rounded-xl border border-sky-400/40 bg-gradient-to-r from-sky-500/80 to-indigo-500/80 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(120,160,255,0.6)] transition hover:brightness-110"
                >
                  <PlusIcon className="h-4 w-4" />
                  New Prompt
                </button>
              </div>
            }
          />

          <AdminPromptTable
            prompts={filteredPrompts}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        </div>
      </main>

      <AdminPromptModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={editingPrompt}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}

function mapPrompt(prompt: any): AdminPrompt {
  return {
    id: String(prompt._id ?? prompt.id ?? ""),
    title: String(prompt.title ?? ""),
    category: String(prompt.category ?? ""),
    tags: Array.isArray(prompt.tags) ? prompt.tags : [],
    description: String(prompt.description ?? ""),
    promptText: String(prompt.promptText ?? ""),
    status: (prompt.status ?? "Active") as AdminPrompt["status"],
  };
}

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
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
