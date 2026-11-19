/**
 * ============================================================
 * Latihan Individu Pertemuan 5 — RESTful API Mahasiswa
 * ============================================================
 * Memenuhi 6 poin latihan:
 *   1. Middleware logger (method + URL + status)
 *   2. GET /mahasiswa/:nim dengan 404
 *   3. Filter GET /mahasiswa?prodi=...&angkatan=...
 *   4. POST /mahasiswa dengan validasi lengkap
 *   5. PATCH /mahasiswa/:nim untuk ubah sebagian
 *   6. DELETE /mahasiswa/:nim dengan 204
 *
 * Jalankan: node latihan.js
 * Uji: curl.exe -i http://localhost:3007/mahasiswa
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// ============================================================
// Data in-memory
// ============================================================
let mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ani Lestari", prodi: "Sistem Informasi", angkatan: 2023 },
  { nim: "F1D022003", nama: "Budi Santoso", prodi: "Teknik Informatika", angkatan: 2024 },
];

// ============================================================
// Helper response konsisten
// ============================================================
const sendSuccess = (res, statusCode, message, data = undefined) => {
  return res.status(statusCode).json({ success: true, message, ...(data && { data }) });
};

const sendError = (res, statusCode, message, details = undefined) => {
  return res
    .status(statusCode)
    .json({ success: false, message, ...(details && { details }) });
};

// ============================================================
// POIN 1 — Middleware logger
// Mencatat method, URL, dan status code setelah response selesai
// ============================================================
app.use((request, response, next) => {
  const mulai = Date.now();
  response.on("finish", () => {
    const durasi = Date.now() - mulai;
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${request.originalUrl} → ${response.statusCode} (${durasi}ms)`
    );
  });
  next();
});

// ============================================================
// POIN 3 — GET /mahasiswa (collection) + filter query
// Query yang didukung: ?prodi=... dan ?angkatan=...
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

  return sendSuccess(response, 200, "Daftar mahasiswa berhasil diambil", {
    total: data.length,
    filter: {
      prodi: prodi ?? "semua",
      angkatan: angkatan ?? "semua",
    },
    data,
  });
});

// ============================================================
// POIN 2 — GET /mahasiswa/:nim (detail) dengan 404
// ============================================================
app.get("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const item = mahasiswa.find((m) => m.nim === nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  return sendSuccess(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// ============================================================
// Validasi payload mahasiswa
// partial = true dipakai untuk PATCH (tidak semua field wajib)
// ============================================================
const validateMahasiswa = (payload, partial = false) => {
  const errors = [];
  const required = ["nim", "nama", "prodi", "angkatan"];

  // Cek field wajib hanya jika bukan partial
  if (!partial) {
    for (const field of required) {
      if (payload[field] === undefined) {
        errors.push(`Field ${field} wajib diisi`);
      }
    }
  }

  // Validasi tipe dan format
  if (payload.nim !== undefined && typeof payload.nim !== "string") {
    errors.push("nim harus berupa string");
  }
  if (payload.nama !== undefined && typeof payload.nama !== "string") {
    errors.push("nama harus berupa string");
  }
  if (
    payload.nama !== undefined &&
    typeof payload.nama === "string" &&
    payload.nama.trim().length === 0
  ) {
    errors.push("nama tidak boleh kosong");
  }
  if (payload.prodi !== undefined && typeof payload.prodi !== "string") {
    errors.push("prodi harus berupa string");
  }
  if (payload.angkatan !== undefined) {
    if (!Number.isInteger(payload.angkatan) || payload.angkatan < 1900) {
      errors.push("angkatan harus bilangan bulat minimal 1900");
    }
  }

  return errors;
};

// ============================================================
// POIN 4 — POST /mahasiswa (create) dengan validasi lengkap
// Status: 201 jika berhasil, 400 jika tidak valid, 409 jika NIM duplikat
// ============================================================
app.post("/mahasiswa", (request, response) => {
  const errors = validateMahasiswa(request.body || {});
  if (errors.length > 0) {
    return sendError(response, 400, "Data mahasiswa tidak valid", errors);
  }

  const { nim } = request.body;

  // Cek duplikat NIM (NIM berperan sebagai identitas unik)
  const sudahAda = mahasiswa.some((m) => m.nim === nim);
  if (sudahAda) {
    return sendError(response, 409, `Mahasiswa dengan NIM ${nim} sudah terdaftar`);
  }

  const baru = {
    nim: request.body.nim,
    nama: request.body.nama.trim(),
    prodi: request.body.prodi.trim(),
    angkatan: request.body.angkatan,
  };

  mahasiswa.push(baru);
  return sendSuccess(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// ============================================================
// POIN 5 — PATCH /mahasiswa/:nim (partial update)
// Status: 200 jika berhasil, 400 jika field tidak valid, 404 jika tidak ada
// ============================================================
app.patch("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const item = mahasiswa.find((m) => m.nim === nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  const errors = validateMahasiswa(request.body || {}, true);
  if (errors.length > 0) {
    return sendError(response, 400, "Data perubahan tidak valid", errors);
  }

  // Hanya field yang dikirim yang diubah. NIM tidak boleh diubah lewat PATCH.
  const { nim: _abaikan, ...perubahan } = request.body;
  Object.assign(item, perubahan);

  return sendSuccess(response, 200, "Data mahasiswa berhasil diperbarui", item);
});

// ============================================================
// BONUS — DELETE /mahasiswa/:nim
// Status: 204 jika berhasil, 404 jika tidak ada
// ============================================================
app.delete("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const index = mahasiswa.findIndex((m) => m.nim === nim);

  if (index === -1) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  mahasiswa.splice(index, 1);
  return response.status(204).send();
});

// ============================================================
// Handler 404 — endpoint yang tidak tersedia
// ============================================================
app.use((request, response) => {
  return sendError(
    response,
    404,
    `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`
  );
});

// ============================================================
// Error middleware — wajib 4 parameter
// ============================================================
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

// ============================================================
// Jalankan server
// ============================================================
const port = 3007;
app.listen(port, () => {
  console.log(`Latihan REST API Mahasiswa berjalan di http://localhost:${port}`);
});