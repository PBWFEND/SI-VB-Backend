
import express from "express";

const app = express();

// Middleware untuk membaca JSON
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Data buku sementara
let buku = [
  { id: 1, judul: "Laskar Pelangi", penulis: "Andrea Hirata", tersedia: true },
  { id: 2, judul: "Bumi", penulis: "Tere Liye", tersedia: false },
  { id: 3, judul: "Laut Bercerita", penulis: "Leila S. Chudori", tersedia: true }
];

// GET daftar buku + filter query
app.get("/buku", (req, res) => {
  let hasil = buku;

  if (req.query.tersedia === "true") {
    hasil = buku.filter((item) => item.tersedia === true);
  } else if (req.query.tersedia === "false") {
    hasil = buku.filter((item) => item.tersedia === false);
  }

  res.status(200).json({
    pesan: "Daftar buku berhasil diambil",
    data: hasil
  });
});

// GET detail buku berdasarkan ID
app.get("/buku/:id", (req, res) => {
  const id = Number(req.params.id);
  const hasil = buku.find((item) => item.id === id);

  if (!hasil) {
    return res.status(404).json({
      pesan: "Buku tidak ditemukan"
    });
  }

  res.status(200).json({
    pesan: "Detail buku berhasil diambil",
    data: hasil
  });
});

// POST tambah buku
app.post("/buku", (req, res) => {
  const { judul, penulis } = req.body;

  if (!judul || !penulis) {
    return res.status(400).json({
      pesan: "Judul dan penulis wajib diisi"
    });
  }

  const bukuBaru = {
    id: buku.length
      ? Math.max(...buku.map((item) => item.id)) + 1
      : 1,
    judul,
    penulis,
    tersedia: true
  };

  buku.push(bukuBaru);

  res.status(201).json({
    pesan: "Buku berhasil ditambahkan",
    data: bukuBaru
  });
});

// Halaman utama
app.get("/", (req, res) => {
  res.status(200).json({
    pesan: "API Perpustakaan Express.js aktif"
  });
});

// 404 jika endpoint tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    pesan: "Endpoint tidak ditemukan"
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    pesan: "Terjadi kesalahan pada server"
  });
});

export default app;
