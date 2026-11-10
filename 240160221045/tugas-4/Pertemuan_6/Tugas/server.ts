import express from "express";
import { prisma } from "./db.js";

const app = express();
const PORT = 3010;

app.use(express.json());

// GET semua mahasiswa
app.get("/mahasiswa", async (req, res) => {
  try {
    const data = await prisma.mahasiswa.findMany({
      orderBy: { nim: "asc" },
    });

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
});

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", async (req, res) => {
  try {
    const data = await prisma.mahasiswa.findUnique({
      where: { nim: req.params.nim },
    });

    if (!data) {
      res.status(404).json({ success: false, message: "Mahasiswa tidak ditemukan" });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, message: "Gagal mengambil data" });
  }
});

// POST tambah mahasiswa
app.post("/mahasiswa", async (req, res) => {
  try {
    const { nim, nama, prodi, angkatan } = req.body;

    if (
      !nim?.trim() ||
      !nama?.trim() ||
      !prodi?.trim() ||
      !Number.isInteger(angkatan) ||
      angkatan <= 0
    ) {
      res.status(400).json({
        success: false,
        message: "NIM, nama, prodi, dan angkatan wajib diisi dengan benar",
      });
      return;
    }

    const data = await prisma.mahasiswa.create({
      data: { nim, nama, prodi, angkatan },
    });

    res.status(201).json({ success: true, data });
  } catch {
    res.status(400).json({
      success: false,
      message: "Gagal menambahkan mahasiswa. Pastikan NIM belum digunakan.",
    });
  }
});

// PATCH ubah data mahasiswa
app.patch("/mahasiswa/:nim", async (req, res) => {
  try {
    const { nama, prodi, angkatan } = req.body;

    if (
      (nama !== undefined && (typeof nama !== "string" || !nama.trim())) ||
      (prodi !== undefined && (typeof prodi !== "string" || !prodi.trim())) ||
      (angkatan !== undefined &&
        (!Number.isInteger(angkatan) || angkatan <= 0))
    ) {
      res.status(400).json({
        success: false,
        message: "Data perubahan tidak valid",
      });
      return;
    }

    if (
      nama === undefined &&
      prodi === undefined &&
      angkatan === undefined
    ) {
      res.status(400).json({
        success: false,
        message: "Tidak ada data yang diubah",
      });
      return;
    }

    const data = await prisma.mahasiswa.update({
      where: { nim: req.params.nim },
      data: { nama, prodi, angkatan },
    });

    res.json({ success: true, data });
  } catch {
    res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan atau gagal diperbarui",
    });
  }
});

// DELETE hapus mahasiswa
app.delete("/mahasiswa/:nim", async (req, res) => {
  try {
    await prisma.mahasiswa.delete({
      where: { nim: req.params.nim },
    });

    res.status(204).send();
  } catch {
    res.status(404).json({
      success: false,
      message: "Mahasiswa tidak ditemukan",
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Mahasiswa berjalan di http://localhost:${PORT}`);
});