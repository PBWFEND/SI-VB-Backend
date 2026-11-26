import express, { type Request, type Response } from "express";
import { bukuRoutes } from "./src/routes/buku.routes.ts";
import {
  beriRequestId,
  corsTerbatas,
  pembatasiRequest,
  securityHeaders,
  type RequestBerId,
} from "./src/middleware/security.middleware.ts";

const app = express();
app.disable("x-powered-by");

app.use(beriRequestId);
app.use(securityHeaders);
app.use(corsTerbatas);
app.use(pembatasiRequest);
app.use(express.json({ limit: "100kb" }));

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, data: { status: "up" } });
});

app.use("/api/buku", bukuRoutes);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((error: Error, request: Request, response: Response, _next: (error?: unknown) => void) => {
  const id = (request as RequestBerId).requestId ?? "-";
  const tipeError = (error as Error & { type?: string }).type;
  if (tipeError === "entity.parse.failed") {
    response.status(400).json({ success: false, message: "Body JSON tidak valid" });
    return;
  }
  if (tipeError === "entity.too.large") {
    response.status(413).json({ success: false, message: "Ukuran body melebihi batas" });
    return;
  }

  console.error(`[${id}] Kesalahan aplikasi:`, error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };