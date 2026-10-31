
/*
  refactor.js
  Refactoring kode JavaScript lama ke ES6+
  Kasus: Sistem Informasi Absensi Perkuliahan

  Contoh ini disusun dengan bantuan AI dan perlu
  dipahami serta ditinjau kembali oleh mahasiswa.
*/

// ==========================================
// A. BEFORE: KODE JAVASCRIPT LAMA
// ==========================================

console.log("===== BEFORE: LEGACY CODE =====");

var dataAbsensiLama = [
  { nama: "Disti", mataKuliah: "Manajemen Proyek SI", status: "Hadir" },
  { nama: "Disti", mataKuliah: "Tata Kelola TI", status: "Izin" },
  { nama: "Disti", mataKuliah: "ERP", status: "Terlambat" },
  { nama: "Disti", mataKuliah: "Pemrograman Web Backend", status: "Hadir" }
];

function tampilkanAbsensiLama(data) {
  for (var i = 0; i < data.length; i++) {
    console.log(
      "Mata Kuliah: " + data[i].mataKuliah +
      ", Status: " + data[i].status
    );
  }
}

function hitungHadirLama(data) {
  var jumlah = 0;

  for (var i = 0; i < data.length; i++) {
    if (data[i].status === "Hadir") {
      jumlah = jumlah + 1;
    }
  }

  return jumlah;
}

tampilkanAbsensiLama(dataAbsensiLama);
console.log("Jumlah kehadiran:", hitungHadirLama(dataAbsensiLama));


// ==========================================
// B. AFTER: KODE JAVASCRIPT MODERN ES6+
// ==========================================

console.log("\n===== AFTER: MODERN JAVASCRIPT ES6+ =====");

// Menggunakan const dan arrow function
const dataAbsensi = [
  { nama: "Disti", mataKuliah: "Manajemen Proyek SI", status: "Hadir" },
  { nama: "Disti", mataKuliah: "Tata Kelola TI", status: "Izin" },
  { nama: "Disti", mataKuliah: "ERP", status: "Terlambat" },
  { nama: "Disti", mataKuliah: "Pemrograman Web Backend", status: "Hadir" }
];

// Default value, destructuring, dan template literal
const tampilkanAbsensi = (data = []) => {
  data.forEach(({ mataKuliah, status }) => {
    console.log(`Mata Kuliah: ${mataKuliah}, Status: ${status}`);
  });
};

// Filter untuk mengambil absensi dengan status Hadir
const ambilKehadiran = (data = []) => {
  return data.filter(({ status }) => status === "Hadir");
};

// Map untuk mengambil nama mata kuliah
const ambilMataKuliah = (data = []) => {
  return data.map(({ mataKuliah }) => mataKuliah);
};

// Reduce untuk menghitung jumlah kehadiran
const hitungKehadiran = (data = []) => {
  return data.reduce(
    (jumlah, { status }) => status === "Hadir" ? jumlah + 1 : jumlah,
    0
  );
};

// Menampilkan hasil refactoring
tampilkanAbsensi(dataAbsensi);

const daftarHadir = ambilKehadiran(dataAbsensi);
const daftarMataKuliah = ambilMataKuliah(dataAbsensi);
const jumlahHadir = hitungKehadiran(dataAbsensi);

console.log("\nDaftar absensi Hadir:", daftarHadir);
console.log("Daftar mata kuliah:", daftarMataKuliah);
console.log(`Jumlah kehadiran: ${jumlahHadir}`);
