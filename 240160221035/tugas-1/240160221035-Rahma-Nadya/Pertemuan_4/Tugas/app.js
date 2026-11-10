
const express = require("express");

const app = express();


const anggota = [
  { id: 1, nama: "Rahma Nadya", nim: "240160221035" },
  { id: 2, nama: "Ani Lestari", nim: "240160221036" },
];

const absensi = [
  { id: 1, anggota_id: 1, kegiatan_id: 1, status: "Hadir" },
  { id: 2, anggota_id: 2, kegiatan_id: 1, status: "Izin" },
];



 // Middleware untuk membaca JSON
app.use(express.json());

// Middleware logger untuk mencatat request
app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${req.method} ${req.originalUrl}`
  );
  next();
});

// Endpoint awal untuk mengecek API
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Absensi Organisasi berhasil dijalankan",
  });
});



app.get("/anggota", (req, res) => {
  const { nama } = req.query;

  let hasil = anggota;

  if (nama) {
    hasil = anggota.filter((item) =>
      item.nama.toLowerCase().includes(nama.toLowerCase())
    );
  }

  res.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil,
  });
});



app.get("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const dataAnggota = anggota.find((item) => item.id === id);

  if (!dataAnggota) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    data: dataAnggota,
  });
});


app.post("/anggota", (req, res) => {
  const { nama, nim } = req.body;

  if (!nama || !nim) {
    return res.status(400).json({
      success: false,
      message: "Nama dan NIM wajib diisi",
    });
  }

  const anggotaBaru = {
    id: anggota.length
      ? Math.max(...anggota.map((item) => item.id)) + 1
      : 1,
    nama,
    nim,
  };

  anggota.push(anggotaBaru);

  res.status(201).json({
    success: true,
    message: "Anggota berhasil ditambahkan",
    data: anggotaBaru,
  });
});


app.put("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const dataAnggota = anggota.find((item) => item.id === id);

  if (!dataAnggota) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nama, nim } = req.body;

  if (!nama || !nim) {
    return res.status(400).json({
      success: false,
      message: "Nama dan NIM wajib diisi",
    });
  }

  dataAnggota.nama = nama;
  dataAnggota.nim = nim;

  res.status(200).json({
    success: true,
    message: "Anggota berhasil diperbarui",
    data: dataAnggota,
  });
});


app.get("/absensi", (req, res) => {
  res.status(200).json({
    success: true,
    total: absensi.length,
    data: absensi,
  });
});


app.get("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const dataAbsensi = absensi.find((item) => item.id === id);

  if (!dataAbsensi) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  res.status(200).json({
    success: true,
    data: dataAbsensi,
  });
});


app.post("/absensi", (req, res) => {
  const { anggota_id, kegiatan_id, status } = req.body;

  if (!anggota_id || !kegiatan_id || !status) {
    return res.status(400).json({
      success: false,
      message: "anggota_id, kegiatan_id, dan status wajib diisi",
    });
  }

  const absensiBaru = {
    id: absensi.length
      ? Math.max(...absensi.map((item) => item.id)) + 1
      : 1,
    anggota_id,
    kegiatan_id,
    status,
  };

  absensi.push(absensiBaru);

  res.status(201).json({
    success: true,
    message: "Data absensi berhasil ditambahkan",
    data: absensiBaru,
  });
});


app.delete("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = absensi.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  const absensiDihapus = absensi.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Data absensi berhasil dihapus",
    data: absensiDihapus,
  });
});



app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

module.exports = app;




