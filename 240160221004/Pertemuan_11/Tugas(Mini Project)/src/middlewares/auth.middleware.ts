import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Akses ditolak. Token tidak ditemukan.", 401));
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { id: number; email: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    return next(new AppError("Token tidak valid atau sudah kedaluwarsa.", 401));
  }
}

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new AppError("Kesalahan server: Middleware authenticate belum dijalankan.", 500));
    if (!allowedRoles.includes(user.role)) {
      return next(new AppError("Akses ditolak. Anda tidak memiliki izin (role tidak sesuai).", 403));
    }
    next();
  };
}