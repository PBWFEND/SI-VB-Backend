
import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const sendSuccess = (
  response: Response,
  statusCode: number,
  message: string,
  data: unknown,
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
  details?: unknown,
) => {
  return response.status(statusCode).json({
    success: false,
    message,
    ...(details && { details }),
  });
};

app.use((request: Request, _response: Response, next) => {
  console.log(
    `[${new Date().toISOString()}] ${request.method} ${request.originalUrl}`,
  );
  next();
});

app.get("/", (_request: Request, response: Response) => {
  return sendSuccess(response, 200, "Database API Pertemuan 6", {
    resource: "buku",
    endpoints: [
      "GET /buku",
      "GET /buku/:id",
      "POST /buku",
      "PATCH /buku/:id",
      "DELETE /buku/:id",
    ],
  });
});

app.get("/health", (_request: Request, response: Response) => {
  return sendSuccess(response, 200, "API berjalan", { status: "up" });
});

// GET collection buku
app.get("/buku", async (request: Request, response: Response) => {
  const penulisFilter =
    typeof request.query.penulis === "string"
      ? request.query.penulis
      : undefined;

  const minStokRaw = request.query.minStok;
  const minStokFilter =
    typeof minStokRaw === "string" ? Number(minStokRaw) : undefined;

  const data = await prisma.buku.findMany({
    where: {
      ...(penulisFilter !== undefined && {
        penulis: penulisFilter,
      }),
      ...(minStokFilter !== undefined &&
        !Number.isNaN(minStokFilter) && {
          stok: { gte: minStokFilter },
        }),
    },
    orderBy: { judul: "asc" },
  });

  return sendSuccess(response, 200, "Daftar buku berhasil diambil", {
    total: data.length,
    data,
  });
});

// GET detail buku
app.get("/buku/:id", async (request: Request, response: Response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return sendError(
      response,
      400,
      "Parameter id harus berupa bilangan bulat positif",
    );
  }

  const item = await prisma.buku.findUnique({
    where: { id },
  });

  if (!item) {
    return sendError(response, 404, "Buku tidak ditemukan");
  }

  return sendSuccess(response, 200, "Detail buku berhasil diambil", item);
});

// POST buku
app.post("/buku", async (request: Request, response: Response) => {
  const { judul, penulis, tahun, stok } = request.body as {
    judul?: unknown;
    penulis?: unknown;
    tahun?: unknown;
    stok?: unknown;
  };

  const errors: string[] = [];

  if (typeof judul !== "string" || judul.trim() === "") {
    errors.push("Field judul wajib diisi");
  }

  if (typeof penulis !== "string" || penulis.trim() === "") {
    errors.push("Field penulis wajib diisi");
  }

  if (!Number.isInteger(tahun)) {
    errors.push("Field tahun wajib berupa bilangan bulat");
  }

  if (
    stok !== undefined &&
    (!Number.isInteger(stok) || (stok as number) < 0)
  ) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }

  if (errors.length > 0) {
    return sendError(response, 400, "Data buku tidak valid", errors);
  }

  const baru = await prisma.buku.create({
    data: {
      judul: (judul as string).trim(),
      penulis: (penulis as string).trim(),
      tahun: tahun as number,
      ...(stok !== undefined ? { stok: stok as number } : {}),
    },
  });

  return sendSuccess(response, 201, "Buku berhasil dibuat", baru);
});

// PATCH buku — mengubah penulis dan/atau stok
app.patch("/buku/:id", async (request: Request, response: Response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return sendError(
      response,
      400,
      "Parameter id harus berupa bilangan bulat positif",
    );
  }

  const item = await prisma.buku.findUnique({ where: { id } });

  if (!item) {
    return sendError(response, 404, "Buku tidak ditemukan");
  }

  const { penulis, stok } = request.body as {
    penulis?: unknown;
    stok?: unknown;
  };

  if (
    penulis !== undefined &&
    (typeof penulis !== "string" || penulis.trim() === "")
  ) {
    return sendError(
      response,
      400,
      "Field penulis harus berupa teks dan tidak boleh kosong",
    );
  }

  if (
    stok !== undefined &&
    (!Number.isInteger(stok) || (stok as number) < 0)
  ) {
    return sendError(
      response,
      400,
      "Field stok harus bilangan bulat minimal 0",
    );
  }

  if (penulis === undefined && stok === undefined) {
    return sendError(
      response,
      400,
      "Kirim penulis atau stok untuk diperbarui",
    );
  }

  const diperbarui = await prisma.buku.update({
    where: { id },
    data: {
      ...(penulis !== undefined
        ? { penulis: (penulis as string).trim() }
        : {}),
      ...(stok !== undefined ? { stok: stok as number } : {}),
    },
  });

  return sendSuccess(response, 200, "Buku berhasil diperbarui", diperbarui);
});

// DELETE buku
app.delete("/buku/:id", async (request: Request, response: Response) => {
  const id = Number(request.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return sendError(
      response,
      400,
      "Parameter id harus berupa bilangan bulat positif",
    );
  }

  const item = await prisma.buku.findUnique({ where: { id } });

  if (!item) {
    return sendError(response, 404, "Buku tidak ditemukan");
  }

  await prisma.buku.delete({ where: { id } });

  return response.status(204).send();
});

// Endpoint tidak ditemukan
app.use((_request: Request, response: Response) => {
  return sendError(response, 404, "Endpoint tidak ditemukan");
});

// Error handler
app.use((
  error: Error,
  _request: Request,
  response: Response,
  _next: (error?: Error) => void,
) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(response, 500, "Terjadi kesalahan pada server");
});

export { app, prisma };
