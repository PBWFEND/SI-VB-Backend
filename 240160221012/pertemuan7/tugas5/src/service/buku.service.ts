import { prisma } from '../config/prisma';
import { NotFoundError } from '../errors';
import {
  CreateBukuInput,
  PatchBukuInput,
  UpdateBukuInput
} from '../types/buku';

export interface BukuFilter {
  q?: string;
  penulis?: string;
  tahun?: number;
}

export const bukuService = {
  async findAll(filter: BukuFilter) {
    const where: any = {};
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
    return prisma.buku.findMany({ where });
  },

  async findById(id: number) {
    const item = await prisma.buku.findUnique({ where: { id } });
    if (!item) throw new NotFoundError('Buku tidak ditemukan');
    return item;
  },

  async create(input: CreateBukuInput) {
    return prisma.buku.create({ data: input });
  },

  async update(id: number, input: UpdateBukuInput) {
    await this.findById(id); // lempar NotFoundError bila tidak ada
    return prisma.buku.update({ where: { id }, data: input });
  },

  async patch(id: number, input: PatchBukuInput) {
    await this.findById(id);
    return prisma.buku.update({ where: { id }, data: input });
  },

  async remove(id: number) {
    await this.findById(id);
    await prisma.buku.delete({ where: { id } });
  }
};