
import express from "express";

const app = express();

// Data awal mahasiswa
let daftarMahasiswa = [
  {
    id: 1,
    nim: "240160221009",
    nama: "Disti Setiawati",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 2,
    nim: "240160221010",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 3,
    nim: "240160221011",
    nama: "Sinta Maharani",
    prodi: "Sistem Informasi",
    semester: 5,
  },
];

// Middleware logger
app.use((request, response, next) => {
  const waktu = new Date().toLocaleString("id-ID");

  console.log(
    `[${waktu}] ${request.method} ${request.originalUrl}`
  );

  next();
});

// Middleware JSON parser
app.use(express.json());

// GET /
app.get("/", (request, response) => {
  return response.status(200).json({
    success: true,
    appName: "API Absensi Perkuliahan Mahasiswa",
    message: "Selamat datang di API Absensi Perkuliahan",
    endpoints: [
      "GET /health",
      "GET /mahasiswa",
      "GET /mahasiswa/:nim",
      "POST /mahasiswa",
      "PATCH /mahasiswa/:nim",
    ],
  });
});

// GET /health
app.get("/health", (request, response) => {
  return response.status(200).json({
    success: true,
    status: "up",
    message: "API berjalan dengan baik",
  });
});

// GET /mahasiswa
// Mendukung filter prodi dan semester
app.get("/mahasiswa", (request, response) => {
  const { prodi, semester } = request.query;

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

  if (semester !== undefined) {
    const angkaSemester = Number(semester);

    if (!Number.isInteger(angkaSemester) || angkaSemester < 1) {
      return response.status(400).json({
        success: false,
        message: "Parameter semester harus berupa angka positif",
      });
    }

    hasil = hasil.filter(
      (item) => item.semester === angkaSemester
    );
  }

  return response.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil,
  });
});

// GET /mahasiswa/:nim
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
app.post("/mahasiswa", (request, response) => {
  const { nim, nama, prodi, semester } = request.body ?? {};

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

  if (!Number.isInteger(semester) || semester < 1) {
    errors.push("Semester harus berupa angka positif");
  }

  if (errors.length > 0) {
    return response.status(400).json({
      success: false,
      message: "Data mahasiswa tidak valid",
      errors,
    });
  }

  const nimSudahTerdaftar = daftarMahasiswa.some(
    (item) => item.nim === nim.trim()
  );

  if (nimSudahTerdaftar) {
    return response.status(409).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const mahasiswaBaru = {
    id: Math.max(...daftarMahasiswa.map((item) => item.id)) + 1,
    nim: nim.trim(),
    nama: nama.trim(),
    prodi: prodi.trim(),
    semester,
  };

  daftarMahasiswa.push(mahasiswaBaru);

  return response.status(201).json({
    success: true,
    message: "Mahasiswa berhasil ditambahkan",
    data: mahasiswaBaru,
  });
});

// PATCH /mahasiswa/:nim
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

  const fieldDiizinkan = ["nama", "prodi", "semester"];

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

  if (body.semester !== undefined) {
    if (!Number.isInteger(body.semester) || body.semester < 1) {
      return response.status(400).json({
        success: false,
        message: "Semester harus berupa angka positif",
      });
    }

    mahasiswa.semester = body.semester;
  }

  return response.status(200).json({
    success: true,
    message: "Data mahasiswa berhasil diperbarui",
    data: mahasiswa,
  });
});

// Handler 404
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// Error handler
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

export default app;
