import { prisma } from "../../client.ts";

// Mengambil semua buku
export const getAllBuku = async () => {
  return await prisma.buku.findMany({
    orderBy: { id: "asc" },
  });
};

// Mengambil buku berdasarkan ID
export const getBukuById = async (id: number) => {
  return await prisma.buku.findUnique({
    where: { id },
  });
};

// Menambahkan buku
export const createBuku = async (data: {
  judul: string;
  penulis: string;
  tahun: number;
  stok: number;
}) => {
  return await prisma.buku.create({
    data,
  });
};

// Memperbarui buku
export const updateBuku = async (
  id: number,
  data: {
    judul?: string;
    penulis?: string;
    tahun?: number;
    stok?: number;
  },
) => {
  return await prisma.buku.update({
    where: { id },
    data,
  });
};

// Menghapus buku
export const deleteBuku = async (id: number) => {
  return await prisma.buku.delete({
    where: { id },
  });
};
