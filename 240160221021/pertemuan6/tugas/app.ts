import express from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

function validasiBuku(body: any, parsial = false) {
  const errors: string[] = [];
  const { judul, penulis, tahun, stok } = body ?? {};

  if (!parsial || judul !== undefined) {
    if (typeof judul !== "string" || judul.trim() === "") errors.push("judul wajib berupa teks");
  }
  if (!parsial || penulis !== undefined) {
    if (typeof penulis !== "string" || penulis.trim() === "") errors.push("penulis wajib berupa teks");
  }
  if (!parsial || tahun !== undefined) {
    if (!Number.isInteger(tahun)) errors.push("tahun wajib berupa angka bulat");
  }
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) {
    errors.push("stok harus angka bulat >= 0");
  }
  return errors;
}

// GET semua buku (bisa filter ?stokMin=1)
app.get("/buku", async (req, res) => {
  const where: any = {};
  if (req.query.stokMin !== undefined) {
    where.stok = { gte: Number(req.query.stokMin) };
  }
  const data = await prisma.buku.findMany({ where, orderBy: { judul: "asc" } });
  res.json({ total: data.length, data });
});

// GET detail satu buku
app.get("/buku/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus angka" });

  const buku = await prisma.buku.findFirst({ where: { id } });
  if (!buku) return res.status(404).json({ error: "Buku tidak ditemukan" });
  res.json(buku);
});

// POST tambah buku
app.post("/buku", async (req, res) => {
  const errors = validasiBuku(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const { judul, penulis, tahun, stok } = req.body;
  const baru = await prisma.buku.create({
    data: { judul: judul.trim(), penulis: penulis.trim(), tahun, stok },
  });
  res.status(201).json(baru);
});

// PATCH ubah sebagian data buku
app.patch("/buku/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus angka" });

  const errors = validasiBuku(req.body, true);
  if (errors.length > 0) return res.status(400).json({ errors });

  const ada = await prisma.buku.findFirst({ where: { id } });
  if (!ada) return res.status(404).json({ error: "Buku tidak ditemukan" });

  const { judul, penulis, tahun, stok } = req.body;
  const diperbarui = await prisma.buku.update({
    where: { id },
    data: { judul, penulis, tahun, stok },
  });
  res.json(diperbarui);
});

// DELETE hapus buku
app.delete("/buku/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: "id harus angka" });

  const ada = await prisma.buku.findFirst({ where: { id } });
  if (!ada) return res.status(404).json({ error: "Buku tidak ditemukan" });

  await prisma.buku.delete({ where: { id } });
  res.status(204).send();
});

export default app;