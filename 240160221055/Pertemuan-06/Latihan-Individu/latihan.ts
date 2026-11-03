import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();

app.disable("x-powered-by");
app.use(express.json());

// ==================================================
// HELPER RESPONSE
// ==================================================

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown
) => {
  return response.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendError = (
  response: Response,
  statusCode: number,
  message: string,
  details?: unknown
) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined && { details }),
  });
};

// ==================================================
// VALIDASI
// ==================================================

function validasiNim(nim: unknown): string | null {
  if (typeof nim !== "string" || nim.trim() === "") {
    return null;
  }

  return nim.trim();
}

function validasiDataPengguna(
  data: unknown,
  mode: "create" | "update"
):
  | {
      valid: true;
      data: {
        nim?: string;
        nama?: string;
        email?: string;
        role?: string;
      };
    }
  | {
      valid: false;
      message: string;
    } {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return {
      valid: false,
      message: "Body request harus berupa object",
    };
  }

  const body = data as Record<string, unknown>;

  // ==============================
  // VALIDASI UNTUK CREATE
  // ==============================

  if (mode === "create") {
    if (typeof body.nim !== "string" || body.nim.trim() === "") {
      return {
        valid: false,
        message: "NIM wajib diisi dan harus berupa teks",
      };
    }

    if (typeof body.nama !== "string" || body.nama.trim() === "") {
      return {
        valid: false,
        message: "Nama wajib diisi dan harus berupa teks",
      };
    }

    if (typeof body.email !== "string" || body.email.trim() === "") {
      return {
        valid: false,
        message: "Email wajib diisi dan harus berupa teks",
      };
    }

    if (
      body.role !== undefined &&
      (typeof body.role !== "string" || body.role.trim() === "")
    ) {
      return {
        valid: false,
        message: "Role harus berupa teks",
      };
    }

    return {
      valid: true,
      data: {
        nim: body.nim.trim(),
        nama: body.nama.trim(),
        email: body.email.trim(),
        ...(typeof body.role === "string" && {
          role: body.role.trim(),
        }),
      },
    };
  }

  // ==============================
  // VALIDASI UNTUK UPDATE
  // ==============================

  const allowedFields = ["nama", "email", "role"];
  const keys = Object.keys(body);

  if (keys.length === 0) {
    return {
      valid: false,
      message: "Minimal satu data harus dikirim untuk diperbarui",
    };
  }

  for (const key of keys) {
    if (!allowedFields.includes(key)) {
      return {
        valid: false,
        message: "Field yang dapat diubah hanya nama, email, dan role",
      };
    }
  }

  if (
    body.nama !== undefined &&
    (typeof body.nama !== "string" || body.nama.trim() === "")
  ) {
    return {
      valid: false,
      message: "Nama harus berupa teks yang valid",
    };
  }

  if (
    body.email !== undefined &&
    (typeof body.email !== "string" || body.email.trim() === "")
  ) {
    return {
      valid: false,
      message: "Email harus berupa teks yang valid",
    };
  }

  if (
    body.role !== undefined &&
    (typeof body.role !== "string" || body.role.trim() === "")
  ) {
    return {
      valid: false,
      message: "Role harus berupa teks yang valid",
    };
  }

  return {
    valid: true,
    data: {
      ...(typeof body.nama === "string" && {
        nama: body.nama.trim(),
      }),
      ...(typeof body.email === "string" && {
        email: body.email.trim(),
      }),
      ...(typeof body.role === "string" && {
        role: body.role.trim(),
      }),
    },
  };
}

// ==================================================
// GET /pengguna
// ==================================================

app.get(
  "/pengguna",
  async (_request: Request, response: Response) => {
    try {
      const data = await prisma.pengguna.findMany({
        orderBy: {
          nim: "asc",
        },
      });

      return sendSuccess(
        response,
        200,
        "Data pengguna berhasil diambil",
        {
          total: data.length,
          data,
        }
      );
    } catch (error) {
      console.error(error);

      return sendError(
        response,
        500,
        "Terjadi kesalahan pada server"
      );
    }
  }
);

// ==================================================
// GET /pengguna/:nim
// TODO 1
// ==================================================

