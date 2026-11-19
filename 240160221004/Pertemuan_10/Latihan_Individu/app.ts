/**
 * Pertemuan 10 — Aplikasi Express untuk JWT dan authorization.
 */
import express, { type Request, type Response } from "express";
import { authRoutes } from "./src/routes/auth.routes.ts";
import { protectedRoutes } from "./src/routes/protected.routes.ts";

const app = express();
app.disable("x-powered-by");

app.use(express.json({ limit: "100kb" }));

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, data: { status: "up" } });
});

app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((error: Error, _request: Request, response: Response, _next: (error?: unknown) => void) => {
  const tipeError = (error as Error & { type?: string }).type;
  if (tipeError === "entity.parse.failed") {
    response.status(400).json({ success: false, message: "Body JSON tidak valid" });
    return;
  }
  if (tipeError === "entity.too.large") {
    response.status(413).json({ success: false, message: "Ukuran body melebihi batas" });
    return;
  }

  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };