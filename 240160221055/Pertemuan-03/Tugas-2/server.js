import http from "node:http";
import { readFile } from "node:fs/promises";
import { APP_NAME, PORT, ENV } from "./config.js";

const sendJson = (res, statusCode, data) => {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify(data));
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/") {
      return sendJson(res, 200, {
        message: `Welcome to ${APP_NAME}`,
        environment: ENV
      });
    }

    if (req.method === "GET" && url.pathname === "/health") {
      return sendJson(res, 200, {
        status: "ok"
      });
    }

    if (req.method === "GET" && url.pathname === "/students") {
      const filePath = new URL("./data/students.json", import.meta.url);
      const fileContent = await readFile(filePath, "utf-8");
      const students = JSON.parse(fileContent);

      return sendJson(res, 200, {
        data: students
      });
    }

    return sendJson(res, 404, {
      error: "Endpoint tidak ditemukan"
    });
  } catch (error) {
    console.error(error);

    return sendJson(res, 500, {
      error: "Terjadi kesalahan pada server"
    });
  }
});

server.listen(PORT, () => {
  console.log(`${APP_NAME} running at http://localhost:${PORT}`);
  console.log(`Environment: ${ENV}`);
});