import mongoose, { Schema } from "mongoose";

export type SessionDoc = {
  sessionId: string;
  email: string;
  createdAt: Date;
  expiresAt: Date;
};

const SessionSchema = new Schema<SessionDoc>(
  {
    sessionId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const SessionModel =
  mongoose.models.Session ||
  mongoose.model<SessionDoc>("Session", SessionSchema);
