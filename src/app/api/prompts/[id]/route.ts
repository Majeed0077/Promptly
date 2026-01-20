import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { PromptModel } from "@/models/Prompt";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const body = await request.json();
  let prompt = null;
  try {
    prompt = await PromptModel.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    }).lean();
  } catch {
    prompt = null;
  }

  if (!prompt) {
    prompt = await PromptModel.findOneAndUpdate({ id: params.id }, body, {
      new: true,
      runValidators: true,
    }).lean();
  }

  if (!prompt) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }

  return NextResponse.json({ ok: true, prompt });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  let prompt = null;
  try {
    prompt = await PromptModel.findByIdAndDelete(params.id).lean();
  } catch {
    prompt = null;
  }
  if (!prompt) {
    prompt = await PromptModel.findOneAndDelete({ id: params.id }).lean();
  }
  if (!prompt) {
    return NextResponse.json({ ok: false }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
