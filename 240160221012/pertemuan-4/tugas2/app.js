const express = require('express');

const app = express();

// Middleware JSON
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`
    );
  });

  next();
});

// Data buku disimpan di memori
let buku = [
  {
    id: 1,
    judul: 'Belajar Node.js',
    penulis: 'Andi',
    tahun: 2024,
    stok: 5
  },
  {
    id: 2,
    judul: 'Pemrograman Web',
    penulis: 'Budi',
    tahun: 2023,
    stok: 3
  }
];

let nextId = 3;

// Helper validasi data buku
function validateBukuPayload(body) {
  body = body || {};

  const errors = [];

  if (typeof body.judul !== 'string' || body.judul.trim() === '') {
    errors.push('judul wajib diisi dan berupa string');
  }

  if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
    errors.push('penulis wajib diisi dan berupa string');
  }

  if (!Number.isInteger(body.tahun) || body.tahun < 0) {
    errors.push('tahun wajib berupa bilangan bulat >= 0');
  }

  if (!Number.isInteger(body.stok) || body.stok < 0) {
    errors.push('stok wajib berupa bilangan bulat >= 0');
  }

  return errors;
}

// Helper validasi ID
function validateId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// GET /buku
// Mendukung query parameter: ?q=, ?penulis=, ?tahun=
app.get('/buku', (req, res) => {
  const { q, penulis, tahun } = req.query;

  let hasil = [...buku];

  if (q) {
    const keyword = String(q).toLowerCase();
    hasil = hasil.filter(
      (item) =>
        item.judul.toLowerCase().includes(keyword) ||
        item.penulis.toLowerCase().includes(keyword)
    );
  }

  if (penulis) {
    const keywordPenulis = String(penulis).toLowerCase();
    hasil = hasil.filter((item) =>
      item.penulis.toLowerCase().includes(keywordPenulis)
    );
  }

  if (tahun !== undefined) {
    const tahunAngka = Number(tahun);

    if (!Number.isInteger(tahunAngka)) {
      return res.status(400).json({
        success: false,
        message: 'Query tahun harus berupa angka'
      });
    }

    hasil = hasil.filter((item) => item.tahun === tahunAngka);
  }

  res.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil
  });
});

// GET /buku/:id
app.get('/buku/:id', (req, res) => {
  const id = validateId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'ID buku tidak valid'
    });
  }

  const item = buku.find((b) => b.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Buku tidak ditemukan'
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// POST /buku
app.post('/buku', (req, res) => {
  const errors = validateBukuPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Data buku tidak valid',
      errors
    });
  }

  const itemBaru = {
    id: nextId++,
    judul: req.body.judul.trim(),
    penulis: req.body.penulis.trim(),
    tahun: req.body.tahun,
    stok: req.body.stok
  };

  buku.push(itemBaru);

  res.status(201).json({
    success: true,
    message: 'Buku berhasil ditambahkan',
    data: itemBaru
  });
});

// PUT /buku/:id
app.put('/buku/:id', (req, res) => {
  const id = validateId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'ID buku tidak valid'
    });
  }

  const index = buku.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Buku tidak ditemukan'
    });
  }

  const errors = validateBukuPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Data buku tidak valid',
      errors
    });
  }

  const itemDiperbarui = {
    id,
    judul: req.body.judul.trim(),
    penulis: req.body.penulis.trim(),
    tahun: req.body.tahun,
    stok: req.body.stok
  };

  buku[index] = itemDiperbarui;

  res.status(200).json({
    success: true,
    message: 'Buku berhasil diperbarui',
    data: itemDiperbarui
  });
});

// DELETE /buku/:id
app.delete('/buku/:id', (req, res) => {
  const id = validateId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      success: false,
      message: 'ID buku tidak valid'
    });
  }

  const index = buku.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Buku tidak ditemukan'
    });
  }

  buku.splice(index, 1);

  res.status(204).send();
});

// Handler 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// Error middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || err.statusCode || 500;
  const message =
    status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    success: false,
    message
  });
});

module.exports = app;