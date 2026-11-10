/**
 * ============================================================
 * Demo & Latihan Pertemuan 3 — HTTP Server Node.js tanpa Express
 * ============================================================
 * Tujuan:
 *   1. Menggunakan module bawaan node:http.
 *   2. Membaca environment variable untuk konfigurasi port dan COURSE_CODE.
 *   3. Menyusun response JSON dengan routing sederhana.
 *   4. Endpoint GET /students dengan pembacaan file JSON via bacaJSON.
 *
 * Jalankan:
 *   node server.js
 *   COURSE_CODE=CPMK115 node server.js
 *
 * Uji pada terminal lain:
 *   curl -i http://localhost:3003/
 *   curl -i http://localhost:3003/health
 *   curl -i http://localhost:3003/students
 *   curl -i http://localhost:3003/tidak-ada
 *
 * Hentikan server dengan Ctrl+C.
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

// Helper function untuk membaca dan mem-parse file JSON dengan try/catch
export async function bacaJSON(namaFile) {
  try {
    const isi = await readFile(namaFile, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`[bacaJSON] File tidak ditemukan: ${namaFile}`);
      return null;
    }
    console.error(`[bacaJSON] Error membaca/parsing JSON: ${error.message}`);
    return null;
  }
}

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
      endpoints: ["GET /", "GET /health", "GET /students"],
    });
  }

  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
    });
  }

  // Endpoint GET /students — mengembalikan array data mahasiswa dari students.json
  if (method === "GET" && url === "/students") {
    const filePath = path.join(import.meta.dirname, "students.json");
    const students = await bacaJSON(filePath);

    if (!students) {
      return sendJSON(response, 500, {
        success: false,
        message: "Gagal memuat data mahasiswa dari file JSON",
      });
    }

    return sendJSON(response, 200, {
      success: true,
      courseCode: COURSE_CODE,
      total: students.length,
      data: students,
    });
  }

  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});
