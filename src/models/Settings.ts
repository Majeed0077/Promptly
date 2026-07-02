import mongoose, { Schema } from "mongoose";

export type SettingsDoc = {
  key: string;
  data: Record<string, unknown>;
  updatedAt: Date;
  createdAt: Date;
};

const SettingsSchema = new Schema<SettingsDoc>(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

export const SettingsModel =
  mongoose.models.Settings ||
  mongoose.model<SettingsDoc>("Settings", SettingsSchema);
