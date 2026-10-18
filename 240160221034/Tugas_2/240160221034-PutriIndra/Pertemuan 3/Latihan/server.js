import http from "node:http";
import { readFile } from "node:fs/promises";

const PORT = Number(process.env.PORT ?? 3003);
const COURSE_CODE = process.env.COURSE_CODE ?? "CPMK115";

const bacaJSON = async (namaFile) => {
  const isi = await readFile(namaFile, "utf8");
  return JSON.parse(isi);
};

const sendJSON = (response, statusCode, payload) => {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload, null, 2));
};

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/students") {
    try {
      const students = await bacaJSON("./mahasiswa.json");

      return sendJSON(response, 200, {
        success: true,
        courseCode: COURSE_CODE,
        data: students,
      });
    } catch (error) {
      return sendJSON(response, 500, {
        success: false,
        message: "File mahasiswa.json tidak ditemukan atau tidak dapat dibaca",
      });
    }
  }

  return sendJSON(response, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

server.listen(PORT, () => {
  console.log(`Latihan Pertemuan 3 berjalan di http://localhost:${PORT}`);
  console.log(`Course Code: ${COURSE_CODE}`);
});