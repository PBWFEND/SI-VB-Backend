
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import { authRoutes } from "./src/routes/auth.routes.ts";

const app = express();

app.disable("x-powered-by");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: { status: "up" },
  });
});

// Authentication routes
app.use("/auth", authRoutes);

// Handler 404
app.use((_req: Request, res: Response) => {
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
  _next: NextFunction,
) => {
  console.error("Kesalahan aplikasi:", error);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

export { app };