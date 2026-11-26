import { prisma } from "../../client";

export function validateCreateBuku(body: any) {
  const errors: string[] = [];
  if (typeof body.judul !== "string" || !body.judul.trim()) errors.push("judul wajib");
  if (typeof body.penulis !== "string" || !body.penulis.trim()) errors.push("penulis wajib");
  if (typeof body.tahun !== "number" || body.tahun < 1000 || body.tahun > 2100) errors.push("tahun invalid");
  if (body.stok !== undefined && (typeof body.stok !== "number" || body.stok < 0)) errors.push("stok minimal 0");
  if (errors.length) return { ok: false, errors };
  return { ok: true, data: { judul: body.judul.trim(), penulis: body.penulis.trim(), tahun: body.tahun, stok: body.stok ?? 0 } };
}

export function validateUpdateBuku(body: any) {
  const errors: string[] = [], data: any = {};
  if (body.judul !== undefined) { if (!body.judul?.trim()) errors.push("judul invalid"); else data.judul = body.judul.trim(); }
  if (body.penulis !== undefined) { if (!body.penulis?.trim()) errors.push("penulis invalid"); else data.penulis = body.penulis.trim(); }
  if (body.tahun !== undefined) { if (typeof body.tahun !== "number") errors.push("tahun invalid"); else data.tahun = body.tahun; }
  if (body.stok !== undefined) { if (typeof body.stok !== "number" || body.stok < 0) errors.push("stok invalid"); else data.stok = body.stok; }
  if (errors.length) return { ok: false, errors };
  if (!Object.keys(data).length) return { ok: false, errors: ["Tidak ada field diupdate"] };
  return { ok: true, data };
}

export async function findAllBuku(status?: string) {
  const where = status === "tersedia" ? { stok: { gt: 0 } } : status === "habis" ? { stok: 0 } : {};
  return prisma.buku.findMany({ where, orderBy: { id: "asc" } });
}
export const findBukuById = (id: number) => prisma.buku.findUnique({ where: { id } });
export const createBuku = (data: any) => prisma.buku.create({ data });
export const updateBuku = (id: number, data: any) => prisma.buku.update({ where: { id }, data });
export const deleteBuku = (id: number) => prisma.buku.delete({ where: { id } });