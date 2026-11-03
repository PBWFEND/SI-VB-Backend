
import prisma from "../../client.js";

export const getAllPengguna = async () => {
  return prisma.pengguna.findMany({
    orderBy: { id: "asc" },
  });
};

export const getPenggunaById = async (id: number) => {
  return prisma.pengguna.findUnique({
    where: { id },
  });
};

export const getPenggunaByEmail = async (email: string) => {
  return prisma.pengguna.findUnique({
    where: { email },
  });
};

export const createPengguna = async (data: {
  nama: string;
  email: string;
}) => {
  return prisma.pengguna.create({ data });
};
