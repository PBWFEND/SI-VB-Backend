import { prisma } from "../../client.ts";

// Mengambil semua data pengguna
export const getAllPengguna = async () => {
  return await prisma.pengguna.findMany();
};

// Mengambil satu pengguna berdasarkan NIM
export const getPenggunaByNim = async (nim: string) => {
  return await prisma.pengguna.findUnique({
    where: { nim },
  });
};

// Menambahkan pengguna baru
export const createPengguna = async (data: {
  nim: string;
  nama: string;
  email: string;
  role: string;
}) => {
  return await prisma.pengguna.create({
    data,
  });
};

// Mengubah data pengguna berdasarkan NIM
export const updatePengguna = async (
  nim: string,
  data: {
    nama?: string;
    email?: string;
    role?: string;
  },
) => {
  return await prisma.pengguna.update({
    where: { nim },
    data,
  });
};

// Menghapus pengguna berdasarkan NIM
export const deletePengguna = async (nim: string) => {
  return await prisma.pengguna.delete({
    where: { nim },
  });
};