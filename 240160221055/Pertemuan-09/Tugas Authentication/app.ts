import express from "express";
import bukuRoutes from "./src/routes/buku.routes.js";
import penggunaRoutes from "./src/routes/pengguna.routes.js";
import pinjamanRoutes from "./src/routes/pinjaman.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import {
  notFoundHandler,
  errorHandler,
} from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server berjalan dengan baik",
  });
});

// Authentication
app.use("/auth", authRoutes);

// Resource routes
app.use("/buku", bukuRoutes);
app.use("/pengguna", penggunaRoutes);
app.use("/pinjaman", pinjamanRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;