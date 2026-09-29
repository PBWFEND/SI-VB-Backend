// demo.js
const labService = require('./Service');

const tampilkan = (label, data) => {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
};

const main = async () => {
  try {
    // 1. findAll
    const semuaLab = await labService.findAll();
    tampilkan('findAll — semua laboratorium', semuaLab);

    // 2. create
    const labBaru = await labService.create({
      nama: 'Lab Kecerdasan Buatan',
      kapasitas: 35,
      lokasi: 'Gedung D Lantai 4'
    });
    tampilkan('create — tambah laboratorium', labBaru);

    // 3. findById
    const detailLab = await labService.findById(labBaru.id);
    if (!detailLab) throw new Error(`Laboratorium dengan id ${labBaru.id} tidak ditemukan`);
    tampilkan('findById — detail laboratorium', detailLab);

    // 4. update
    const labDiubah = await labService.update(labBaru.id, {
      kapasitas: 45,
      status: 'perbaikan'
    });
    if (!labDiubah) throw new Error(`Laboratorium dengan id ${labBaru.id} gagal diubah`);
    tampilkan('update — ubah laboratorium', labDiubah);

    // 5. Promise.all — dua kueri paralel
    const [lab1, lab2] = await Promise.all([
      labService.findById(1),
      labService.findById(2)
    ]);
    tampilkan('Promise.all — findById(1) & findById(2)', { lab1, lab2 });

    // 6. delete
    const labDihapus = await labService.delete(labBaru.id);
    if (!labDihapus) throw new Error(`Laboratorium dengan id ${labBaru.id} gagal dihapus`);
    tampilkan('delete — hapus laboratorium', labDihapus);

    // 7. Kasus id tidak ditemukan (try/catch)
    const labTidakAda = await labService.findById(999);
    if (!labTidakAda) throw new Error('Laboratorium dengan id 999 tidak ditemukan');

  } catch (error) {
    console.error(`\n[ERROR] ${error.message}`);
  } finally {
    console.log('\nDemo selesai.');
  }
};

main();