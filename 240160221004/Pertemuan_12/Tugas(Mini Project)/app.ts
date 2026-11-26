import express from "express";
import authRoutes from "./src/routes/auth.routes";
import bukuRoutes from "./src/routes/buku.routes";
import pinjamanRoutes from "./src/routes/pinjaman.routes";
import { requestTracker } from "./src/middlewares/request.middleware";
import { globalErrorHandler } from "./src/middlewares/error.middleware";
import { AppError } from "./src/errors/AppError";

const app = express();
app.use(requestTracker);
app.use(express.json());
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
app.use("/auth", authRoutes);
app.use("/buku", bukuRoutes);
app.use("/pinjaman", pinjamanRoutes);
app.use((req, _res, next) => next(new AppError(`Endpoint ${req.originalUrl} tidak ditemukan`, 404)));
app.use(globalErrorHandler);
export default app;