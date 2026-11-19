/**
 * ============================================================
 * Pertemuan 5 — Latihan Individu: RESTful API resource mahasiswa
 * ============================================================
 * Menerapkan:
 *   1. Middleware logger (method + URL)
 *   2. GET /mahasiswa/:nim + 404 jika tidak ditemukan
 *   3. Filter GET /mahasiswa?prodi=...
 *   4. POST /mahasiswa dengan validasi nim, nama, prodi, angkatan
 *   5. PATCH /mahasiswa/:nim untuk partial update
 *   6. Uji status code 200, 201, 400, 404, 204
 *
 * Jalankan:
 *   node latihan.js
 *   PORT=3007 node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

// ---------- Middleware global ----------
app.use(express.json());

// 1. Logger: method + URL (+ waktu)
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

// ---------- Data in-memory ----------
const mahasiswa = [
  { nim: "F1D022001", nama: "Zhian Maulana", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ilyas Nuryandra", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022003", nama: "Rendi Fergian", prodi: "Sistem Informasi", angkatan: 2024 },
];

// ---------- Helper response konsisten ----------
const sendSuccess = (response, statusCode, message, data = undefined) => {
  const payload = { success: true, message };
  if (data !== undefined) payload.data = data;
  return response.status(statusCode).json(payload);
};

const sendError = (response, statusCode, message, details = undefined) => {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return response.status(statusCode).json(payload);
};

// ---------- Validasi ----------
// partial=true → hanya cek field yang dikirim (untuk PATCH)
const validateMahasiswa = (payload, partial = false) => {
  const errors = [];

  // Field wajib (hanya jika bukan partial)
  if (!partial) {
    const required = ["nim", "nama", "prodi", "angkatan"];
    for (const field of required) {
      if (payload[field] === undefined) errors.push(`Field ${field} wajib diisi`);
    }
  }

  if (payload.nim !== undefined) {
    if (typeof payload.nim !== "string" || payload.nim.trim() === "") {
      errors.push("nim harus string non-kosong");
    }
  }

  if (payload.nama !== undefined) {
    if (typeof payload.nama !== "string" || payload.nama.trim() === "") {
      errors.push("nama harus string non-kosong");
    }
  }

  if (payload.prodi !== undefined) {
    if (typeof payload.prodi !== "string" || payload.prodi.trim() === "") {
      errors.push("prodi harus string non-kosong");
    }
  }

  if (payload.angkatan !== undefined) {
    if (!Number.isInteger(payload.angkatan) || payload.angkatan < 2000 || payload.angkatan > 2100) {
      errors.push("angkatan harus bilangan bulat antara 2000 dan 2100");
    }
  }

  return errors;
};

// ============================================================
// ROUTES
// ============================================================

// GET /mahasiswa — daftar + filter ?prodi=&angkatan=
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;
  let data = [...mahasiswa];

  if (prodi !== undefined) {
    if (typeof prodi !== "string" || prodi.trim() === "") {
      return sendError(response, 400, "Query 'prodi' harus teks non-kosong");
    }
    const cari = prodi.toLowerCase();
    data = data.filter((m) => m.prodi.toLowerCase().includes(cari));
  }

  if (angkatan !== undefined) {
    const angka = Number(angkatan);
    if (Number.isNaN(angka)) {
      return sendError(response, 400, "Query 'angkatan' harus berupa angka");
    }
    data = data.filter((m) => m.angkatan === angka);
  }

  return sendSuccess(response, 200, "Data mahasiswa berhasil diambil", {
    total: data.length,
    filter: { prodi, angkatan },
    data,
  });
});

// GET /mahasiswa/:nim — detail + 404
app.get("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const item = mahasiswa.find((m) => m.nim === nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  return sendSuccess(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// POST /mahasiswa — tambah + validasi
app.post("/mahasiswa", (request, response) => {
  const errors = validateMahasiswa(request.body ?? {});
  if (errors.length > 0) {
    return sendError(response, 400, "Data mahasiswa tidak valid", errors);
  }

  const { nim, nama, prodi, angkatan } = request.body;

  // Cek duplikat NIM
  if (mahasiswa.some((m) => m.nim === nim)) {
    return sendError(response, 400, `NIM ${nim} sudah terdaftar`);
  }

  const baru = {
    nim: nim.trim(),
    nama: nama.trim(),
    prodi: prodi.trim(),
    angkatan,
  };
  mahasiswa.push(baru);

  return sendSuccess(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// PATCH /mahasiswa/:nim — partial update
app.patch("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const item = mahasiswa.find((m) => m.nim === nim);

  if (!item) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  const errors = validateMahasiswa(request.body ?? {}, true);
  if (errors.length > 0) {
    return sendError(response, 400, "Data perubahan tidak valid", errors);
  }

  // Jangan izinkan perubahan NIM lewat PATCH (NIM = identifier)
  const { nim: nimBaru, ...changes } = request.body ?? {};
  if (nimBaru !== undefined) {
    return sendError(response, 400, "Field 'nim' tidak dapat diubah lewat PATCH");
  }

  // Trim string fields
  if (changes.nama !== undefined) changes.nama = changes.nama.trim();
  if (changes.prodi !== undefined) changes.prodi = changes.prodi.trim();

  Object.assign(item, changes);
  return sendSuccess(response, 200, "Data mahasiswa berhasil diperbarui", item);
});

// DELETE /mahasiswa/:nim — hapus + 204
app.delete("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;
  const index = mahasiswa.findIndex((m) => m.nim === nim);

  if (index === -1) {
    return sendError(response, 404, `Mahasiswa dengan NIM ${nim} tidak ditemukan`);
  }

  mahasiswa.splice(index, 1);
  // 204 = sukses tanpa body
  return response.status(204).send();
});

// ---------- 404 fallback ----------
app.use((request, response) => {
  return sendError(response, 404, `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`);
});

// ---------- Error handler ----------
app.use((error, request, response, next) => {
  console.error("[ERROR]", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

// ---------- Start ----------
const port = Number(process.env.PORT ?? 3007);
app.listen(port, () => {
  console.log(`Latihan REST API berjalan di http://localhost:${port}`);
});