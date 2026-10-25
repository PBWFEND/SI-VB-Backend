import path from "node:path";
import { readFile, writeFile, unlink } from "node:fs/promises";
import { getConfig, COURSE_CODE } from "./config.js";

const config = getConfig();
const fileLatihan = path.join(import.meta.dirname, "hasil-latihan.txt");
const daftarEndpoint = ["GET /", "GET /health", "GET /mahasiswa", "GET /students"];

const bacaJSON = async (namaFile) => {
  try {
    const filePath = path.join(import.meta.dirname, namaFile);
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`[ERROR] File "${namaFile}" tidak ditemukan.`);
    }
    if (error instanceof SyntaxError) {
      throw new Error(`[ERROR] Format JSON pada file "${namaFile}" tidak valid.`);
    }
    throw error;
  }
};

const buatRingkasan = ({ appName, environment, port }, endpoints) => [
  `Aplikasi: ${appName}`,
  `Environment: ${environment}`,
  `Port: ${port}`,
  `Course Code: ${COURSE_CODE}`,
  `Endpoint: ${endpoints.join(", ")}`,
].join("\n");

console.log("=== 1. Demo File System ===");
const ringkasan = buatRingkasan(config, daftarEndpoint);
await writeFile(fileLatihan, ringkasan, "utf8");
const hasilBaca = await readFile(fileLatihan, "utf8");
console.log(hasilBaca);
await unlink(fileLatihan);
console.log("File hasil latihan dihapus setelah dibaca.\n");

console.log("=== 2. Demo bacaJSON ===");

try {
  console.log("Mencoba membaca 'data-mahasiswa.json'...");
  const dataMahasiswa = await bacaJSON("data-mahasiswa.json");
  console.log("Berhasil membaca file:");
  console.log(dataMahasiswa);
} catch (error) {
  console.error(error.message);
}

try {
  console.log("\nMencoba membaca 'file-tidak-ada.json'...");
  const dataHilang = await bacaJSON("file-tidak-ada.json");
  console.log(dataHilang);
} catch (error) {
  console.error(error.message);
}

console.log("\n=== Selesai ===");