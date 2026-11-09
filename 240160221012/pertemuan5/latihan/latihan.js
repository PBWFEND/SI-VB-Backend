/**
 * Pertemuan 5 — latihan desain RESTful API
 * Resource: mahasiswa
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ani Lestari", prodi: "Sistem Informasi", angkatan: 2023 },
];

const responseData = (response, statusCode, message, data) =>
  response.status(statusCode).json({ success: true, message, data });

const responseError = (response, statusCode, message, details = undefined) =>
  response.status(statusCode).json({ success: false, message, ...(details && { details }) });

// Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// GET list + filter
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;
  const data = mahasiswa.filter((item) => {
    const cocokProdi = prodi === undefined || item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cocokAngkatan = angkatan === undefined || item.angkatan === Number(angkatan);
    return cocokProdi && cocokAngkatan;
  });
  return responseData(response, 200, "Data mahasiswa berhasil diambil", data);
});

// GET detail
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) return responseError(response, 404, "Mahasiswa tidak ditemukan");
  return responseData(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// Validasi payload
const validateMahasiswa = (payload, partial = false) => {
  const errors = [];
  const required = ["nim", "nama", "prodi", "angkatan"];

  if (!partial) {
    for (const field of required) {
      if (payload[field] === undefined) errors.push(`Field ${field} wajib diisi`);
    }
  }

  if (payload.nim !== undefined && typeof payload.nim !== "string") errors.push("nim harus string");
  if (payload.nama !== undefined && typeof payload.nama !== "string") errors.push("nama harus string");
  if (payload.prodi !== undefined && typeof payload.prodi !== "string") errors.push("prodi harus string");
  if (payload.angkatan !== undefined && (!Number.isInteger(payload.angkatan) || payload.angkatan < 1900)) {
    errors.push("angkatan tidak valid");
  }

  return errors;
};

// POST — TAMBAH MAHASISWA (inilah yang selama ini hilang)
app.post("/mahasiswa", (request, response) => {
  const errors = validateMahasiswa(request.body);
  if (errors.length > 0) return responseError(response, 400, "Data mahasiswa tidak valid", errors);

  if (mahasiswa.some((m) => m.nim === request.body.nim)) {
    return responseError(response, 400, "NIM sudah terdaftar");
  }

  const baru = { ...request.body };
  mahasiswa.push(baru);
  return responseData(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// PATCH — ubah sebagian
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) return responseError(response, 404, "Mahasiswa tidak ditemukan");

  const errors = validateMahasiswa(request.body, true);
  if (errors.length > 0) return responseError(response, 400, "Data perubahan tidak valid", errors);

  Object.assign(item, request.body);
  return responseData(response, 200, "Mahasiswa berhasil diperbarui", item);
});

// DELETE
app.delete("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(({ nim }) => nim === request.params.nim);
  if (index === -1) return responseError(response, 404, "Mahasiswa tidak ditemukan");

  mahasiswa.splice(index, 1);
  return response.status(204).send();
});

// 404 catch-all (paling bawah)
app.use((request, response) => responseError(response, 404, "Endpoint tidak ditemukan"));

// Error handler
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return responseError(response, 500, "Terjadi kesalahan pada server");
});

app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});
