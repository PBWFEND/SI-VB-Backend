/**
 * Pertemuan 8 — UTS Mini Project: Aplikasi
 * Tujuan: menyusun seluruh lapisan (route → controller → service → Prisma)
 *         dalam satu aplikasi Express yang siap dijalankan server.ts.
 *
 * Struktur lapisan (dari atas ke bawah):
 *   app.ts (file ini)
 *     └── src/routes/buku.routes.ts        — path resource
 *           └── src/controller/buku.controller.ts  — validasi + status code
 *                 └── src/service/buku.service.ts  — operasi data
 *                       └── client.ts (Prisma)
 *
 * Jalankan:
 *   npx prisma migrate dev --name init
 *   npx prisma generate
 *   node --experimental-strip-types server.ts
 *
 * Uji (terminal lain):
 *   curl http://localhost:3008/buku
 *   curl -X POST http://localhost:3008/buku \
 *        -H "Content-Type: application/json" \
 *        -d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":3}'
 */


import express, {
    type Request,
    type Response,
    type NextFunction,
    type ErrorRequestHandler,
} from "express";

import { bukuRoutes } from "./src/routes/buku.routes.ts";

export { prisma } from "./client.ts";

const app = express();

app.disable("x-powered-by");

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware logger
app.use(
    (request: Request, _response: Response, next: NextFunction) => {
        console.log(
            `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
        );
        next();
    }
);

// Endpoint informasi API
app.get("/", (_request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        message: "UTS Mini Project - Perpustakaan",
        data: {
            resource: "buku",
            endpoints: [
                "GET /buku",
                "GET /buku/:id",
                "POST /buku",
                "PATCH /buku/:id",
                "DELETE /buku/:id",
            ],
        },
    });
});

// Health check
app.get("/health", (_request: Request, response: Response) => {
    response.status(200).json({
        success: true,
        message: "API berjalan",
        data: {
            status: "up",
        },
    });
});

// Route buku
app.use("/buku", bukuRoutes);

// Middleware 404
app.use((_request: Request, response: Response) => {
    response.status(404).json({
        success: false,
        message: "Endpoint tidak ditemukan",
    });
});

// Error handler
const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next
) => {
    console.error("Kesalahan aplikasi:", error);

    response.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
    });
};

app.use(errorHandler);

export { app };
