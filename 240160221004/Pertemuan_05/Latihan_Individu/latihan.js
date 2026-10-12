/**
 * Pertemuan 5 — Latihan Individu
 * Tujuan: middleware logger, filter query, validasi, PATCH.
 * Jalankan: node latihan.js
 * Port: 3007
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// ==========================================
// DATA AWAL
// ==========================================
const mahasiswa = [
  { nim: "240160221004", nama: "Aprilliana Fratiwi", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "230789192007", nama: "William Jakrapatr", prodi: "Sistem Informasi", angkatan: 2023 },
];

// ==========================================
// HELPER RESPONSE
// ==========================================
const responseData = (response, statusCode, message, data) =>
  response.status(statusCode).json({
    success: true,
    message,
    data,
  });

const sendError = (response, statusCode, message, details = undefined) => {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return response.status(statusCode).json(payload);
};

// ==========================================
// 1. MIDDLEWARE LOGGER
// ==========================================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ==========================================
// 3. GET /mahasiswa (dengan filter query)
// ==========================================
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;

  const data = mahasiswa.filter((item) => {
    const cocokProdi =
      prodi === undefined ||
      item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cocokAngkatan =
      angkatan === undefined || item.angkatan === Number(angkatan);
    return cocokProdi && cocokAngkatan;
  });

  return responseData(response, 200, "Data mahasiswa berhasil diambil", data);
});

// ==========================================
// 2. GET /mahasiswa/:nim (dengan 404)
// ==========================================
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) {
    return sendError(response, 404, "Mahasiswa tidak ditemukan");
  }
  return responseData(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// ==========================================
// 4. POST /mahasiswa (dengan validasi)
// ==========================================
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body;
  const errors = [];

  if (!nim) errors.push("NIM wajib diisi");
  if (!nama) errors.push("Nama wajib diisi");
  if (!prodi) errors.push("Prodi wajib diisi");
  if (!angkatan) errors.push("Angkatan wajib diisi");

  if (errors.length > 0) {
    return sendError(response, 400, "Validasi gagal", errors);
  }

  const isExist = mahasiswa.some((m) => m.nim === nim);
  if (isExist) {
    return sendError(response, 400, "NIM sudah terdaftar");
  }

  const baru = { nim, nama, prodi, angkatan: Number(angkatan) };
  mahasiswa.push(baru);

  return responseData(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// ==========================================
// 5. PATCH /mahasiswa/:nim (update sebagian)
// ==========================================
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);

  if (!item) {
    return sendError(response, 404, "Mahasiswa tidak ditemukan");
  }

  const { nama, prodi, angkatan } = request.body;
  if (nama !== undefined) item.nama = nama;
  if (prodi !== undefined) item.prodi = prodi;
  if (angkatan !== undefined) item.angkatan = Number(angkatan);

  return responseData(response, 200, "Data mahasiswa berhasil diperbarui", item);
});

// ==========================================
// 6. JALANKAN SERVER
// ==========================================
app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});