import { prisma } from "../../client.ts";

export const getAllMenu = () => {
  return prisma.menu.findMany();
};

export const getMenuById = (id: number) => {
  return prisma.menu.findUnique({
    where: { id },
  });
};

export const createMenu = (data: {
  nama: string;
  harga: number;
  kategori: string;
  tersedia?: boolean;
}) => {
  return prisma.menu.create({
    data,
  });
};

export const updateMenu = (
  id: number,
  data: {
    nama?: string;
    harga?: number;
    kategori?: string;
    tersedia?: boolean;
  },
) => {
  return prisma.menu.update({
    where: { id },
    data,
  });
};

export const deleteMenu = (id: number) => {
  return prisma.menu.delete({
    where: { id },
  });
};