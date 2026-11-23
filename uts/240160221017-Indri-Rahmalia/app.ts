import express, { NextFunction, Request, Response } from "express";
import bukuRoutes from "./src/routes/buku.routes";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/buku", bukuRoutes);

// Middleware 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} tidak ditemukan` });
});

// Error handler (4 parameter)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  // JSON body tidak valid -> 400
  if (err?.type === "entity.parse.failed" || err instanceof SyntaxError) {
    return res.status(400).json({ error: "JSON tidak valid" });
  }
  console.error(err);
  res.status(500).json({ error: "Terjadi kesalahan pada server" });
});

export default app;
