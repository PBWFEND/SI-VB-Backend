import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { APP_NAME, PORT, COURSE_CODE } from "./config.js";

const bacaJSON = async (namaFile) => {
  try {
    const filePath = path.join(import.meta.dirname, namaFile);
    const data = await readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File ${namaFile} tidak ditemukan.`);
    }
    throw error;
  }
};

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

  if (method === "GET" && url === "/students") {
    try {
      const dataMahasiswa = await bacaJSON("data-mahasiswa.json");
      return sendJSON(response, 200, {
        success: true,
        courseCode: COURSE_CODE,
        data: dataMahasiswa,
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