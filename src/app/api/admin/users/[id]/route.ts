import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ ok: true, user: body });
}

export async function DELETE() {
  return NextResponse.json({ ok: true });
}
