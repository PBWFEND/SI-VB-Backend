
import "dotenv/config";
import express from "express";
import { prisma } from "./client.ts";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3010;

// GET seluruh data mahasiswa
app.get("/mahasiswa", async (req, res) => {
  try {
    const { prodi, semester } = req.query;

    const mahasiswa = await prisma.mahasiswa.findMany({
      where: {
        ...(typeof prodi === "string" ? { prodi } : {}),
        ...(typeof semester === "string"
          ? { semester: Number(semester) }
          : {}),
      },
    });

    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// GET mahasiswa berdasarkan NIM
app.get("/mahasiswa/:nim", async (req, res) => {
  try {
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: { nim: req.params.nim },
    });

    if (!mahasiswa) {
      return res.status(404).json({
        message: "Mahasiswa tidak ditemukan",
      });
    }

    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// POST menambahkan mahasiswa
app.post("/mahasiswa", async (req, res) => {
  try {
    const { nim, nama, prodi, semester } = req.body;

    if (
      !nim ||
      !nama ||
      !prodi ||
      semester === undefined ||
      !Number.isInteger(semester) ||
      semester < 1
    ) {
      return res.status(400).json({
        message: "NIM, nama, prodi, dan semester wajib diisi dengan benar",
      });
    }

    const mahasiswa = await prisma.mahasiswa.create({
      data: { nim, nama, prodi, semester },
    });

    res.status(201).json({
      message: "Mahasiswa berhasil ditambahkan",
      data: mahasiswa,
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal menambahkan mahasiswa. NIM mungkin sudah digunakan.",
    });
  }
});

// PATCH memperbarui mahasiswa
app.patch("/mahasiswa/:nim", async (req, res) => {
  try {
    const { nama, prodi, semester } = req.body;

    const data: {
      nama?: string;
      prodi?: string;
      semester?: number;
    } = {};

    if (nama !== undefined) data.nama = nama;
    if (prodi !== undefined) data.prodi = prodi;

    if (semester !== undefined) {
      if (!Number.isInteger(semester) || semester < 1) {
        return res.status(400).json({
          message: "Semester harus berupa bilangan bulat minimal 1",
        });
      }
      data.semester = semester;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "Minimal satu data harus diubah",
      });
    }

    const mahasiswa = await prisma.mahasiswa.update({
      where: { nim: req.params.nim },
      data,
    });

    res.status(200).json({
      message: "Data mahasiswa berhasil diperbarui",
      data: mahasiswa,
    });
  } catch (error) {
    res.status(404).json({
      message: "Mahasiswa tidak ditemukan",
    });
  }
});

// DELETE menghapus mahasiswa
app.delete("/mahasiswa/:nim", async (req, res) => {
  try {
    await prisma.mahasiswa.delete({
      where: { nim: req.params.nim },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({
      message: "Mahasiswa tidak ditemukan",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
