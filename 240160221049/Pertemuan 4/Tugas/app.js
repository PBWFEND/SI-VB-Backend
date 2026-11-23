/**
 * Express app untuk Tugas 2 — API Buku Perpustakaan.
 * Dipisah dari server.js agar app dapat diuji tanpa membuka port.
 */

import express from "express";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import bukuRouter from "./routes/buku.routes.js";

const app = express();

// Security: sembunyikan header X-Powered-By
app.disable("x-powered-by");

// ---------- Middleware global ----------
app.use(express.json());          // parser JSON — HARUS sebelum route POST
app.use(logger);                  // logger waktu/method/URL

// ---------- Routes ----------
app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "API Buku Perpustakaan (Express.js)",
    version: "1.0.0",
    endpoints: [
      "GET    /",
      "GET    /health",
      "GET    /buku?tersedia=true|false&penulis=<teks>",
      "GET    /buku/:id",
      "POST   /buku",
      "PATCH  /buku/:id",
      "DELETE /buku/:id",
    ],
  });
});

app.get("/health", (request, response) => {
  response.status(200).json({
    success: true,
    status: "up",
    uptime: `${Math.floor(process.uptime())}s`,
    node: process.version,
  });
});

app.use("/buku", bukuRouter);

// ---------- 404 & error (WAJIB paling akhir, urutan ini) ----------
app.use(notFound);
app.use(errorHandler);

export default app;