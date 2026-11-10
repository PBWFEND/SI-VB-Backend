/**
 * Pertemuan 4 - Latihan routing dan middleware Express.js
 * Tujuan: menerapkan route parameter, query parameter, dan middleware.
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
const port = 3005;
const buku = [
  { id: 1, judul: "Belajar Node.js", tersedia: true },
  { id: 2, judul: "Dasar Express.js", tersedia: false },
];
let nextId = 3;

app.use(express.json());

// Middleware logger: mencatat waktu, method, dan URL
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// GET /buku dengan filter ?tersedia=true atau ?tersedia=false
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;
  const data = tersedia === undefined
    ? buku
    : buku.filter((item) => String(item.tersedia) === tersedia);

  response.json({ success: true, total: data.length, data });
});

// GET /buku/:id dengan 404 jika tidak ditemukan
app.get("/buku/:id", (request, response) => {
  const item = buku.find(({ id }) => id === Number(request.params.id));

  if (!item) {
    return response.status(404).json({ success: false, message: "Buku tidak ditemukan" });
  }

  return response.json({ success: true, data: item });
});

// POST /buku dengan field wajib judul dan penulis
app.post("/buku", (request, response) => {
  const { judul, penulis } = request.body ?? {};

  if (!judul || !penulis) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const baru = { id: nextId++, judul, penulis, tersedia: true };
  buku.push(baru);
  return response.status(201).json({ success: true, data: baru });
});

// Handler 404 untuk endpoint yang tidak tersedia
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// Error middleware (harus 4 parameter dan paling bawah)
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
  console.log("Uji: curl http://localhost:3005/buku?tersedia=true");
});