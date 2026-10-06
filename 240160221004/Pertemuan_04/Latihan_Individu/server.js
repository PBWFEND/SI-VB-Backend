// server.js — Latihan Individu Pertemuan 3
import http from "node:http";
import path from "node:path";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";
import { sendJSON, bacaJSON } from "./helper.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Endpoint 1: GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE,
      endpoints: ["GET /", "GET /students"],
    });
  }

  // [Latihan Individu No. 1] Endpoint GET /students
  if (method === "GET" && url === "/students") {
    try {
      const filePath = path.join(import.meta.dirname, "data-mahasiswa.json");
      const dataMahasiswa = await bacaJSON(filePath);
      
      return sendJSON(response, 200, {
        success: true,
        courseCode: COURSE_CODE,
        total: dataMahasiswa.length,
        data: dataMahasiswa,
      });
    } catch (error) {
      return sendJSON(response, 500, {
        success: false,
        message: error.message,
      });
    }
  }

  // [Latihan Individu No. 5] Endpoint tidak tersedia (404)
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});