import type { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { logger } from "../utils/logger";

export function requestTracker(req: Request, res: Response, next: NextFunction) {
  const requestId = crypto.randomUUID();
  const startTime = Date.now();

  res.setHeader("X-Request-Id", requestId);
  (req as any).requestId = requestId;

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(`Request selesai`, {
      requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
}