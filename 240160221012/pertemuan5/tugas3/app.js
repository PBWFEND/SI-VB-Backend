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

// ------------------------------------------------------------
// Data buku (in-memory)
// ------------------------------------------------------------
let buku = [
  { id: 1, judul: 'Belajar Node.js', penulis: 'Andi', tahun: 2024, stok: 5 },
  { id: 2, judul: 'Pemrograman Web', penulis: 'Budi', tahun: 2023, stok: 3 }
];

let nextId = 3;

const ALLOWED_FIELDS = ['judul', 'penulis', 'tahun', 'stok'];

// ------------------------------------------------------------
// Helper: cek body berupa objek JSON
// ------------------------------------------------------------
function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}

// ------------------------------------------------------------
// Helper: validasi payload lengkap (POST & PUT)
// ------------------------------------------------------------
function validateBukuPayload(body) {
  if (!isPlainObject(body)) {
    return ['Request body harus berupa objek JSON'];
  }

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

  const unknown = Object.keys(body).filter(
    (k) => !ALLOWED_FIELDS.includes(k)
  );
  if (unknown.length > 0) {
    errors.push(`Field tidak dikenal: ${unknown.join(', ')}`);
  }

  return errors;
}

// ------------------------------------------------------------
// Helper: validasi payload parsial (PATCH)
// ------------------------------------------------------------
function validatePartialBukuPayload(body) {
  if (!isPlainObject(body)) {
    return ['Request body harus berupa objek JSON'];
  }

  const keys = Object.keys(body);
  if (keys.length === 0) {
    return ['Minimal satu field harus dikirim untuk diperbarui'];
  }

  const errors = [];

  if (body.judul !== undefined) {
    if (typeof body.judul !== 'string' || body.judul.trim() === '') {
      errors.push('judul wajib berupa string dan tidak boleh kosong');
    }
  }
  if (body.penulis !== undefined) {
    if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
      errors.push('penulis wajib berupa string dan tidak boleh kosong');
    }
  }
  if (body.tahun !== undefined) {
    if (!Number.isInteger(body.tahun) || body.tahun < 0) {
      errors.push('tahun wajib berupa bilangan bulat >= 0');
    }
  }
  if (body.stok !== undefined) {
    if (!Number.isInteger(body.stok) || body.stok < 0) {
      errors.push('stok wajib berupa bilangan bulat >= 0');
    }
  }

  const unknown = keys.filter((k) => !ALLOWED_FIELDS.includes(k));
  if (unknown.length > 0) {
    errors.push(`Field tidak dikenal: ${unknown.join(', ')}`);
  }

  return errors;
}

// ------------------------------------------------------------
// Helper: validasi ID
// ------------------------------------------------------------
function validateId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// ============================================================
// 1) GET /buku — COLLECTION
// Query parameter: ?q=, ?penulis=, ?tahun=
// ============================================================
app.get('/buku', (req, res) => {
  const { q, penulis, tahun } = req.query;

  let hasil = [...buku];

  if (q) {
    const kw = String(q).toLowerCase();
    hasil = hasil.filter(
      (b) =>
        b.judul.toLowerCase().includes(kw) ||
        b.penulis.toLowerCase().includes(kw)
    );
  }

  if (penulis) {
    const kw = String(penulis).toLowerCase();
    hasil = hasil.filter((b) =>
      b.penulis.toLowerCase().includes(kw)
    );
  }

  if (tahun !== undefined) {
    const t = Number(tahun);
    if (!Number.isInteger(t)) {
      return res.status(400).json({
        success: false,
        message: 'Query tahun harus berupa angka'
      });
    }
    hasil = hasil.filter((b) => b.tahun === t);
  }

  res.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil
  });
});

// ============================================================
// 2) GET /buku/:id — DETAIL
// ============================================================
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

  res.status(200).json({ success: true, data: item });
});

// ============================================================
// 3) POST /buku — CREATE
// ============================================================
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

// ============================================================
// 4) PUT /buku/:id — UPDATE (full)
// ============================================================
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

  const updated = {
    id,
    judul: req.body.judul.trim(),
    penulis: req.body.penulis.trim(),
    tahun: req.body.tahun,
    stok: req.body.stok
  };
  buku[index] = updated;

  res.status(200).json({
    success: true,
    message: 'Buku berhasil diperbarui',
    data: updated
  });
});

// ============================================================
// 5) PATCH /buku/:id — PARTIAL UPDATE
// ============================================================
app.patch('/buku/:id', (req, res) => {
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

  const errors = validatePartialBukuPayload(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Data buku tidak valid',
      errors
    });
  }

  const current = buku[index];
  const updated = {
    id: current.id,
    judul:
      req.body.judul !== undefined
        ? req.body.judul.trim()
        : current.judul,
    penulis:
      req.body.penulis !== undefined
        ? req.body.penulis.trim()
        : current.penulis,
    tahun:
      req.body.tahun !== undefined ? req.body.tahun : current.tahun,
    stok:
      req.body.stok !== undefined ? req.body.stok : current.stok
  };
  buku[index] = updated;

  res.status(200).json({
    success: true,
    message: 'Buku berhasil diperbarui sebagian',
    data: updated
  });
});

// ============================================================
// 6) DELETE /buku/:id — DELETE
// ============================================================
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

  // 204 No Content — tanpa body
  res.status(204).send();
});

// ------------------------------------------------------------
// Handler 404 — endpoint tidak dikenal
// ------------------------------------------------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// ------------------------------------------------------------
// Error middleware
// ------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || err.statusCode || 500;
  const message =
    status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).json({ success: false, message });
});

module.exports = app;