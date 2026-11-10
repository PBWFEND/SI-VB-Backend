/**
 * ============================================================
 * Latihan Pertemuan 3 — Modul, File, Environment, HTTP
 * ============================================================
 * Tujuan:
 *   Menerapkan module ESM, environment variable, dan filesystem.
 *
 * Jalankan:
 *   node latihan.js
 *   COURSE_CODE="CPMK115" node latihan.js
 *   APP_NAME="Latihan Backend" COURSE_CODE="IF202" node latihan.js
 */

import path from "node:path";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { getConfig } from "./config.js";

const config = getConfig();
const fileLatihan = path.join(import.meta.dirname, "hasil-latihan.txt");
const daftarEndpoint = ["GET /", "GET /health", "GET /students"];

const buatRingkasan = ({ appName, environment, port, courseCode }, endpoints) => [
  `Aplikasi: ${appName}`,
  `Environment: ${environment}`,
  `Port: ${port}`,
  `Course Code: ${courseCode}`,
  `Endpoint: ${endpoints.join(", ")}`,
].join("\n");

// 1. Tulis ringkasan konfigurasi ke file latihan
const ringkasan = buatRingkasan(config, daftarEndpoint);
await writeFile(fileLatihan, ringkasan, "utf8");

// 2. Baca file ringkasan yang baru dibuat
const hasilBaca = await readFile(fileLatihan, "utf8");
console.log("=== Ringkasan Aplikasi & Environment ===");
console.log(hasilBaca);

// 3. Hapus file ringkasan sementara
await unlink(fileLatihan);
console.log("File hasil latihan dihapus setelah dibaca.\n");

// ============================================================
// Fungsi bacaJSON(namaFile) dengan penanganan try/catch
// ============================================================
export async function bacaJSON(namaFile) {
  try {
    const isi = await readFile(namaFile, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`[try/catch] File tidak ditemukan: ${namaFile}`);
      return null;
    }
    console.error(`[try/catch] Gagal membaca atau mem-parse JSON: ${error.message}`);
    return null;
  }
}

// ============================================================
// Pengujian function bacaJSON
// ============================================================
console.log("=== Pengujian bacaJSON(namaFile) ===");

// Kondisi 1: Membaca file JSON yang tersedia (students.json)
const fileStudents = path.join(import.meta.dirname, "students.json");
const dataStudents = await bacaJSON(fileStudents);
console.log("1. Berhasil membaca file JSON yang ada (students.json):");
console.log(dataStudents);

// Kondisi 2: Membaca file yang tidak ada (ditangani oleh try/catch)
console.log("\n2. Menguji penanganan file tidak ada (file-tidak-ada.json):");
const fileTidakAda = path.join(import.meta.dirname, "file-tidak-ada.json");
const hasilTidakAda = await bacaJSON(fileTidakAda);
console.log("Hasil pengembalian:", hasilTidakAda);
