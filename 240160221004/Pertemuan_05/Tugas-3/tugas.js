/**
 * Tugas 3 — Perancangan dan Implementasi RESTful API
 * Resource: Mahasiswa
 * Port: 3008
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

let mahasiswa = [
  { nim: "240160221004", nama: "Aprilliana Fratiwi", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "239023109087", nama: "El Putra Sarira", prodi: "Sistem Informasi", angkatan: 2023 },
];

const sendSuccess = (res, code, msg, data = null) => {
  const payload = { success: true, message: msg };
  if (data) payload.data = data;
  return res.status(code).json(payload);
};

const sendError = (res, code, msg, details = undefined) => {
  const payload = { success: false, message: msg };
  if (details) payload.details = details;
  return res.status(code).json(payload);
};

// Middleware logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 1. GET /mahasiswa (Collection + Filter)
app.get("/mahasiswa", (req, res) => {
  const { prodi, angkatan, nama } = req.query;
  const data = mahasiswa.filter((item) => {
    const cProdi = prodi === undefined || item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cAngkatan = angkatan === undefined || item.angkatan === Number(angkatan);
    const cNama = nama === undefined || item.nama.toLowerCase().includes(String(nama).toLowerCase());
    return cProdi && cAngkatan && cNama;
  });
  return sendSuccess(res, 200, "Daftar mahasiswa berhasil diambil", { total: data.length, data });
});

// 2. GET /mahasiswa/:nim (Detail)
app.get("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(({ nim }) => nim === req.params.nim);
  if (!item) return sendError(res, 404, "Mahasiswa tidak ditemukan");
  return sendSuccess(res, 200, "Detail mahasiswa berhasil diambil", item);
});

// 3. POST /mahasiswa (Create)
app.post("/mahasiswa", (req, res) => {
  const { nim, nama, prodi, angkatan } = req.body;
  const errors = [];
  if (!nim) errors.push("NIM wajib diisi");
  if (!nama) errors.push("Nama wajib diisi");
  if (!prodi) errors.push("Prodi wajib diisi");
  if (!angkatan) errors.push("Angkatan wajib diisi");
  if (errors.length > 0) return sendError(res, 400, "Validasi gagal", errors);
  if (mahasiswa.some((m) => m.nim === nim)) return sendError(res, 400, "NIM sudah terdaftar");
  const baru = { nim, nama, prodi, angkatan: Number(angkatan) };
  mahasiswa.push(baru);
  return sendSuccess(res, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// 4. PUT /mahasiswa/:nim (Full Update)
app.put("/mahasiswa/:nim", (req, res) => {
  const idx = mahasiswa.findIndex(({ nim }) => nim === req.params.nim);
  if (idx === -1) return sendError(res, 404, "Mahasiswa tidak ditemukan");
  const { nama, prodi, angkatan } = req.body;
  const errors = [];
  if (!nama) errors.push("Nama wajib diisi");
  if (!prodi) errors.push("Prodi wajib diisi");
  if (!angkatan) errors.push("Angkatan wajib diisi");
  if (errors.length > 0) return sendError(res, 400, "Validasi gagal", errors);
  mahasiswa[idx] = { nim: req.params.nim, nama, prodi, angkatan: Number(angkatan) };
  return sendSuccess(res, 200, "Data mahasiswa berhasil diganti", mahasiswa[idx]);
});

// 5. PATCH /mahasiswa/:nim (Partial Update)
app.patch("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(({ nim }) => nim === req.params.nim);
  if (!item) return sendError(res, 404, "Mahasiswa tidak ditemukan");
  const { nama, prodi, angkatan } = req.body;
  if (nama !== undefined) item.nama = nama;
  if (prodi !== undefined) item.prodi = prodi;
  if (angkatan !== undefined) item.angkatan = Number(angkatan);
  return sendSuccess(res, 200, "Data mahasiswa berhasil diperbarui", item);
});

// 6. DELETE /mahasiswa/:nim (Delete + 204)
app.delete("/mahasiswa/:nim", (req, res) => {
  const idx = mahasiswa.findIndex(({ nim }) => nim === req.params.nim);
  if (idx === -1) return sendError(res, 404, "Mahasiswa tidak ditemukan");
  mahasiswa.splice(idx, 1);
  return res.status(204).send();
});

// 404 & 500
app.use((req, res) => sendError(res, 404, "Endpoint tidak ditemukan"));
app.use((err, req, res, next) => {
  console.error(err.message);
  return sendError(res, 500, "Terjadi kesalahan pada server");
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Tugas 3 REST API berjalan di http://localhost:${PORT}`);
});