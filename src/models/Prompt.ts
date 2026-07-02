import mongoose, { Schema } from "mongoose";

export type PromptStatus = "Active" | "Draft" | "Inactive";

export type PromptDoc = {
  title: string;
  description: string;
  tags: string[];
  category: string;
  promptText: string;
  imageUrl?: string;
  status: PromptStatus;
  createdAt: Date;
  updatedAt: Date;
};

const PromptSchema = new Schema<PromptDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: { type: String, required: true },
    promptText: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Active", "Draft", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

export const PromptModel =
  mongoose.models.Prompt || mongoose.model<PromptDoc>("Prompt", PromptSchema);
