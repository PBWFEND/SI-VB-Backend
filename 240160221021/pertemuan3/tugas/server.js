/**
 * Tugas 2 - HTTP Server Node.js tanpa Express
 * Jalankan: node server.js
 *
 * Uji pada terminal lain:
 *   curl -i http://localhost:3003/
 *   curl -i http://localhost:3003/health
 *   curl -i http://localhost:3003/kelas
 *   curl -i http://localhost:3003/waktu
 *   curl -i http://localhost:3003/tidak-ada
 *
 * Hentikan server dengan Ctrl+C.
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, NODE_ENV } from "./config.js";

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

// Membaca file JSON dari folder data. Mengembalikan null jika gagal.
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

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      environment: NODE_ENV,
      endpoints: ["GET /", "GET /health", "GET /kelas", "GET /waktu"],
    });
  }

  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
    });
  }

  if (method === "GET" && url === "/kelas") {
    const kelas = await bacaJSON("kelas.json");
    if (kelas === null) {
      return sendJSON(response, 500, {
        success: false,
        message: "Data kelas tidak dapat dibaca",
      });
    }
    return sendJSON(response, 200, { success: true, data: kelas });
  }

  if (method === "GET" && url === "/waktu") {
    return sendJSON(response, 200, {
      success: true,
      waktuServer: new Date().toISOString(),
    });
  }

  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
});