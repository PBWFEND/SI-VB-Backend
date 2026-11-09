import prisma from '../../client';

export interface BukuInput {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}

export interface BukuUpdateInput {
  judul?: string;
  penulis?: string;
  tahun?: number;
  stok?: number;
}

export interface BukuFilter {
  q?: string;
  penulis?: string;
  tahun?: number;
}

class BukuService {
  async findAll(filter: BukuFilter) {
    const where: Record<string, unknown> = {};

    if (filter.q) {
      where.OR = [
        { judul: { contains: filter.q } },
        { penulis: { contains: filter.q } }
      ];
    }
    if (filter.penulis) {
      where.penulis = { contains: filter.penulis };
    }
    if (filter.tahun !== undefined) {
      where.tahun = filter.tahun;
    }

    return prisma.buku.findMany({
      where,
      orderBy: { id: 'asc' }
    });
  }

  async findById(id: number) {
    return prisma.buku.findUnique({ where: { id } });
  }

  async create(data: BukuInput) {
    return prisma.buku.create({
      data: {
        judul: data.judul.trim(),
        penulis: data.penulis.trim(),
        tahun: data.tahun,
        stok: data.stok ?? 0
      }
    });
  }

  async update(id: number, data: BukuUpdateInput) {
    return prisma.buku.update({
      where: { id },
      data
    });
  }

  async remove(id: number) {
    return prisma.buku.delete({ where: { id } });
  }
}

export const bukuService = new BukuService();