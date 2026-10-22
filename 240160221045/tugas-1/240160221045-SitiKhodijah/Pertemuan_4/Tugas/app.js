
import express from "express";

const app = express();

app.disable("x-powered-by");

// Middleware JSON
app.use(express.json());

// Middleware logger
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );
  next();
});

// Data sementara buku
const buku = [
  { id: 1, judul: "Basis Data", penulis: "Andi" },
  { id: 2, judul: "Pemrograman Web", penulis: "Budi" },
];

// Data sementara anggota
const anggota = [
  { id: 1, nim: "240160221045", nama: "Siti Khodijah" },
];

// Endpoint utama
app.get("/", (request, response) => {
  response.status(200).json({
    success: true,
    message: "API Sistem Informasi Perpustakaan",
    endpoints: [
      "GET /health",
      "GET /buku",
      "GET /buku/:id",
      "POST /buku",
      "PUT /buku/:id",
      "GET /anggota",
      "GET /anggota/:id",
      "POST /anggota",
      "PUT /anggota/:id",
    ],
  });
});

// Cek kesehatan server
app.get("/health", (request, response) => {
  response.status(200).json({
    success: true,
    status: "up",
  });
});

// GET daftar buku dan filter query
// Contoh: /buku?penulis=Andi
// Contoh: /buku?cari=Basis
app.get("/buku", (request, response) => {
  const { penulis, cari } = request.query;
  let data = [...buku];

  if (penulis !== undefined) {
    data = data.filter(
      (item) =>
        item.penulis.toLowerCase() ===
        String(penulis).toLowerCase()
    );
  }

  if (cari !== undefined) {
    data = data.filter((item) =>
      item.judul.toLowerCase().includes(String(cari).toLowerCase())
    );
  }

  response.status(200).json({
    success: true,
    total: data.length,
    data,
  });
});

// GET detail buku
app.get("/buku/:id", (request, response) => {
  const id = Number(request.params.id);
  const item = buku.find((b) => b.id === id);

  if (!Number.isInteger(id) || !item) {
    return response.status(404).json({
      success: false,
      message: `Buku dengan id ${request.params.id} tidak ditemukan`,
    });
  }

  return response.status(200).json({
    success: true,
    data: item,
  });
});

// POST tambah buku
app.post("/buku", (request, response) => {
  const body = request.body;

  if (
    !body ||
    typeof body.judul !== "string" ||
    !body.judul.trim() ||
    typeof body.penulis !== "string" ||
    !body.penulis.trim()
  ) {
    return response.status(400).json({
      success: false,
      message: "Field judul dan penulis wajib diisi",
    });
  }

  const item = {
    id: Math.max(0, ...buku.map((b) => b.id)) + 1,
    judul: body.judul.trim(),
    penulis: body.penulis.trim(),
  };

  buku.push(item);

  return response.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data: item,
  });
});

// PUT ubah buku
app.put("/buku/:id", (request, response) => {
  const id = Number(request.params.id);
  const item = buku.find((b) => b.id === id);

  if (!Number.isInteger(id) || !item) {
    return response.status(404).json({
      success: false,
      message: "Buku tidak ditemukan",
    });
  }

  const { judul, penulis } = request.body ?? {};

  if (
    (judul !== undefined &&
      (typeof judul !== "string" || !judul.trim())) ||
    (penulis !== undefined &&
      (typeof penulis !== "string" || !penulis.trim()))
  ) {
    return response.status(400).json({
      success: false,
      message: "Judul dan penulis harus berupa teks yang tidak kosong",
    });
  }

  if (judul !== undefined) item.judul = judul.trim();
  if (penulis !== undefined) item.penulis = penulis.trim();

  return response.status(200).json({
    success: true,
    message: "Buku berhasil diubah",
    data: item,
  });
});

// GET daftar anggota
app.get("/anggota", (request, response) => {
  response.status(200).json({
    success: true,
    total: anggota.length,
    data: anggota,
  });
});

// GET detail anggota
app.get("/anggota/:id", (request, response) => {
  const id = Number(request.params.id);
  const item = anggota.find((a) => a.id === id);

  if (!Number.isInteger(id) || !item) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  return response.status(200).json({
    success: true,
    data: item,
  });
});

// POST tambah anggota
app.post("/anggota", (request, response) => {
  const { nim, nama } = request.body ?? {};

  if (
    typeof nim !== "string" ||
    !nim.trim() ||
    typeof nama !== "string" ||
    !nama.trim()
  ) {
    return response.status(400).json({
      success: false,
      message: "Field nim dan nama wajib diisi",
    });
  }

  if (anggota.some((a) => a.nim === nim.trim())) {
    return response.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  const item = {
    id: Math.max(0, ...anggota.map((a) => a.id)) + 1,
    nim: nim.trim(),
    nama: nama.trim(),
  };

  anggota.push(item);

  return response.status(201).json({
    success: true,
    message: "Anggota berhasil ditambahkan",
    data: item,
  });
});

// PUT ubah anggota
app.put("/anggota/:id", (request, response) => {
  const id = Number(request.params.id);
  const item = anggota.find((a) => a.id === id);

  if (!Number.isInteger(id) || !item) {
    return response.status(404).json({
      success: false,
      message: "Anggota tidak ditemukan",
    });
  }

  const { nim, nama } = request.body ?? {};

  if (
    (nim !== undefined && (typeof nim !== "string" || !nim.trim())) ||
    (nama !== undefined && (typeof nama !== "string" || !nama.trim()))
  ) {
    return response.status(400).json({
      success: false,
      message: "NIM dan nama harus berupa teks yang tidak kosong",
    });
  }

  if (
    nim !== undefined &&
    anggota.some((a) => a.id !== id && a.nim === nim.trim())
  ) {
    return response.status(400).json({
      success: false,
      message: "NIM sudah terdaftar",
    });
  }

  if (nim !== undefined) item.nim = nim.trim();
  if (nama !== undefined) item.nama = nama.trim();

  return response.status(200).json({
    success: true,
    message: "Anggota berhasil diubah",
    data: item,
  });
});

// Handler 404 untuk endpoint yang tidak tersedia
app.use((request, response) => {
  response.status(404).json({
    success: false,
    message: `Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`,
  });
});

// Error middleware
app.use((error, request, response, next) => {
  console.error("Kesalahan server:", error);

  if (response.headersSent) {
    return next(error);
  }

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

  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

export default app;