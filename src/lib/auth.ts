import crypto from "crypto";

type SessionPayload = {
  email: string;
  issuedAt: number;
};

const TOKEN_SEPARATOR = ".";

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

export function signSessionToken(email: string) {
  const payload: SessionPayload = {
    email,
    issuedAt: Date.now(),
  };
  const payloadJson = JSON.stringify(payload);
  const encodedPayload = base64UrlEncode(payloadJson);
  const signature = signData(encodedPayload);
  return `${encodedPayload}${TOKEN_SEPARATOR}${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
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

  try {
    const payloadJson = base64UrlDecode(encodedPayload);
    const payload = JSON.parse(payloadJson) as SessionPayload;
    if (!payload?.email || !payload?.issuedAt) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
