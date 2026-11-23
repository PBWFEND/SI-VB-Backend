
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

import config from "./config.js";
import { sendJSON } from "./response.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileBuku = path.join(__dirname, "data", "buku.json");

// Membaca data buku dari file JSON
async function bacaBuku() {
  const data = await readFile(fileBuku, "utf-8");
  return JSON.parse(data);
}

// Membaca data yang dikirim melalui POST
function bacaRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Format JSON tidak valid"));
      }
    });

    req.on("error", reject);
  });
}

// Membuat server HTTP
const server = http.createServer(async (req, res) => {
  const url = new URL(
    req.url,
    `http://${req.headers.host || "localhost"}`
  );

  const method = req.method;
  const pathname = url.pathname;

  try {
    // Endpoint utama
    if (method === "GET" && pathname === "/") {
      return sendJSON(res, 200, {
        pesan: "Selamat datang di API Perpustakaan",
        endpoint: [
          "GET /perpustakaan",
          "GET /buku",
          "GET /buku/:id",
          "GET /kategori",
          "POST /buku"
        ]
      });
    }

    // Informasi perpustakaan
    if (method === "GET" && pathname === "/perpustakaan") {
      return sendJSON(res, 200, {
        nama: "Perpustakaan Digital",
        deskripsi: "API untuk mengelola data buku",
        status: "aktif"
      });
    }

    // Menampilkan semua buku
    if (method === "GET" && pathname === "/buku") {
      const buku = await bacaBuku();
      return sendJSON(res, 200, {
        jumlah: buku.length,
        data: buku
      });
    }

    // Menampilkan semua kategori buku
    if (method === "GET" && pathname === "/kategori") {
      const buku = await bacaBuku();
      const kategori = [
        ...new Set(buku.map((item) => item.kategori))
      ];

      return sendJSON(res, 200, {
        jumlah: kategori.length,
        data: kategori
      });
    }

    // Menampilkan buku berdasarkan ID
    const cocok = pathname.match(/^\/buku\/(\d+)$/);

    if (method === "GET" && cocok) {
      const buku = await bacaBuku();
      const id = Number(cocok[1]);
      const hasil = buku.find((item) => item.id === id);

      if (!hasil) {
        return sendJSON(res, 404, {
          pesan: "Buku tidak ditemukan"
        });
      }

      return sendJSON(res, 200, {
        data: hasil
      });
    }

    // Menambahkan buku baru
    if (method === "POST" && pathname === "/buku") {
      const input = await bacaRequestBody(req);

      if (
        !input.judul ||
        !input.penulis ||
        !input.kategori ||
        !Number.isInteger(Number(input.tahun))
      ) {
        return sendJSON(res, 400, {
          pesan: "Judul, penulis, kategori, dan tahun wajib diisi"
        });
      }

      const buku = await bacaBuku();

      const bukuBaru = {
        id: buku.length
          ? Math.max(...buku.map((item) => item.id)) + 1
          : 1,
        judul: input.judul,
        penulis: input.penulis,
        tahun: Number(input.tahun),
        kategori: input.kategori,
        tersedia: true
      };

      buku.push(bukuBaru);

      await writeFile(
        fileBuku,
        JSON.stringify(buku, null, 2),
        "utf-8"
      );

      return sendJSON(res, 201, {
        pesan: "Buku berhasil ditambahkan",
        data: bukuBaru
      });
    }

    // Jika endpoint tidak ditemukan
    return sendJSON(res, 404, {
      pesan: "Endpoint tidak ditemukan"
    });

  } catch (error) {
    const status = error.message === "Format JSON tidak valid"
      ? 400
      : 500;

    return sendJSON(res, status, {
      pesan: status === 400
        ? error.message
        : "Terjadi kesalahan pada server"
    });
  }
});

// Menjalankan server
server.listen(config.port, () => {
  console.log(`Server berjalan di http://localhost:${config.port}`);
});
