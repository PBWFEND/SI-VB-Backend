import { randomUUID } from "node:crypto";
import type { Request, RequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const bacaAngka = (nama: string, cadangan: number) => {
  const nilai = process.env[nama];
  if (nilai === undefined) return cadangan;
  const angka = Number(nilai);
  return Number.isFinite(angka) && angka > 0 ? angka : cadangan;
};

export const securityHeaders: RequestHandler = helmet();

export const corsTerbatas = cors({
  origin: (origin, callback) => {
    const daftarIzin = (process.env.CORS_ORIGIN ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (!origin) {
      callback(null, true);
      return;
    }
    callback(null, daftarIzin.includes(origin));
  },
});

export const pembatasiRequest = rateLimit({
  windowMs: bacaAngka("RATE_LIMIT_WINDOW_MS", 15_000),
  limit: bacaAngka("RATE_LIMIT_MAX", 20),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { success: false, message: "Terlalu banyak permintaan, coba lagi nanti" },
});

export type RequestBerId = Request & { requestId?: string };

export const beriRequestId: RequestHandler = (request, response, next) => {
  const id = randomUUID();
  (request as RequestBerId).requestId = id;
  response.setHeader("X-Request-Id", id);
  next();
};