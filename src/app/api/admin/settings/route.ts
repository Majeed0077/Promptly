import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { SettingsModel } from "@/models/Settings";
import { defaultSettings } from "@/data/adminSettings";

const SETTINGS_KEY = "default";

export async function GET() {
  await dbConnect();
  let settings = await SettingsModel.findOne({ key: SETTINGS_KEY }).lean();

  if (!settings) {
    settings = await SettingsModel.create({
      key: SETTINGS_KEY,
      data: defaultSettings,
    });
  }

  return NextResponse.json({ ok: true, settings: settings.data });
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const settings = await SettingsModel.findOneAndUpdate(
    { key: SETTINGS_KEY },
    { data },
    { new: true, upsert: true }
  ).lean();

  return NextResponse.json({ ok: true, settings: settings?.data ?? data });
}
