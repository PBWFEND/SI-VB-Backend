import { prisma } from "../../client.js";

export async function ambilSemuaAnggota(filter = {}) {
  const where = {};

  if (filter.nama) {
    where.nama = {
      contains: filter.nama
    };
  }

  if (filter.divisi) {
    where.divisi = {
      equals: filter.divisi
    };
  }

  return prisma.anggota.findMany({
    where,
    orderBy: {
      id: "asc"
    }
  });
}

export async function ambilAnggotaById(id) {
  return prisma.anggota.findUnique({
    where: {
      id
    }
  });
}

export async function buatAnggota(data) {
  return prisma.anggota.create({
    data
  });
}

export async function updateAnggota(id, data) {
  return prisma.anggota.update({
    where: {
      id
    },
    data
  });
}

export async function hapusAnggota(id) {
  return prisma.anggota.delete({
    where: {
      id
    }
  });
}

export async function cariAnggotaByNpm(npm) {
  return prisma.anggota.findUnique({
    where: {
      npm
    }
  });
}