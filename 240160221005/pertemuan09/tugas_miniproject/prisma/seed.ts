import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.laboratorium.count();
  if (count > 0) {
    console.log('Seed dilewati: data sudah ada.');
    return;
  }

  await prisma.laboratorium.createMany({
    data: [
      { nama: 'Lab Rekayasa Perangkat Lunak', kapasitas: 40, lokasi: 'Gedung A Lantai 2', status: 'tersedia' },
      { nama: 'Lab Jaringan Komputer',        kapasitas: 30, lokasi: 'Gedung B Lantai 1', status: 'tersedia' },
      { nama: 'Lab Multimedia',               kapasitas: 25, lokasi: 'Gedung C Lantai 3', status: 'perbaikan' },
    ],
  });

  console.log('Seed berhasil: 3 laboratorium ditambahkan.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());