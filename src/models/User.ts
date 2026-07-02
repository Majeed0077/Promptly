import mongoose, { Schema } from "mongoose";

export type UserRole = "admin" | "editor" | "viewer";
export type UserStatus = "active" | "suspended";

export type UserDoc = {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer"],
      default: "viewer",
    },
    status: {
      type: String,
      enum: ["active", "suspended"],
      default: "active",
    },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export const UserModel =
  mongoose.models.User || mongoose.model<UserDoc>("User", UserSchema);
