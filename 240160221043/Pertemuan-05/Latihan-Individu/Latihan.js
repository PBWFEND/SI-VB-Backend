console.log("File latihan.js berhasil dibaca!");

import express from "express";

const app = express();
const PORT = 3007;

// Middleware
app.use(express.json());

// Data awal mahasiswa
const mahasiswa = [
  {
    nim: "240160221043",
    nama: "Salwa Ananda Rachmat",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
];

// Middleware logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// GET semua mahasiswa + filter
app.get("/mahasiswa", (req, res) => {
  const { prodi } = req.query;

  let hasil = mahasiswa;

  if (prodi) {
    hasil = hasil.filter(
      (m) => m.prodi.toLowerCase() === prodi.toLowerCase()
    );
  }

  res.status(200).json({
    success: true,
    message: "Data mahasiswa berhasil diambil",
    data: hasil,
  });
});

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
  const data = mahasiswa.find((m) => m.nim === req.params.nim);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    message: "Detail mahasiswa berhasil diambil",
    data,
  });
});

// POST tambah mahasiswa
app.post("/mahasiswa", (req, res) => {
  const { nim, nama, prodi, angkatan } = req.body;

  if (!nim || !nama || !prodi || !angkatan) {
    return res.status(400).json({
      success: false,
      message: "NIM, nama, prodi, dan angkatan wajib diisi",
    });
  }

  const sudahAda = mahasiswa.some((m) => m.nim === nim);

  if (sudahAda) {
    return res.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const dataBaru = {
    nim,
    nama,
    prodi,
    angkatan: Number(angkatan),
  };

  mahasiswa.push(dataBaru);

  res.status(201).json({
    success: true,
    message: "Mahasiswa berhasil ditambahkan",
    data: dataBaru,
  });
});

// PATCH update sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (req, res) => {
  const data = mahasiswa.find((m) => m.nim === req.params.nim);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  const { nama, prodi, angkatan } = req.body;

  if (nama !== undefined) data.nama = nama;
  if (prodi !== undefined) data.prodi = prodi;
  if (angkatan !== undefined) data.angkatan = Number(angkatan);

  res.status(200).json({
    success: true,
    message: "Data mahasiswa berhasil diperbarui",
    data,
  });
});

// DELETE mahasiswa
app.delete("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(
    (m) => m.nim === req.params.nim
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  mahasiswa.splice(index, 1);

  res.status(204).send();
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
