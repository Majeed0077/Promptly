import mongoose, { Schema } from "mongoose";

export type FavoritesDoc = {
  key: string;
  promptIds: string[];
  updatedAt: Date;
  createdAt: Date;
};

const FavoritesSchema = new Schema<FavoritesDoc>(
  {
    key: { type: String, required: true, unique: true },
    promptIds: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const FavoritesModel =
  mongoose.models.Favorites ||
  mongoose.model<FavoritesDoc>("Favorites", FavoritesSchema);
