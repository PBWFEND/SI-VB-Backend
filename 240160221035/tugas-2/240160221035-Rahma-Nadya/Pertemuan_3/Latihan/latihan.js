/**
 * ============================================================
 * Latihan Pertemuan 3 — Modul, File, Environment, HTTP
 * ============================================================
 * Tujuan:
 *   Menerapkan module ESM, environment variable, dan filesystem.
 *
 * Jalankan:
 *   node latihan.js
 *   APP_NAME="Latihan Backend" node latihan.js
 */

import path from "node:path";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { getConfig } from "./config.js";

const config = getConfig();
const fileLatihan = path.join(import.meta.dirname, "hasil-latihan.txt");
const daftarEndpoint = ["GET /", "GET /health", "GET /mahasiswa"];

const bacaJSON = async (namaFile) => {
  try {
    const isiFile = await readFile(namaFile, "utf8");
    return JSON.parse(isiFile);
  } catch (error) {
    console.log("File tidak ditemukan:", error.message);
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
console.log(hasilBaca);

await unlink(fileLatihan);
console.log("File hasil latihan dihapus setelah dibaca.");

const hasilError = await bacaJSON("file-tidak-ada.json");
console.log("Hasil baca:", hasilError);