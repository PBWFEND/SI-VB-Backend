import { prisma } from "../prisma.ts";

// Mengambil semua anggota
export const ambilSemuaAnggota = async () => {
  return prisma.anggota.findMany({
    orderBy: { id: "asc" },
  });
};

// Mengambil anggota berdasarkan ID
export const ambilAnggotaById = async (id: number) => {
  return prisma.anggota.findUnique({
    where: { id },
  });
};

// Menambahkan anggota
export const buatAnggota = async (data: {
  nama: string;
  nim: string;
}) => {
  return prisma.anggota.create({
    data,
  });
};

// Memperbarui anggota
export const ubahAnggota = async (
  id: number,
  data: {
    nama?: string;
    nim?: string;
  },
) => {
  return prisma.anggota.update({
    where: { id },
    data,
  });
};

// Menghapus anggota
export const hapusAnggota = async (id: number) => {
  return prisma.anggota.delete({
    where: { id },
  });
};