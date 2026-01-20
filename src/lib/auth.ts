import crypto from "crypto";
import { dbConnect } from "@/lib/db";
import { SessionModel } from "@/models/Session";

type SessionPayload = {
  sessionId: string;
  email: string;
  issuedAt: number;
};

const TOKEN_SEPARATOR = ".";
const DEFAULT_SESSION_DAYS = 7;

function getSecret() {
  return process.env.AUTH_SECRET ?? "";
}

function base64UrlEncode(input: string) {
  return Buffer.from(input).toString("base64url");
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signData(data: string) {
  const secret = getSecret();
  return crypto.createHmac("sha256", secret).update(data).digest("base64url");
}

function parsePayload(encodedPayload: string): SessionPayload | null {
  try {
    const payloadJson = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadJson) as SessionPayload;
    if (!payload?.email || !payload?.issuedAt || !payload?.sessionId) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(email: string) {
  await dbConnect();
  const sessionId = crypto.randomBytes(24).toString("hex");
  const issuedAt = Date.now();
  const expiresAt = new Date(issuedAt + DEFAULT_SESSION_DAYS * 24 * 60 * 60 * 1000);

  await SessionModel.create({
    sessionId,
    email,
    expiresAt,
  });

  return { sessionId, issuedAt, email };
}

export function signSessionToken(payload: SessionPayload) {
  const payloadJson = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadJson);
  const signature = signData(encodedPayload);
  return `${encodedPayload}${TOKEN_SEPARATOR}${signature}`;
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  if (!token.includes(TOKEN_SEPARATOR)) {
    return null;
  }

  const [encodedPayload, signature] = token.split(TOKEN_SEPARATOR);
  const expected = signData(encodedPayload);

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
    return null;
  }

  const payload = parsePayload(encodedPayload);
  if (!payload) return null;

  await dbConnect();
  const session = await SessionModel.findOne({
    sessionId: payload.sessionId,
    email: payload.email,
  }).lean();

  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    await SessionModel.deleteOne({ sessionId: payload.sessionId });
    return null;
  }

  return payload;
}

export function parseSessionToken(token: string): SessionPayload | null {
  if (!token.includes(TOKEN_SEPARATOR)) {
    return null;
  }
  const [encodedPayload, signature] = token.split(TOKEN_SEPARATOR);
  const expected = signData(encodedPayload);

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) {
    return null;
  }

  return parsePayload(encodedPayload);
}

export async function deleteSession(sessionId: string) {
  await dbConnect();
  await SessionModel.deleteOne({ sessionId });
}
