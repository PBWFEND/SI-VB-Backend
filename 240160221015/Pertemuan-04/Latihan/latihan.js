/**
 * ============================================================
 * Pertemuan 4 — Latihan Individu Express.js Dasar
 * ============================================================
 * Memenuhi 6 poin latihan:
 *   1. Middleware logger (waktu, method, URL)
 *   2. GET /buku/:id dengan 404
 *   3. Query ?tersedia=true|false untuk filter
 *   4. POST /buku dengan field wajib judul & penulis
 *   5. Handler 404 untuk endpoint tidak tersedia
 *   6. Diuji dengan curl (hasil dicatat di README)
 *
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

// ============================================================
// POIN 1 — Middleware logger
// Mencatat waktu, method, dan URL setiap request masuk
// ============================================================
app.use((request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`[${waktu}] ${request.method} ${request.originalUrl}`);
  next();
});

// Middleware JSON parser (wajib sebelum route POST yang membaca body)
app.use(express.json());

// ============================================================
// Data in-memory
// ============================================================
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tersedia: true },
  { id: 2, judul: "Dasar Express.js", penulis: "Budi", tersedia: false },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tersedia: true },
];
let nextId = 4;

// ============================================================
// GET /buku — daftar buku + filter ?tersedia=true|false
// POIN 3
// ============================================================
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;

  // Jika query tidak ada → tampilkan semua
  // Jika ada → filter berdasarkan nilai string "true"/"false"
  const data =
    tersedia === undefined
      ? buku
      : buku.filter((item) => String(item.tersedia) === tersedia);

  return response.status(200).json({
    success: true,
    filter: { tersedia: tersedia ?? "semua" },
    total: data.length,
    data,
  });
});

// ============================================================
// GET /buku/:id — detail buku berdasarkan id
// POIN 2 — 404 jika tidak ditemukan
// ============================================================
app.get("/buku/:id", (request, response) => {
  const { id } = request.params;
  const item = buku.find((b) => b.id === Number(id));

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${id} tidak ditemukan`,
    });
  }

  return response.status(200).json({ success: true, data: item });
});

// ============================================================
// POST /buku — tambah buku baru
// POIN 4 — validasi field wajib judul & penulis
// ============================================================
app.post("/buku", (request, response) => {
  const { judul, penulis, tersedia = true } = request.body || {};

  // Validasi: field wajib
  if (!judul || !penulis) {
    return response.status(400).json({
      success: false,
      message: "Field 'judul' dan 'penulis' wajib diisi",
    });
  }

  // Validasi tambahan: judul & penulis harus string non-kosong
  if (typeof judul !== "string" || typeof penulis !== "string") {
    return response.status(400).json({
      success: false,
      message: "Field 'judul' dan 'penulis' harus berupa teks",
    });
  }

  const baru = {
    id: nextId++,
    judul: judul.trim(),
    penulis: penulis.trim(),
    tersedia: Boolean(tersedia),
  };
  buku.push(baru);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: baru,
  });
});

// ============================================================
// POIN 5 — Handler 404 untuk endpoint yang tidak tersedia
// Diletakkan SETELAH semua route valid
// ============================================================
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// ============================================================
// Error middleware — wajib 4 parameter
// Menangkap error tak terduga (misal body JSON rusak)
// ============================================================
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

// ============================================================
// Jalankan server
// ============================================================
const port = 3005;
app.listen(port, () => {
  console.log(`Latihan Express berjalan di http://localhost:${port}`);
  console.log("Uji cepat: curl.exe -i http://localhost:3005/buku");
});