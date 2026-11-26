/**
 * Pertemuan 12 — Rantai middleware dan route.
 */

import express, { type Request, type Response } from "express";
import { bukuRoutes } from "./src/routes/buku.routes.ts";
import { contohRoutes } from "./src/routes/contoh.routes.ts";
import { beriRequestId, catatAkses } from "./src/middleware/request-context.middleware.ts";
import { corsTerbatas, securityHeaders } from "./src/middleware/security.middleware.ts";
import { tanganiTidakDitemukan } from "./src/middleware/not-found.middleware.ts";
import { errorHandler } from "./src/errors/error-handler.ts";

const app = express();
app.disable("x-powered-by");

app.use(beriRequestId);
app.use(catatAkses);

app.use(securityHeaders);
app.use(corsTerbatas);

app.use(express.json({ limit: "100kb" }));

app.get("/health", (_request: Request, response: Response) => {
  response.status(200).json({ success: true, data: { status: "up" } });
});

app.use("/api/buku", bukuRoutes);
app.use("/contoh", contohRoutes); // Latihan No.2 & No.4 (uji FORBIDDEN & password)

app.use(tanganiTidakDitemukan);
app.use(errorHandler);

export { app };