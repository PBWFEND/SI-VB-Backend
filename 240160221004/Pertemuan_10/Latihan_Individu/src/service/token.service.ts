/**
 * Pertemuan 10 — Service token.
 */
import jwt from "jsonwebtoken";

export type KlaimToken = {
  sub: number;
  role: string;
};

const ambilSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error("JWT_SECRET harus berisi secret acak minimal 32 byte");
  }
  return secret;
};

const JWT_SECRET = ambilSecret();

export const buatToken = (klaim: KlaimToken) => {
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "15m") as jwt.SignOptions["expiresIn"];
  return jwt.sign({ sub: klaim.sub, role: klaim.role }, JWT_SECRET, { expiresIn });
};

export const verifikasiToken = (token: string): KlaimToken | null => {
  try {
    const hasil = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });
    if (typeof hasil === "string") return null;
    const sub = typeof hasil.sub === "number" ? hasil.sub : undefined;
    const role = typeof hasil.role === "string" ? hasil.role : undefined;
    if (sub === undefined || role === undefined) return null;
    return { sub, role };
  } catch {
    return null;
  }
};