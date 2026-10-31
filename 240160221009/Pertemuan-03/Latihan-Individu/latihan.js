
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, COURSE_CODE, getConfig } from "./config.js";

// Menentukan lokasi file JSON mahasiswa
const lokasiMahasiswa = path.join(
  import.meta.dirname,
  "data",
  "mahasiswa.json"
);

// Fungsi untuk membaca file JSON
async function bacaJSON(namaFile) {
  try {
    const isiFile = await readFile(namaFile, "utf8");
    return JSON.parse(isiFile);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File tidak ditemukan: ${namaFile}`);
      return null;
    }

    console.error("Terjadi kesalahan saat membaca JSON:", error.message);
    return null;
  }
}

// Menampilkan konfigurasi aplikasi
console.log("=== LATIHAN INDIVIDU PERTEMUAN 3 ===");
console.log("Nama Aplikasi:", APP_NAME);
console.log("Kode Mata Kuliah:", COURSE_CODE);
console.log("Konfigurasi:", getConfig());

// Membaca data mahasiswa
const dataMahasiswa = await bacaJSON(lokasiMahasiswa);

if (dataMahasiswa !== null) {
  console.log("\n=== DATA MAHASISWA ===");
  console.log("Total Mahasiswa:", dataMahasiswa.length);
  console.log(dataMahasiswa);
}
