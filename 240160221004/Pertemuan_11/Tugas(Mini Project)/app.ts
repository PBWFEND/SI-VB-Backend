import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoutes from "./src/routes/auth.routes";
import bukuRoutes from "./src/routes/buku.routes";
import pinjamanRoutes from "./src/routes/pinjaman.routes";
import { requestTracker } from "./src/middlewares/request.middleware";
import { globalErrorHandler } from "./src/middlewares/error.middleware";
import { AppError } from "./src/errors/AppError";

const app = express();

// ==========================================
// LAPISAN KEAMANAN (PERTEMUAN 11)
// ==========================================
app.use(helmet());

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Akses diblokir oleh kebijakan CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: { status: "error", message: "Terlalu banyak request. Silakan coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json({ limit: "10kb" }));

// ==========================================
// MIDDLEWARE & ROUTING (PERTEMUAN 8-10 & 12)
// ==========================================
app.use(requestTracker);

app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

app.use("/auth", authRoutes);
app.use("/buku", bukuRoutes);
app.use("/pinjaman", pinjamanRoutes);

app.use((req, res, next) => {
  next(new AppError(`Endpoint ${req.originalUrl} tidak ditemukan`, 404));
});

app.use(globalErrorHandler);

export default app;