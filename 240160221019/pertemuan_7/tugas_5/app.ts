
import express, { type Request, type Response, type NextFunction } from "express";
export { prisma } from "./client.ts";
import { penggunaRoutes } from "./src/routes/pengguna.routes.ts";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// Middleware logging
app.use((request: Request, response: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );
  next();
});

// Endpoint utama
app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "CRUD REST API — Tugas 5",
    data: {
      resources: ["pengguna"],
      endpoints: [
        "GET    /pengguna",
        "GET    /pengguna/:nim",
        "POST   /pengguna",
        "PATCH  /pengguna/:nim",
        "DELETE /pengguna/:nim",
      ],
    },
  });
});

// Endpoint health check
app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "API berjalan",
    data: {
      status: "up",
    },
  });
});

// Routes pengguna
app.use("/pengguna", penggunaRoutes);

// Middleware 404
app.use((_request: Request, response: Response) => {
  response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Global error handler
app.use(
  (
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    console.error("Kesalahan aplikasi:", error);

    response.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
);

export { app };
