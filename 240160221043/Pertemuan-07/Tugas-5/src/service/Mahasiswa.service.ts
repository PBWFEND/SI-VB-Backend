
import { prisma } from "../../client.ts";

// Mengambil semua data mahasiswa
export async function ambilSemuaMahasiswa() {
  return await prisma.mahasiswa.findMany();
}

// Mengambil mahasiswa berdasarkan NIM
export async function ambilMahasiswaByNim(nim: string) {
  return await prisma.mahasiswa.findUnique({
    where: { nim },
  });
}

// Menambahkan mahasiswa
export async function tambahMahasiswa(data: {
  nim: string;
  nama: string;
  prodi: string;
  semester: number;
}) {
  return await prisma.mahasiswa.create({
    data,
  });
}

// Mengubah data mahasiswa
export async function ubahMahasiswa(
  nim: string,
  data: {
    nama?: string;
    prodi?: string;
    semester?: number;
  }
) {
  return await prisma.mahasiswa.update({
    where: { nim },
    data,
  });
}

// Menghapus mahasiswa
export async function hapusMahasiswa(nim: string) {
  return await prisma.mahasiswa.delete({
    where: { nim },
  });
}
