import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { UserModel } from "@/models/User";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await request.json();
  const user = await UserModel.findByIdAndUpdate(
    params.id,
    {
      name: body.name,
      email: body.email,
      role: body.role,
      status: body.status,
      lastLoginAt: body.lastLoginAt ? new Date(body.lastLoginAt) : null,
    },
    { new: true }
  ).lean();
  return NextResponse.json({ ok: true, user });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  await UserModel.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
