import { prisma } from "../../client.js";

export const getAllBuku = () => {
  return prisma.buku.findMany({
    orderBy: { id: "asc" },
  });
};

export const getBukuById = (id: number) => {
  return prisma.buku.findUnique({
    where: { id },
  });
};

export const createBuku = (data: {
  judul: string;
  penulis: string;
  tahun: number;
  stok: number;
}) => {
  return prisma.buku.create({ data });
};

export const updateBuku = (
  id: number,
  data: Partial<{
    judul: string;
    penulis: string;
    tahun: number;
    stok: number;
  }>
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