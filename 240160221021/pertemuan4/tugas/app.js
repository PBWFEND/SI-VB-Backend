/**
 * Tugas 2 - REST Endpoint dengan Express.js
 * Resource: buku perpustakaan.
 * File ini hanya membuat aplikasi; port dibuka di server.js.
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

// Data sementara di memori
const buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5 },
];
let nextId = 4;

// Middleware: parser JSON (harus sebelum route POST)
app.use(express.json());

// Middleware: logger
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// GET / : informasi API
app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "API Buku Perpustakaan dengan Express.js",
    endpoints: ["GET /", "GET /buku", "GET /buku/:id", "POST /buku"],
  });
});

// GET /buku : daftar buku, filter ?tersedia=true atau ?tersedia=false
app.get("/buku", (request, response) => {
  const { tersedia } = request.query;
  const data = tersedia === undefined
    ? buku
    : buku.filter((item) => String(item.stok > 0) === tersedia);

  response.status(200).json({ success: true, total: data.length, data });
});

// GET /buku/:id : detail satu buku
app.get("/buku/:id", (request, response) => {
  const item = buku.find(({ id }) => id === Number(request.params.id));

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${request.params.id} tidak ditemukan`,
    });
  }

  return response.status(200).json({ success: true, data: item });
});

// POST /buku : tambah buku baru (judul dan penulis wajib)
app.post("/buku", (request, response) => {
  const { judul, penulis, tahun, stok } = request.body ?? {};

  if (!judul || !penulis) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const baru = {
    id: nextId++,
    judul,
    penulis,
    tahun: tahun ?? new Date().getFullYear(),
    stok: stok ?? 0,
  };
  buku.push(baru);
  return response.status(201).json({ success: true, data: baru });
});

// GET /uji-error : sengaja memicu error untuk menguji error middleware
app.get("/uji-error", () => {
  throw new Error("Error buatan untuk pengujian");
});

// Handler 404 (setelah semua route yang valid)
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// Error middleware (4 parameter, paling bawah)
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  response.status(500).json({ success: false, message: "Terjadi kesalahan pada server" });
});

export default app;