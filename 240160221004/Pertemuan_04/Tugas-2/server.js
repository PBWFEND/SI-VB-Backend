// server.js — Tugas 2
import http from "node:http";
import path from "node:path";
import { APP_NAME, PORT, NODE_ENV } from "./config.js";
import { sendJSON, bacaJSON } from "./helper.js";

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  console.log(`[${new Date().toISOString()}] ${method} ${url}`);

  // Endpoint 1: GET /
  if (method === "GET" && url === "/") {
    return sendJSON(response, 200, {
      success: true,
      message: `Selamat datang di ${APP_NAME}`,
      environment: NODE_ENV,
      endpoints: ["GET /", "GET /health", "GET /students"],
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
    try {
      const filePath = path.join(import.meta.dirname, "data-mahasiswa.json");
      const data = await bacaJSON(filePath);
      return sendJSON(response, 200, {
        success: true,
        total: data.length,
        data,
      });
    } catch (error) {
      return sendJSON(response, 500, {
        success: false,
        message: error.message,
      });
    }
  }

  // Response 404
  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT} [${NODE_ENV}]`);
});