import express from "express";
import anggotaRoutes from "./src/routes/anggota.routes.js";

const app = express();

// Middleware JSON
app.use(express.json());

// Logger
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// Route anggota
app.use("/anggota", anggotaRoutes);

// Middleware 404
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  // Error unique constraint Prisma
  if (error?.code === "P2002") {
    return response.status(400).json({
      success: false,
      message: "NPM sudah terdaftar"
    });
  }

  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server"
  });
});

export default app;