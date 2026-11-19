import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Akses ditolak. Token tidak ditemukan." });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token tidak valid atau sudah kedaluwarsa." });
  }
}

export function authorizeRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(500).json({ message: "Kesalahan server: Middleware authenticate belum dijalankan." });
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Akses ditolak. Anda tidak memiliki izin (role tidak sesuai)." });
    }
    next();
  };
}