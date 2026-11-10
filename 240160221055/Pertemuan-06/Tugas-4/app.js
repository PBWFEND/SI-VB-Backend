import express from "express";
import { prisma } from "./client.js";

const app = express();

app.use(express.json());

// Logger
app.use((request, response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`
  );
  next();
});

// Validasi ID
function validasiId(id) {
  return /^\d+$/.test(id) && Number(id) > 0;
}

// Validasi data anggota
function validasiAnggota(data, wajibSemua = true) {
  const diizinkan = ["nama", "npm", "divisi"];
  const keys = Object.keys(data ?? {});

  // Mengecek field yang tidak diizinkan
  if (keys.some((key) => !diizinkan.includes(key))) {
    return "Request hanya boleh berisi field nama, npm, dan divisi";
  }

  // PATCH minimal harus mengirim satu field
  if (!wajibSemua && keys.length === 0) {
    return "Minimal satu field harus dikirim";
  }

  // Validasi field wajib
  for (const field of diizinkan) {
    if (wajibSemua || data[field] !== undefined) {
      if (
        typeof data[field] !== "string" ||
        data[field].trim() === ""
      ) {
        return `Field ${field} wajib diisi dengan teks yang valid`;
      }
    }
  }

  // Validasi nama
  if (
    data.nama !== undefined &&
    data.nama.trim().length < 2
  ) {
    return "Nama minimal terdiri dari 2 karakter";
  }

  // Validasi NPM: harus tepat 12 digit angka
  if (
    data.npm !== undefined &&
    !/^\d{12}$/.test(data.npm.trim())
  ) {
    return "NPM harus terdiri dari 12 digit angka";
  }

  return null;
}

// Membersihkan spasi pada data
function bersihkanData(data) {
  const hasil = {};

  for (const field of ["nama", "npm", "divisi"]) {
    if (data[field] !== undefined) {
      hasil[field] = data[field].trim();
    }
  }

  return hasil;
}

// ==========================================
// GET /anggota
// Mengambil semua anggota
// Mendukung filter nama dan divisi
// ==========================================
app.get("/anggota", async (request, response, next) => {
  try {
    const { nama, divisi } = request.query;

    if (
      (nama !== undefined && typeof nama !== "string") ||
      (divisi !== undefined && typeof divisi !== "string")
    ) {
      return response.status(400).json({
        success: false,
        message: "Query nama dan divisi harus berupa teks"
      });
    }

    const where = {};

    if (nama) {
      where.nama = {
        contains: nama
      };
    }

    if (divisi) {
      where.divisi = {
        equals: divisi
      };
    }

    const data = await prisma.anggota.findMany({
      where,
      orderBy: {
        id: "asc"
      }
    });

    return response.status(200).json({
      success: true,
      total: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// GET /anggota/:id
// Mengambil detail anggota
// ==========================================
app.get("/anggota/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!validasiId(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa bilangan bulat positif"
      });
    }

    const data = await prisma.anggota.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!data) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    return response.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// POST /anggota
// Menambahkan anggota baru
// ==========================================
app.post("/anggota", async (request, response, next) => {
  try {
    const errorValidasi = validasiAnggota(request.body);

    if (errorValidasi) {
      return response.status(400).json({
        success: false,
        message: errorValidasi
      });
    }

    const dataBersih = bersihkanData(request.body);

    // Mengecek apakah NPM sudah terdaftar
    const npmAda = await prisma.anggota.findUnique({
      where: {
        npm: dataBersih.npm
      }
    });

    if (npmAda) {
      return response.status(400).json({
        success: false,
        message: "NPM sudah terdaftar"
      });
    }

    const data = await prisma.anggota.create({
      data: dataBersih
    });

    return response.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// PATCH /anggota/:id
// Mengubah sebagian data anggota
// ==========================================
app.patch("/anggota/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!validasiId(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa bilangan bulat positif"
      });
    }

    const errorValidasi = validasiAnggota(
      request.body,
      false
    );

    if (errorValidasi) {
      return response.status(400).json({
        success: false,
        message: errorValidasi
      });
    }

    const anggotaLama = await prisma.anggota.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!anggotaLama) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    const dataBersih = bersihkanData(request.body);

    // Jika NPM diubah, pastikan belum digunakan
    if (dataBersih.npm) {
      const npmDipakai = await prisma.anggota.findUnique({
        where: {
          npm: dataBersih.npm
        }
      });

      if (
        npmDipakai &&
        npmDipakai.id !== Number(id)
      ) {
        return response.status(400).json({
          success: false,
          message: "NPM sudah digunakan anggota lain"
        });
      }
    }

    const data = await prisma.anggota.update({
      where: {
        id: Number(id)
      },
      data: dataBersih
    });

    return response.status(200).json({
      success: true,
      message: "Data anggota berhasil diperbarui",
      data
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// DELETE /anggota/:id
// Menghapus anggota
// ==========================================
app.delete("/anggota/:id", async (request, response, next) => {
  try {
    const { id } = request.params;

    if (!validasiId(id)) {
      return response.status(400).json({
        success: false,
        message: "ID harus berupa bilangan bulat positif"
      });
    }

    const anggotaAda = await prisma.anggota.findUnique({
      where: {
        id: Number(id)
      }
    });

    if (!anggotaAda) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    await prisma.anggota.delete({
      where: {
        id: Number(id)
      }
    });

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Endpoint tidak ditemukan
app.use((request, response) => {
  return response.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

// Error handler
app.use((error, request, response, next) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  // Error NPM unik
  if (error?.code === "P2002") {
    return response.status(400).json({
      success: false,
      message: "NPM sudah terdaftar"
    });
  }

  return response.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server"
  });
});

export default app;