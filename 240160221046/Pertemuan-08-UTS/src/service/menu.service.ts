/**
 * Service Layer — Domain E-Warung (Resource: Menu)
 *
 * Bertanggung jawab murni pada manipulasi data database melalui Prisma Client.
 * Lapisan ini tidak bergantung pada objek HTTP (req/res) Express.
 */

import { prisma } from "../../client.ts";

export type FilterMenu = {
  kategori?: string;
  tersedia?: boolean;
};

export type BuatMenuInput = {
  nama: string;
  harga: number;
  kategori: string;
  tersedia?: boolean;
};

export type PerbaruiMenuInput = {
  nama?: string;
  harga?: number;
  kategori?: string;
  tersedia?: boolean;
};

/**
 * Mengambil daftar menu dengan filter opsional (kategori dan status tersedia).
 */
export const ambilDaftarMenu = async (filter?: FilterMenu) => {
  const where: Record<string, unknown> = {};

  if (filter?.kategori !== undefined) {
    where.kategori = { equals: filter.kategori };
  }

  if (filter?.tersedia !== undefined) {
    where.tersedia = filter.tersedia;
  }

  return prisma.menu.findMany({
    where,
    orderBy: { id: "asc" },
  });
};

/**
 * Mengambil satu menu berdasarkan id.
 */
export const ambilMenuBerdasarkanId = async (id: number) => {
  return prisma.menu.findUnique({
    where: { id },
  });
};

/**
 * Membuat data menu baru.
 */
export const buatMenu = async (data: BuatMenuInput) => {
  return prisma.menu.create({
    data: {
      nama: data.nama,
      harga: data.harga,
      kategori: data.kategori,
      ...(data.tersedia !== undefined && { tersedia: data.tersedia }),
    },
  });
};

/**
 * Memperbarui data menu yang sudah ada (PATCH/PUT).
 */
export const perbaruiMenu = async (id: number, data: PerbaruiMenuInput) => {
  return prisma.menu.update({
    where: { id },
    data: {
      ...(data.nama !== undefined && { nama: data.nama }),
      ...(data.harga !== undefined && { harga: data.harga }),
      ...(data.kategori !== undefined && { kategori: data.kategori }),
      ...(data.tersedia !== undefined && { tersedia: data.tersedia }),
    },
  });
};

/**
 * Menghapus menu berdasarkan id.
 */
export const hapusMenu = async (id: number) => {
  return prisma.menu.delete({
    where: { id },
  });
};
