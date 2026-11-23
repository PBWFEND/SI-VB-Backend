
import http from "node:http";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, ENVIRONMENT, COURSE_CODE } from "./config.js";

async function bacaMahasiswa() {
  const isiFile = await readFile(
    new URL("./data-mahasiswa.json", import.meta.url),
    "utf8"
  );

  return JSON.parse(isiFile);
}

function kirimJSON(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(data, null, 2));
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const method = request.method;
  const pathname = url.pathname;

  try {
    if (method === "GET" && pathname === "/") {
      return kirimJSON(response, 200, {
        success: true,
        message: `Selamat datang di ${APP_NAME}`,
        environment: ENVIRONMENT,
        port: PORT,
        courseCode: COURSE_CODE,
      });
    }

    if (method === "GET" && pathname === "/health") {
      return kirimJSON(response, 200, {
        success: true,
        status: "up",
        node: process.version,
      });
    }

    if (method === "GET" && pathname === "/mahasiswa") {
      const mahasiswa = await bacaMahasiswa();

      return kirimJSON(response, 200, {
        success: true,
        total: mahasiswa.length,
        data: mahasiswa,
      });
    }

    return kirimJSON(response, 404, {
      success: false,
      message: `Endpoint ${method} ${pathname} tidak ditemukan`,
    });
  } catch (error) {
    console.error("Kesalahan server:", error.message);

    return kirimJSON(response, 500, {
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Environment: ${ENVIRONMENT}`);
  console.log("Endpoint: GET /, GET /health, GET /mahasiswa");
});
