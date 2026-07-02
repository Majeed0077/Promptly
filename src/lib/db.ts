import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";
const MONGODB_DB = process.env.MONGODB_DB ?? "";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof global & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

globalWithMongoose.mongoose = cached;

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI");
  }
  if (!MONGODB_DB) {
    throw new Error("Missing MONGODB_DB");
  }

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
