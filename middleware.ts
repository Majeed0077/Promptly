import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_PATH = "/admin";
const SIGNIN_PATH = "/signin";
const TOKEN_SEPARATOR = ".";

function base64UrlToUint8Array(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function arrayBufferToBase64Url(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  const base64 = btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
  return base64;
}

function bytesEqual(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a[i] ^ b[i];
  }
  return diff === 0;
}

async function verifySessionToken(token: string, secret: string) {
  if (!token.includes(TOKEN_SEPARATOR)) return false;
  if (!secret) return false;

  const [encodedPayload, signature] = token.split(TOKEN_SEPARATOR);
  if (!encodedPayload || !signature) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const expectedBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(encodedPayload)
  );
  const expectedSignature = arrayBufferToBase64Url(expectedBuffer);

  const expectedBytes = base64UrlToUint8Array(expectedSignature);
  const signatureBytes = base64UrlToUint8Array(signature);
  if (!bytesEqual(expectedBytes, signatureBytes)) return false;

  try {
    const payloadJson = atob(
      encodedPayload.replace(/-/g, "+").replace(/_/g, "/")
    );
    const payload = JSON.parse(payloadJson) as {
      email?: string;
      issuedAt?: number;
      sessionId?: string;
    };
    return Boolean(payload?.email && payload?.issuedAt && payload?.sessionId);
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get("admin_session")?.value ?? "";
  const isAuthed = await verifySessionToken(
    token,
    process.env.AUTH_SECRET ?? ""
  );

  if (pathname.startsWith(ADMIN_PATH) && !isAuthed) {
    const nextPath = `${pathname}${search}`;
    const url = request.nextUrl.clone();
    url.pathname = SIGNIN_PATH;
    url.search = `?next=${encodeURIComponent(nextPath)}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith(SIGNIN_PATH) && isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_PATH;
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/signin"],
};
