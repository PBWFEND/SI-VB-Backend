
import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getConfig } from "./config.js";

const config = getConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function kirimJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify(data, null, 2));
}

async function bacaJSON(namaFile) {
  const lokasiFile = path.join(__dirname, "data", namaFile);
  const isiFile = await readFile(lokasiFile, "utf-8");
  return JSON.parse(isiFile);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    if (req.method !== "GET") {
      return kirimJSON(res, 405, {
        success: false,
        message: "Method tidak diizinkan",
      });
    }

    if (pathname === "/") {
      return kirimJSON(res, 200, {
        success: true,
        message: `Selamat datang di ${config.appName}`,
        courseCode: config.courseCode,
      });
    }

    if (pathname === "/health") {
      return kirimJSON(res, 200, {
        success: true,
        status: "OK",
        environment: config.environment,
      });
    }

    if (pathname === "/students") {
      const students = await bacaJSON("students.json");

      return kirimJSON(res, 200, {
        success: true,
        total: students.length,
        data: students,
      });
    }

    return kirimJSON(res, 404, {
      success: false,
      message: "Endpoint tidak ditemukan",
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);

    return kirimJSON(res, 500, {
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

server.listen(config.port, () => {
  console.log(`${config.appName} berjalan di http://localhost:${config.port}`);
  console.log(`Environment: ${config.environment}`);
  console.log(`Course Code: ${config.courseCode}`);
});
