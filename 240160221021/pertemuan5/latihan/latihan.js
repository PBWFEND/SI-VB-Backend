/**
 * Latihan Pertemuan 5 - RESTful API Mahasiswa dengan Express.js
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

const sendSuccess = (response, statusCode, message, data) =>
  response.status(statusCode).json({ success: true, message, data });

const sendError = (response, statusCode, message, details) =>
  response.status(statusCode).json({ success: false, message, ...(details && { details }) });

// Middleware logger: mencatat method dan URL
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

const isText = (value) => typeof value === "string" && value.trim() !== "";

const validateMahasiswa = (payload, partial = false) => {
  const errors = [];

  if (!partial) {
    for (const field of ["nim", "nama", "prodi", "angkatan"]) {
      if (payload[field] === undefined) errors.push(`Field ${field} wajib diisi`);
    }
  }

  if (payload.nim !== undefined && !isText(payload.nim)) errors.push("nim harus berupa teks dan tidak boleh kosong");
  if (payload.nama !== undefined && !isText(payload.nama)) errors.push("nama harus berupa teks dan tidak boleh kosong");
  if (payload.prodi !== undefined && !isText(payload.prodi)) errors.push("prodi harus berupa teks dan tidak boleh kosong");
  if (payload.angkatan !== undefined && (!Number.isInteger(payload.angkatan) || payload.angkatan < 2000)) {
    errors.push("angkatan harus bilangan bulat minimal 2000");
  }

  return errors;
};

app.get("/", (request, response) =>
  sendSuccess(response, 200, "Latihan REST API Mahasiswa", {
    endpoints: [
      "GET /mahasiswa",
      "GET /mahasiswa/:nim",
      "POST /mahasiswa",
      "PATCH /mahasiswa/:nim",
      "DELETE /mahasiswa/:nim",
    ],
  })
);

// GET /mahasiswa dengan filter ?prodi= dan ?angkatan=
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;

  if (angkatan !== undefined && !Number.isInteger(Number(angkatan))) {
    return sendError(response, 400, "Query tidak valid", ["angkatan harus bilangan bulat"]);
  }

  const data = mahasiswa.filter((item) => {
    const cocokProdi = prodi === undefined || item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cocokAngkatan = angkatan === undefined || item.angkatan === Number(angkatan);
    return cocokProdi && cocokAngkatan;
  });

  return sendSuccess(response, 200, "Data mahasiswa berhasil diambil", { total: data.length, data });
});

// GET /mahasiswa/:nim dengan 404 jika tidak ditemukan
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) return sendError(response, 404, "Mahasiswa tidak ditemukan");
  return sendSuccess(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// POST /mahasiswa dengan validasi nim, nama, prodi, angkatan
app.post("/mahasiswa", (request, response) => {
  const payload = request.body ?? {};
  const errors = validateMahasiswa(payload);
  if (errors.length > 0) return sendError(response, 400, "Data mahasiswa tidak valid", errors);

  const { nim, nama, prodi, angkatan } = payload;
  const baru = { nim, nama, prodi, angkatan };
  mahasiswa.push(baru);
  return sendSuccess(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// PATCH /mahasiswa/:nim untuk mengubah sebagian data (nim tidak boleh diubah)
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) return sendError(response, 404, "Mahasiswa tidak ditemukan");

  const { nama, prodi, angkatan } = request.body ?? {};
  const perubahan = { nama, prodi, angkatan };

  if (Object.values(perubahan).every((value) => value === undefined)) {
    return sendError(response, 400, "Tidak ada field yang diubah", ["Kirim minimal satu dari nama, prodi, atau angkatan"]);
  }

  const errors = validateMahasiswa(perubahan, true);
  if (errors.length > 0) return sendError(response, 400, "Data perubahan tidak valid", errors);

  for (const [key, value] of Object.entries(perubahan)) {
    if (value !== undefined) item[key] = value;
  }
  return sendSuccess(response, 200, "Mahasiswa berhasil diperbarui", item);
});

// DELETE /mahasiswa/:nim, berhasil dengan status 204 tanpa body
app.delete("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(({ nim }) => nim === request.params.nim);
  if (index === -1) return sendError(response, 404, "Mahasiswa tidak ditemukan");

  mahasiswa.splice(index, 1);
  return response.status(204).send();
});

// Handler 404 (setelah semua route)
app.use((request, response) => sendError(response, 404, "Endpoint tidak ditemukan"));

// Error middleware (4 parameter, paling bawah)
app.use((error, request, response, next) => {
  if (error.type === "entity.parse.failed") {
    return sendError(response, 400, "Format JSON tidak valid");
  }
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});