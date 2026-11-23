
import { prisma } from "../../client.ts";

// Mengambil semua buku
export const ambilDaftarBuku = async () => {
  return prisma.buku.findMany();
};

// Mengambil buku berdasarkan ID
export const ambilBukuById = async (id: number) => {
  return prisma.buku.findUnique({
    where: { id },
  });
};

// Menambahkan buku
export const buatBuku = async (data: {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
}) => {
  return prisma.buku.create({
    data,
  });
};

// Mengubah buku
export const ubahBuku = async (
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

// Menghapus buku
export const hapusBuku = async (id: number) => {
  return prisma.buku.delete({
    where: { id },
  });
};
