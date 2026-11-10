import type { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  req: Request,
  res: Response
) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);

  res.status(500).json({
    message: "Terjadi kesalahan pada server",
  });
};