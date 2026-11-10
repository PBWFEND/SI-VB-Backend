import express from "express";

const router = express.Router();

// Data awal mahasiswa
let mahasiswa = [
  {
    nim: "240160221045",
    nama: "Siti Khodijah",
    prodi: "Sistem Informasi",
    angkatan: 2024
  },
  {
    nim: "240160221046",
    nama: "Ani Lestari",
    prodi: "Sistem Informasi",
    angkatan: 2023
  }
];

// Response sukses
const success = (res, message, data, status = 200) => {
  return res.status(status).json({
    success: true,
    message,
    data
  });
};

// Response error
const error = (res, message, status) => {
  return res.status(status).json({
    success: false,
    message
  });
};

// GET: Semua mahasiswa + filter
router.get("/mahasiswa", (req, res) => {
  const { prodi, angkatan } = req.query;

  let hasil = [...mahasiswa];

  if (prodi) {
    hasil = hasil.filter(
      m => m.prodi.toLowerCase() === prodi.toLowerCase()
    );
  }

  if (angkatan) {
    hasil = hasil.filter(
      m => String(m.angkatan) === angkatan
    );
  }

  return success(res, "Data mahasiswa berhasil diambil", hasil);
});

// GET: Detail mahasiswa
router.get("/mahasiswa/:nim", (req, res) => {
  const data = mahasiswa.find(m => m.nim === req.params.nim);

  if (!data) {
    return error(res, "Mahasiswa tidak ditemukan", 404);
  }

  return success(res, "Detail mahasiswa berhasil diambil", data);
});

// POST: Tambah mahasiswa
router.post("/mahasiswa", (req, res) => {
  const { nim, nama, prodi, angkatan } = req.body;

  if (
    !nim || !nama || !prodi ||
    angkatan === undefined ||
    !Number.isInteger(Number(angkatan)) ||
    Number(angkatan) <= 0
  ) {
    return error(res, "Semua data wajib diisi dengan benar", 400);
  }

  if (mahasiswa.some(m => m.nim === nim)) {
    return error(res, "NIM sudah terdaftar", 400);
  }

  const dataBaru = {
    nim,
    nama,
    prodi,
    angkatan: Number(angkatan)
  };

  mahasiswa.push(dataBaru);

  return success(res, "Mahasiswa berhasil ditambahkan", dataBaru, 201);
});

// PUT: Mengganti seluruh data mahasiswa
router.put("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(m => m.nim === req.params.nim);

  if (index === -1) {
    return error(res, "Mahasiswa tidak ditemukan", 404);
  }

  const { nama, prodi, angkatan } = req.body;

  if (
    !nama || !prodi ||
    angkatan === undefined ||
    !Number.isInteger(Number(angkatan)) ||
    Number(angkatan) <= 0
  ) {
    return error(res, "Nama, prodi, dan angkatan wajib diisi", 400);
  }

  mahasiswa[index] = {
    nim: req.params.nim,
    nama,
    prodi,
    angkatan: Number(angkatan)
  };

  return success(res, "Data mahasiswa berhasil diganti", mahasiswa[index]);
});

// PATCH: Mengubah sebagian data
router.patch("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(m => m.nim === req.params.nim);

  if (index === -1) {
    return error(res, "Mahasiswa tidak ditemukan", 404);
  }

  const { nama, prodi, angkatan } = req.body;
  const kolomDiizinkan = ["nama", "prodi", "angkatan"];
  const kolomDikirim = Object.keys(req.body);

  if (
    kolomDikirim.length === 0 ||
    kolomDikirim.some(kolom => !kolomDiizinkan.includes(kolom)) ||
    (nama !== undefined && (typeof nama !== "string" || !nama.trim())) ||
    (prodi !== undefined && (typeof prodi !== "string" || !prodi.trim())) ||
    (angkatan !== undefined &&
      (!Number.isInteger(Number(angkatan)) || Number(angkatan) <= 0))
  ) {
    return error(res, "Data perubahan tidak valid", 400);
  }

  if (nama !== undefined) mahasiswa[index].nama = nama;
  if (prodi !== undefined) mahasiswa[index].prodi = prodi;
  if (angkatan !== undefined) mahasiswa[index].angkatan = Number(angkatan);

  return success(res, "Data mahasiswa berhasil diperbarui", mahasiswa[index]);
});

// DELETE: Hapus mahasiswa
router.delete("/mahasiswa/:nim", (req, res) => {
  const index = mahasiswa.findIndex(m => m.nim === req.params.nim);

  if (index === -1) {
    return error(res, "Mahasiswa tidak ditemukan", 404);
  }

  mahasiswa.splice(index, 1);

  return res.status(204).send();
});

export default router;