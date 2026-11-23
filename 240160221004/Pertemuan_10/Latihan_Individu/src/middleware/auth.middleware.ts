/**
 * Pertemuan 10 — Middleware authentication.
 */
import type { NextFunction, Request, Response } from "express";
import { verifikasiToken } from "../service/token.service.ts";

export type RequestTerautentikasi = Request & {
  klaim?: { sub: number; role: string };
};

export const autentikasiWajib = (request: RequestTerautentikasi, response: Response, next: NextFunction) => {
  const header = request.headers.authorization;
  if (typeof header !== "string" || !header.startsWith("Bearer ")) {
    response.status(401).json({ success: false, message: "Token tidak ditemukan" });
    return;
  }

  const token = header.slice("Bearer ".length).trim();
  const klaim = verifikasiToken(token);
  if (!klaim) {
    response.status(401).json({ success: false, message: "Token tidak valid atau kedaluwarsa" });
    return;
  }

  request.klaim = klaim;
  next();
};

export const periksaRole =
  (...roleDiizinkan: string[]) =>
  (request: RequestTerautentikasi, response: Response, next: NextFunction) => {
    const role = request.klaim?.role;
    if (!role || !roleDiizinkan.includes(role)) {
      response.status(403).json({ success: false, message: "Anda tidak memiliki izin untuk endpoint ini" });
      return;
    }
    next();
  };