/**
 * Pertemuan 5 — latihan desain RESTful API
 * Tujuan: menerapkan resource, filter query, status code, dan response JSON.
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// ── 1. Middleware logger: catat method & URL ──
app.use((request, response, next) => {
  const startedAt = Date.now();
  response.on("finish", () => {
    const ms = Date.now() - startedAt;
    console.log(
      `[${new Date().toISOString()}] ${request.method} ${request.originalUrl} -> ${response.statusCode} (${ms}ms)`
    );
  });
  next();
});

const mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ani Lestari", prodi: "Sistem Informasi", angkatan: 2023 },
];

const responseData = (response, statusCode, message, data) =>
  response.status(statusCode).json({
    success: true,
    message,
    data,
  });

// ── 2. GET /mahasiswa — filter opsional ?prodi= & ?angkatan= ──
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;
  const data = mahasiswa.filter((item) => {
    const cocokProdi =
      prodi === undefined || item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cocokAngkatan =
      angkatan === undefined || item.angkatan === Number(angkatan);
    return cocokProdi && cocokAngkatan;
  });

  return responseData(response, 200, "Data mahasiswa berhasil diambil", data);
});

// ── 3. GET /mahasiswa/:nim — 200 atau 404 ──
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) {
    return response
      .status(404)
      .json({ success: false, message: "Mahasiswa tidak ditemukan" });
  }
  return responseData(response, 200, "Detail mahasiswa berhasil diambil", item);
});

// ── 4. POST /mahasiswa — validasi + 201 Created ──
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body ?? {};
  const errors = [];

  if (typeof nim !== "string" || nim.trim() === "")
    errors.push("nim wajib diisi (string)");
  if (typeof nama !== "string" || nama.trim() === "")
    errors.push("nama wajib diisi (string)");
  if (typeof prodi !== "string" || prodi.trim() === "")
    errors.push("prodi wajib diisi (string)");
  if (
    typeof angkatan !== "number" ||
    !Number.isInteger(angkatan) ||
    angkatan < 1900 ||
    angkatan > 2100
  )
    errors.push("angkatan wajib bilangan bulat 1900–2100");

  if (errors.length > 0) {
    return response
      .status(400)
      .json({ success: false, message: "Validasi gagal", errors });
  }

  if (mahasiswa.some((m) => m.nim === nim.trim())) {
    return response
      .status(400)
      .json({ success: false, message: "NIM sudah terdaftar" });
  }

  const baru = {
    nim: nim.trim(),
    nama: nama.trim(),
    prodi: prodi.trim(),
    angkatan,
  };
  mahasiswa.push(baru);
  return responseData(response, 201, "Mahasiswa berhasil ditambahkan", baru);
});

// ── 5. PATCH /mahasiswa/:nim — ubah sebagian data ──
app.patch("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(({ nim }) => nim === request.params.nim);
  if (index === -1) {
    return response
      .status(404)
      .json({ success: false, message: "Mahasiswa tidak ditemukan" });
  }

  const { nama, prodi, angkatan } = request.body ?? {};
  const errors = [];

  if (nama !== undefined && (typeof nama !== "string" || nama.trim() === ""))
    errors.push("nama harus string tidak kosong");
  if (prodi !== undefined && (typeof prodi !== "string" || prodi.trim() === ""))
    errors.push("prodi harus string tidak kosong");
  if (
    angkatan !== undefined &&
    (typeof angkatan !== "number" || !Number.isInteger(angkatan))
  )
    errors.push("angkatan harus bilangan bulat");

  if (errors.length > 0) {
    return response
      .status(400)
      .json({ success: false, message: "Validasi gagal", errors });
  }

  if (nama !== undefined) mahasiswa[index].nama = nama.trim();
  if (prodi !== undefined) mahasiswa[index].prodi = prodi.trim();
  if (angkatan !== undefined) mahasiswa[index].angkatan = angkatan;

  return responseData(
    response,
    200,
    "Data mahasiswa berhasil diperbarui",
    mahasiswa[index]
  );
});

// ── 6. DELETE /mahasiswa/:nim — 204 No Content ──
app.delete("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(({ nim }) => nim === request.params.nim);
  if (index === -1) {
    return response
      .status(404)
      .json({ success: false, message: "Mahasiswa tidak ditemukan" });
  }
  mahasiswa.splice(index, 1);
  return response.status(204).end();
});

app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});