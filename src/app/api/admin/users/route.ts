import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { UserModel } from "@/models/User";

const seedUsers = [
  {
    name: "John Doe",
    email: "john@promptly.com",
    role: "admin",
    status: "active",
    lastLoginAt: new Date("2026-01-17T10:12:00.000Z"),
    createdAt: new Date("2025-11-02T09:22:00.000Z"),
  },
  {
    name: "Aisha Khan",
    email: "aisha@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: new Date("2026-01-18T18:45:00.000Z"),
    createdAt: new Date("2025-12-15T13:05:00.000Z"),
  },
  {
    name: "Leo Park",
    email: "leo@promptly.com",
    role: "viewer",
    status: "suspended",
    lastLoginAt: new Date("2025-12-28T08:32:00.000Z"),
    createdAt: new Date("2025-10-21T17:40:00.000Z"),
  },
  {
    name: "Sofia Mendes",
    email: "sofia@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: new Date("2026-01-19T07:20:00.000Z"),
    createdAt: new Date("2025-09-07T11:15:00.000Z"),
  },
  {
    name: "Arjun Patel",
    email: "arjun@promptly.com",
    role: "viewer",
    status: "active",
    lastLoginAt: new Date("2026-01-12T14:08:00.000Z"),
    createdAt: new Date("2025-08-14T10:50:00.000Z"),
  },
  {
    name: "Mina Lee",
    email: "mina@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: new Date("2026-01-09T09:05:00.000Z"),
    createdAt: new Date("2025-07-29T16:18:00.000Z"),
  },
  {
    name: "Rafael Silva",
    email: "rafael@promptly.com",
    role: "viewer",
    status: "suspended",
    lastLoginAt: new Date("2025-12-03T19:42:00.000Z"),
    createdAt: new Date("2025-06-11T08:30:00.000Z"),
  },
  {
    name: "Zara Ali",
    email: "zara@promptly.com",
    role: "admin",
    status: "active",
    lastLoginAt: new Date("2026-01-19T12:00:00.000Z"),
    createdAt: new Date("2025-05-04T12:12:00.000Z"),
  },
  {
    name: "Owen Smith",
    email: "owen@promptly.com",
    role: "viewer",
    status: "active",
    lastLoginAt: new Date("2026-01-15T21:14:00.000Z"),
    createdAt: new Date("2025-04-27T15:27:00.000Z"),
  },
  {
    name: "Nina Farooq",
    email: "nina@promptly.com",
    role: "editor",
    status: "active",
    lastLoginAt: new Date("2026-01-16T07:33:00.000Z"),
    createdAt: new Date("2025-03-19T11:44:00.000Z"),
  },
];

export async function GET() {
  await dbConnect();
  const count = await UserModel.countDocuments();
  if (count === 0) {
    await UserModel.insertMany(seedUsers);
  }
  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ ok: true, users });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const user = await UserModel.create({
    name: body.name,
    email: body.email,
    role: body.role,
    status: body.status,
  });
  return NextResponse.json({ ok: true, user });
}
