/**
 * Pertemuan 12 — Service resource buku.
 * Tujuan: memusatkan operasi database dan melempar AppError ketika aturan
 *         bisnis tidak terpenuhi (termasuk NOT_FOUND untuk id tak ada).
 */

import { prisma } from "../../client.ts";
import { notFoundError } from "../errors/app-error.ts";

type DataBuku = {
  judul: string;
  penulis: string;
  stok: number;
};

type FilterBuku = {
  judul?: string;
  minStok?: number;
};

export const daftarBuku = (filter: FilterBuku) => {
  return prisma.buku.findMany({
    where: {
      ...(filter.judul !== undefined ? { judul: { contains: filter.judul } } : {}),
      ...(filter.minStok !== undefined ? { stok: { gte: filter.minStok } } : {}),
    },
    orderBy: { id: "asc" },
  });
};

/** Melempar AppError NOT_FOUND bila buku tidak ada -> HTTP 404. */
export const ambilBuku = async (id: number) => {
  const buku = await prisma.buku.findUnique({ where: { id } });
  if (!buku) throw notFoundError(`Buku dengan id ${id} tidak ditemukan`);
  return buku;
};

export const buatBuku = (data: DataBuku) => {
  return prisma.buku.create({ data });
};