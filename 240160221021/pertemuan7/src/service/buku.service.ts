/**
 * Pertemuan 7 - Lapisan service.
 * Hanya mengoperasikan Prisma Client. Service tidak tahu kode status atau format response HTTP.
 */

import { prisma } from "../../client.ts";

// Input create: judul, penulis, tahun wajib; stok opsional karena skema memberi default 0
type DataBuku = {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
};

// Input update (PATCH): semua field opsional, hanya yang dikirim yang diubah
type PerbaruiBuku = Partial<DataBuku>;

export const buatBuku = async (data: DataBuku) => {
  return prisma.buku.create({
    data: {
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      ...(data.stok !== undefined && { stok: data.stok }),
    },
  });
};

export const ambilDaftarBuku = async (filter?: { penulis?: string; minStok?: number }) => {
  return prisma.buku.findMany({
    where: {
      ...(filter?.penulis !== undefined && { penulis: filter.penulis }),
      ...(filter?.minStok !== undefined && { stok: { gte: filter.minStok } }),
    },
    orderBy: { judul: "asc" },
  });
};

// Mengembalikan null bila tidak ada. Keputusan 404 sengaja diserahkan ke controller.
export const ambilBuku = async (id: number) => {
  return prisma.buku.findFirst({ where: { id } });
};

export const perbaruiBuku = async (id: number, data: PerbaruiBuku) => {
  return prisma.buku.update({
    where: { id },
    data: {
      ...(data.judul !== undefined && { judul: data.judul }),
      ...(data.penulis !== undefined && { penulis: data.penulis }),
      ...(data.tahun !== undefined && { tahun: data.tahun }),
      ...(data.stok !== undefined && { stok: data.stok }),
    },
  });
};

export const hapusBuku = async (id: number) => {
  return prisma.buku.delete({ where: { id } });
};