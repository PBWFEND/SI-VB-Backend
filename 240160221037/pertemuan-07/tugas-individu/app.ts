
import express from "express";
import type { Request, Response, NextFunction } from "express";

import { bukuRoutes } from "./src/routes/buku.routes.ts";
import { prisma } from "./client.ts";

const app = express();

app.use(express.json());

// Logging request
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Halaman utama
app.get("/", (_req, res) => {
    res.json({
        message: "API Buku Pertemuan 7",
        endpoints: [
            "GET /buku",
            "GET /buku/:id",
            "POST /buku",
            "PATCH /buku/:id",
            "DELETE /buku/:id",
        ],
    });
});

// Health check
app.get("/health", (_req, res) => {
    res.json({ status: "OK" });
});

// Routes buku
app.use("/buku", bukuRoutes);

// Middleware 404
app.use((_req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan",
    });
});

// Error handler
app.use((
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error("Kesalahan aplikasi:", error);

    res.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
    });
});

export { app, prisma };
