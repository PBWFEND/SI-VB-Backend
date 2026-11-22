import prisma from "../../client.js";

export const getAllBuku = async (query: {
  penulis?: string;
  stok?: string;
}) => {
  const where: any = {};

  if (query.penulis) {
    where.penulis = {
      contains: query.penulis,
    };
  }

  if (query.stok === "tersedia") {
    where.stok = {
      gt: 0,
    };
  } else if (query.stok === "habis") {
    where.stok = 0;
  }

  return prisma.buku.findMany({
    where,
    orderBy: {
      id: "asc",
    },
  });
};

export const getBukuById = async (id: number) => {
  return prisma.buku.findUnique({
    where: { id },
  });
};

export const createBuku = async (data: {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}) => {
  return prisma.buku.create({
    data,
  });
};

export const updateBuku = async (
  id: number,
  data: {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  }
) => {
  return prisma.buku.update({
    where: { id },
    data,
  });
};

export const deleteBuku = async (id: number) => {
  return prisma.buku.delete({
    where: { id },
  });
};