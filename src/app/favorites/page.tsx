"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AuthActions from "@/components/AuthActions";
import PromptGrid from "@/components/PromptGrid";
import { PromptItem } from "@/components/PromptCard";

type ApiPrompt = Omit<PromptItem, "id"> & {
  id?: string;
  _id?: string;
};

export default function FavoritesPage() {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
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
          const mapped = (promptData.prompts as ApiPrompt[]).map((prompt) => ({
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
        } else if (isMounted) {
          setToast("Failed to load favorites");
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

  const favoritePrompts = useMemo(() => {
    return prompts.filter((prompt) => favoriteIds.includes(prompt.id));
  }, [favoriteIds, prompts]);

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

  return (
    <div className="app-shell min-h-screen text-white">
      <Sidebar activeItem="Favorites" />
      <main className="min-h-screen lg:pl-[260px]">
        <div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Favorites</h1>
              <p className="text-sm text-white/60">Quick access to saved prompts.</p>
            </div>
            <AuthActions />
          </div>

          {favoritePrompts.length === 0 ? (
            <div className="surface rounded-xl p-6">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <span className="text-sm font-semibold text-white/70">FAV</span>
                </div>
                <h2 className="text-lg font-semibold">No favorites yet</h2>
                <p className="text-sm text-white/60">
                  Save prompts from the library to see them here.
                </p>
                <Link
                  href="/"
                  className="mt-2 rounded-lg border border-[rgba(216,181,109,0.38)] bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold text-[var(--accent-strong)] transition hover:bg-[rgba(216,181,109,0.18)]"
                >
                  Browse Library
                </Link>
              </div>
            </div>
          ) : (
            <PromptGrid
              prompts={favoritePrompts}
              onCopy={handleCopy}
            />
          )}
          {isLoading && (
            <p className="text-sm text-white/60">Loading prompts...</p>
          )}
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-xl border border-white/10 bg-[var(--panel)] px-4 py-2 text-sm font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
