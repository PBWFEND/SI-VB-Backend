import express, { type Request, type Response } from "express";
export { prisma } from "./client.ts";
import { bukuRoutes } from "./src/routes/buku.routes.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

app.use((request: Request, response: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "CRUD REST API Perpustakaan",
    data: {
      resources: ["buku"],
      endpoints: [
        "GET    /buku",
        "GET    /buku/:id",
        "POST   /buku",
        "PATCH  /buku/:id",
        "DELETE /buku/:id",
      ],
    },
  });
});

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "API berjalan", data: { status: "up" } });
});

app.use("/buku", bukuRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((error: any, _req: Request, res: Response, _next: any) => {
  console.error("Kesalahan aplikasi:", error);
  res.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };