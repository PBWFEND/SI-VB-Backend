/**
 * ============================================================
 * Tugas 2 — HTTP Server E-Warung Kampus
 * ============================================================
 * Menggunakan node:http dan module bawaan Node.js.
 * Tidak ada dependency pihak ketiga (tanpa Express.js).
 *
 * Jalankan:
 *   node server.js
 *   PORT=3050 node server.js
 */

import http from "node:http";
import path from "node:path";
import { readFile, appendFile } from "node:fs/promises";
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
// Helper: baca file JSON, kembalikan null jika gagal
// ============================================================
const bacaJSON = async (namaFile) => {
  try {
    const lokasi = path.join(import.meta.dirname, "data", namaFile);
    const isi = await readFile(lokasi, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    console.error(`[bacaJSON] Gagal membaca ${namaFile}: ${error.message}`);
    return null;
  }
};

// ============================================================
// Helper: catat request ke file log (operasi tulis asynchronous)
// ============================================================
const catatLog = async (method, url, status) => {
  try {
    const lokasiLog = path.join(import.meta.dirname, "data", "access.log");
    const baris = `[${new Date().toISOString()}] ${method} ${url} → ${status}\n`;
    await appendFile(lokasiLog, baris, "utf8");
  } catch (error) {
    console.error(`[catatLog] Gagal menulis log: ${error.message}`);
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
    await catatLog(method, url, 200);
    return sendJSON(res, 200, {
      success: true,
      appName,
      environment,
      courseCode,
      endpoints: ["GET /", "GET /health", "GET /menu"],
    });
  }

  // ---------- GET /health : status server ----------
  if (method === "GET" && url === "/health") {
    await catatLog(method, url, 200);
    return sendJSON(res, 200, {
      success: true,
      status: "up",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  // ---------- GET /menu : daftar menu dari file JSON ----------
  if (method === "GET" && url === "/menu") {
    const data = await bacaJSON("menu.json");

    if (data === null) {
      await catatLog(method, url, 500);
      return sendJSON(res, 500, {
        success: false,
        message: "Data menu tidak dapat dibaca",
      });
    }

    await catatLog(method, url, 200);
    return sendJSON(res, 200, {
      success: true,
      courseCode,
      total: data.length,
      data,
    });
  }

  // ---------- Endpoint lain → 404 ----------
  await catatLog(method, url, 404);
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