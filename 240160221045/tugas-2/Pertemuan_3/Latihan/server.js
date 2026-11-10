/**
 * ============================================================
 * Latihan Individu Pertemuan 3 — HTTP Server Node.js
 * ============================================================
 * Tujuan:
 *   1. Menggunakan module bawaan node:http.
 *   2. Membaca environment variable untuk konfigurasi.
 *   3. Menyusun response JSON dengan routing sederhana.
 *   4. Membaca data mahasiswa dari file JSON.
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload, null, 2));
};

// Function untuk membaca file JSON
const bacaJSON = async (namaFile) => {
  try {
    const filePath = path.join(import.meta.dirname, namaFile);
    const isiFile = await readFile(filePath, "utf8");

    return JSON.parse(isiFile);
  } catch (error) {
    console.error("Gagal membaca file JSON:", error.message);
    return null;
  }
};

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
      endpoints: [
        "GET /",
        "GET /health",
        "GET /students",
      ],
    });
  }

  // GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
      courseCode: COURSE_CODE,
    });
  }

  // GET /students
  if (method === "GET" && url === "/students") {
    const mahasiswa = await bacaJSON("mahasiswa.json");

    if (!mahasiswa) {
      return sendJSON(response, 500, {
        success: false,
        message: "Data mahasiswa gagal dibaca",
      });
    }

    return sendJSON(response, 200, {
      success: true,
      data: mahasiswa,
    });
  }

  // Endpoint tidak ditemukan
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`COURSE_CODE: ${COURSE_CODE}`);
});