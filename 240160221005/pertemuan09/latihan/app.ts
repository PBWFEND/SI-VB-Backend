/**
 * Pertemuan 9 — Aplikasi Express untuk authentication.
 * Tujuan: menyusun parser JSON, endpoint authentication, dan error handler.
 */

import express, { type Request, type Response } from "express";
import { authRoutes } from "./src/routes/auth.routes.ts";

const app = express();
app.disable("x-powered-by");

app.use(express.json());

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, data: { status: "up" } });
});

app.use("/auth", authRoutes);

app.use((_request: Request, response: Response) => {
  response.status(404).json({ success: false, message: "Endpoint tidak ditemukan" });
});

app.use((error: Error, _request: Request, response: Response, _next: (error?: unknown) => void) => {
  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export { app };