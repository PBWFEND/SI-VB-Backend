/**
 * Pertemuan 12 — Konteks request: request id dan log akses.
 * Tujuan: memberi setiap request pengenal unik serta mencatat metode, path,
 *         status, dan durasi agar log mudah dihubungkan dengan satu permintaan.
 * Catatan Latihan No.3: karena memakai logger.info, baris "request selesai"
 * hilang ketika LOG_LEVEL=warn.
 */

import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import type { Request, RequestHandler } from "express";
import { logger } from "../logger/logger.ts";

export type RequestBerId = Request & { requestId?: string };

export const beriRequestId: RequestHandler = (request, response, next) => {
  const id = randomUUID();
  (request as RequestBerId).requestId = id;
  response.setHeader("X-Request-Id", id);
  next();
};

export const catatAkses: RequestHandler = (request, response, next) => {
  const mulai = performance.now();

  response.on("finish", () => {
    logger.info("request selesai", {
      requestId: (request as RequestBerId).requestId ?? "-",
      method: request.method,
      path: request.originalUrl,
      status: response.statusCode,
      durasiMs: Math.round((performance.now() - mulai) * 100) / 100,
    });
  });

  next();
};