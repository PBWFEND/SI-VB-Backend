import express, { type Request, type Response } from "express";
import { authRoutes } from "./src/routes/auth.routes.ts";

const app = express();

app.disable("x-powered-by");

// WAJIB sebelum route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: { status: "up" },
  });
});

app.use("/auth", authRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

app.use((error: Error, _req: Request, res: Response, _next: (error?: unknown) => void) => {
  console.error("Kesalahan aplikasi:", error);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

export { app };