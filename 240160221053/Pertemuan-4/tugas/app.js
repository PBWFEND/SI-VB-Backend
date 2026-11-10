const express = require('express');
const app = express();

// 4. Middleware JSON dan Logger
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

// 3 & 5. Endpoint GET Daftar (dengan Query Parameter)
// Contoh: GET /api/books?author=Andrea
app.get('/api/books', (req, res) => {
  const { author } = req.query;
  let result = books;
  
  if (author) {
    result = books.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }
  
  res.status(200).json({ status: "success", data: result });
});

// 3 & 5. Endpoint GET Detail (dengan Route Parameter)
// Contoh: GET /api/books/1
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    // Meneruskan error ke error middleware (atau bisa langsung res.status(404).json(...))
    const error = new Error("Buku tidak ditemukan");
    error.status = 404;
    return next(error); 
  }
  
  res.status(200).json({ status: "success", data: book });
});

// 3. Endpoint POST (Tambah Buku)
app.post('/api/books', (req, res) => {
  const { title, author, stock } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ status: "error", message: "Title dan author wajib diisi" });
  }
  
  const newBook = { id: nextId++, title, author, stock: stock || 0 };
  books.push(newBook);
  
  res.status(201).json({ status: "success", data: newBook });
});

// Endpoint Tambahan: DELETE (Agar lengkap minimal 4 endpoint)
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  
  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Buku tidak ditemukan" });
  }
  
  books.splice(index, 1);
  res.status(204).send(); // 204 No Content
});

// 7. Handler 404 (Jika rute tidak ada)
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Endpoint tidak ditemukan" });
});

// 7. Error Middleware (Menangkap semua error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error"
  });
});

module.exports = app;