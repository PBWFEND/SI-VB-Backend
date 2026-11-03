import express, { type Request, type Response, type NextFunction } from "express";
import menuRoutes from "./src/routes/menu.routes.ts";

const app = express();

// Middleware
app.use(express.json());

// Route utama
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Selamat datang di Warung Awaa",
    status: "success",
  });
});

// Route Menu
app.use("/menu", menuRoutes);

// Middleware 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (res.headersSent) {
      next(err);
      return;
    }

    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  },
);

export default app;