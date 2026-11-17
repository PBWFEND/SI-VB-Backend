import { prisma } from "../../client";

export interface BukuInput {
  judul?: unknown;
  penulis?: unknown;
  tahun?: unknown;
  stok?: unknown;
}

export interface ValidatedBuku {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}

export function validateCreateBuku(
  body: BukuInput
): { ok: true; data: ValidatedBuku } | { ok: false; errors: string[] } {
  const errors: string[] = [];

  if (typeof body.judul !== "string" || body.judul.trim() === "") {
    errors.push("judul wajib string tidak kosong");
  }
  if (typeof body.penulis !== "string" || body.penulis.trim() === "") {
    errors.push("penulis wajib string tidak kosong");
  }
  if (typeof body.tahun !== "number" || !Number.isInteger(body.tahun)) {
    errors.push("tahun wajib integer");
  } else if (body.tahun < 1000 || body.tahun > 2100) {
    errors.push("tahun harus di antara 1000 dan 2100");
  }
  if (body.stok !== undefined) {
    if (typeof body.stok !== "number" || !Number.isInteger(body.stok) || body.stok < 0) {
      errors.push("stok harus integer minimal 0");
    }
  }

  if (errors.length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      judul: (body.judul as string).trim(),
      penulis: (body.penulis as string).trim(),
      tahun: body.tahun as number,
      stok: body.stok as number | undefined,
    },
  };
}

export function validateUpdateBuku(
  body: BukuInput
): { ok: true; data: Partial<ValidatedBuku> } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const data: Partial<ValidatedBuku> = {};

  if (body.judul !== undefined) {
    if (typeof body.judul !== "string" || body.judul.trim() === "") {
      errors.push("judul harus string tidak kosong");
    } else {
      data.judul = body.judul.trim();
    }
  }
  if (body.penulis !== undefined) {
    if (typeof body.penulis !== "string" || body.penulis.trim() === "") {
      errors.push("penulis harus string tidak kosong");
    } else {
      data.penulis = body.penulis.trim();
    }
  }
  if (body.tahun !== undefined) {
    if (typeof body.tahun !== "number" || !Number.isInteger(body.tahun)) {
      errors.push("tahun harus integer");
    } else if (body.tahun < 1000 || body.tahun > 2100) {
      errors.push("tahun harus di antara 1000 dan 2100");
    } else {
      data.tahun = body.tahun;
    }
  }
  if (body.stok !== undefined) {
    if (typeof body.stok !== "number" || !Number.isInteger(body.stok) || body.stok < 0) {
      errors.push("stok harus integer minimal 0");
    } else {
      data.stok = body.stok;
    }
  }

  if (errors.length > 0) return { ok: false, errors };
  if (Object.keys(data).length === 0) {
    return { ok: false, errors: ["Tidak ada field yang dikirim"] };
  }
  return { ok: true, data };
}

export async function findAllBuku(status?: string) {
  const where =
    status === "tersedia"
      ? { stok: { gt: 0 } }
      : status === "habis"
      ? { stok: 0 }
      : {};
  return prisma.buku.findMany({ where, orderBy: { id: "asc" } });
}

export async function findBukuById(id: number) {
  return prisma.buku.findUnique({ where: { id } });
}

export async function createBuku(data: ValidatedBuku) {
  return prisma.buku.create({
    data: {
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      stok: data.stok ?? 0,
    },
  });
}

export async function updateBuku(id: number, data: Partial<ValidatedBuku>) {
  return prisma.buku.update({ where: { id }, data });
}

export async function deleteBuku(id: number) {
  return prisma.buku.delete({ where: { id } });
}