import { NextResponse } from "next/server";

const mockUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@promptly.com",
    role: "admin",
    status: "active",
    lastLoginAt: "2026-01-17T10:12:00.000Z",
    createdAt: "2025-11-02T09:22:00.000Z",
  },
  {
    id: "user-2",
    name: "Aisha Khan",
    email: "aisha@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: "2026-01-18T18:45:00.000Z",
    createdAt: "2025-12-15T13:05:00.000Z",
  },
  {
    id: "user-3",
    name: "Leo Park",
    email: "leo@promptly.com",
    role: "viewer",
    status: "suspended",
    lastLoginAt: "2025-12-28T08:32:00.000Z",
    createdAt: "2025-10-21T17:40:00.000Z",
  },
  {
    id: "user-4",
    name: "Sofia Mendes",
    email: "sofia@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: "2026-01-19T07:20:00.000Z",
    createdAt: "2025-09-07T11:15:00.000Z",
  },
  {
    id: "user-5",
    name: "Arjun Patel",
    email: "arjun@promptly.com",
    role: "viewer",
    status: "active",
    lastLoginAt: "2026-01-12T14:08:00.000Z",
    createdAt: "2025-08-14T10:50:00.000Z",
  },
  {
    id: "user-6",
    name: "Mina Lee",
    email: "mina@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: "2026-01-09T09:05:00.000Z",
    createdAt: "2025-07-29T16:18:00.000Z",
  },
  {
    id: "user-7",
    name: "Rafael Silva",
    email: "rafael@promptly.com",
    role: "viewer",
    status: "suspended",
    lastLoginAt: "2025-12-03T19:42:00.000Z",
    createdAt: "2025-06-11T08:30:00.000Z",
  },
  {
    id: "user-8",
    name: "Zara Ali",
    email: "zara@promptly.com",
    role: "admin",
    status: "active",
    lastLoginAt: "2026-01-19T12:00:00.000Z",
    createdAt: "2025-05-04T12:12:00.000Z",
  },
  {
    id: "user-9",
    name: "Owen Smith",
    email: "owen@promptly.com",
    role: "viewer",
    status: "active",
    lastLoginAt: "2026-01-15T21:14:00.000Z",
    createdAt: "2025-04-27T15:27:00.000Z",
  },
  {
    id: "user-10",
    name: "Nina Farooq",
    email: "nina@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: "2026-01-16T07:33:00.000Z",
    createdAt: "2025-03-19T11:44:00.000Z",
  },
];

export async function GET() {
  return NextResponse.json({ ok: true, users: mockUsers });
}

export async function POST(request: Request) {
  const body = await request.json();
  const now = new Date().toISOString();
  const user = {
    ...body,
    id: `user-${Date.now()}`,
    createdAt: body.createdAt ?? now,
    lastLoginAt: body.lastLoginAt ?? "",
  };
  return NextResponse.json({ ok: true, user });
}
