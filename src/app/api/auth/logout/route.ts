import { NextResponse } from "next/server";
import { deleteSession, parseSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("admin_session="));

  if (match) {
    const token = decodeURIComponent(match.replace("admin_session=", ""));
    const payload = parseSessionToken(token);
    if (payload?.sessionId) {
      await deleteSession(payload.sessionId);
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
  return response;
}
