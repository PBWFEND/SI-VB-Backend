import prisma from "../../client.js";

export const getAllPinjaman = async (status?: string) => {
  const where =
    status === "aktif"
      ? { tanggalKembali: null }
      : status === "selesai"
        ? { tanggalKembali: { not: null } }
        : {};

  return prisma.pinjaman.findMany({
    where,
    include: {
      buku: true,
      pengguna: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const getPinjamanById = async (id: number) => {
  return prisma.pinjaman.findUnique({
    where: { id },
    include: {
      buku: true,
      pengguna: true,
    },
  });
};

export const createPinjaman = async (
  bukuId: number,
  penggunaId: number
) => {
  return prisma.$transaction(async (tx) => {
    const hasilUpdate = await tx.buku.updateMany({
      where: {
        id: bukuId,
        stok: { gt: 0 },
      },
      data: {
        stok: { decrement: 1 },
      },
    });

    if (hasilUpdate.count === 0) {
      throw new Error("STOK_BUKU_TIDAK_TERSEDIA");
    }

    return tx.pinjaman.create({
      data: {
        bukuId,
        penggunaId,
      },
      include: {
        buku: true,
        pengguna: true,
      },
    });
  });
};

export const returnPinjaman = async (id: number) => {
  return prisma.$transaction(async (tx) => {
    const pinjaman = await tx.pinjaman.findUnique({
      where: { id },
    });

    if (!pinjaman) {
      throw new Error("PINJAMAN_TIDAK_DITEMUKAN");
    }

    if (pinjaman.tanggalKembali !== null) {
      throw new Error("PINJAMAN_SUDAH_DIKEMBALIKAN");
    }

    await tx.pinjaman.update({
      where: { id },
      data: {
        tanggalKembali: new Date(),
      },
    });

    await tx.buku.update({
      where: { id: pinjaman.bukuId },
      data: {
        stok: { increment: 1 },
      },
    });

    return tx.pinjaman.findUnique({
      where: { id },
      include: {
        buku: true,
        pengguna: true,
      },
    });
  });
};
