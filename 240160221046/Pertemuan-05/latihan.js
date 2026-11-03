/**
 * Pertemuan 5 — Latihan desain RESTful API: resource mahasiswa
 * Tujuan: menerapkan resource, filter query, status code, dan response JSON.
 *
 * Jalankan:
 *   node latihan.js
 *
 * Uji dengan PowerShell:
 *   # GET semua
 *   curl.exe -i http://localhost:3007/mahasiswa
 *   # Filter prodi
 *   curl.exe -i "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
 *   # Detail
 *   curl.exe -i http://localhost:3007/mahasiswa/F1D022001
 *   # Tidak ada
 *   curl.exe -i http://localhost:3007/mahasiswa/F9999999
 *   # POST
 *   Invoke-RestMethod -Method POST -Uri http://localhost:3007/mahasiswa -ContentType "application/json" -Body '{"nim":"F1D022003","nama":"Budi Santoso","prodi":"Teknik Informatika","angkatan":2024}'
 *   # POST validasi gagal
 *   Invoke-RestMethod -Method POST -Uri http://localhost:3007/mahasiswa -ContentType "application/json" -Body '{"nama":"Tanpa NIM"}'
 *   # PATCH
 *   Invoke-RestMethod -Method PATCH -Uri http://localhost:3007/mahasiswa/F1D022001 -ContentType "application/json" -Body '{"angkatan":2025}'
 *   # PATCH NIM tidak ada
 *   Invoke-RestMethod -Method PATCH -Uri http://localhost:3007/mahasiswa/F9999999 -ContentType "application/json" -Body '{"angkatan":2025}'
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const PORT = 3007;

// ---------- Data in-memory ----------
let mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ani Lestari", prodi: "Sistem Informasi", angkatan: 2023 },
  { nim: "F1D022003", nama: "Budi Santoso", prodi: "Teknik Informatika", angkatan: 2024 },
];

// ---------- Helpers ----------
const sendSuccess = (res, statusCode, message, data) =>
  res.status(statusCode).json({ success: true, message, data });

const sendError = (res, statusCode, message, details = undefined) =>
  res.status(statusCode).json({ success: false, message, ...(details && { details }) });

// ============================================================
// 1. Middleware Logger — mencatat method dan URL setiap request
// ============================================================
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// ============================================================
// GET /mahasiswa — Semua mahasiswa, dengan filter query
//   ?prodi=Sistem%20Informasi
//   ?angkatan=2024
//   ?prodi=...&angkatan=...
// ============================================================
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

  return sendSuccess(response, 200, "Data mahasiswa berhasil diambil", {
    total: data.length,
    data,
  });
});

// ============================================================
// GET /mahasiswa/:nim — Detail satu mahasiswa; 404 jika tidak ada
// ============================================================
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${request.params.nim} tidak ditemukan`);
  }

  return sendSuccess(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// ============================================================
// POST /mahasiswa — Tambah mahasiswa baru
//   Wajib: nim, nama, prodi, angkatan
// ============================================================
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body ?? {};

  // Validasi field wajib
  const errors = [];
  if (!nim) errors.push("Field nim wajib diisi");
  if (!nama) errors.push("Field nama wajib diisi");
  if (!prodi) errors.push("Field prodi wajib diisi");
  if (angkatan === undefined || angkatan === null) errors.push("Field angkatan wajib diisi");
  if (errors.length > 0) {
    return sendError(response, 400, "Data mahasiswa tidak valid", errors);
  }

  // Cek duplikat NIM
  const sudahAda = mahasiswa.find((m) => m.nim === nim);
  if (sudahAda) {
    return sendError(response, 400, `NIM ${nim} sudah terdaftar`);
  }

  const baru = { nim, nama, prodi, angkatan: Number(angkatan) };
  mahasiswa.push(baru);

  return sendSuccess(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// ============================================================
// PATCH /mahasiswa/:nim — Ubah sebagian data mahasiswa
// ============================================================
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${request.params.nim} tidak ditemukan`);
  }

  // Tolak perubahan nim (primary key tidak boleh diubah via PATCH)
  const { nim: _, ...perubahan } = request.body ?? {};

  if (Object.keys(perubahan).length === 0) {
    return sendError(response, 400, "Tidak ada data yang dikirimkan untuk diubah");
  }

  Object.assign(item, perubahan);

  return sendSuccess(response, 200, "Data mahasiswa berhasil diperbarui", item);
});

// ============================================================
// 404 Handler — endpoint yang tidak tersedia
// ============================================================
app.use((request, response) => {
  return sendError(
    response,
    404,
    `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`
  );
});

// ============================================================
// Error handler global
// ============================================================
app.use((error, request, response, _next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

app.listen(PORT, () => {
  console.log(`Latihan REST API mahasiswa berjalan di http://localhost:${PORT}`);
  console.log("Endpoint:");
  console.log("  GET    /mahasiswa");
  console.log("  GET    /mahasiswa?prodi=...&angkatan=...");
  console.log("  GET    /mahasiswa/:nim");
  console.log("  POST   /mahasiswa  { nim, nama, prodi, angkatan }");
  console.log("  PATCH  /mahasiswa/:nim  { field yang ingin diubah }");
});
