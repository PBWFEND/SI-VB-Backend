import { prisma } from "../../client";

export interface BukuInput {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}

export interface BukuFilter {
  judul?: string;
  penulis?: string;
  tahun?: number;
}

// Lapisan service: hanya urusan data/bisnis, tidak tahu soal req/res
export const bukuService = {
  findAll(filter: BukuFilter = {}) {
    return prisma.buku.findMany({
      where: {
        ...(filter.judul && { judul: { contains: filter.judul } }),
        ...(filter.penulis && { penulis: { contains: filter.penulis } }),
        ...(filter.tahun !== undefined && { tahun: filter.tahun }),
      },
      orderBy: { id: "asc" },
    });
  },

  findById(id: number) {
    return prisma.buku.findUnique({ where: { id } });
  },

  create(data: BukuInput) {
    return prisma.buku.create({ data });
  },

  // mengembalikan null bila id tidak ada
  async update(id: number, data: Partial<BukuInput>) {
    const ada = await prisma.buku.findUnique({ where: { id } });
    if (!ada) return null;
    return prisma.buku.update({ where: { id }, data });
  },

  // mengembalikan false bila id tidak ada
  async remove(id: number) {
    const ada = await prisma.buku.findUnique({ where: { id } });
    if (!ada) return false;
    await prisma.buku.delete({ where: { id } });
    return true;
  },
};
