import express, { Request, Response, NextFunction } from "express";
import bukuRoutes from "./src/routes/buku.routes.js";

const app = express();

app.use(express.json());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API Perpustakaan berjalan",
  });
});

// Routes Buku
app.use("/api/buku", bukuRoutes);

// Route tidak ditemukan
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
);

export default app;