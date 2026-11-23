/**
 * ============================================================
 * Latihan Pertemuan 3 — Modul, File, Environment, HTTP
 * ============================================================
 * Jalankan:
 *   node latihan.js
 *   APP_NAME="Latihan Backend" COURSE_CODE="CPMK115" node latihan.js
 */

import path from "node:path";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { getConfig } from "./config.js";

const config = getConfig();
const fileLatihan = path.join(import.meta.dirname, "hasil-latihan.txt");
const daftarEndpoint = ["GET /", "GET /health", "GET /students"];

// ---------- Function bacaJSON (Latihan no. 3 & 4) ----------
const bacaJSON = async (namaFile) => {
  try {
    const lokasi = path.join(import.meta.dirname, "data", namaFile);
    const isi = await readFile(lokasi, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    console.error(`Gagal membaca ${namaFile}:`, error.message);
    return null;
  }
};

const buatRingkasan = ({ appName, environment, port, courseCode }, endpoints) => [
  `Aplikasi: ${appName}`,
  `Environment: ${environment}`,
  `Port: ${port}`,
  `Course Code: ${courseCode}`,
  `Endpoint: ${endpoints.join(", ")}`,
].join("\n");

const ringkasan = buatRingkasan(config, daftarEndpoint);
await writeFile(fileLatihan, ringkasan, "utf8");

const hasilBaca = await readFile(fileLatihan, "utf8");
console.log("=== Ringkasan ===");
console.log(hasilBaca);

// ---------- Uji bacaJSON: file ada & tidak ada ----------
console.log("\n=== Uji bacaJSON ===");
const dataMhs = await bacaJSON("mahasiswa.json");
console.log("mahasiswa.json:", dataMhs?.length ?? "null", "record");

const dataHilang = await bacaJSON("tidak-ada.json");
console.log("tidak-ada.json:", dataHilang); // null

await unlink(fileLatihan);
console.log("\nFile hasil latihan dihapus setelah dibaca.");