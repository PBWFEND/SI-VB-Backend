/**
 * Pertemuan 7 — TUGAS: Service Pengguna
 * Layer ini hanya berisi query Prisma.
 */

import { prisma } from "../../client.ts";

export const ambilDaftarPengguna = async (filter?: { nim?: string }) => {
  return prisma.pengguna.findMany({
    where: filter?.nim ? { nim: filter.nim } : undefined,
    orderBy: { id: "asc" },
  });
};

export const ambilPenggunaByNim = async (nim: string) => {
  return prisma.pengguna.findUnique({ where: { nim } });
};

export const buatPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role?: string;
}) => {
  return prisma.pengguna.create({
    data: {
      nim: data.nim,
      nama: data.nama,
      email: data.email,
      role: data.role ?? "mahasiswa",
    },
  });
};

export const perbaruiPengguna = async (
  nim: string,
  data: { nama?: string; email?: string; role?: string }
) => {
  return prisma.pengguna.update({ where: { nim }, data });
};

export const hapusPengguna = async (nim: string) => {
  return prisma.pengguna.delete({ where: { nim } });
};