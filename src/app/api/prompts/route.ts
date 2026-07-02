import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { PromptModel } from "@/models/Prompt";

export async function GET() {
  await dbConnect();
  const prompts = await PromptModel.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ ok: true, prompts });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const prompt = await PromptModel.create({
    ...body,
    imageUrl: body.imageUrl ?? "",
    status: body.status ?? "Active",
  });
  return NextResponse.json({ ok: true, prompt });
}
