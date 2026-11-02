/**
 * Tugas 3 - RESTful API Buku dengan Express.js
 * Resource: buku perpustakaan (lanjutan Tugas 1 dan 2).
 * File ini hanya membuat aplikasi; port dibuka di server.js.
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Data sementara di memori
const buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5 },
];
let nextId = 4;

const sendSuccess = (response, statusCode, message, data) =>
  response.status(statusCode).json({ success: true, message, data });

const sendError = (response, statusCode, message, details) =>
  response.status(statusCode).json({ success: false, message, ...(details && { details }) });

// Middleware logger
app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

const isText = (value) => typeof value === "string" && value.trim() !== "";

// Mengubah route parameter id menjadi bilangan bulat positif, atau null jika tidak valid
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

const validateBook = (payload, partial = false) => {
  const errors = [];

  if (!partial) {
    for (const field of ["judul", "penulis", "tahun", "stok"]) {
      if (payload[field] === undefined) errors.push(`Field ${field} wajib diisi`);
    }
  }

  if (payload.judul !== undefined && !isText(payload.judul)) errors.push("judul harus berupa teks dan tidak boleh kosong");
  if (payload.penulis !== undefined && !isText(payload.penulis)) errors.push("penulis harus berupa teks dan tidak boleh kosong");
  if (payload.tahun !== undefined && (!Number.isInteger(payload.tahun) || payload.tahun < 1900)) {
    errors.push("tahun harus bilangan bulat minimal 1900");
  }
  if (payload.stok !== undefined && (!Number.isInteger(payload.stok) || payload.stok < 0)) {
    errors.push("stok harus bilangan bulat minimal 0");
  }

  return errors;
};

app.get("/", (request, response) =>
  sendSuccess(response, 200, "RESTful API Buku Perpustakaan", {
    resource: "buku",
    endpoints: [
      "GET /health",
      "GET /buku",
      "GET /buku/:id",
      "POST /buku",
      "PUT /buku/:id",
      "PATCH /buku/:id",
      "DELETE /buku/:id",
    ],
  })
);

app.get("/health", (request, response) => sendSuccess(response, 200, "API berjalan", { status: "up" }));

// GET /buku dengan filter ?penulis= ?tahun= ?minStok=
app.get("/buku", (request, response) => {
  const { penulis, tahun, minStok } = request.query;
  const errors = [];

  if (tahun !== undefined && !Number.isInteger(Number(tahun))) errors.push("tahun harus bilangan bulat");
  if (minStok !== undefined && (!Number.isInteger(Number(minStok)) || Number(minStok) < 0)) {
    errors.push("minStok harus bilangan bulat minimal 0");
  }
  if (errors.length > 0) return sendError(response, 400, "Query tidak valid", errors);

  const data = buku.filter((item) => {
    const cocokPenulis = penulis === undefined || item.penulis.toLowerCase() === String(penulis).toLowerCase();
    const cocokTahun = tahun === undefined || item.tahun === Number(tahun);
    const cocokStok = minStok === undefined || item.stok >= Number(minStok);
    return cocokPenulis && cocokTahun && cocokStok;
  });

  return sendSuccess(response, 200, "Daftar buku berhasil diambil", { total: data.length, data });
});

// GET /buku/:id
app.get("/buku/:id", (request, response) => {
  const id = parseId(request.params.id);
  if (id === null) return sendError(response, 400, "id harus bilangan bulat positif");

  const item = buku.find((data) => data.id === id);
  if (!item) return sendError(response, 404, "Buku tidak ditemukan");

  return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
});

// POST /buku
app.post("/buku", (request, response) => {
  const payload = request.body ?? {};
  const errors = validateBook(payload);
  if (errors.length > 0) return sendError(response, 400, "Data buku tidak valid", errors);

  const { judul, penulis, tahun, stok } = payload;
  const baru = { id: nextId++, judul, penulis, tahun, stok };
  buku.push(baru);
  return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
});

// PUT /buku/:id mengganti seluruh data (semua field wajib)
app.put("/buku/:id", (request, response) => {
  const id = parseId(request.params.id);
  if (id === null) return sendError(response, 400, "id harus bilangan bulat positif");

  const index = buku.findIndex((data) => data.id === id);
  if (index === -1) return sendError(response, 404, "Buku tidak ditemukan");

  const payload = request.body ?? {};
  const errors = validateBook(payload);
  if (errors.length > 0) return sendError(response, 400, "Data buku tidak valid", errors);

  const { judul, penulis, tahun, stok } = payload;
  buku[index] = { id, judul, penulis, tahun, stok };
  return sendSuccess(response, 200, "Buku berhasil diganti", buku[index]);
});

// PATCH /buku/:id mengubah sebagian data
app.patch("/buku/:id", (request, response) => {
  const id = parseId(request.params.id);
  if (id === null) return sendError(response, 400, "id harus bilangan bulat positif");

  const item = buku.find((data) => data.id === id);
  if (!item) return sendError(response, 404, "Buku tidak ditemukan");

  const { judul, penulis, tahun, stok } = request.body ?? {};
  const perubahan = { judul, penulis, tahun, stok };

  if (Object.values(perubahan).every((value) => value === undefined)) {
    return sendError(response, 400, "Tidak ada field yang diubah");
  }

  const errors = validateBook(perubahan, true);
  if (errors.length > 0) return sendError(response, 400, "Data perubahan tidak valid", errors);

  for (const [key, value] of Object.entries(perubahan)) {
    if (value !== undefined) item[key] = value;
  }
  return sendSuccess(response, 200, "Buku berhasil diperbarui", item);
});

// DELETE /buku/:id, berhasil dengan status 204 tanpa body
app.delete("/buku/:id", (request, response) => {
  const id = parseId(request.params.id);
  if (id === null) return sendError(response, 400, "id harus bilangan bulat positif");

  const index = buku.findIndex((data) => data.id === id);
  if (index === -1) return sendError(response, 404, "Buku tidak ditemukan");

  buku.splice(index, 1);
  return response.status(204).send();
});

// Handler 404 (setelah semua route)
app.use((request, response) => sendError(response, 404, "Endpoint tidak ditemukan"));

// Error middleware (4 parameter, paling bawah)
app.use((error, request, response, next) => {
  if (error.type === "entity.parse.failed") {
    return sendError(response, 400, "Format JSON tidak valid");
  }
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

export default app;