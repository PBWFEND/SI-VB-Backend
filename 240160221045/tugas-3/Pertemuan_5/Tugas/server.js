import express from "express";
import mahasiswaRoutes from "./app.js";

const app = express();
const PORT = 3008;

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Route REST API
app.use("/", mahasiswaRoutes);

// Route jika endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`REST API Tugas 3 berjalan di http://localhost:${PORT}`);
});