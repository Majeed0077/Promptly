import crypto from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import { FavoritesModel } from "@/models/Favorites";

async function ensureFavoritesKey() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("fav_key")?.value;
  if (existing) return { key: existing, needsSet: false };
  const key = `fav_${crypto.randomUUID()}`;
  return { key, needsSet: true };
}

export async function GET() {
  try {
    await dbConnect();
    const { key, needsSet } = await ensureFavoritesKey();
    let favorites = await FavoritesModel.findOne({ key }).lean();

    if (!favorites) {
      favorites = await FavoritesModel.create({ key, promptIds: [] });
    }

    const response = NextResponse.json({ ok: true, ids: favorites.promptIds });
    if (needsSet) {
      response.cookies.set("fav_key", key, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load favorites";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { key, needsSet } = await ensureFavoritesKey();
    const body = await request.json();
    const promptId = String(body?.promptId ?? "");

    if (!promptId) {
      return NextResponse.json(
        { ok: false, message: "Missing promptId" },
        { status: 400 }
      );
    }

    const favorites = await FavoritesModel.findOne({ key });
    const current = favorites?.promptIds ?? [];
    const next = current.includes(promptId)
      ? current.filter((id) => id !== promptId)
      : [...current, promptId];

    const updated = await FavoritesModel.findOneAndUpdate(
      { key },
      { promptIds: next },
      { new: true, upsert: true }
    ).lean();

    const response = NextResponse.json({
      ok: true,
      ids: updated?.promptIds ?? next,
    });
    if (needsSet) {
      response.cookies.set("fav_key", key, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update favorites";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
