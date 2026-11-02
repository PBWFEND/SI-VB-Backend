import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

// ------------------------------------------------------------------
// VALIDASI
// ------------------------------------------------------------------

function validasiPengguna(data: unknown): {
  valid: boolean;
  message?: string;
  data?: {
    nim: string;
    nama: string;
    email: string;
    role?: string;
  };
} {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return {
      valid: false,
      message: "Body request harus berupa object",
    };
  }

  const body = data as Record<string, unknown>;
  const { nim, nama, email, role } = body;

  if (typeof nim !== "string" || nim.trim() === "") {
    return {
      valid: false,
      message: "NIM wajib diisi dan harus berupa teks",
    };
  }

  if (typeof nama !== "string" || nama.trim() === "") {
    return {
      valid: false,
      message: "Nama wajib diisi dan harus berupa teks",
    };
  }

  if (typeof email !== "string" || email.trim() === "") {
    return {
      valid: false,
      message: "Email wajib diisi dan harus berupa teks",
    };
  }

  if (role !== undefined && typeof role !== "string") {
    return {
      valid: false,
      message: "Role harus berupa teks",
    };
  }

  return {
    valid: true,
    data: {
      nim: nim.trim(),
      nama: nama.trim(),
      email: email.trim(),
      role: typeof role === "string" ? role.trim() : undefined,
    },
  };
}

// ------------------------------------------------------------------
// SERVICE — seluruh operasi Prisma ada di sini.
// ------------------------------------------------------------------

/**
 * TODO 1
 * Mengambil daftar pengguna dengan filter NIM opsional.
 */
export const ambilDaftarPengguna = async (nim?: string) => {
  return prisma.pengguna.findMany({
    where: nim
      ? {
          nim: {
            contains: nim,
          },
        }
      : undefined,
  });
};

/**
 * TODO 2
 * Membuat pengguna baru.
 *
 * Validasi dilakukan di luar operasi database,
 * sehingga fungsi ini hanya bertanggung jawab melakukan create.
 */
export const buatPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role?: string;
}) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      ...(data.role !== undefined && { role: data.role }),
    },
  });
};

/**
 * Service untuk mencari pengguna berdasarkan NIM.
 */
export const ambilPenggunaByNim = async (nim: string) => {
  return prisma.pengguna.findUnique({
    where: { nim },
  });
};

/**
 * Service untuk menghapus pengguna berdasarkan NIM.
 */
export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({
    where: { nim },
  });
};

// ------------------------------------------------------------------
// ROUTE
// ------------------------------------------------------------------

const penggunaRoutes = express.Router();

// GET /pengguna
penggunaRoutes.get("/", async (request: Request, response: Response) => {
  try {
    const nimRaw = request.query.nim;

    if (nimRaw !== undefined && typeof nimRaw !== "string") {
      return response.status(400).json({
        success: false,
        message: "Query NIM harus berupa teks",
      });
    }

    const nimFilter = typeof nimRaw === "string" ? nimRaw : undefined;

    const data = await ambilDaftarPengguna(nimFilter);

    return response.status(200).json({
      success: true,
      message: "Daftar pengguna",
      data,
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

// ------------------------------------------------------------------
// TODO 3 — POST /pengguna
// ------------------------------------------------------------------

penggunaRoutes.post("/", async (request: Request, response: Response) => {
  try {
    const hasilValidasi = validasiPengguna(request.body);

    if (!hasilValidasi.valid || !hasilValidasi.data) {
      return response.status(400).json({
        success: false,
        message: hasilValidasi.message,
      });
    }

    const data = await buatPengguna(hasilValidasi.data);

    return response.status(201).json({
      success: true,
      message: "Pengguna berhasil ditambahkan",
      data,
    });
  } catch (error: any) {
    console.error(error);

    if (error?.code === "P2002") {
      return response.status(400).json({
        success: false,
        message: "NIM atau email sudah terdaftar",
      });
    }

    return response.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

// ------------------------------------------------------------------
// TODO 4 — DELETE /pengguna/:nim
// ------------------------------------------------------------------

penggunaRoutes.delete(
  "/:nim",
  async (request: Request, response: Response) => {
    try {
      const { nim } = request.params;

      if (typeof nim !== "string" || nim.trim() === "") {
        return response.status(400).json({
          success: false,
          message: "NIM tidak valid",
        });
      }

      const pengguna = await ambilPenggunaByNim(nim);

      if (!pengguna) {
        return response.status(404).json({
          success: false,
          message: "Pengguna tidak ditemukan",
        });
      }

      await hapusPengguna(nim);

      return response.status(204).end();
    } catch (error) {
      console.error(error);

      return response.status(500).json({
        success: false,
        message: "Terjadi kesalahan pada server",
      });
    }
  }
);

// ------------------------------------------------------------------
// APP
// ------------------------------------------------------------------

const app = express();

app.disable("x-powered-by");
app.use(express.json());

app.get("/", (_request: Request, response: Response) => {
  response.status(200).json({
    success: true,
    message: "API Latihan Pengguna — Pertemuan 7",
    data: {
      resource: "pengguna",
    },
  });
});

app.use("/pengguna", penggunaRoutes);

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(
    `API Latihan Pengguna berjalan di http://localhost:${port}`
  );
});