"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import AuthActions from "@/components/AuthActions";
import PromptGrid from "@/components/PromptGrid";
import { PromptItem } from "@/components/PromptCard";
import { prompts } from "@/data/prompts";
import { loadFavorites, saveFavorites } from "@/lib/favorites";

export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setFavoriteIds(loadFavorites());
  }, []);

  const favoritePrompts = useMemo(() => {
    return prompts.filter((prompt) => favoriteIds.includes(prompt.id));
  }, [favoriteIds]);

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

  const handleToggleFavorite = (prompt: PromptItem) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(prompt.id)
        ? prev.filter((id) => id !== prompt.id)
        : [...prev, prompt.id];
      saveFavorites(next);
      setToast(
        prev.includes(prompt.id) ? "Removed from Favorites" : "Saved to Favorites"
      );
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setToast(null), 1600);
      return next;
    });
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
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <span className="text-sm font-semibold text-white/70">FAV</span>
                </div>
                <h2 className="text-lg font-semibold">No favorites yet</h2>
                <p className="text-sm text-white/60">
                  Save prompts from the library to see them here.
                </p>
                <Link
                  href="/"
                  className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-white/30"
                >
                  Browse Library
                </Link>
              </div>
            </div>
          ) : (
            <PromptGrid
              prompts={favoritePrompts}
              onCopy={handleCopy}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />
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
