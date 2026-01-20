"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import PromptGrid from "@/components/PromptGrid";
import { PromptItem } from "@/components/PromptCard";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All Prompts");
  const [searchQuery, setSearchQuery] = useState("");
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const promptRes = await fetch("/api/prompts");
        if (promptRes.ok) {
          const promptData = await promptRes.json();
          if (!isMounted) return;
          const mapped = (promptData.prompts as Array<any>).map((prompt) => ({
            ...prompt,
            id: String(prompt.id ?? prompt._id),
          })) as PromptItem[];
          setPrompts(mapped);
        } else if (isMounted) {
          setToast("Failed to load prompts");
        }
      } catch {
        if (isMounted) setToast("Failed to load prompts");
      } finally {
        if (isMounted) setIsLoading(false);
      }

      try {
        const favRes = await fetch("/api/favorites");
        if (favRes.ok) {
          const favData = await favRes.json();
          if (!isMounted) return;
          setFavoriteIds(favData.ids as string[]);
        }
      } catch {
        if (isMounted) setToast("Failed to load favorites");
      }
    };

    const handleRefresh = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };

    loadData();
    window.addEventListener("focus", handleRefresh);
    document.addEventListener("visibilitychange", handleRefresh);
    return () => {
      isMounted = false;
      window.removeEventListener("focus", handleRefresh);
      document.removeEventListener("visibilitychange", handleRefresh);
    };
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(prompts.map((prompt) => prompt.category)));
    return ["All Prompts", ...unique];
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory =
        activeCategory === "All Prompts" || prompt.category === activeCategory;
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, prompts]);

  const handleCopy = async (prompt: PromptItem) => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      setToast("Copied!");
    } catch {
      setToast("Copy failed");
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setToast(null), 1600);
  };

  const handleToggleFavorite = async (prompt: PromptItem) => {
    const previous = favoriteIds;
    const isFavorite = previous.includes(prompt.id);
    const next = isFavorite
      ? previous.filter((id) => id !== prompt.id)
      : [...previous, prompt.id];
    setFavoriteIds(next);
    setToast(isFavorite ? "Removed from Favorites" : "Saved to Favorites");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setToast(null), 1600);

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt.id }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.message ?? "Failed to update favorites");
      }
      setFavoriteIds((data?.ids as string[]) ?? next);
    } catch (error) {
      setFavoriteIds(previous);
      setToast(
        error instanceof Error ? error.message : "Failed to update favorites"
      );
    }
  };

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <Topbar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold">All Prompts</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-pressed={viewMode === "grid"}
                  className={`rounded-lg p-2 transition ${
                    viewMode === "grid"
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <GridIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                  className={`rounded-lg p-2 transition ${
                    viewMode === "list"
                      ? "bg-white/15 text-white"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:border-white/30">
                Filter
                <ChevronIcon className="h-3 w-3" />
              </button>
            </div>
          </div>

          <PromptGrid
            prompts={filteredPrompts}
            onCopy={handleCopy}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
            view={viewMode}
          />
          {isLoading && (
            <p className="text-sm text-white/60">Loading prompts...</p>
          )}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold shadow-[0_0_20px_rgba(120,160,255,0.4)] backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
}

function GridIcon({ className }: { className?: string }) {
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
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
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
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6h.01" />
      <path d="M3 12h.01" />
      <path d="M3 18h.01" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
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
