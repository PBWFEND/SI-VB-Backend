/**
 * UTS Mini Project - REST API Peralatan Laboratorium.
 * Susunan lapisan: app.ts -> routes -> controller -> service -> client.ts (Prisma)
 * app.ts hanya menyusun middleware, router, handler 404, dan error handler.
 */

import express, { type NextFunction, type Request, type Response } from "express";
export { prisma } from "./client.ts";
import { peralatanRoutes } from "./src/routes/peralatan.routes.ts";

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
    message: "UTS Mini Project - API Peralatan Laboratorium",
    data: {
      resource: "peralatan",
      endpoints: [
        "GET /health",
        "GET /peralatan",
        "GET /peralatan/:id",
        "POST /peralatan",
        "PATCH /peralatan/:id",
        "DELETE /peralatan/:id",
      ],
    },
  });
});

// Health check: dipakai untuk memastikan server hidup
app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, message: "API berjalan", data: { status: "up" } });
});

// Semua endpoint peralatan disusun di satu router; mengganti path cukup mengubah baris ini
app.use("/peralatan", peralatanRoutes);

// Middleware 404: setelah semua route
app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

// Error handler: harus punya 4 parameter agar dikenali Express
app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  // Body JSON yang rusak adalah kesalahan client (400), bukan kesalahan server (500)
  if (typeof error === "object" && error !== null && "type" in error && error.type === "entity.parse.failed") {
    response.status(400).json({ success: false, message: "Format JSON tidak valid" });
    return;
  }
  console.error("Kesalahan aplikasi:", error instanceof Error ? error.message : error);
  // Jangan bocorkan detail error ke client
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };