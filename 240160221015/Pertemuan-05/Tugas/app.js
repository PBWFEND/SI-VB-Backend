/**
 * ============================================================
 * Tugas 3 — RESTful API E-Warung Kampus
 * ============================================================
 * Resource: menu
 * Mengimplementasikan: GET (list & detail), POST, PUT, PATCH, DELETE
 * Lengkap dengan validasi, query filter, dan status code yang tepat.
 */

import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// ============================================================
// Data in-memory
// ============================================================
let menu = [
  { id: 1, nama: "Nasi Goreng Spesial", harga: 15000, kategori: "Makanan", stok: 20 },
  { id: 2, nama: "Mie Ayam", harga: 12000, kategori: "Makanan", stok: 15 },
  { id: 3, nama: "Es Teh Manis", harga: 5000, kategori: "Minuman", stok: 50 },
];
let nextId = 4;

// ============================================================
// Helper Response Konsisten
// ============================================================
const sendSuccess = (res, statusCode, message, data = undefined) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

const sendError = (res, statusCode, message, details = undefined) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};

// ============================================================
// Middleware Logger
// ============================================================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ============================================================
// Validasi Input
// ============================================================
const validateMenu = (payload, partial = false) => {
  const errors = [];
  const required = ["nama", "harga", "kategori", "stok"];

  if (!partial) {
    for (const field of required) {
      if (payload[field] === undefined) errors.push(`Field '${field}' wajib diisi`);
    }
  }

  if (payload.nama !== undefined && (typeof payload.nama !== "string" || payload.nama.trim() === "")) {
    errors.push("Field 'nama' harus berupa teks dan tidak boleh kosong");
  }
  if (payload.harga !== undefined && (!Number.isInteger(payload.harga) || payload.harga <= 0)) {
    errors.push("Field 'harga' harus berupa bilangan bulat positif");
  }
  if (payload.kategori !== undefined && (typeof payload.kategori !== "string" || payload.kategori.trim() === "")) {
    errors.push("Field 'kategori' harus berupa teks dan tidak boleh kosong");
  }
  if (payload.stok !== undefined && (!Number.isInteger(payload.stok) || payload.stok < 0)) {
    errors.push("Field 'stok' harus berupa bilangan bulat minimal 0");
  }

  return errors;
};

// ============================================================
// GET /menu (Collection & Filter)
// ============================================================
app.get("/menu", (req, res) => {
  const { kategori, minStok } = req.query;
  let data = menu;

  if (kategori !== undefined) {
    data = data.filter((item) => item.kategori.toLowerCase() === String(kategori).toLowerCase());
  }

  if (minStok !== undefined) {
    const stokAngka = Number(minStok);
    if (isNaN(stokAngka)) {
      return sendError(res, 400, "Query 'minStok' harus berupa angka");
    }
    data = data.filter((item) => item.stok >= stokAngka);
  }

  return sendSuccess(res, 200, "Daftar menu berhasil diambil", {
    total: data.length,
    filter: { kategori: kategori ?? "semua", minStok: minStok ?? "semua" },
    data,
  });
});

// ============================================================
// GET /menu/:id (Detail)
// ============================================================
app.get("/menu/:id", (req, res) => {
  const item = menu.find((m) => m.id === Number(req.params.id));
  if (!item) {
    return sendError(res, 404, `Menu dengan id ${req.params.id} tidak ditemukan`);
  }
  return sendSuccess(res, 200, "Detail menu berhasil diambil", item);
});

// ============================================================
// POST /menu (Create)
// ============================================================
app.post("/menu", (req, res) => {
  const errors = validateMenu(req.body || {});
  if (errors.length > 0) {
    return sendError(res, 400, "Data menu tidak valid", errors);
  }

  const { nama, harga, kategori, stok } = req.body;
  const baru = { id: nextId++, nama: nama.trim(), harga, kategori: kategori.trim(), stok };
  menu.push(baru);

  return sendSuccess(res, 201, "Menu berhasil ditambahkan", baru);
});

// ============================================================
// PUT /menu/:id (Full Update)
// ============================================================
app.put("/menu/:id", (req, res) => {
  const index = menu.findIndex((m) => m.id === Number(req.params.id));
  if (index === -1) {
    return sendError(res, 404, `Menu dengan id ${req.params.id} tidak ditemukan`);
  }

  const errors = validateMenu(req.body || {}); // partial = false
  if (errors.length > 0) {
    return sendError(res, 400, "Data menu tidak valid untuk diperbarui (PUT)", errors);
  }

  const { nama, harga, kategori, stok } = req.body;
  menu[index] = { id: menu[index].id, nama: nama.trim(), harga, kategori: kategori.trim(), stok };

  return sendSuccess(res, 200, "Data menu berhasil diganti (PUT)", menu[index]);
});

// ============================================================
// PATCH /menu/:id (Partial Update)
// ============================================================
app.patch("/menu/:id", (req, res) => {
  const item = menu.find((m) => m.id === Number(req.params.id));
  if (!item) {
    return sendError(res, 404, `Menu dengan id ${req.params.id} tidak ditemukan`);
  }

  const errors = validateMenu(req.body || {}, true); // partial = true
  if (errors.length > 0) {
    return sendError(res, 400, "Data perubahan tidak valid", errors);
  }

  Object.assign(item, req.body);
  return sendSuccess(res, 200, "Data menu berhasil diperbarui (PATCH)", item);
});

// ============================================================
// DELETE /menu/:id
// ============================================================
app.delete("/menu/:id", (req, res) => {
  const index = menu.findIndex((m) => m.id === Number(req.params.id));
  if (index === -1) {
    return sendError(res, 404, `Menu dengan id ${req.params.id} tidak ditemukan`);
  }

  menu.splice(index, 1);
  return res.status(204).send();
});

// ============================================================
// Handler 404 (Endpoint tidak ditemukan)
// ============================================================
app.use((req, res) => {
  return sendError(res, 404, `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`);
});

// ============================================================
// Error Middleware
// ============================================================
app.use((err, req, res, next) => {
  console.error("Kesalahan aplikasi:", err.message);
  return sendError(res, 500, "Terjadi kesalahan pada server");
});

export default app;