/**
 * Pertemuan 12 — Error handler terpusat.
 */

import type { ErrorRequestHandler } from "express";
import { Prisma } from "../../prisma/generated/client.ts"; // <-- Diperbaiki
import { AppError } from "./app-error.ts";
import { logger } from "../logger/logger.ts";
import type { RequestBerId } from "../middleware/request-context.middleware.ts";

export const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  const requestId = (request as RequestBerId).requestId ?? "-";

  // 1) AppError (NOT_FOUND, VALIDATION_ERROR, FORBIDDEN, CONFLICT, ...)
  if (error instanceof AppError) {
    logger.warn("app error", {
      requestId,
      kode: error.kode,
      status: error.statusCode,
      pesan: error.message,
    });
    response.status(error.statusCode).json({
      success: false,
      error: { code: error.kode, message: error.message, requestId },
    });
    return;
  }

  // 2) Error Prisma: unique constraint (P2002) -> 409
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      logger.warn("konflik unik", { requestId, kode: "CONFLICT" });
      response.status(409).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: "Data dengan nilai unik tersebut sudah ada.",
          requestId,
        },
      });
      return;
    }
  }

  // 3) Body parser (JSON rusak) -> 400
  if (error instanceof SyntaxError && "body" in error) {
    logger.warn("body tidak valid", { requestId });
    response.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Body JSON tidak valid.",
        requestId,
      },
    });
    return;
  }

  // 4) Fallback tak terduga -> 500
  logger.error("error tak terduga", {
    requestId,
    pesan: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  });
  response.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Terjadi kesalahan pada server.",
      requestId,
    },
  });
};