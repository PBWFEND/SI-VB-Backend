
import express from "express";

const app = express();
const PORT = Number(process.env.PORT ?? 3006);

// Data awal mahasiswa
let daftarMahasiswa = [
  {
    nim: "240160221009",
    nama: "Disti Setiawati",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
  {
    nim: "240160221010",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
  {
    nim: "240160221011",
    nama: "Sinta Maharani",
    prodi: "Sistem Informasi",
    angkatan: 2024,
  },
];

// MIDDLEWARE 1: Logger
app.use((request, response, next) => {
  const waktu = new Date().toLocaleString("id-ID");

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// MIDDLEWARE 2: JSON Parser
app.use(express.json());

// GET /
// Informasi aplikasi dan daftar endpoint
app.get("/", (request, response) => {
  return response.status(200).json({
    success: true,
    appName: "API Mahasiswa",
    message: "RESTful API Mahasiswa - Pertemuan 5",
    endpoints: [
      "GET /mahasiswa",
      "GET /mahasiswa/:nim",
      "POST /mahasiswa",
      "PATCH /mahasiswa/:nim",
      "DELETE /mahasiswa/:nim",
    ],
  });
});

// GET /mahasiswa
// Menampilkan seluruh mahasiswa atau filter berdasarkan prodi
app.get("/mahasiswa", (request, response) => {
  const { prodi } = request.query;

  let hasil = [...daftarMahasiswa];

  if (prodi !== undefined) {
    if (typeof prodi !== "string" || prodi.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Parameter prodi tidak valid",
      });
    }

    hasil = hasil.filter(
      (item) =>
        item.prodi.toLowerCase() === prodi.trim().toLowerCase()
    );
  }

  return response.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil,
  });
});

// GET /mahasiswa/:nim
// Menampilkan detail mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;

  const mahasiswa = daftarMahasiswa.find(
    (item) => item.nim === nim
  );

  if (!mahasiswa) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  return response.status(200).json({
    success: true,
    data: mahasiswa,
  });
});

// POST /mahasiswa
// Menambahkan mahasiswa baru
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, angkatan } = request.body ?? {};

  const errors = [];

  if (typeof nim !== "string" || nim.trim() === "") {
    errors.push("NIM wajib diisi");
  }

  if (typeof nama !== "string" || nama.trim() === "") {
    errors.push("Nama wajib diisi");
  }

  if (typeof prodi !== "string" || prodi.trim() === "") {
    errors.push("Program studi wajib diisi");
  }

  if (!Number.isInteger(angkatan) || angkatan < 2000) {
    errors.push("Angkatan harus berupa angka yang valid");
  }

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data mahasiswa tidak valid",
      errors,
    });
  }

  const nimSudahAda = daftarMahasiswa.some(
    (item) => item.nim === nim.trim()
  );

  if (nimSudahAda) {
    return response.status(409).json({
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

  daftarMahasiswa.push(mahasiswaBaru);

  return response.status(201).json({
    success: true,
    message: "Mahasiswa berhasil ditambahkan",
    data: mahasiswaBaru,
  });
});

// PATCH /mahasiswa/:nim
// Memperbarui sebagian data mahasiswa
app.patch("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;

  const mahasiswa = daftarMahasiswa.find(
    (item) => item.nim === nim
  );

  if (!mahasiswa) {
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

  const fieldDiizinkan = ["nama", "prodi", "angkatan"];

  const fieldTidakDiizinkan = Object.keys(body).filter(
    (field) => !fieldDiizinkan.includes(field)
  );

  if (fieldTidakDiizinkan.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Field yang dikirim tidak diizinkan",
      errors: fieldTidakDiizinkan,
    });
  }

  if (body.nama !== undefined) {
    if (typeof body.nama !== "string" || body.nama.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Nama tidak boleh kosong",
      });
    }

    mahasiswa.nama = body.nama.trim();
  }

  if (body.prodi !== undefined) {
    if (typeof body.prodi !== "string" || body.prodi.trim() === "") {
      return response.status(400).json({
        success: false,
        message: "Program studi tidak boleh kosong",
      });
    }

    mahasiswa.prodi = body.prodi.trim();
  }

  if (body.angkatan !== undefined) {
    if (!Number.isInteger(body.angkatan) || body.angkatan < 2000) {
      return response.status(400).json({
        success: false,
        message: "Angkatan harus berupa angka yang valid",
      });
    }

    mahasiswa.angkatan = body.angkatan;
  }

  return response.status(200).json({
    success: true,
    message: "Data mahasiswa berhasil diperbarui",
    data: mahasiswa,
  });
});

// DELETE /mahasiswa/:nim
// Endpoint tambahan untuk menguji status 204
app.delete("/mahasiswa/:nim", (request, response) => {
  const { nim } = request.params;

  const index = daftarMahasiswa.findIndex(
    (item) => item.nim === nim
  );

  if (index === -1) {
    return response.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }

  daftarMahasiswa.splice(index, 1);

  return response.status(204).send();
});

// HANDLER 404
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ERROR HANDLER
app.use((error, request, response, next) => {
  console.error("Terjadi kesalahan:", error.message);

  if (response.headersSent) {
    return next(error);
  }

  const statusError = Number(error.status ?? error.statusCode);

  const statusCode =
    statusError >= 400 && statusError <= 599
      ? statusError
      : 500;

  return response.status(statusCode).json({
    success: false,
    message:
      statusCode < 500
        ? "Request tidak dapat diproses"
        : "Terjadi kesalahan pada server",
  });
});

// Menjalankan server
app.listen(PORT, (error) => {
  if (error) {
    console.error("Gagal menjalankan server:", error.message);
    process.exit(1);
  }

  console.log(`API Mahasiswa berjalan di http://localhost:${PORT}`);
});
