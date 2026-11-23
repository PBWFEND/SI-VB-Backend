/**
 * ============================================================
 * Demo Pertemuan 1 — Node.js HTTP Server Sederhana (tanpa Express)
 * ============================================================
 * Tujuan:
 *   1. Melihat langsung konsep Client → HTTP Request → Server → HTTP Response
 *   2. Memahami routing manual: method + url
 *   3. Mengirim response JSON dengan status code yang tepat
 *
 * Jalankan:
 *   node server.js
 * Lalu buka browser:
 *   http://localhost:3000/
 *   http://localhost:3000/mahasiswa
 *   http://localhost:3000/tidak-ada  (contoh 404)
 *
 * Uji POST (terminal terpisah):
 *   curl -X POST http://localhost:3000/mahasiswa \
 *     -H "Content-Type: application/json" \
 *     -d '{"nim":"F1D022099","nama":"Jhon Doe"}'
 */

// 1. Import module bawaan Node.js bernama "http"
const http = require("node:http");

const PORT = 3000;

// 2. "Database" sementara — array biasa di memori
const mahasiswa = [
  { nim: "F1D022001", nama: "Jhon Doe" },
  { nim: "F1D022002", nama: "Ani Lestari" },
];

// ---------- Helper: kirim response JSON dengan rapi ----------
function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload, null, 2));
}

// ---------- Helper: membaca body request (POST/PUT/PATCH) ----------
function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve(null); // body bukan JSON valid
      }
    });
  });
}

// 3. createServer menerima callback yang dijalankan SETIAP ada request
const server = http.createServer(async (req, res) => {
  // req  = objek HTTP Request  (method, url, headers, body)
  // res  = objek HTTP Response (yang kita isi dan kirim balik)
  const { method, url } = req;

  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // ---------------------------------------------------------
  // ROUTING MANUAL: memilih respons berdasarkan method + url
  // ---------------------------------------------------------

  // GET / → info API
  if (method === "GET" && url === "/") {
    return sendJSON(res, 200, {
      success: true,
      message: "Selamat datang di API Pertemuan 1",
      endpoints: ["GET /", "GET /mahasiswa", "POST /mahasiswa"],
    });
  }

  // GET /mahasiswa → ambil SEMUA data (Read)
  if (method === "GET" && url === "/mahasiswa") {
    return sendJSON(res, 200, {
      success: true,
      message: "Data mahasiswa berhasil diambil",
      total: mahasiswa.length,
      data: mahasiswa,
    });
  }

  // POST /mahasiswa → tambah data baru (Create)
  if (method === "POST" && url === "/mahasiswa") {
    const body = await readBody(req);

    if (!body?.nim || !body?.nama) {
      // 400 = Bad Request → input dari client tidak valid
      return sendJSON(res, 400, {
        success: false,
        message: "Field 'nim' dan 'nama' wajib diisi (format JSON)",
      });
    }

    const baru = { nim: body.nim, nama: body.nama };
    mahasiswa.push(baru);

    // 201 = Created → resource baru berhasil dibuat
    return sendJSON(res, 201, {
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data: baru,
    });
  }

  // Selain itu → 404 Not Found
  return sendJSON(res, 404, {
    success: false,
    message: `Endpoint ${method} ${url} tidak ditemukan`,
  });
});

// 4. Server "mendengarkan" koneksi di port 3000
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
  console.log("Tekan Ctrl+C untuk menghentikan server.");
});