import express from "express";

import anggotaRoutes from "./src/routes/anggota.routes.ts";
import absensiRoutes from "./src/routes/absensi.routes.ts";

import type { Request, Response, NextFunction } from "express";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// Halaman utama
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: "API Absensi Organisasi aktif",
  });
});

// Routes Anggota dan Absensi
app.use("/anggota", anggotaRoutes);
app.use("/absensi", absensiRoutes);

// Middleware 404 — endpoint tidak ditemukan
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler — menangani kesalahan server
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal server",
  });
});

export default app;