import express, { type Request, type Response, type NextFunction } from "express";
import bukuRoutes from "./src/routes/buku.routes.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Logger sederhana
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ success: true, message: "OK", data: { status: "healthy" } });
});

// Root
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API Buku UTS",
    data: {
      endpoints: [
        "GET /health",
        "GET /buku",
        "GET /buku/:id",
        "POST /buku",
        "PATCH /buku/:id",
        "DELETE /buku/:id",
      ],
    },
  });
});

// Resource utama
app.use("/buku", bukuRoutes);

// Middleware 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
    data: { path: req.originalUrl, method: req.method },
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

export default app;