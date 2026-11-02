
import { prisma } from "../../client.ts";

export type DataMahasiswa = {
  nim: string;
  nama: string;
  prodi: string;
  angkatan: number;
};

export type UpdateMahasiswa = Partial<Omit<DataMahasiswa, "nim">>;

export const ambilSemuaMahasiswa = async () => {
  return prisma.mahasiswa.findMany({
    orderBy: { nim: "asc" },
  });
};

export const ambilMahasiswaByNim = async (nim: string) => {
  return prisma.mahasiswa.findUnique({
    where: { nim },
  });
};

export const tambahMahasiswa = async (data: DataMahasiswa) => {
  return prisma.mahasiswa.create({
    data,
  });
};

export const ubahMahasiswa = async (
  nim: string,
  data: UpdateMahasiswa,
) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: { nim },
  });

  if (!mahasiswa) return null;

  return prisma.mahasiswa.update({
    where: { nim },
    data,
  });
};

export const hapusMahasiswa = async (nim: string) => {
  const mahasiswa = await prisma.mahasiswa.findUnique({
    where: { nim },
  });

  if (!mahasiswa) return null;

  return prisma.mahasiswa.delete({
    where: { nim },
  });
};
