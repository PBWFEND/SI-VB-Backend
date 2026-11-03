
import express, { type Request, type Response, type NextFunction } from "express";
import mahasiswaRoutes from "./routes/mahasiswa.routes.ts";

const app = express();
const PORT = Number(process.env.PORT) || 3011;

// Middleware untuk membaca JSON
app.use(express.json());

// Logger sederhana
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes mahasiswa
app.use("/mahasiswa", mahasiswaRoutes);

// Middleware 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
