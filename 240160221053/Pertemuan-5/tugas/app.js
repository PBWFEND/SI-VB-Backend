const express = require('express');
const app = express();

// 4. Middleware JSON & Logger
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// In-Memory Database
let books = [
  { id: 1, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", stock: 5 },
  { id: 2, title: "Laskar Pelangi", author: "Andrea Hirata", stock: 3 }
];
let nextId = 3;

// Helper untuk struktur JSON konsisten
const sendResponse = (res, status, message, data = null) => {
  res.status(status).json({ status: status < 400 ? "success" : "error", message, data });
};

// 1. Collection (GET) + 3. Query Parameter untuk filter
app.get('/api/books', (req, res) => {
  const { author, minStock } = req.query;
  let result = books;

  // Filter berdasarkan author (case-insensitive)
  if (author) {
    result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }
  
  // Filter berdasarkan stok minimum
  if (minStock) {
    result = result.filter(b => b.stock >= parseInt(minStock));
  }

  sendResponse(res, 200, "Daftar buku berhasil diambil", result);
});

// 2. Detail (GET)
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  
  // 5. Response 404
  if (!book) return sendResponse(res, 404, "Buku tidak ditemukan");
  
  sendResponse(res, 200, "Detail buku berhasil diambil", book);
});

// 3. Create (POST) + 4. Validasi Input
app.post('/api/books', (req, res) => {
  const { title, author, stock } = req.body;
  
  // Validasi 400
  if (!title || !author || stock === undefined) {
    return sendResponse(res, 400, "Validasi gagal: title, author, dan stock wajib diisi");
  }
  if (typeof stock !== 'number' || stock < 0) {
    return sendResponse(res, 400, "Validasi gagal: stock harus berupa angka positif");
  }

  const newBook = { id: nextId++, title, author, stock };
  books.push(newBook);
  sendResponse(res, 201, "Buku berhasil ditambahkan", newBook);
});

// 4. Update / Replace (PUT) + 4. Validasi Input
app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) return sendResponse(res, 404, "Buku tidak ditemukan");

  const { title, author, stock } = req.body;
  if (!title || !author || stock === undefined) {
    return sendResponse(res, 400, "Validasi gagal: title, author, dan stock wajib diisi untuk PUT");
  }

  books[index] = { id, title, author, stock };
  sendResponse(res, 200, "Buku berhasil diperbarui (PUT)", books[index]);
});

// 5. Partial Update (PATCH)
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) return sendResponse(res, 404, "Buku tidak ditemukan");

  const updates = req.body;
  // Validasi tipe data jika stok ikut diupdate
  if (updates.stock !== undefined && (typeof updates.stock !== 'number' || updates.stock < 0)) {
    return sendResponse(res, 400, "Validasi gagal: stock harus berupa angka positif");
  }

  // Gabungkan data lama dengan data yang diupdate
  books[index] = { ...books[index], ...updates };
  sendResponse(res, 200, "Buku berhasil diperbarui sebagian (PATCH)", books[index]);
});

// 6. Delete (DELETE) + Response 204
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) return sendResponse(res, 404, "Buku tidak ditemukan");

  books.splice(index, 1);
  // 204 No Content (tanpa body)
  res.status(204).send();
});

// Handler 404 untuk endpoint yang tidak ada
app.use((req, res) => sendResponse(res, 404, "Endpoint tidak ditemukan"));

// Error Middleware (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  sendResponse(res, 500, "Internal Server Error");
});

module.exports = app;