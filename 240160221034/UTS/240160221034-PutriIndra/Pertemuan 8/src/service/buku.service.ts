
import { prisma } from "../../client.ts";

type DataBuku = {
  judul: string;
  penulis: string;
  tahun: number;
  stok?: number;
};

type PerbaruiBuku = Partial<DataBuku>;

// Menambahkan buku baru
export const buatBuku = async (data: DataBuku) => {
  return prisma.buku.create({
    data: {
      judul: data.judul,
      penulis: data.penulis,
      tahun: data.tahun,
      ...(data.stok !== undefined && { stok: data.stok }),
    },
  });
};

// Mengambil daftar buku dengan filter opsional
export const ambilDaftarBuku = async (filter?: {
  penulis?: string;
  minStok?: number;
}) => {
  return prisma.buku.findMany({
    where: {
      ...(filter?.penulis !== undefined && {
        penulis: filter.penulis,
      }),
      ...(filter?.minStok !== undefined && {
        stok: { gte: filter.minStok },
      }),
    },
    orderBy: { judul: "asc" },
  });
};

// Mengambil detail buku berdasarkan ID
export const ambilBuku = async (id: number) => {
  return prisma.buku.findUnique({
    where: { id },
  });
};

// Memperbarui data buku
export const perbaruiBuku = async (
  id: number,
  data: PerbaruiBuku
) => {
  return prisma.buku.update({
    where: { id },
    data,
  });
};

// Menghapus buku berdasarkan ID
export const hapusBuku = async (id: number) => {
  return prisma.buku.delete({
    where: { id },
  });
};
