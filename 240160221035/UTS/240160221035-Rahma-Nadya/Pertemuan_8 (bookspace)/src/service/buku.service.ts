import prisma from "../lib/prisma";

export const getAllBuku = () => {
  return prisma.buku.findMany();
};

export const getBukuById = (id: number) => {
  return prisma.buku.findUnique({
    where: { id },
  });
};

export const createBuku = (data: {
  judul: string;
  penulis: string;
  penerbit?: string;
  tahun?: number;
  stok?: number;
}) => {
  return prisma.buku.create({ data });
};

export const updateBuku = (
  id: number,
  data: {
    judul?: string;
    penulis?: string;
    penerbit?: string | null;
    tahun?: number | null;
    stok?: number;
  },
) => {
  return prisma.buku.update({
    where: { id },
    data,
  });
};

export const deleteBuku = (id: number) => {
  return prisma.buku.delete({
    where: { id },
  });
};