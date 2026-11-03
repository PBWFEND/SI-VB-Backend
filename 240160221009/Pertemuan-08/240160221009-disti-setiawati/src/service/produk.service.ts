import { prisma } from "../../client.ts";

// Mengambil seluruh data produk
export const getAllProduk = async () => {
  return await prisma.produk.findMany();
};

// Mengambil satu produk berdasarkan ID
export const getProdukById = async (id: number) => {
  return await prisma.produk.findUnique({
    where: { id },
  });
};

// Menambahkan produk baru
export const createProduk = async (data: {
  nama: string;
  harga: number;
  kategori: string;
  tersedia?: boolean;
}) => {
  return await prisma.produk.create({ data });
};

// Memperbarui data produk
export const updateProduk = async (
  id: number,
  data: {
    nama?: string;
    harga?: number;
    kategori?: string;
    tersedia?: boolean;
  }
) => {
  return await prisma.produk.update({
    where: { id },
    data,
  });
};

// Menghapus produk
export const deleteProduk = async (id: number) => {
  return await prisma.produk.delete({
    where: { id },
  });
};
