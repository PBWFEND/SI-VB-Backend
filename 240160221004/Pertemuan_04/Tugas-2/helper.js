// helper.js — Tugas 2
import { readFile } from "node:fs/promises";

export const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

export const bacaJSON = async (namaFile) => {
  try {
    const data = await readFile(namaFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Gagal membaca file: ${error.message}`);
  }
};