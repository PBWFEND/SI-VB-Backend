
import express, { type Request, type Response, type NextFunction } from "express";
export { prisma } from "../client.ts";
import bukuRoutes from "./routes/buku.routes.ts";

const app = express();
app.disable("x-powered-by");

// Middleware JSON parser
app.use(express.json());

// Middleware logger
app.use((request: Request, response: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`,
  );
  next();
});

// Endpoint informasi
app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "CRUD REST API — Tugas 5 Pertemuan 7",
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
    data: { status: "up" },
  });
});

// Routes buku
app.use("/buku", bukuRoutes);

// Middleware 404
app.use((_request: Request, response: Response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    console.error("Kesalahan aplikasi:", error.message);

    response.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  },
);

export { app };
