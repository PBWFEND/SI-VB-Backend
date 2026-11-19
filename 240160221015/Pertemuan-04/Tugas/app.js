/**
 * ============================================================
 * Tugas 2 — REST Endpoint Express.js (E-Warung Kampus)
 * ============================================================
 * Bertanggung jawab menyusun aplikasi Express: middleware, routing,
 * handler 404, dan error middleware.
 * Dipisahkan dari server.js agar mudah diuji.
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

// ============================================================
// Data in-memory (lanjutan dari Tugas 1 domain e-warung)
// ============================================================
let menu = [
  { id: 1, nama: "Nasi Goreng Spesial", harga: 15000, kategori: "Makanan", stok: 20 },
  { id: 2, nama: "Mie Ayam", harga: 12000, kategori: "Makanan", stok: 15 },
  { id: 3, nama: "Es Teh Manis", harga: 5000, kategori: "Minuman", stok: 50 },
];
let nextId = 4;

// ============================================================
// MIDDLEWARE
// ============================================================

// 1. Logger — mencatat waktu, method, dan URL
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );
  next();
});

// 2. JSON Parser — wajib sebelum route POST yang membaca request.body
app.use(express.json());

// ============================================================
// ROUTING — minimal 4 endpoint
// ============================================================

// Endpoint 1: GET /menu — daftar menu + filter kategori via query
app.get("/menu", (request, response) => {
  const { kategori } = request.query;

  const data = kategori
    ? menu.filter((item) => item.kategori.toLowerCase() === kategori.toLowerCase())
    : menu;

  return response.status(200).json({
    success: true,
    filter: { kategori: kategori ?? "semua" },
    total: data.length,
    data,
  });
});

// Endpoint 2: GET /menu/:id — detail menu (route parameter)
app.get("/menu/:id", (request, response) => {
  const { id } = request.params;
  const item = menu.find((m) => m.id === Number(id));

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Menu dengan id ${id} tidak ditemukan`,
    });
  }

  return response.status(200).json({ success: true, data: item });
});

// Endpoint 3: POST /menu — tambah menu baru (validasi field wajib)
app.post("/menu", (request, response) => {
  const { nama, harga, kategori, stok = 0 } = request.body || {};

  // Validasi field wajib
  if (!nama || harga === undefined || !kategori) {
    return response.status(400).json({
      success: false,
      message: "Field 'nama', 'harga', dan 'kategori' wajib diisi",
    });
  }

  // Validasi tipe data
  if (typeof nama !== "string" || typeof kategori !== "string") {
    return response.status(400).json({
      success: false,
      message: "Field 'nama' dan 'kategori' harus berupa teks",
    });
  }

  if (typeof harga !== "number" || harga <= 0) {
    return response.status(400).json({
      success: false,
      message: "Field 'harga' harus berupa angka positif",
    });
  }

  const baru = {
    id: nextId++,
    nama: nama.trim(),
    harga,
    kategori: kategori.trim(),
    stok: Number(stok),
  };

  menu.push(baru);

  return response.status(201).json({
    success: true,
    message: "Menu berhasil ditambahkan",
    data: baru,
  });
});

// Endpoint 4: PATCH /menu/:id — ubah stok saja (bonus, opsional)
app.patch("/menu/:id", (request, response) => {
  const { id } = request.params;
  const { stok } = request.body || {};
  const item = menu.find((m) => m.id === Number(id));

  if (!item) {
    return response.status(404).json({
      success: false,
      message: `Menu dengan id ${id} tidak ditemukan`,
    });
  }

  if (stok === undefined) {
    return response.status(400).json({
      success: false,
      message: "Field 'stok' wajib diisi",
    });
  }

  item.stok = Number(stok);

  return response.status(200).json({
    success: true,
    message: "Stok berhasil diperbarui",
    data: item,
  });
});

// ============================================================
// HANDLER 404 — diletakkan setelah semua route valid
// ============================================================
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// ============================================================
// ERROR MIDDLEWARE — wajib 4 parameter, paling akhir
// ============================================================
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

export default app;