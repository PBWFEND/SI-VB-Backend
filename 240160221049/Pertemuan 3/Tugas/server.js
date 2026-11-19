/**
 * ============================================================
 * Tugas 2 — HTTP Server Node.js (tanpa Express)
 * ============================================================
 * Endpoint:
 *   GET /          → informasi aplikasi
 *   GET /health    → status server
 *   GET /students  → daftar mahasiswa (baca file JSON)
 *   lainnya        → 404 JSON
 *
 * Jalankan:
 *   node server.js
 *   PORT=4050 COURSE_CODE=SI-VA-2026 node server.js
 *
 * Uji:
 *   curl -i http://localhost:3003/
 *   curl -i http://localhost:3003/health
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

// ---------- Filesystem: baca JSON dengan try/catch ----------
const bacaJSON = async (namaFile) => {
  try {
    const lokasi = path.join(import.meta.dirname, "data", namaFile);
    const isi = await readFile(lokasi, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    // ENOENT = file tidak ditemukan, SyntaxError = JSON tidak valid
    console.error(`[FS ERROR] ${namaFile}: ${error.message}`);
    return null;
  }
};

// ---------- Routing ----------
const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // GET / — informasi aplikasi
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
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
      uptime: `${Math.floor(process.uptime())}s`,
      courseCode: COURSE_CODE,
    });
  }

  // GET /students — baca file JSON
  if (method === "GET" && url === "/students") {
    const mahasiswa = await bacaJSON("mahasiswa.json");

    // File tidak ditemukan / JSON invalid
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

// ---------- Start server ----------
server.on("error", (error) => {
  // EADDRINUSE = port sudah dipakai
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${PORT} sedang digunakan. Hentikan proses lain atau gunakan PORT lain.`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV} | Course: ${COURSE_CODE}`);
});