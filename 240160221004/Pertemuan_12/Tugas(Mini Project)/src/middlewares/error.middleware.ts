import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { logger } from "../utils/logger";
import { Prisma } from "@prisma/client";

export function globalErrorHandler(err: any, req: Request, res: Response, _next: NextFunction) {
  let statusCode = 500, message = "Terjadi kesalahan pada server", errors: any = undefined;
  if (err instanceof AppError) { statusCode = err.statusCode; message = err.message; }
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") { statusCode = 400; message = "Data sudah ada"; }
    else if (err.code === "P2025") { statusCode = 404; message = "Data tidak ditemukan"; }
    else { statusCode = 400; message = `Database error: ${err.code}`; }
  } else if (err.name === "ValidationError") { statusCode = 400; message = "Validasi gagal"; errors = err.errors; }

  logger.error(message, {
    requestId: (req as any).requestId, method: req.method,
    url: req.originalUrl, body: req.body, stack: err.stack,
  });
  res.status(statusCode).json({ status: "error", message, ...(errors && { errors }), requestId: (req as any).requestId });
}