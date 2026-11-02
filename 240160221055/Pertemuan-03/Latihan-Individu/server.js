/**
 * ============================================================
 * Pertemuan 3 — HTTP Server Node.js tanpa Express
 * ============================================================
 * Tujuan:
 *   1. Menggunakan module bawaan node:http.
 *   2. Membaca environment variable.
 *   3. Membaca data JSON menggunakan node:fs/promises.
 *   4. Menyusun response JSON dengan routing sederhana.
 *
 * Jalankan:
 *   node server.js
 *
 * Uji pada terminal lain:
 *   curl -i http://localhost:3003/
 *   curl -i http://localhost:3003/students
 *   curl -i http://localhost:3003/tidak-ada
 *
 * Hentikan server dengan Ctrl+C.
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

const bacaJSON = async (namaFile) => {
  try {
    const isiFile = await readFile(namaFile, "utf8");
    return JSON.parse(isiFile);
  } catch (error) {
    throw new Error(`File JSON tidak ditemukan atau tidak valid: ${namaFile}`);
  }
};

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

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

  if (method === "GET" && url === "/students") {
    try {
      const fileStudents = path.join(import.meta.dirname, "students.json");
      const students = await bacaJSON(fileStudents);

      return sendJSON(response, 200, {
        success: true,
        data: students,
      });
    } catch (error) {
      return sendJSON(response, 500, {
        success: false,
        message: error.message,
      });
    }
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