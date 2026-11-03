import express, { type Request, type Response, type NextFunction } from "express";
import produkRoutes from "./src/routes/produk.routes.ts";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Route utama
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "E-Warung Gayemaee API is running",
  });
});

// Route produk
app.use("/produk", produkRoutes);

// Middleware 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// Global error handler
app.use(
  (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (res.headersSent) {
      return next(err);
    }

    // Error Prisma P2025: Data tidak ditemukan saat update/delete
    if (err?.code === "P2025") {
      res.status(404).json({
        message: "Produk tidak ditemukan",
      });
      return;
    }

    // Error format JSON tidak valid
    if (
      err?.type === "entity.parse.failed" ||
      err?.status === 400 ||
      err?.statusCode === 400
    ) {
      res.status(400).json({
        message: "Format JSON tidak valid",
      });
      return;
    }

    const statusCode = err?.status ?? err?.statusCode ?? 500;

    res.status(statusCode).json({
      message:
        statusCode === 500
          ? "Terjadi kesalahan pada server"
          : err.message ?? "Terjadi kesalahan pada server",
    });
  }
);

export default app;
