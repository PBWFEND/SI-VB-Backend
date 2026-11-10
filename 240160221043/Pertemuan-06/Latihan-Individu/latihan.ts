
import express from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3009;

// GET pengguna berdasarkan NIM
app.get("/pengguna/:nim", async (req, res) => {
  try {
    const pengguna = await prisma.pengguna.findUnique({
      where: { nim: req.params.nim },
    });

    if (!pengguna) {
      return res.status(404).json({
        message: "Pengguna tidak ditemukan",
      });
    }

    res.status(200).json(pengguna);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// POST tambah pengguna
app.post("/pengguna", async (req, res) => {
  try {
    const { nim, nama, email, role } = req.body;

    if (!nim || !nama || !email || !role) {
      return res.status(400).json({
        message: "NIM, nama, email, dan role wajib diisi",
      });
    }

    const pengguna = await prisma.pengguna.create({
      data: { nim, nama, email, role },
    });

    res.status(201).json({
      message: "Pengguna berhasil ditambahkan",
      data: pengguna,
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal menambahkan pengguna. NIM atau email mungkin sudah digunakan.",
    });
  }
});

// PATCH ubah pengguna
app.patch("/pengguna/:nim", async (req, res) => {
  try {
    const { nama, email, role } = req.body;

    const data: { nama?: string; email?: string; role?: string } = {};

    if (nama !== undefined) data.nama = nama;
    if (email !== undefined) data.email = email;
    if (role !== undefined) data.role = role;

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Minimal satu data harus diubah",
      });
    }

    const pengguna = await prisma.pengguna.update({
      where: { nim: req.params.nim },
      data,
    });

    res.status(200).json({
      message: "Pengguna berhasil diperbarui",
      data: pengguna,
    });
  } catch (error) {
    res.status(404).json({
      message: "Pengguna tidak ditemukan atau data tidak valid",
    });
  }
});

// DELETE hapus pengguna
app.delete("/pengguna/:nim", async (req, res) => {
  try {
    await prisma.pengguna.delete({
      where: { nim: req.params.nim },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: "Pengguna tidak ditemukan",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
