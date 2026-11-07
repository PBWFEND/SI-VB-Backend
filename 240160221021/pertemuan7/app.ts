/**
 * Pertemuan 7 - CRUD REST API.
 * Susunan lapisan: app.ts -> routes -> controller -> service -> client.ts (Prisma)
 * app.ts hanya menyusun middleware, router, handler 404, dan error handler.
 */

import express, { type NextFunction, type Request, type Response } from "express";
export { prisma } from "./client.ts";
import { bukuRoutes } from "./src/routes/buku.routes.ts";

const app = express();
app.disable("x-powered-by");

// Parser JSON harus didaftarkan SEBELUM route yang membaca request.body
app.use(express.json());

// Middleware logger: mencatat setiap request yang masuk
app.use((request: Request, _response: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "CRUD REST API - Pertemuan 7",
    data: {
      resource: "buku",
      endpoints: ["GET /buku", "GET /buku/:id", "POST /buku", "PATCH /buku/:id", "DELETE /buku/:id"],
    },
  });
});

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, message: "API berjalan", data: { status: "up" } });
});

// Semua endpoint buku disusun di satu router; mengganti path cukup mengubah baris ini
app.use("/buku", bukuRoutes);

// Middleware 404: setelah semua route
app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Error handler: harus punya 4 parameter agar dikenali Express
app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  // PERBAIKAN 4: body JSON yang rusak adalah kesalahan client (400), bukan kesalahan server (500)
  if (typeof error === "object" && error !== null && "type" in error && error.type === "entity.parse.failed") {
    response.status(400).json({ success: false, message: "Format JSON tidak valid" });
    return;
  }
  console.error("Kesalahan aplikasi:", error instanceof Error ? error.message : error);
  // Jangan bocorkan detail error ke client
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };