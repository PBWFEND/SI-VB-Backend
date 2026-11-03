
import express from "express";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./prisma/generated/client.ts";

const app = express();
app.use(express.json());

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

const prisma = new PrismaClient({ adapter });

app.get("/", (_req, res) => {
  res.json({ message: "API Absensi Organisasi aktif" });
});


app.get("/anggota", async (_req, res) => {
  try {
    const anggota = await prisma.anggota.findMany();
    res.json(anggota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal mengambil data anggota" });
  }
});


app.post("/anggota", async (req, res) => {
  const { nama, nim } = req.body;

  if (
    typeof nama !== "string" ||
    nama.trim() === "" ||
    typeof nim !== "string" ||
    nim.trim() === ""
  ) {
    return res.status(400).json({
      message: "Nama dan NIM wajib diisi",
    });
  }

  try {
    const anggota = await prisma.anggota.create({
      data: {
        nama: nama.trim(),
        nim: nim.trim(),
      },
    });

    return res.status(201).json(anggota);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "NIM sudah terdaftar",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal menambahkan anggota",
    });
  }
});


app.get("/anggota/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID anggota harus berupa bilangan bulat positif",
    });
  }

  try {
    const anggota = await prisma.anggota.findUnique({
      where: { id },
    });

    if (!anggota) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }

    return res.json(anggota);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Gagal mengambil detail anggota",
    });
  }
});


app.patch("/anggota/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { nama, nim } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID anggota tidak valid",
    });
  }

  const data: { nama?: string; nim?: string } = {};

  if (nama !== undefined) {
    if (typeof nama !== "string" || nama.trim() === "") {
      return res.status(400).json({
        message: "Nama harus berupa teks dan tidak boleh kosong",
      });
    }
    data.nama = nama.trim();
  }

  if (nim !== undefined) {
    if (typeof nim !== "string" || nim.trim() === "") {
      return res.status(400).json({
        message: "NIM harus berupa teks dan tidak boleh kosong",
      });
    }
    data.nim = nim.trim();
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      message: "Masukkan nama atau NIM yang ingin diubah",
    });
  }

  try {
    const anggota = await prisma.anggota.update({
      where: { id },
      data,
    });

    return res.json(anggota);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "NIM sudah terdaftar",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal mengubah data anggota",
    });
  }
});


app.delete("/anggota/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID anggota tidak valid",
    });
  }

  try {
    const anggota = await prisma.anggota.delete({
      where: { id },
    });

    return res.json({
      message: "Anggota berhasil dihapus",
      data: anggota,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal menghapus anggota",
    });
  }
});


app.get("/absensi", async (req, res) => {
  const { anggota_id, status } = req.query;

  const where: {
    anggota_id?: number;
    status?: string;
  } = {};

  if (anggota_id !== undefined) {
    const id = Number(anggota_id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        message: "anggota_id harus berupa bilangan bulat positif",
      });
    }

    where.anggota_id = id;
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !["Hadir", "Izin", "Sakit", "Alpha"].includes(status)
    ) {
      return res.status(400).json({
        message: "Status harus Hadir, Izin, Sakit, atau Alpha",
      });
    }

    where.status = status;
  }

  try {
    const absensi = await prisma.absensi.findMany({
      where,
      orderBy: { id: "asc" },
    });

    return res.json({
      success: true,
      message: "Data absensi berhasil diambil",
      total: absensi.length,
      data: absensi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Gagal mengambil data absensi",
    });
  }
});


app.post("/absensi", async (req, res) => {
  const { anggota_id, kegiatan_id, status } = req.body;

  if (
    !Number.isInteger(anggota_id) ||
    anggota_id <= 0 ||
    !Number.isInteger(kegiatan_id) ||
    kegiatan_id <= 0 ||
    typeof status !== "string" ||
    !["Hadir", "Izin", "Sakit", "Alpha"].includes(status)
  ) {
    return res.status(400).json({
      message:
        "anggota_id dan kegiatan_id harus bilangan bulat positif, serta status harus Hadir, Izin, Sakit, atau Alpha",
    });
  }

  try {
    const anggota = await prisma.anggota.findUnique({
      where: { id: anggota_id },
    });

    if (!anggota) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }

    const absensi = await prisma.absensi.create({
      data: {
        anggota_id,
        kegiatan_id,
        status,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Absensi berhasil ditambahkan",
      data: absensi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Gagal menambahkan absensi",
    });
  }
});


