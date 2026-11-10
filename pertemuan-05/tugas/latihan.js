/**
 * Pertemuan 5 - Latihan Individu
 * API Mahasiswa menggunakan Express.js
 * Bantuan AI chatgpt untuk membantu memahami dan
 * melengkapi middleware, validasi, serta status HTTP.
 */


import express from "express";

const app = express();
const PORT = 3007;

app.disable("x-powered-by");
app.use(express.json());

// Data mahasiswa sementara (in-memory)
const mahasiswa = [
  {
    nim: "F1D022001",
    nama: "Jhon Doe",
    prodi: "Sistem Informasi",
    angkatan: 2024
  },
  {
    nim: "F1D022002",
    nama: "Ani Lestari",
    prodi: "Sistem Informasi",
    angkatan: 2023
  }
];

// Middleware logger: mencatat method dan URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Fungsi response JSON
const responseData = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

// 1. GET semua mahasiswa + filter prodi dan angkatan
app.get("/mahasiswa", (req, res) => {
  const { prodi, angkatan } = req.query;

  const hasil = mahasiswa.filter((item) => {
    const cocokProdi =
      prodi === undefined ||
      item.prodi.toLowerCase() === String(prodi).toLowerCase();

    const cocokAngkatan =
      angkatan === undefined ||
      item.angkatan === Number(angkatan);

    return cocokProdi && cocokAngkatan;
  });

  return responseData(
    res,
    200,
    "Data mahasiswa berhasil diambil",
    hasil
  );
});

// 2. GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(
    (m) => m.nim === req.params.nim
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan"
    });
  }

  return responseData(
    res,
    200,
    "Detail mahasiswa berhasil diambil",
    item
  );
});

// 3. POST mahasiswa baru
app.post("/mahasiswa", (req, res) => {
  const { nim, nama, prodi, angkatan } = req.body ?? {};

  // Validasi semua field wajib
  if (
    typeof nim !== "string" || !nim.trim() ||
    typeof nama !== "string" || !nama.trim() ||
    typeof prodi !== "string" || !prodi.trim() ||
    angkatan === undefined ||
    angkatan === null ||
    angkatan === "" ||
    !Number.isInteger(Number(angkatan)) ||
    Number(angkatan) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "NIM, nama, prodi, dan angkatan wajib diisi dengan benar"
    });
  }

  // Cegah NIM duplikat
  const sudahAda = mahasiswa.some(
    (m) => m.nim === nim.trim()
  );

  if (sudahAda) {
    return res.status(400).json({
      success: false,
      message: "NIM sudah terdaftar"
    });
  }

  const dataBaru = {
    nim: nim.trim(),
    nama: nama.trim(),
    prodi: prodi.trim(),
    angkatan: Number(angkatan)
  };

  mahasiswa.push(dataBaru);

  return responseData(
    res,
    201,
    "Mahasiswa berhasil ditambahkan",
    dataBaru
  );
});

// 4. PATCH: mengubah sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (req, res) => {
  const item = mahasiswa.find(
    (m) => m.nim === req.params.nim
  );

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan"
    });
  }

  const { nama, prodi, angkatan } = req.body ?? {};
  const fieldDiizinkan = ["nama", "prodi", "angkatan"];
  const fieldDikirim = Object.keys(req.body ?? {});

  if (
    fieldDikirim.length === 0 ||
    fieldDikirim.some((field) => !fieldDiizinkan.includes(field))
  ) {
    return res.status(400).json({
      success: false,
      message: "Kirim minimal satu field yang valid: nama, prodi, atau angkatan"
    });
  }

  if (
    nama !== undefined &&
    (typeof nama !== "string" || !nama.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Nama harus berupa teks dan tidak boleh kosong"
    });
  }

  if (
    prodi !== undefined &&
    (typeof prodi !== "string" || !prodi.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Prodi harus berupa teks dan tidak boleh kosong"
    });
  }

  if (
    angkatan !== undefined &&
    (
      angkatan === null ||
      angkatan === "" ||
      !Number.isInteger(Number(angkatan)) ||
      Number(angkatan) <= 0
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Angkatan harus berupa bilangan bulat positif"
    });
  }

  // Terapkan hanya field yang dikirim
  if (nama !== undefined) item.nama = nama.trim();
  if (prodi !== undefined) item.prodi = prodi.trim();
  if (angkatan !== undefined) item.angkatan = Number(angkatan);

  // 204 berarti berhasil tanpa response body
  return res.status(204).end();
});

// 5. Penanganan endpoint yang tidak ditemukan
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`API Mahasiswa berjalan di http://localhost:${PORT}`);
});
