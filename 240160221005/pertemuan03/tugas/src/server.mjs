// src/server.mjs
import http from "node:http";
import { URL } from "node:url";
import { APP_NAME, PORT, NODE_ENV, COURSE_CODE } from "./config.mjs";
import { sendJSON, sendError } from "./helpers.mjs";
import { readStudents } from "./data-store.mjs";

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;
  const method = req.method;

  // Log sederhana
  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  try {
    // -------- GET / --------
    if (method === "GET" && pathname === "/") {
      return sendJSON(res, 200, {
        success: true,
        message: `Selamat datang di ${APP_NAME}`,
        environment: NODE_ENV,
        courseCode: COURSE_CODE,
      });
    }

    // -------- GET /students --------
    if (method === "GET" && pathname === "/students") {
      const students = await readStudents();
      return sendJSON(res, 200, {
        success: true,
        total: students.length,
        data: students,
      });
    }

    // -------- GET /config --------
    if (method === "GET" && pathname === "/config") {
      return sendJSON(res, 200, {
        success: true,
        data: {
          appName: APP_NAME,
          port: PORT,
          environment: NODE_ENV,
          courseCode: COURSE_CODE,
        },
      });
    }

    // -------- 404 Not Found --------
    return sendError(res, 404, `Endpoint '${pathname}' tidak ditemukan`);
  } catch (err) {
    console.error(err);
    return sendError(res, 500, "Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`🚀 ${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`   Environment : ${NODE_ENV}`);
  console.log(`   Course Code : ${COURSE_CODE}`);
});