app.get("/absensi/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID absensi harus berupa bilangan bulat positif",
    });
  }

  try {
    const absensi = await prisma.absensi.findUnique({
      where: { id },
    });

    if (!absensi) {
      return res.status(404).json({
        message: "Absensi tidak ditemukan",
      });
    }

    return res.json({
      success: true,
      message: "Data absensi berhasil diambil",
      data: absensi,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Gagal mengambil data absensi",
    });
  }
});


app.put("/absensi/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { anggota_id, kegiatan_id, status } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID absensi harus berupa bilangan bulat positif",
    });
  }

  if (
    !Number.isInteger(anggota_id) ||
    anggota_id <= 0 ||
    !Number.isInteger(kegiatan_id) ||
    kegiatan_id <= 0 ||
    typeof status !== "string" ||
    !["Hadir", "Izin", "Sakit", "Alpha"].includes(status)
  ) {
    return res.status(400).json({
      message: "Data absensi tidak valid",
    });
  }

  try {
    const anggota = await prisma.anggota.findUnique({
      where: { id: anggota_id },
    });

    if (!anggota) {
      return res.status(404).json({
        message: "Anggota tidak ditemukan",
      });
    }

    const absensi = await prisma.absensi.update({
      where: { id },
      data: { anggota_id, kegiatan_id, status },
    });

    return res.json({
      success: true,
      message: "Absensi berhasil diperbarui",
      data: absensi,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Absensi tidak ditemukan",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal memperbarui absensi",
    });
  }
});


app.patch("/absensi/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { anggota_id, kegiatan_id, status } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID absensi harus berupa bilangan bulat positif",
    });
  }

  const data: {
    anggota_id?: number;
    kegiatan_id?: number;
    status?: string;
  } = {};

  if (anggota_id !== undefined) {
    if (!Number.isInteger(anggota_id) || anggota_id <= 0) {
      return res.status(400).json({
        message: "anggota_id harus berupa bilangan bulat positif",
      });
    }
    data.anggota_id = anggota_id;
  }

  if (kegiatan_id !== undefined) {
    if (!Number.isInteger(kegiatan_id) || kegiatan_id <= 0) {
      return res.status(400).json({
        message: "kegiatan_id harus berupa bilangan bulat positif",
      });
    }
    data.kegiatan_id = kegiatan_id;
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !["Hadir", "Izin", "Sakit", "Alpha"].includes(status)
    ) {
      return res.status(400).json({
        message: "Status harus Hadir, Izin, Sakit, atau Alpha",
      });
    }
    data.status = status;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      message: "Minimal satu data harus diisi",
    });
  }

  try {
    if (data.anggota_id !== undefined) {
      const anggota = await prisma.anggota.findUnique({
        where: { id: data.anggota_id },
      });

      if (!anggota) {
        return res.status(404).json({
          message: "Anggota tidak ditemukan",
        });
      }
    }

    const absensi = await prisma.absensi.update({
      where: { id },
      data,
    });

    return res.json({
      success: true,
      message: "Absensi berhasil diperbarui",
      data: absensi,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Absensi tidak ditemukan",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal memperbarui absensi",
    });
  }
});


app.delete("/absensi/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      message: "ID absensi harus berupa bilangan bulat positif",
    });
  }

  try {
    const absensi = await prisma.absensi.delete({
      where: { id },
    });

    return res.json({
      success: true,
      message: "Absensi berhasil dihapus",
      data: absensi,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        message: "Absensi tidak ditemukan",
      });
    }

    console.error(error);
    return res.status(500).json({
      message: "Gagal menghapus absensi",
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
