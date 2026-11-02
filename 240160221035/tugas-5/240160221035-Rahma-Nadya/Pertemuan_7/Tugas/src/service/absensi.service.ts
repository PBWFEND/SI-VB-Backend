import { prisma } from "../prisma.ts";

// Mengambil semua data absensi, dengan filter opsional
export const ambilSemuaAbsensi = async (filter: {
  anggota_id?: number;
  status?: string;
}) => {
  return prisma.absensi.findMany({
    where: filter,
    orderBy: { id: "asc" },
  });
};

// Mengambil absensi berdasarkan ID
export const ambilAbsensiById = async (id: number) => {
  return prisma.absensi.findUnique({
    where: { id },
  });
};

// Menambahkan absensi
export const buatAbsensi = async (data: {
  anggota_id: number;
  kegiatan_id: number;
  status: string;
}) => {
  return prisma.absensi.create({
    data,
  });
};

// Memperbarui absensi
export const ubahAbsensi = async (
  id: number,
  data: {
    anggota_id?: number;
    kegiatan_id?: number;
    status?: string;
  },
) => {
  return prisma.absensi.update({
    where: { id },
    data,
  });
};

// Menghapus absensi
export const hapusAbsensi = async (id: number) => {
  return prisma.absensi.delete({
    where: { id },
  });
};