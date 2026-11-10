/**
 * Pertemuan 8 UTS — Mini Project REST API: Domain E-Warung
 *
 * Mengintegrasikan seluruh lapisan:
 * app.ts -> src/routes -> src/controller -> src/service -> client.ts (Prisma)
 */

import express, { type Request, type Response } from "express";
import { menuRoutes } from "./src/routes/menu.routes.ts";
export { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.set("json spaces", 2);

// 1. Middleware JSON Parser (wajib sebelum routes)
app.use(express.json());

// 2. Middleware Request Logger
app.use((req: Request, _res: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 3. Endpoint Root Information
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "REST API E-Warung — Pertemuan 8 (UTS)",
    author: {
      nama: "Sutiawan",
      nim: "240160221046",
      mataKuliah: "Praktikum Pemrograman Backend",
    },
    domain: "E-Warung",
    resource: "menu",
    endpoints: [
      "GET /health",
      "GET /menu",
      "GET /menu?kategori=...&tersedia=...",
      "GET /menu/:id",
      "POST /menu",
      "PATCH /menu/:id",
      "DELETE /menu/:id",
    ],
  });
});

// 4. Endpoint Health Check (Nilai Tambah Opsional §4.2)
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server API E-Warung berjalan dengan baik",
    data: {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

// 5. Registrasi Resource Router
app.use("/menu", menuRoutes);

// 6. Middleware 404 Not Found (untuk route tak terdaftar)
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan. Periksa kembali URL dan method HTTP Anda.",
  });
});

// 7. Global Error Handler Middleware
app.use((error: Error, _req: Request, res: Response, _next: () => void) => {
  console.error("[ServerError]:", error.message);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal pada server",
  });
});

export { app };

