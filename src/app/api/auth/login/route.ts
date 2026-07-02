import { NextResponse } from "next/server";
import { createSession, signSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const isDev = process.env.NODE_ENV !== "production";
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, message: "Invalid request." },
        { status: 400 }
      );
    }
    const email = String(body?.email ?? "");
    const password = String(body?.password ?? "");

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@demo.com";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (email === adminEmail && password === adminPassword) {
      try {
        const payload = await createSession(email);
        const token = signSessionToken(payload);
        const response = NextResponse.json({ ok: true });
        response.cookies.set("admin_session", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        return response;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Database connection failed.";
        return NextResponse.json(
          {
            ok: false,
            message: isDev ? message : "Database connection failed.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { ok: false, message: "Invalid credentials" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request." },
      { status: 400 }
    );
  }
}
