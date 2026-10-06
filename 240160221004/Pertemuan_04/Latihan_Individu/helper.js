// helper.js
import { readFile } from "node:fs/promises";

export const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

// [Latihan Individu No. 3 & 4] Fungsi bacaJSON dengan try/catch
export const bacaJSON = async (namaFile) => {
  try {
    const data = await readFile(namaFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File ${namaFile} tidak ditemukan.`);
    }
    throw new Error(`Gagal membaca file ${namaFile}: ${error.message}`);
  }
};