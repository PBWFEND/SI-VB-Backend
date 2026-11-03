/**
 * Pertemuan 3 - Tugas 2
 * HTTP Server Sederhana menggunakan Node.js
 */

import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, NODE_ENV } from "./config.js";

// Helper untuk mengirim response JSON
const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload, null, 2));
};

// Membaca data dari file JSON secara asynchronous
const bacaData = async () => {
  try {
    const filePath = path.join(import.meta.dirname, "data.json");
    const isiFile = await readFile(filePath, "utf8");

    return JSON.parse(isiFile);
  } catch (error) {
    console.error("Gagal membaca data:", error.message);
    return null;
  }
};

// Membuat HTTP server
const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Endpoint 1: GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      environment: NODE_ENV,
      endpoints: [
        "GET /",
        "GET /health",
        "GET /students",
      ],
    });
  }

  // Endpoint 2: GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
      environment: NODE_ENV,
    });
  }

  // Endpoint 3: GET /students
  if (method === "GET" && url === "/students") {
    const data = await bacaData();

    if (!data) {
      return sendJSON(response, 500, {
        success: false,
        message: "Data mahasiswa gagal dibaca",
      });
    }

    return sendJSON(response, 200, {
      success: true,
      data,
    });
  }

  // Endpoint tidak tersedia
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

// Menjalankan server
server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});