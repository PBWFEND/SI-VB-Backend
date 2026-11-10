import { prisma } from "../../client.ts";

export type BukuInput = {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
};

const bukuService = {
  findAll: () => prisma.buku.findMany({ orderBy: { id: "asc" } }),

  findById: (id: number) => prisma.buku.findUnique({ where: { id } }),

  create: (data: BukuInput) =>
    prisma.buku.create({
      data: {
        judul: data.judul,
        penulis: data.penulis,
        tahun: data.tahun,
        stok: data.stok ?? 0,
      },
    }),

  update: (id: number, data: Partial<BukuInput>) =>
    prisma.buku.update({
      where: { id },
      data: {
        ...(data.judul !== undefined && { judul: data.judul }),
        ...(data.penulis !== undefined && { penulis: data.penulis }),
        ...(data.tahun !== undefined && { tahun: data.tahun }),
        ...(data.stok !== undefined && { stok: data.stok }),
      },
    }),

  delete: (id: number) => prisma.buku.delete({ where: { id } }),
};

export { bukuService };