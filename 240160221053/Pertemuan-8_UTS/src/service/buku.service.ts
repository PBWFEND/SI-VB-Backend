import { prisma } from "../../client.ts";

export const ambilDaftarBuku = async (filter?: { penulis?: string }) => {
  return prisma.buku.findMany({
    where: filter?.penulis
      ? { penulis: { contains: filter.penulis } }
      : undefined,
    orderBy: { id: "asc" },
  });
};

export const ambilBukuById = async (id: number) => {
  return prisma.buku.findUnique({ where: { id } });
};

export const buatBuku = async (data: {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}) => {
  return prisma.buku.create({
    data: {
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      stok: data.stok ?? 0,
    },
  });
};

export const perbaruiBuku = async (
  id: number,
  data: { judul?: string; penulis?: string; tahun?: number; stok?: number }
) => {
  return prisma.buku.update({ where: { id }, data });
};

export const hapusBuku = async (id: number) => {
  return prisma.buku.delete({ where: { id } });
};