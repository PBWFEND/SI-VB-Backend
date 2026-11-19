/**
 * ============================================================
 * Latihan Individu Pertemuan 3 — HTTP Server + Filesystem
 * ============================================================
 * Memenuhi 5 poin latihan:
 *   1. Endpoint GET /students
 *   2. Environment variable COURSE_CODE (default CPMK115)
 *   3. Function bacaJSON(namaFile)
 *   4. try/catch untuk file tidak ditemukan
 *   5. Uji endpoint tersedia, endpoint 404, dan env berubah
 *
 * Jalankan:
 *   COURSE_CODE=CPMK115 node latihan.js
 *   PORT=3003 node latihan.js
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { getConfig } from "./config.js";

const config = getConfig();
const { appName, port, environment, courseCode } = config;

// ============================================================
// Helper: kirim JSON response dengan format konsisten
// ============================================================
const sendJSON = (res, statusCode, payload) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(payload, null, 2));
};

// ============================================================
// Function bacaJSON — membaca file JSON, parse, kembalikan object
// Menggunakan try/catch agar file yang tidak ditemukan tidak
// membuat server crash. Mengembalikan null jika gagal.
// ============================================================
const bacaJSON = async (namaFile) => {
  try {
    const lokasi = path.join(import.meta.dirname, "data", namaFile);
    const isi = await readFile(lokasi, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    // ENOENT = file tidak ada; JSON.parse error = format rusak
    console.error(`[bacaJSON] Gagal membaca ${namaFile}: ${error.message}`);
    return null;
  }
};

// ============================================================
// Server — routing manual berdasarkan method + url
// ============================================================
const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // ---------- GET / : informasi aplikasi ----------
  if (method === "GET" && url === "/") {
    return sendJSON(res, 200, {
      success: true,
      appName,
      environment,
      courseCode,
      endpoints: ["GET /", "GET /health", "GET /students"],
    });
  }

  // ---------- GET /health : status server ----------
  if (method === "GET" && url === "/health") {
    return sendJSON(res, 200, {
      success: true,
      status: "up",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  // ---------- GET /students : daftar mahasiswa dari file JSON ----------
  if (method === "GET" && url === "/students") {
    const data = await bacaJSON("mahasiswa.json");

    if (data === null) {
      // File tidak ditemukan atau format rusak → 500
      return sendJSON(res, 500, {
        success: false,
        message: "Data mahasiswa tidak dapat dibaca",
      });
    }

    return sendJSON(res, 200, {
      success: true,
      courseCode,
      total: data.length,
      data,
    });
  }

  // ---------- Endpoint lain → 404 ----------
  return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

// ============================================================
// Jalankan server
// ============================================================
server.listen(port, () => {
  console.log(`[${appName}] berjalan di http://localhost:${port}`);
  console.log(`Environment: ${environment} | Course: ${courseCode}`);
  console.log("Tekan Ctrl+C untuk menghentikan server.");
});