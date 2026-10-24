import express, { type Request, type Response } from "express";
import { prisma } from "./client.ts";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

// Helper Response
const sendSuccess = (res: Response, code: number, msg: string, data: unknown) => {
  return res.status(code).json({ success: true, message: msg, data });
};
const sendError = (res: Response, code: number, msg: string, details?: unknown) => {
  return res.status(code).json({ success: false, message: msg, ...(details && { details }) });
};

// Logger
app.use((req: Request, _res: Response, next: () => void) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// GET / — Info endpoint
app.get("/", (_req: Request, res: Response) => {
  return sendSuccess(res, 200, "API Buku Tugas 4", {
    endpoints: ["GET /buku", "GET /buku/:id", "POST /buku", "PATCH /buku/:id", "DELETE /buku/:id"],
  });
});

// GET /health — Cek kesehatan server
app.get("/health", (_req: Request, res: Response) => {
  return sendSuccess(res, 200, "API berjalan", { status: "up" });
});

// GET /buku — List semua buku + filter
app.get("/buku", async (req: Request, res: Response) => {
  const penulisFilter = typeof req.query.penulis === "string" ? req.query.penulis : undefined;
  const minStokRaw = req.query.minStok;
  const minStokFilter = typeof minStokRaw === "string" ? Number(minStokRaw) : undefined;

  const data = await prisma.buku.findMany({
    where: {
      ...(penulisFilter !== undefined && { penulis: penulisFilter }),
      ...(minStokFilter !== undefined && !Number.isNaN(minStokFilter) && { stok: { gte: minStokFilter } }),
    },
    orderBy: { judul: "asc" },
  });

  return sendSuccess(res, 200, "Daftar buku berhasil diambil", { total: data.length, data });
});

// GET /buku/:id — Detail buku
app.get("/buku/:id", async (req: Request, res: Response) => {
  const idRaw = req.params.id;
  const id = typeof idRaw === "string" ? Number(idRaw) : undefined;
  if (id === undefined || Number.isNaN(id)) {
    return sendError(res, 400, "Parameter id harus berupa bilangan bulat");
  }

  const item = await prisma.buku.findUnique({ where: { id } });
  if (!item) return sendError(res, 404, "Buku tidak ditemukan");

  return sendSuccess(res, 200, "Detail buku berhasil diambil", item);
});

// POST /buku — Tambah buku baru + validasi
app.post("/buku", async (req: Request, res: Response) => {
  const { judul, penulis, tahun, stok } = req.body as {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  };

  const errors: string[] = [];
  if (judul === undefined) errors.push("Field judul wajib diisi");
  if (penulis === undefined) errors.push("Field penulis wajib diisi");
  if (tahun === undefined || !Number.isInteger(tahun)) errors.push("Field tahun wajib berupa bilangan bulat");
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) {
    errors.push("Field stok harus bilangan bulat minimal 0");
  }

  if (errors.length > 0) return sendError(res, 400, "Data buku tidak valid", errors);

  const baru = await prisma.buku.create({
    data: {
      judul: judul!,
      penulis: penulis!,
      tahun: tahun!,
      ...(stok !== undefined && { stok }),
    },
  });

  return sendSuccess(res, 201, "Buku berhasil dibuat", baru);
});

// PATCH /buku/:id — Update sebagian field
app.patch("/buku/:id", async (req: Request, res: Response) => {
  const idRaw = req.params.id;
  const id = typeof idRaw === "string" ? Number(idRaw) : undefined;
  if (id === undefined || Number.isNaN(id)) {
    return sendError(res, 400, "Parameter id harus berupa bilangan bulat");
  }

  const item = await prisma.buku.findUnique({ where: { id } });
  if (!item) return sendError(res, 404, "Buku tidak ditemukan");

  const { judul, penulis, tahun, stok } = req.body as {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  };

  const errors: string[] = [];
  if (tahun !== undefined && !Number.isInteger(tahun)) errors.push("Field tahun harus bilangan bulat");
  if (stok !== undefined && (!Number.isInteger(stok) || stok < 0)) errors.push("Field stok minimal 0");
  if (errors.length > 0) return sendError(res, 400, "Data perubahan tidak valid", errors);

  const diperbarui = await prisma.buku.update({
    where: { id },
    data: {
      ...(judul !== undefined && { judul }),
      ...(penulis !== undefined && { penulis }),
      ...(tahun !== undefined && { tahun }),
      ...(stok !== undefined && { stok }),
    },
  });

  return sendSuccess(res, 200, "Buku berhasil diperbarui", diperbarui);
});

// DELETE /buku/:id — Hapus buku (204)
app.delete("/buku/:id", async (req: Request, res: Response) => {
  const idRaw = req.params.id;
  const id = typeof idRaw === "string" ? Number(idRaw) : undefined;
  if (id === undefined || Number.isNaN(id)) {
    return sendError(res, 400, "Parameter id harus berupa bilangan bulat");
  }

  const item = await prisma.buku.findUnique({ where: { id } });
  if (!item) return sendError(res, 404, "Buku tidak ditemukan");

  await prisma.buku.delete({ where: { id } });
  return res.status(204).send();
});

// 404 — Endpoint tidak ditemukan
app.use((_req: Request, res: Response) => {
  return sendError(res, 404, "Endpoint tidak ditemukan");
});

// Error handler
app.use((error: Error, _req: Request, res: Response, _next: () => void) => {
  console.error("Kesalahan aplikasi:", error.message);
  return sendError(res, 500, "Terjadi kesalahan pada server");
});

export { app };