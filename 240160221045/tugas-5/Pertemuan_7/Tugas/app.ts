
import express, { type Request, type Response, type NextFunction } from "express";
import mahasiswaRoutes from "./src/routes/mahasiswa.routes.ts";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Logger sederhana
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Route mahasiswa
app.use("/mahasiswa", mahasiswaRoutes);

// Handler untuk endpoint yang tidak ditemukan
app.use((_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
    details: ["Periksa kembali URL dan HTTP method"],
  });
});

// Error handler
app.use((
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error("Terjadi kesalahan:", error);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
    details: ["Silakan coba kembali beberapa saat lagi"],
  });
});

export default app;
