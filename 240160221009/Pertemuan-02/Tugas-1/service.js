
 // service.js
// Sistem Informasi Absensi Perkuliahan Mahasiswa

// Simulasi waktu proses database selama 150 ms
function tunda() {
  return new Promise((resolve) => {
    setTimeout(resolve, 150);
  });
}

// Data awal mahasiswa
let dataMahasiswa = [
  {
    id: 1,
    nim: "240160221009",
    nama: "Disti Setiawati",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 2,
    nim: "240160221010",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    semester: 5,
  },
  {
    id: 3,
    nim: "240160221011",
    nama: "Sinta Maharani",
    prodi: "Sistem Informasi",
    semester: 5,
  },
];

// Data awal absensi perkuliahan
let dataAbsensi = [
  {
    id: 1,
    mahasiswaId: 1,
    mataKuliah: "Manajemen Proyek SI",
    pertemuan: 1,
    tanggal: "2026-10-05",
    status: "Hadir",
  },
  {
    id: 2,
    mahasiswaId: 1,
    mataKuliah: "Tata Kelola TI",
    pertemuan: 1,
    tanggal: "2026-10-06",
    status: "Izin",
  },
  {
    id: 3,
    mahasiswaId: 2,
    mataKuliah: "Manajemen Proyek SI",
    pertemuan: 1,
    tanggal: "2026-10-05",
    status: "Terlambat",
  },
  {
    id: 4,
    mahasiswaId: 3,
    mataKuliah: "Manajemen Proyek SI",
    pertemuan: 1,
    tanggal: "2026-10-05",
    status: "Hadir",
  },
];

// Fungsi untuk membuat service CRUD
function buatService(dataAwal) {
  let data = dataAwal;

  return {
    // Mengambil seluruh data
    async findAll() {
      await tunda();
      return [...data];
    },

    // Mencari data berdasarkan ID
    async findById(id) {
      await tunda();
      return data.find((item) => item.id === id) || null;
    },

    // Menambahkan data baru
    async create(dataBaru) {
      await tunda();

      const idBaru =
        data.length > 0
          ? Math.max(...data.map((item) => item.id)) + 1
          : 1;

      const dataDibuat = {
        id: idBaru,
        ...dataBaru,
      };

      data.push(dataDibuat);
      return dataDibuat;
    },

    // Memperbarui data berdasarkan ID
    async update(id, perubahan) {
      await tunda();

      const index = data.findIndex((item) => item.id === id);

      if (index === -1) {
        return null;
      }

      data[index] = {
        ...data[index],
        ...perubahan,
      };

      return data[index];
    },

    // Menghapus data berdasarkan ID
    async delete(id) {
      await tunda();

      const index = data.findIndex((item) => item.id === id);

      if (index === -1) {
        return null;
      }

      const dataDihapus = data.splice(index, 1);
      return dataDihapus[0];
    },
  };
}

// Membuat service mahasiswa dan absensi
const mahasiswaService = buatService(dataMahasiswa);
const absensiService = buatService(dataAbsensi);

// Membuat rekap kehadiran berdasarkan mata kuliah
async function rekapPerMataKuliah(namaMataKuliah) {
  await tunda();

  const dataMataKuliah = dataAbsensi.filter(
    (item) => item.mataKuliah === namaMataKuliah
  );

  return {
    mataKuliah: namaMataKuliah,
    totalAbsensi: dataMataKuliah.length,
    hadir: dataMataKuliah.filter((item) => item.status === "Hadir").length,
    izin: dataMataKuliah.filter((item) => item.status === "Izin").length,
    sakit: dataMataKuliah.filter((item) => item.status === "Sakit").length,
    alfa: dataMataKuliah.filter((item) => item.status === "Alfa").length,
    terlambat: dataMataKuliah.filter(
      (item) => item.status === "Terlambat"
    ).length,
  };
}

// Export agar dapat digunakan di file lain
module.exports = {
  mahasiswaService,
  absensiService,
  rekapPerMataKuliah,
};
