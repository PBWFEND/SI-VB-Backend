
import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

const VALID_ROLES = ["pengguna", "staf"];

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "Token tidak ditemukan",
    });
    return;
  }

  const token = authHeader.slice(7).trim();

  if (!token) {
    res.status(401).json({
      message: "Token tidak ditemukan",
    });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    next(new Error("JWT_SECRET belum dikonfigurasi"));
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    if (typeof decoded === "string") {
      res.status(401).json({
        message: "Token tidak valid",
      });
      return;
    }

    const payload = decoded as JwtPayload & {
      role?: unknown;
    };

    const userId = Number(payload.sub);

    if (
      !payload.sub ||
      !Number.isInteger(userId) ||
      userId <= 0 ||
      typeof payload.role !== "string" ||
      !VALID_ROLES.includes(payload.role) ||
      typeof payload.iat !== "number" ||
      typeof payload.exp !== "number"
    ) {
      res.status(401).json({
        message: "Token tidak valid",
      });
      return;
    }

    res.locals.user = {
      id: userId,
      role: payload.role,
    };

    next();
  } catch {
    res.status(401).json({
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({
        message: "Akses ditolak: role tidak memiliki izin",
      });
      return;
    }

    next();
  };
};