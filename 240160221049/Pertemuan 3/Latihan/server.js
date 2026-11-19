/**
 * ============================================================
 * Latihan Individu Pertemuan 3 — HTTP Server Node.js
 * ============================================================
 * Menerapkan:
 *   1. Endpoint GET /students (array mahasiswa)
 *   2. Environment variable COURSE_CODE (default CPMK115)
 *   3. Function bacaJSON(namaFile)
 *   4. try/catch untuk file tidak ditemukan
 *   5. Pengujian 3 kondisi
 *
 * Jalankan:
 *   node server.js
 *   COURSE_CODE=CPMK115 node server.js
 *
 * Uji:
 *   curl -i http://localhost:3003/
 *   curl -i http://localhost:3003/students
 *   curl -i http://localhost:3003/tidak-ada
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, NODE_ENV, COURSE_CODE } from "./config.js";

// ---------- Helper response JSON ----------
const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(payload, null, 2));
};

// ---------- Latihan no. 3 & 4: bacaJSON dengan try/catch ----------
const bacaJSON = async (namaFile) => {
  try {
    const lokasi = path.join(import.meta.dirname, "data", namaFile);
    const isi = await readFile(lokasi, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    // File tidak ditemukan (ENOENT) atau JSON tidak valid
    console.error(`Gagal membaca ${namaFile}:`, error.message);
    return null;
  }
};

// ---------- HTTP Server ----------
const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // GET / — informasi aplikasi
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE, // Latihan no. 2
      environment: NODE_ENV,
      endpoints: ["GET /", "GET /health", "GET /students"],
    });
  }

  // GET /health — status server
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
      courseCode: COURSE_CODE,
    });
  }

  // GET /students — Latihan no. 1
  if (method === "GET" && url === "/students") {
    const mahasiswa = await bacaJSON("mahasiswa.json");

    // Latihan no. 4: file tidak ditemukan → 500
    if (mahasiswa === null) {
      return sendJSON(response, 500, {
        success: false,
        message: "Gagal membaca data mahasiswa",
      });
    }

    return sendJSON(response, 200, {
      success: true,
      count: mahasiswa.length,
      data: mahasiswa,
    });
  }

  // Fallback 404
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Course code: ${COURSE_CODE}`);
});