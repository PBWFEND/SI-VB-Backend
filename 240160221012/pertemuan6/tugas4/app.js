const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

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

const ALLOWED_FIELDS = ['judul', 'penulis', 'tahun', 'stok'];

// ---------------- Helper validasi ----------------
function isPlainObject(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}

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

function validateId(idParam) {
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// ==================================================
// 1) GET /buku — COLLECTION (Prisma findMany)
// Query: ?q=, ?penulis=, ?tahun=
// ==================================================
app.get('/buku', async (req, res, next) => {
  try {
    const { q, penulis, tahun } = req.query;

    const where = {};

    if (q) {
      const kw = String(q);
      where.OR = [
        { judul: { contains: kw } },
        { penulis: { contains: kw } }
      ];
    }

    if (penulis) {
      where.penulis = { contains: String(penulis) };
    }

    if (tahun !== undefined) {
      const t = Number(tahun);
      if (!Number.isInteger(t)) {
        return res.status(400).json({
          success: false,
          message: 'Query tahun harus berupa angka'
        });
      }
      where.tahun = t;
    }

    const data = await prisma.buku.findMany({ where });

    res.status(200).json({
      success: true,
      total: data.length,
      data
    });
  } catch (err) {
    next(err);
  }
});

// ==================================================
// 2) GET /buku/:id — DETAIL (Prisma findUnique)
// ==================================================
app.get('/buku/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        message: 'ID buku tidak valid'
      });
    }

    const item = await prisma.buku.findUnique({ where: { id } });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Buku tidak ditemukan'
      });
    }

    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
});

// ==================================================
// 3) POST /buku — CREATE (Prisma create)
// ==================================================
app.post('/buku', async (req, res, next) => {
  try {
    const errors = validateBukuPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Data buku tidak valid',
        errors
      });
    }

    const itemBaru = await prisma.buku.create({
      data: {
        judul: req.body.judul.trim(),
        penulis: req.body.penulis.trim(),
        tahun: req.body.tahun,
        stok: req.body.stok
      }
    });

    res.status(201).json({
      success: true,
      message: 'Buku berhasil ditambahkan',
      data: itemBaru
    });
  } catch (err) {
    next(err);
  }
});

// ==================================================
// 4) PUT /buku/:id — UPDATE penuh (Prisma update)
// ==================================================
app.put('/buku/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        message: 'ID buku tidak valid'
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

    const updated = await prisma.buku.update({
      where: { id },
      data: {
        judul: req.body.judul.trim(),
        penulis: req.body.penulis.trim(),
        tahun: req.body.tahun,
        stok: req.body.stok
      }
    });

    res.status(200).json({
      success: true,
      message: 'Buku berhasil diperbarui',
      data: updated
    });
  } catch (err) {
    // Prisma error P2025: record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Buku tidak ditemukan'
      });
    }
    next(err);
  }
});

// ==================================================
// 5) PATCH /buku/:id — PARTIAL UPDATE (Prisma update)
// ==================================================
app.patch('/buku/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        message: 'ID buku tidak valid'
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

    const data = {};
    if (req.body.judul !== undefined) data.judul = req.body.judul.trim();
    if (req.body.penulis !== undefined)
      data.penulis = req.body.penulis.trim();
    if (req.body.tahun !== undefined) data.tahun = req.body.tahun;
    if (req.body.stok !== undefined) data.stok = req.body.stok;

    const updated = await prisma.buku.update({
      where: { id },
      data
    });

    res.status(200).json({
      success: true,
      message: 'Buku berhasil diperbarui sebagian',
      data: updated
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Buku tidak ditemukan'
      });
    }
    next(err);
  }
});

// ==================================================
// 6) DELETE /buku/:id — DELETE (Prisma delete)
// ==================================================
app.delete('/buku/:id', async (req, res, next) => {
  try {
    const id = validateId(req.params.id);
    if (id === null) {
      return res.status(400).json({
        success: false,
        message: 'ID buku tidak valid'
      });
    }

    await prisma.buku.delete({ where: { id } });

    // 204 No Content — tanpa body
    res.status(204).send();
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Buku tidak ditemukan'
      });
    }
    next(err);
  }
});

// ---------------- Handler 404 ----------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan'
  });
});

// ---------------- Error middleware ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || err.statusCode || 500;
  const message =
    status === 500 ? 'Internal Server Error' : err.message;
  res.status(status).json({ success: false, message });
});

module.exports = app;