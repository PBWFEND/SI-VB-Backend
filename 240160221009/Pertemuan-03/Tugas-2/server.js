
import http from "node:http";
import path from "node:path";
import { readFile } from "node:fs/promises";

import { APP_NAME, PORT, NODE_ENV } from "./config.js";
import { sendJSON } from "./helper.js";

// Menentukan lokasi file JSON
const lokasiMahasiswa = path.join(
  import.meta.dirname,
  "data",
  "mahasiswa.json"
);

const lokasiAbsensi = path.join(
  import.meta.dirname,
  "data",
  "absensi.json"
);

// Fungsi membaca file JSON secara asynchronous
async function bacaJSON(namaFile) {
  const isiFile = await readFile(namaFile, "utf8");
  return JSON.parse(isiFile);
}

// Membuat HTTP server
const server = http.createServer(async (request, response) => {
  try {
    const method = request.method;
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);

    // Hanya menerima request GET
    if (method !== "GET") {
      return sendJSON(response, 405, {
        success: false,
        message: "Method tidak diizinkan. Gunakan GET.",
      });
    }

    // GET /
    if (pathname === "/") {
      return sendJSON(response, 200, {
        success: true,
        message: "API Sistem Informasi Absensi Perkuliahan Mahasiswa",
        appName: APP_NAME,
        environment: NODE_ENV,
        endpoints: [
          "GET /",
          "GET /health",
          "GET /mahasiswa",
          "GET /mahasiswa/1",
          "GET /absensi",
          "GET /absensi/1",
        ],
      });
    }

    // GET /health
    if (pathname === "/health") {
      return sendJSON(response, 200, {
        success: true,
        status: "up",
        nodeVersion: process.version,
      });
    }

    // GET /mahasiswa
    if (pathname === "/mahasiswa") {
      const dataMahasiswa = await bacaJSON(lokasiMahasiswa);

      return sendJSON(response, 200, {
        success: true,
        total: dataMahasiswa.length,
        data: dataMahasiswa,
      });
    }

    // GET /mahasiswa/:id
    const cocokMahasiswa = pathname.match(/^\/mahasiswa\/(\d+)$/);

    if (cocokMahasiswa) {
      const id = Number(cocokMahasiswa[1]);
      const dataMahasiswa = await bacaJSON(lokasiMahasiswa);

      const mahasiswa = dataMahasiswa.find(
        (item) => item.id === id
      );

      if (!mahasiswa) {
        return sendJSON(response, 404, {
          success: false,
          message: `Mahasiswa dengan ID ${id} tidak ditemukan.`,
        });
      }

      return sendJSON(response, 200, {
        success: true,
        data: mahasiswa,
      });
    }

    // GET /absensi
    if (pathname === "/absensi") {
      const dataAbsensi = await bacaJSON(lokasiAbsensi);

      return sendJSON(response, 200, {
        success: true,
        total: dataAbsensi.length,
        data: dataAbsensi,
      });
    }

    // GET /absensi/:id
    const cocokAbsensi = pathname.match(/^\/absensi\/(\d+)$/);

    if (cocokAbsensi) {
      const id = Number(cocokAbsensi[1]);
      const dataAbsensi = await bacaJSON(lokasiAbsensi);

      const absensi = dataAbsensi.find(
        (item) => item.id === id
      );

      if (!absensi) {
        return sendJSON(response, 404, {
          success: false,
          message: `Data absensi dengan ID ${id} tidak ditemukan.`,
        });
      }

      return sendJSON(response, 200, {
        success: true,
        data: absensi,
      });
    }

    // Endpoint tidak ditemukan
    return sendJSON(response, 404, {
      success: false,
      message: `Endpoint ${method} ${pathname} tidak ditemukan.`,
    });

  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);

    return sendJSON(response, 500, {
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
});

// Menjalankan server
server.listen(PORT, () => {
  console.log(`${APP_NAME} berjalan di http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
