/**
 * UTS Mini Project (Laboratorium) - Lapisan service.
 * Hanya mengoperasikan Prisma Client. Service tidak tahu kode status atau format response HTTP.
 */

import { prisma } from "../../client.ts";

// Input create: nama, kode, kondisi wajib; jumlah opsional karena skema memberi default 1
type DataPeralatan = {
  nama: string;
  kode: string;
  kondisi: string;
  jumlah?: number;
};

// Input update (PATCH): semua field opsional, hanya yang dikirim yang diubah
type PerbaruiPeralatan = Partial<DataPeralatan>;

export const buatPeralatan = async (data: DataPeralatan) => {
  return prisma.peralatan.create({
    data: {
      nama: data.nama,
      kode: data.kode,
      kondisi: data.kondisi,
      ...(data.jumlah !== undefined && { jumlah: data.jumlah }),
    },
  });
};

export const ambilDaftarPeralatan = async (filter?: { kondisi?: string }) => {
  return prisma.peralatan.findMany({
    where: {
      ...(filter?.kondisi !== undefined && { kondisi: filter.kondisi }),
    },
    orderBy: { nama: "asc" },
  });
};

// Mengembalikan null bila tidak ada. Keputusan 404 sengaja diserahkan ke controller.
export const ambilPeralatan = async (id: number) => {
  return prisma.peralatan.findFirst({ where: { id } });
};

export const perbaruiPeralatan = async (id: number, data: PerbaruiPeralatan) => {
  return prisma.peralatan.update({
    where: { id },
    data: {
      ...(data.nama !== undefined && { nama: data.nama }),
      ...(data.kode !== undefined && { kode: data.kode }),
      ...(data.kondisi !== undefined && { kondisi: data.kondisi }),
      ...(data.jumlah !== undefined && { jumlah: data.jumlah }),
    },
  });
};

export const hapusPeralatan = async (id: number) => {
  return prisma.peralatan.delete({ where: { id } });
};