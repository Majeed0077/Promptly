import { NextResponse } from "next/server";

const users = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@promptly.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "user-2",
    name: "Aisha Khan",
    email: "aisha@promptly.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: "user-3",
    name: "Leo Park",
    email: "leo@promptly.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: "user-4",
    name: "Sofia Mendes",
    email: "sofia@promptly.com",
    role: "Editor",
    status: "Active",
  },
];

export async function GET() {
  return NextResponse.json({ ok: true, users });
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = {
    ...body,
    id: `user-${Date.now()}`,
  };
  return NextResponse.json({ ok: true, user });
}
