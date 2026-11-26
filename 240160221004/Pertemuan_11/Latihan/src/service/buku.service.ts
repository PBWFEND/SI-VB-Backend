import { prisma } from "../../client.ts";

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
      ...(filter.judul !== undefined && {
        judul: { contains: filter.judul },
      }),
      ...(filter.minStok !== undefined && {
        stok: { gte: filter.minStok },
      }),
    },
    orderBy: { id: "asc" },
  });
};

export const buatBuku = (data: DataBuku) => {
  return prisma.buku.create({ data });
};