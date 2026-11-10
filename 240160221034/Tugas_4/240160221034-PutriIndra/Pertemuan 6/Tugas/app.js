/**
 * Pertemuan 6 — RESTful API dengan Express.js dan Prisma
 * Tujuan: menyediakan endpoint CRUD buku menggunakan database SQLite.
 */

import express from "express";
import { prisma } from "./client.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (response, statusCode, message, data) => {
  return response.status(statusCode).json({ success: true, message, data });
};

const sendError = (response, statusCode, message, details = undefined) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};

app.use((request, response, next) => {
  console.log(`[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`);
  next();
});

const getId = (request) => Number(request.params.id);

const validateId = (id) => Number.isInteger(id) && id > 0;

app.get("/", (request, response) => {
  return sendSuccess(response, 200, "REST API Pertemuan 6", {
    resource: "buku",
    endpoints: [
      "GET /buku",
      "GET /buku/:id",
      "POST /buku",
      "PUT /buku/:id",
      "PATCH /buku/:id",
      "DELETE /buku/:id",
    ],
  });
});

app.get("/health", (request, response) => {
  return sendSuccess(response, 200, "API berjalan", { status: "up" });
});

// GET semua buku dengan filter
app.get("/buku", async (request, response, next) => {
  try {
    const { penulis, tahun, minStok } = request.query;

    const where = {};

    if (penulis !== undefined) {
      where.penulis = { equals: String(penulis) };
    }

    if (tahun !== undefined) {
      const nilaiTahun = Number(tahun);
      if (!Number.isInteger(nilaiTahun)) {
        return sendError(response, 400, "Parameter tahun tidak valid");
      }
      where.tahun = nilaiTahun;
    }

    if (minStok !== undefined) {
      const nilaiStok = Number(minStok);
      if (!Number.isInteger(nilaiStok) || nilaiStok < 0) {
        return sendError(response, 400, "Parameter minStok tidak valid");
      }
      where.stok = { gte: nilaiStok };
    }

    const data = await prisma.buku.findMany({ where });

    return sendSuccess(response, 200, "Daftar buku berhasil diambil", {
      total: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
});

// GET detail buku
app.get("/buku/:id", async (request, response, next) => {
  try {
    const id = getId(request);

    if (!validateId(id)) {
      return sendError(response, 400, "ID buku tidak valid");
    }

    const item = await prisma.buku.findUnique({ where: { id } });

    if (!item) {
      return sendError(response, 404, "Buku tidak ditemukan");
    }

    return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
  } catch (error) {
    next(error);
  }
});

// Validasi data buku
const validateBook = (payload, partial = false) => {
  const errors = [];
  const requiredFields = ["judul", "penulis", "tahun", "stok"];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return ["Body harus berupa objek JSON"];
  }

  if (!partial) {
    for (const field of requiredFields) {
      if (payload[field] === undefined) {
        errors.push(`Field ${field} wajib diisi`);
      }
    }
  }

  if (payload.judul !== undefined &&
      (typeof payload.judul !== "string" || !payload.judul.trim())) {
    errors.push("judul harus berupa string dan tidak boleh kosong");
  }

  if (payload.penulis !== undefined &&
      (typeof payload.penulis !== "string" || !payload.penulis.trim())) {
    errors.push("penulis harus berupa string dan tidak boleh kosong");
  }

  if (payload.tahun !== undefined &&
      (!Number.isInteger(payload.tahun) || payload.tahun < 1900)) {
    errors.push("tahun tidak valid");
  }

  if (payload.stok !== undefined &&
      (!Number.isInteger(payload.stok) || payload.stok < 0)) {
    errors.push("stok harus bilangan bulat minimal 0");
  }

  return errors;
};

const getBookData = (payload) => {
  const { judul, penulis, tahun, stok } = payload;
  return {
    ...(judul !== undefined && { judul: judul.trim() }),
    ...(penulis !== undefined && { penulis: penulis.trim() }),
    ...(tahun !== undefined && { tahun }),
    ...(stok !== undefined && { stok }),
  };
};

// POST tambah buku
app.post("/buku", async (request, response, next) => {
  try {
    const errors = validateBook(request.body);

    if (errors.length > 0) {
      return sendError(response, 400, "Data buku tidak valid", errors);
    }

    const baru = await prisma.buku.create({
      data: getBookData(request.body),
    });

    return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
  } catch (error) {
    next(error);
  }
});

// PUT ganti seluruh data buku
app.put("/buku/:id", async (request, response, next) => {
  try {
    const id = getId(request);

    if (!validateId(id)) {
      return sendError(response, 400, "ID buku tidak valid");
    }

    const errors = validateBook(request.body);

    if (errors.length > 0) {
      return sendError(response, 400, "Data buku tidak valid", errors);
    }

    const data = getBookData(request.body);

    const item = await prisma.buku.update({
      where: { id },
      data,
    });

    return sendSuccess(response, 200, "Buku berhasil diganti", item);
  } catch (error) {
    if (error.code === "P2025") {
      return sendError(response, 404, "Buku tidak ditemukan");
    }
    next(error);
  }
});

// PATCH ubah sebagian data buku
app.patch("/buku/:id", async (request, response, next) => {
  try {
    const id = getId(request);

    if (!validateId(id)) {
      return sendError(response, 400, "ID buku tidak valid");
    }

    const errors = validateBook(request.body, true);

    if (errors.length > 0) {
      return sendError(response, 400, "Data perubahan tidak valid", errors);
    }

    if (Object.keys(request.body).length === 0) {
      return sendError(response, 400, "Minimal satu field harus diubah");
    }

    const item = await prisma.buku.update({
      where: { id },
      data: getBookData(request.body),
    });

    return sendSuccess(response, 200, "Buku berhasil diperbarui", item);
  } catch (error) {
    if (error.code === "P2025") {
      return sendError(response, 404, "Buku tidak ditemukan");
    }
    next(error);
  }
});

// DELETE hapus buku
app.delete("/buku/:id", async (request, response, next) => {
  try {
    const id = getId(request);

    if (!validateId(id)) {
      return sendError(response, 400, "ID buku tidak valid");
    }

    await prisma.buku.delete({ where: { id } });

    return response.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return sendError(response, 404, "Buku tidak ditemukan");
    }
    next(error);
  }
});

// Endpoint tidak ditemukan
app.use((request, response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

// Penanganan kesalahan
app.use((error, request, response, next) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

export default app;
