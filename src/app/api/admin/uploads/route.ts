import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { ok: false, error: "Image file is required." },
      { status: 400 }
    );
  }

  const extension = allowedTypes.get(file.type);

  if (!extension) {
    return NextResponse.json(
      { ok: false, error: "Only JPG, PNG, WebP, and GIF images are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { ok: false, error: "Image must be 5MB or smaller." },
      { status: 400 }
    );
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads", "prompts");
  await mkdir(uploadDir, { recursive: true });

  const fileName = `${Date.now()}-${randomUUID()}${extension}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(filePath, buffer);

  return NextResponse.json({
    ok: true,
    url: `/uploads/prompts/${fileName}`,
  });
}
