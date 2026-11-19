/**
 * Express app untuk Tugas 3 — RESTful API resource buku.
 * Middleware order:
 *   express.json()  →  logger  →  routes  →  notFound  →  errorHandler
 */

import express from "express";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import bukuRouter from "./routes/buku.routes.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(logger);

// ---------- Info & health ----------
app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "RESTful API Buku Perpustakaan",
    version: "1.0.0",
    endpoints: [
      "GET    /",
      "GET    /health",
      "GET    /buku?penulis=&kategori=&minStok=&tersedia=",
      "GET    /buku/:id",
      "POST   /buku",
      "PUT    /buku/:id",
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

// ---------- Resource router ----------
app.use("/buku", bukuRouter);

// ---------- 404 & error (WAJIB paling akhir) ----------
app.use(notFound);
app.use(errorHandler);

export default app;