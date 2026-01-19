import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith("admin_session="));

  if (!match) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = decodeURIComponent(match.replace("admin_session=", ""));
  const payload = verifySessionToken(token);

  if (!payload) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  return NextResponse.json({ ok: true, email: payload.email });
}