app.get(
  "/pengguna/:nim",
  async (request: Request, response: Response) => {
    try {
      const nim = validasiNim(request.params.nim);

      if (!nim) {
        return sendError(
          response,
          400,
          "NIM tidak valid"
        );
      }

      const data = await prisma.pengguna.findUnique({
        where: {
          nim,
        },
      });

      if (!data) {
        return sendError(
          response,
          404,
          "Pengguna tidak ditemukan"
        );
      }

      return sendSuccess(
        response,
        200,
        "Data pengguna berhasil diambil",
        data
      );
    } catch (error) {
      console.error(error);

      return sendError(
        response,
        500,
        "Terjadi kesalahan pada server"
      );
    }
  }
);

// ==================================================
// POST /pengguna
// TODO 2
// ==================================================

app.post(
  "/pengguna",
  async (request: Request, response: Response) => {
    try {
      const hasilValidasi = validasiDataPengguna(
        request.body,
        "create"
      );

      // PERBAIKAN: gunakan === false
      if (hasilValidasi.valid === false) {
        return sendError(
          response,
          400,
          hasilValidasi.message
        );
      }

      const data = await prisma.pengguna.create({
        data: {
          nim: hasilValidasi.data.nim!,
          nama: hasilValidasi.data.nama!,
          email: hasilValidasi.data.email!,
          ...(hasilValidasi.data.role !== undefined && {
            role: hasilValidasi.data.role,
          }),
        },
      });

      return sendSuccess(
        response,
        201,
        "Pengguna berhasil ditambahkan",
        data
      );
    } catch (error: any) {
      console.error(error);

      if (error?.code === "P2002") {
        return sendError(
          response,
          400,
          "NIM atau email sudah terdaftar"
        );
      }

      return sendError(
        response,
        500,
        "Terjadi kesalahan pada server"
      );
    }
  }
);

// ==================================================
// PATCH /pengguna/:nim
// TODO 3
// ==================================================

app.patch(
  "/pengguna/:nim",
  async (request: Request, response: Response) => {
    try {
      const nim = validasiNim(request.params.nim);

      if (!nim) {
        return sendError(
          response,
          400,
          "NIM tidak valid"
        );
      }

      const hasilValidasi = validasiDataPengguna(
        request.body,
        "update"
      );

      // PERBAIKAN: gunakan === false
      if (hasilValidasi.valid === false) {
        return sendError(
          response,
          400,
          hasilValidasi.message
        );
      }

      const pengguna = await prisma.pengguna.findUnique({
        where: {
          nim,
        },
      });

      if (!pengguna) {
        return sendError(
          response,
          404,
          "Pengguna tidak ditemukan"
        );
      }

      const data = await prisma.pengguna.update({
        where: {
          nim,
        },
        data: hasilValidasi.data,
      });

      return sendSuccess(
        response,
        200,
        "Data pengguna berhasil diperbarui",
        data
      );
    } catch (error: any) {
      console.error(error);

      if (error?.code === "P2002") {
        return sendError(
          response,
          400,
          "Email sudah digunakan"
        );
      }

      return sendError(
        response,
        500,
        "Terjadi kesalahan pada server"
      );
    }
  }
);

// ==================================================
// DELETE /pengguna/:nim
// TODO 4
// ==================================================

app.delete(
  "/pengguna/:nim",
  async (request: Request, response: Response) => {
    try {
      const nim = validasiNim(request.params.nim);

      if (!nim) {
        return sendError(
          response,
          400,
          "NIM tidak valid"
        );
      }

      const pengguna = await prisma.pengguna.findUnique({
        where: {
          nim,
        },
      });

      if (!pengguna) {
        return sendError(
          response,
          404,
          "Pengguna tidak ditemukan"
        );
      }

      await prisma.pengguna.delete({
        where: {
          nim,
        },
      });

      return response.status(204).end();
    } catch (error) {
      console.error(error);

      return sendError(
        response,
        500,
        "Terjadi kesalahan pada server"
      );
    }
  }
);

// ==================================================
// SHUTDOWN
// ==================================================

const port = Number(process.env.PORT_LATIHAN ?? 3009);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(
    `Latihan Database API berjalan di http://localhost:${port}`
  );
});