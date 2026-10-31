
import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";

import {
  APP_NAME,
  PORT,
  NODE_ENV,
  COURSE_CODE,
} from "./config.js";

// Lokasi file JSON mahasiswa
const lokasiMahasiswa = path.join(
  import.meta.dirname,
  "data",
  "mahasiswa.json"
);

// Helper untuk mengirim response JSON
function sendJSON(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload, null, 2));
}

// Function untuk membaca file JSON
async function bacaJSON(namaFile) {
  try {
    const isiFile = await readFile(namaFile, "utf8");
    return JSON.parse(isiFile);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("File tidak ditemukan:", namaFile);
      return null;
    }

    throw error;
  }
}

// Membuat HTTP server
const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  // Endpoint GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: "API Absensi Perkuliahan Mahasiswa",
      appName: APP_NAME,
      courseCode: COURSE_CODE,
      environment: NODE_ENV,
      endpoints: [
        "GET /",
        "GET /health",
        "GET /students",
      ],
    });
  }

  // Endpoint GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      nodeVersion: process.version,
    });
  }

  // Endpoint GET /students
  if (method === "GET" && url === "/students") {
    try {
      const dataMahasiswa = await bacaJSON(lokasiMahasiswa);

      if (dataMahasiswa === null) {
        return sendJSON(response, 500, {
          success: false,
          message: "File data mahasiswa tidak ditemukan.",
        });
      }

      return sendJSON(response, 200, {
        success: true,
        courseCode: COURSE_CODE,
        total: dataMahasiswa.length,
        data: dataMahasiswa,
      });
    } catch (error) {
      console.error("Kesalahan membaca data:", error.message);

      return sendJSON(response, 500, {
        success: false,
        message: "Terjadi kesalahan saat membaca data mahasiswa.",
      });
    }
  }

  // Endpoint tidak ditemukan
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan.`,
  });
});

// Menjalankan server
server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Kode Mata Kuliah: ${COURSE_CODE}`);
  console.log(`Environment: ${NODE_ENV}`);
});
