/**
 * Pertemuan 5 — latihan desain RESTful API
 * Tujuan: menerapkan resource, filter query, status code, dan response JSON.
 * Jalankan: node latihan.js
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Middleware logger
app.use((request, response, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${request.method} ${request.originalUrl}`
  );
  next();
});

const mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe", prodi: "Sistem Informasi", angkatan: 2024 },
  { nim: "F1D022002", nama: "Ani Lestari", prodi: "Sistem Informasi", angkatan: 2023 },
];

const responseData = (response, statusCode, message, data) => response.status(statusCode).json({
  success: true,
  message,
  data,
});

app.get("/mahasiswa", (request, response) => {
  const { prodi, angkatan } = request.query;
  const data = mahasiswa.filter((item) => {
    const cocokProdi = prodi === undefined || item.prodi.toLowerCase() === String(prodi).toLowerCase();
    const cocokAngkatan = angkatan === undefined || item.angkatan === Number(angkatan);
    return cocokProdi && cocokAngkatan;
  });

  return responseData(response, 200, "Data mahasiswa berhasil diambil", data);
});

app.get("/mahasiswa/:nim", (request, response) => {
  const item = mahasiswa.find(({ nim }) => nim === request.params.nim);
  if (!item) return response.status(404).json({ success: false, message: "Mahasiswa tidak ditemukan" });
  return responseData(response, 200, "Detail mahasiswa berhasil diambil", item);
});

app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body;

  if (!nim || !nama || !prodi || angkatan === undefined) {
    return response.status(400).json({
      success: false,
      message: "NIM, nama, prodi, dan angkatan wajib diisi",
    });
  }

  const sudahAda = mahasiswa.some((item) => item.nim === nim);

  if (sudahAda) {
    return response.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const dataBaru = {
    nim: String(nim),
    nama: String(nama),
    prodi: String(prodi),
    angkatan: Number(angkatan),
  };

  mahasiswa.push(dataBaru);

  return responseData(
    response,
    201,
    "Mahasiswa berhasil ditambahkan",
    dataBaru
  );
});


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

  const { nama, prodi, angkatan } = request.body;

  if (
    nama === undefined &&
    prodi === undefined &&
    angkatan === undefined
  ) {
    return response.status(400).json({
      success: false,
      message: "Minimal satu data harus diisi",
    });
  }

  if (nama !== undefined) item.nama = nama;
  if (prodi !== undefined) item.prodi = prodi;

  if (angkatan !== undefined) {
    const tahun = Number(angkatan);

    if (!Number.isInteger(tahun) || tahun <= 0) {
      return response.status(400).json({
        success: false,
        message: "Angkatan harus berupa angka positif",
      });
    }

    item.angkatan = tahun;
  }

  return responseData(
    response,
    200,
    "Data mahasiswa berhasil diperbarui",
    item
  );
});


app.delete("/mahasiswa/:nim", (request, response) => {
  const index = mahasiswa.findIndex(
    ({ nim }) => nim === request.params.nim
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  mahasiswa.splice(index, 1);

  return response.status(204).end();
});

app.listen(3007, () => {
  console.log("Latihan REST API berjalan di http://localhost:3007");
});