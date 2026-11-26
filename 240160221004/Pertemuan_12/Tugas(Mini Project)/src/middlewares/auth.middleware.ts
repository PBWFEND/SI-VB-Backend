import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { ENV } from "../config/env";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new AppError("Akses ditolak. Token tidak ditemukan.", 401));
  try {
    const decoded = jwt.verify(authHeader.split(" ")[1], ENV.JWT_SECRET) as { id: number; email: string; role: string };
    (req as any).user = decoded;
    next();
  } catch { return next(new AppError("Token tidak valid atau sudah kedaluwarsa.", 401)); }
}

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return next(new AppError("Middleware authenticate belum dijalankan.", 500));
    if (!allowedRoles.includes(user.role))
      return next(new AppError("Akses ditolak. Role tidak sesuai.", 403));
    next();
  };
}