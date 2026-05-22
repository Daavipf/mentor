import crypto from "crypto";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET || "chave-secreta-longa-e-super-segura";
const EXP_2_HOURS = 60 * 60 * 2;

type jwtPayload = {
  email: string;
  userId: string;
};

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedValue: string): boolean {
  const [salt, originalHash] = storedValue.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}

function base64url(str: string | Buffer): string {
  return Buffer.from(str).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function signJwt(payload: jwtPayload): string {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + EXP_2_HOURS })); // 2 horas
  const signature = crypto.createHmac("sha256", JWT_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest();
  return `${encodedHeader}.${encodedPayload}.${base64url(signature)}`;
}

export function verifyJwt(token: string): any {
  const [encodedHeader, encodedPayload, signature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !signature) return null;

  const validSignature = base64url(
    crypto.createHmac("sha256", JWT_SECRET).update(`${encodedHeader}.${encodedPayload}`).digest(),
  );

  if (signature !== validSignature) return null;

  const payload = JSON.parse(Buffer.from(encodedPayload, "base64").toString());
  if (payload.exp && Date.now() / 1000 > payload.exp) return null;
  return payload;
}
