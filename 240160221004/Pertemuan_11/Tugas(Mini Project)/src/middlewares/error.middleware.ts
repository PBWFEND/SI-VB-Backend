import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { Prisma } from "@prisma/client";
import { ENV } from "../config/env";

export function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  let statusCode = 500;
  let message = "Terjadi kesalahan pada server";
  let errors: any = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } 
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 400;
      message = "Data sudah ada (Duplicate entry/Unique constraint)";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Data tidak ditemukan";
    } else {
      statusCode = 400;
      message = "Terjadi kesalahan pada database";
    }
  } 
  else if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validasi gagal";
    errors = err.errors;
  }
  else if (err.message && err.message.includes("CORS")) {
    statusCode = 403;
    message = "Akses diblokir oleh kebijakan CORS";
  }

  logger.error(message, {
    requestId: (req as any).requestId,
    method: req.method,
    url: req.originalUrl,
    body: req.body,
    stack: err.stack,
    internalDetail: err.message
  });

  const isProduction = ENV.NODE_ENV === "production";
  if (isProduction && statusCode === 500) {
    message = "Terjadi kesalahan internal pada server. Silakan hubungi admin.";
  }

  res.status(statusCode).json({
    status: "error",
    message,
    ...(errors && { errors }),
    requestId: (req as any).requestId,
    ...(!isProduction && err.stack && { stack: err.stack }) 
  });
}