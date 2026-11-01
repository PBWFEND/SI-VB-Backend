/**
 * Pertemuan 5 — Latihan RESTful API
 * Materi: Middleware, GET, POST, PATCH, DELETE,
 * filter query, validasi, dan HTTP status code.
 */

import express from "express";

const app = express();
app.disable("x-powered-by");

app.use(express.json());

// Middleware logger
app.use((request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
});

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

// Format response JSON
const responseData = (response, statusCode, message, data) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Validasi data mahasiswa
const validasiMahasiswa = (data, partial = false) => {
  const errors = [];

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return ["Data harus berupa object JSON"];
  }

  const fieldDiizinkan = partial
    ? ["nama", "prodi", "angkatan"]
    : ["nim", "nama", "prodi", "angkatan"];

  if (partial && Object.keys(data).length === 0) {
    errors.push("Minimal satu field harus diisi");
  }

  for (const field of Object.keys(data)) {
    if (!fieldDiizinkan.includes(field)) {
      errors.push(`Field ${field} tidak diizinkan`);
    }
  }

  const fieldWajib = partial
    ? Object.keys(data)
    : ["nim", "nama", "prodi", "angkatan"];

  for (const field of fieldWajib) {
    if (field === "angkatan") {
      if (!Number.isInteger(data[field]) || data[field] <= 0) {
        errors.push("Angkatan harus berupa bilangan bulat positif");
      }
    } else if (
      typeof data[field] !== "string" ||
      data[field].trim() === ""
    ) {
      errors.push(`${field} harus diisi dengan teks`);
    }
  }

  return errors;
};

// GET semua mahasiswa dan filter berdasarkan prodi/angkatan
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

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(
    (data) => data.nim === request.params.nim
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

// POST menambahkan mahasiswa
app.post("/mahasiswa", (request, response) => {
  const errors = validasiMahasiswa(request.body);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors,
    });
  }

  const sudahAda = mahasiswa.some(
    (item) => item.nim === request.body.nim
  );

  if (sudahAda) {
    return response.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const dataBaru = {
    nim: request.body.nim.trim(),
    nama: request.body.nama.trim(),
    prodi: request.body.prodi.trim(),
    angkatan: request.body.angkatan,
  };

  mahasiswa.push(dataBaru);

  return responseData(
    response,
    201,
    "Mahasiswa berhasil ditambahkan",
    dataBaru
  );
});

// PATCH memperbarui sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(
    (data) => data.nim === request.params.nim
  );

  if (!item) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  const errors = validasiMahasiswa(request.body, true);

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Validasi gagal",
      errors,
    });
  }

  const perubahan = { ...request.body };

  if (perubahan.nama !== undefined) {
    perubahan.nama = perubahan.nama.trim();
  }

  if (perubahan.prodi !== undefined) {
    perubahan.prodi = perubahan.prodi.trim();
  }

  Object.assign(item, perubahan);

  return responseData(
    response,
    200,
    "Data mahasiswa berhasil diperbarui",
    item
  );
});

// DELETE mahasiswa (tambahan untuk menguji status 204)
app.delete("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(
    (item) => item.nim === request.params.nim
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  mahasiswa.splice(index, 1);

  return response.status(204).send();
});

// Menjalankan server
app.listen(3007, () => {
  console.log("REST API berjalan di http://localhost:3007");
});