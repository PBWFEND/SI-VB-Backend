/**
 * Pertemuan 4 — Latihan routing dan middleware Express.js
 * Tujuan: menerapkan route parameter, query parameter, middleware, dan POST.
 * Jalankan: node latihan.js
 *
 * Uji dengan curl:
 *   curl -i http://localhost:3005/buku
 *   curl -i "http://localhost:3005/buku?tersedia=true"
 *   curl -i "http://localhost:3005/buku?tersedia=false"
 *   curl -i http://localhost:3005/buku/1
 *   curl -i http://localhost:3005/buku/99
 *   curl -i -X POST http://localhost:3005/buku \
 *     -H "Content-Type: application/json" \
 *     -d "{\"judul\":\"Clean Code\",\"penulis\":\"Robert Martin\",\"tersedia\":true}"
 *   curl -i http://localhost:3005/tidak-ada
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

const port = 3005;

// Data in-memory
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tersedia: true },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tersedia: false },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tersedia: true },
];
let nextId = 4;

// ============================================================
// 1. Middleware: parse JSON body
// ============================================================
app.use(express.json());

// ============================================================
// 2. Middleware Logger — mencatat waktu, method, dan URL
// ============================================================
app.use((request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.originalUrl}`);
  next();
});

// ============================================================
// GET /buku — Semua buku, dengan query ?tersedia=true|false
// ============================================================
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  // Filter hanya jika query tersedia dikirimkan
  const data =
    tersedia === undefined
      ? buku
      : buku.filter((item) => String(item.tersedia) === tersedia);

  response.json({ success: true, total: data.length, data });
});

// ============================================================
// GET /buku/:id — Satu buku berdasarkan id, 404 jika tidak ada
// ============================================================
app.get("/buku/:id", (request, response) => {
  const item = buku.find(({ id }) => id === Number(request.params.id));

  if (!item) {
    return response
      .status(404)
      .json({ success: false, message: "Buku tidak ditemukan" });
  }

  return response.json({ success: true, data: item });
});

// ============================================================
// POST /buku — Tambah buku baru; wajib: judul dan penulis
// ============================================================
app.post("/buku", (request, response) => {
  const { judul, penulis, tersedia = true } = request.body ?? {};

  // Validasi field wajib
  if (!judul || !penulis) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const baru = { id: nextId++, judul, penulis, tersedia: Boolean(tersedia) };
  buku.push(baru);

  return response.status(201).json({ success: true, data: baru });
});

// ============================================================
// 404 Handler — endpoint yang tidak tersedia
// ============================================================
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// ============================================================
// Error handler global
// ============================================================
app.use((error, request, response, _next) => {
  console.error("Kesalahan aplikasi:", error.message);
  response
    .status(500)
    .json({ success: false, message: "Terjadi kesalahan pada server" });
});

app.listen(port, () => {
  console.log(`Latihan berjalan di http://localhost:${port}`);
  console.log("Tersedia endpoint:");
  console.log("  GET  /buku");
  console.log("  GET  /buku?tersedia=true|false");
  console.log("  GET  /buku/:id");
  console.log("  POST /buku  { judul, penulis, tersedia? }");
});
