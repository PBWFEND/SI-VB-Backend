
/**
 * Pertemuan 5 — Latihan desain RESTful API
 * Tujuan: menerapkan resource, filter query, status code, dan response JSON.
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// Data awal mahasiswa
const mahasiswa = [
  {
    nim: "F1D022001",
    nama: "Jhon Doe",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
  {
    nim: "F1D022002",
    nama: "Ani Lestari",
    prodi: "Sistem Informasi",
    angkatan: 2023,
  },
];

// Middleware logger: mencatat method dan URL setiap request
app.use((request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
});

// Format response JSON
const responseData = (response, statusCode, message, data) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// GET /mahasiswa
// Filter menggunakan query prodi dan angkatan
app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;

  const data = mahasiswa.filter((item) => {
    const cocokProdi =
      prodi === undefined ||
      item.prodi.toLowerCase() === String(prodi).toLowerCase();

    const cocokAngkatan =
      angkatan === undefined ||
      item.angkatan === Number(angkatan);

    return cocokProdi && cocokAngkatan;
  });

  return responseData(
    response,
    200,
    "Data mahasiswa berhasil diambil",
    data
  );
});

// GET /mahasiswa/:nim
// Mengambil detail mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(
    ({ nim }) => nim === request.params.nim
  );

  if (!item) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  return responseData(
    response,
    200,
    "Detail mahasiswa berhasil diambil",
    item
  );
});

// POST /mahasiswa
// Menambahkan mahasiswa baru
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body;

  // Validasi field wajib
  if (
    typeof nim !== "string" ||
    !nim.trim() ||
    typeof nama !== "string" ||
    !nama.trim() ||
    typeof prodi !== "string" ||
    !prodi.trim() ||
    angkatan === undefined ||
    angkatan === null ||
    angkatan === ""
  ) {
    return response.status(400).json({
      success: false,
      message: "nim, nama, prodi, dan angkatan wajib diisi",
    });
  }

  // Angkatan harus berupa bilangan bulat
  if (
    typeof angkatan !== "number" ||
    !Number.isInteger(angkatan) ||
    angkatan <= 0
  ) {
    return response.status(400).json({
      success: false,
      message: "Angkatan harus berupa bilangan bulat positif",
    });
  }

  // NIM harus unik
  const nimSudahAda = mahasiswa.some(
    (item) => item.nim === nim.trim()
  );

  if (nimSudahAda) {
    return response.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const mahasiswaBaru = {
    nim: nim.trim(),
    nama: nama.trim(),
    prodi: prodi.trim(),
    angkatan,
  };

  mahasiswa.push(mahasiswaBaru);

  return responseData(
    response,
    201,
    "Mahasiswa berhasil ditambahkan",
    mahasiswaBaru
  );
});

// PATCH /mahasiswa/:nim
// Mengubah sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(
    ({ nim }) => nim === request.params.nim
  );

  if (!item) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  const body = request.body;

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0
  ) {
    return response.status(400).json({
      success: false,
      message: "Body tidak boleh kosong",
    });
  }

  // Hanya field yang diizinkan yang dapat diubah
  const fieldDiizinkan = ["nama", "prodi", "angkatan"];
  const fieldDikirim = Object.keys(body);

  const fieldTidakValid = fieldDikirim.some(
    (field) => !fieldDiizinkan.includes(field)
  );

  if (fieldTidakValid) {
    return response.status(400).json({
      success: false,
      message: "Field tidak valid atau tidak boleh diubah",
    });
  }

  // Validasi data yang dikirim
  for (const field of ["nama", "prodi"]) {
    if (
      Object.hasOwn(body, field) &&
      (typeof body[field] !== "string" || !body[field].trim())
    ) {
      return response.status(400).json({
        success: false,
        message: `${field} harus berupa teks dan tidak boleh kosong`,
      });
    }
  }

  if (
    Object.hasOwn(body, "angkatan") &&
    (
      typeof body.angkatan !== "number" ||
      !Number.isInteger(body.angkatan) ||
      body.angkatan <= 0
    )
  ) {
    return response.status(400).json({
      success: false,
      message: "Angkatan harus berupa bilangan bulat positif",
    });
  }

  // Terapkan perubahan tanpa mengganti field yang tidak dikirim
  for (const field of fieldDikirim) {
    item[field] =
      typeof body[field] === "string"
        ? body[field].trim()
        : body[field];
  }

  // Berhasil diperbarui tanpa mengirim body response
  return response.status(204).end();
});

// Menangani body JSON yang tidak valid
app.use((error, request, response, next) => {
  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    "body" in error
  ) {
    return response.status(400).json({
      success: false,
      message: "Format JSON tidak valid",
    });
  }

  return next(error);
});

// Menjalankan server
app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});