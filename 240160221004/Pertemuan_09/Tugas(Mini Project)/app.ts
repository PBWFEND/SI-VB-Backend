import express from "express";
import authRoutes from "./src/routes/auth.routes";
import bukuRoutes from "./src/routes/buku.routes";
import pinjamanRoutes from "./src/routes/pinjaman.routes";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/buku", bukuRoutes);
app.use("/pinjaman", pinjamanRoutes);

app.use((_req, res) => res.status(404).json({ message: "Endpoint tidak ditemukan" }));

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("[ERROR]", err);
  res.status(500).json({ message: "Terjadi kesalahan pada server", error: err.message });
});

export default app;