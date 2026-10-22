
const express = require("express");

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// Data awal anggota
const anggota = [
  { id: 1, nama: "Rahma Nadya", nim: "240160221035" },
  { id: 2, nama: "Ani Lestari", nim: "240160221036" },
];

// Data awal absensi
const absensi = [
  { id: 1, anggota_id: 1, kegiatan_id: 1, status: "Hadir" },
  { id: 2, anggota_id: 2, kegiatan_id: 1, status: "Izin" },
];

// Format response sukses
function sukses(res, status, message, data) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}

// Middleware logger
app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} - ${req.method} ${req.originalUrl}`
  );
  next();
});

// Endpoint utama
app.get("/", (req, res) => {
  return sukses(res, 200, "API Absensi Organisasi berhasil dijalankan", null);
});

// GET semua anggota + filter nama dan NIM
app.get("/anggota", (req, res) => {
  const { nama, nim } = req.query;
  let hasil = anggota;

  if (nama) {
    hasil = hasil.filter((item) =>
      item.nama.toLowerCase().includes(String(nama).toLowerCase())
    );
  }

  if (nim) {
    hasil = hasil.filter((item) =>
      item.nim.includes(String(nim))
    );
  }

  return res.status(200).json({
    success: true,
    message: "Data anggota berhasil diambil",
    total: hasil.length,
    data: hasil,
  });
});

// GET detail anggota
app.get("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = anggota.find((anggota) => anggota.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  return sukses(res, 200, "Detail anggota berhasil diambil", item);
});

// POST tambah anggota
app.post("/anggota", (req, res) => {
  const { nama, nim } = req.body;

  if (
    typeof nama !== "string" ||
    !nama.trim() ||
    typeof nim !== "string" ||
    !nim.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama dan NIM wajib diisi dengan benar",
    });
  }

  if (anggota.some((item) => item.nim === nim.trim())) {
    return res.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const item = {
    id: anggota.length
      ? Math.max(...anggota.map((anggota) => anggota.id)) + 1
      : 1,
    nama: nama.trim(),
    nim: nim.trim(),
  };

  anggota.push(item);

  return sukses(res, 201, "Anggota berhasil ditambahkan", item);
});

// PUT mengganti seluruh data anggota
app.put("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = anggota.find((anggota) => anggota.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nama, nim } = req.body;

  if (
    typeof nama !== "string" ||
    !nama.trim() ||
    typeof nim !== "string" ||
    !nim.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama dan NIM wajib diisi",
    });
  }

  if (anggota.some((anggota) => anggota.nim === nim.trim() && anggota.id !== id)) {
    return res.status(400).json({
      success: false,
      message: "NIM sudah digunakan anggota lain",
    });
  }

  item.nama = nama.trim();
  item.nim = nim.trim();

  return sukses(res, 200, "Anggota berhasil diperbarui", item);
});

// PATCH memperbarui sebagian data anggota
app.patch("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = anggota.find((anggota) => anggota.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nama, nim } = req.body;

  if (nama === undefined && nim === undefined) {
    return res.status(400).json({
      success: false,
      message: "Minimal satu data harus diubah",
    });
  }

  if (nama !== undefined) {
    if (typeof nama !== "string" || !nama.trim()) {
      return res.status(400).json({
        success: false,
        message: "Nama tidak boleh kosong",
      });
    }
    item.nama = nama.trim();
  }

  if (nim !== undefined) {
    if (typeof nim !== "string" || !nim.trim()) {
      return res.status(400).json({
        success: false,
        message: "NIM tidak boleh kosong",
      });
    }

    if (anggota.some((anggota) => anggota.nim === nim.trim() && anggota.id !== id)) {
      return res.status(400).json({
        success: false,
        message: "NIM sudah digunakan anggota lain",
      });
    }

    item.nim = nim.trim();
  }

  return sukses(res, 200, "Anggota berhasil diperbarui", item);
});

// GET semua absensi + filter anggota_id dan status
app.get("/absensi", (req, res) => {
  const { anggota_id, status } = req.query;
  let hasil = absensi;

  if (anggota_id !== undefined) {
    const id = Number(anggota_id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "anggota_id harus berupa bilangan bulat positif",
      });
    }

    hasil = hasil.filter((item) => item.anggota_id === id);
  }

  if (status) {
    hasil = hasil.filter(
      (item) => item.status.toLowerCase() === String(status).toLowerCase()
    );
  }

  return res.status(200).json({
    success: true,
    message: "Data absensi berhasil diambil",
    total: hasil.length,
    data: hasil,
  });
});

// GET detail absensi
app.get("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = absensi.find((absen) => absen.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  return sukses(res, 200, "Detail absensi berhasil diambil", item);
});

// POST tambah absensi
app.post("/absensi", (req, res) => {
  const { anggota_id, kegiatan_id, status } = req.body;
  const statusValid = ["Hadir", "Izin", "Sakit", "Alpha"];

  if (
    anggota_id === undefined ||
    kegiatan_id === undefined ||
    !Number.isInteger(Number(anggota_id)) ||
    Number(anggota_id) <= 0 ||
    !Number.isInteger(Number(kegiatan_id)) ||
    Number(kegiatan_id) <= 0 ||
    typeof status !== "string" ||
    !statusValid.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message:
        "anggota_id dan kegiatan_id harus berupa bilangan bulat positif, serta status harus Hadir, Izin, Sakit, atau Alpha",
    });
  }

  if (!anggota.some((item) => item.id === Number(anggota_id))) {
    return res.status(400).json({
      success: false,
      message: "anggota_id tidak terdaftar",
    });
  }

  const item = {
    id: absensi.length
      ? Math.max(...absensi.map((absen) => absen.id)) + 1
      : 1,
    anggota_id: Number(anggota_id),
    kegiatan_id: Number(kegiatan_id),
    status,
  };

  absensi.push(item);

  return sukses(res, 201, "Data absensi berhasil ditambahkan", item);
});

// PUT mengganti seluruh data absensi
app.put("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = absensi.find((absen) => absen.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  const { anggota_id, kegiatan_id, status } = req.body;
  const statusValid = ["Hadir", "Izin", "Sakit", "Alpha"];

  if (
    anggota_id === undefined ||
    kegiatan_id === undefined ||
    !Number.isInteger(Number(anggota_id)) ||
    Number(anggota_id) <= 0 ||
    !Number.isInteger(Number(kegiatan_id)) ||
    Number(kegiatan_id) <= 0 ||
    typeof status !== "string" ||
    !statusValid.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Data absensi tidak valid atau belum lengkap",
    });
  }

  if (!anggota.some((anggota) => anggota.id === Number(anggota_id))) {
    return res.status(400).json({
      success: false,
      message: "anggota_id tidak terdaftar",
    });
  }

  item.anggota_id = Number(anggota_id);
  item.kegiatan_id = Number(kegiatan_id);
  item.status = status;

  return sukses(res, 200, "Data absensi berhasil diperbarui", item);
});

// PATCH memperbarui sebagian data absensi
app.patch("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = absensi.find((absen) => absen.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  const { anggota_id, kegiatan_id, status } = req.body;

  if (
    anggota_id === undefined &&
    kegiatan_id === undefined &&
    status === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Minimal satu data harus diubah",
    });
  }

  if (anggota_id !== undefined) {
    if (!Number.isInteger(Number(anggota_id)) || Number(anggota_id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "anggota_id tidak valid",
      });
    }

    if (!anggota.some((anggota) => anggota.id === Number(anggota_id))) {
      return res.status(400).json({
        success: false,
        message: "anggota_id tidak terdaftar",
      });
    }

    item.anggota_id = Number(anggota_id);
  }

  if (kegiatan_id !== undefined) {
    if (!Number.isInteger(Number(kegiatan_id)) || Number(kegiatan_id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "kegiatan_id tidak valid",
      });
    }
    item.kegiatan_id = Number(kegiatan_id);
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !["Hadir", "Izin", "Sakit", "Alpha"].includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status harus Hadir, Izin, Sakit, atau Alpha",
      });
    }
    item.status = status;
  }

  return sukses(res, 200, "Data absensi berhasil diperbarui", item);
});

// DELETE anggota
app.delete("/anggota/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = anggota.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  if (absensi.some((item) => item.anggota_id === id)) {
    return res.status(400).json({
      success: false,
      message: "Anggota masih memiliki data absensi",
    });
  }

  anggota.splice(index, 1);
  return res.status(204).end();
});

// DELETE absensi
app.delete("/absensi/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = absensi.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Data absensi tidak ditemukan",
    });
  }

  absensi.splice(index, 1);
  return res.status(204).end();
});

// Handler 404 untuk endpoint yang tidak dikenal
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Middleware error
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

module.exports = app;