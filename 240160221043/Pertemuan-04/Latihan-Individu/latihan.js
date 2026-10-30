
import express from "express";

const app = express();
const PORT = 3005;

// Middleware untuk membaca JSON
app.use(express.json());

// Route halaman utama
app.get("/", (req, res) => {
  res.status(200).json({
    pesan: "Server latihan Express.js berhasil dijalankan"
  });
});

// Route untuk mengecek status server
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK"
  });
});

// Route dengan parameter
app.get("/halo/:nama", (req, res) => {
  res.status(200).json({
    pesan: `Halo, ${req.params.nama}!`
  });
});

// Route dengan query parameter
app.get("/cari", (req, res) => {
  res.status(200).json({
    kataKunci: req.query.q || ""
  });
});

// Menjalankan server latihan
app.listen(PORT, () => {
  console.log(`Server latihan berjalan di http://localhost:${PORT}`);
});
