// server.js
import http from "node:http";
import { readFile } from "node:fs/promises"; // Poin 3: Import readFile
import path from "node:path";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

// Poin 3: Buat function bacaJSON
const bacaJSON = async (namaFile) => {
  try {
    const filePath = path.join(import.meta.dirname, namaFile);
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // Poin 4: Tangani file tidak ditemukan
    if (error.code === 'ENOENT') {
      throw new Error(`File ${namaFile} tidak ditemukan.`);
    }
    throw error; // Lempar error lain (misal format JSON salah)
  }
};

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Endpoint GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      courseCode: COURSE_CODE, // Menampilkan environment variable
      endpoints: ["GET /", "GET /health", "GET /students"],
    });
  }

  // Endpoint GET /health
  if (method === "GET" && url === "/health") {
    return sendJSON(response, 200, {
      success: true,
      status: "up",
      node: process.version,
    });
  }

  // Poin 1: Endpoint GET /students
  if (method === "GET" && url === "/students") {
    try {
      // Asumsi kamu punya file data-mahasiswa.json di folder yang sama
      const dataMahasiswa = await bacaJSON("data-mahasiswa.json");
      
      return sendJSON(response, 200, {
        success: true,
        courseCode: COURSE_CODE,
        data: dataMahasiswa
      });
    } catch (error) {
      // Poin 4: Tangani error jika file tidak ditemukan
      return sendJSON(response, 500, {
        success: false,
        message: error.message
      });
    }
  }

  // Handle 404
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});