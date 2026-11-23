import prisma from '../../client';
import {
  CreateLaboratoriumInput,
  FindAllFilters,
  UpdateLaboratoriumInput,
} from '../types/laboratorium';

export const findAll = async (filters: FindAllFilters = {}) => {
  const { status, minKapasitas, search, sortBy = 'id', order = 'asc' } = filters;

  return prisma.laboratorium.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(minKapasitas !== undefined ? { kapasitas: { gte: minKapasitas } } : {}),
      ...(search
        ? {
            OR: [
              { nama: { contains: search } },
              { lokasi: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy: { [sortBy]: order },
  });
};

export const findById = async (id: number) => {
  return prisma.laboratorium.findUnique({ where: { id } });
};

export const create = async (input: CreateLaboratoriumInput) => {
  return prisma.laboratorium.create({
    data: {
      nama: input.nama.trim(),
      kapasitas: input.kapasitas,
      lokasi: input.lokasi.trim(),
      ...(input.status ? { status: input.status } : {}),
    },
  });
};

export const update = async (id: number, input: UpdateLaboratoriumInput) => {
  const data: Record<string, unknown> = {};
  if (input.nama !== undefined)     data.nama = input.nama.trim();
  if (input.kapasitas !== undefined) data.kapasitas = input.kapasitas;
  if (input.lokasi !== undefined)   data.lokasi = input.lokasi.trim();
  if (input.status !== undefined)   data.status = input.status;

  try {
    return await prisma.laboratorium.update({ where: { id }, data });
  } catch (err: any) {
    if (err.code === 'P2025') return null;
    throw err;
  }
};

export const remove = async (id: number) => {
  try {
    return await prisma.laboratorium.delete({ where: { id } });
  } catch (err: any) {
    if (err.code === 'P2025') return null;
    throw err;
  }
};