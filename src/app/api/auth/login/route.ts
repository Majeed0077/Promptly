import { NextResponse } from "next/server";
import { signSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email ?? "");
    const password = String(body?.password ?? "");

    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@demo.com";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

    if (email === adminEmail && password === adminPassword) {
      const token = signSessionToken(email);
      const response = NextResponse.json({ ok: true });
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return response;
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
