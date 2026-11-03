import express from "express";
import type { Request, Response, NextFunction } from "express";
import penggunaRoutes from "./src/routes/pengguna.routes.ts";

const app = express();

// Middleware parsing JSON (wajib dipasang sebelum routes)
app.use(express.json());

// Endpoint informasi API
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "CRUD REST API Pengguna — Tugas 5 (Arsitektur Service & Controller)",
    endpoints: [
      "GET    /pengguna",
      "GET    /pengguna/:nim",
      "POST   /pengguna",
      "PATCH  /pengguna/:nim",
      "DELETE /pengguna/:nim",
    ],
  });
});

// Route utama pengguna
app.use("/pengguna", penggunaRoutes);

// Middleware 404 jika endpoint tidak ditemukan
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Middleware Global Error Handler (4 parameter)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Terjadi kesalahan:", err);

  if (err?.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "NIM atau email sudah terdaftar",
    });
  }

  const status = Number(err?.status ?? 500);
  const statusCode = status >= 400 && status < 600 ? status : 500;

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 400
        ? "Format JSON request tidak valid"
        : "Terjadi kesalahan pada server",
  });
});

export default app;
