
import express from "express";
import bukuRoutes from "./src/routes/buku.routes";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API BookSpace berjalan!" });
});

app.use("/api/buku", bukuRoutes);

// Handler 404
app.use((_req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// Handler error
app.use((
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    message: "Terjadi kesalahan pada server",
  });
});

export default app;