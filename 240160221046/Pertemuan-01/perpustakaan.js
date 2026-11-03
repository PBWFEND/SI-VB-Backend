/**
 * ============================================================
 * Case Based Learning Pertemuan 1 — API Perpustakaan
 * ============================================================
 * Implementasi REFERENSI dari rancangan endpoint pada materi
 * (section 16). Server ini memakai Node.js murni agar mahasiswa
 * fokus pada konsep HTTP, bukan framework.
 *
 * Jalankan:
 *   node perpustakaan.js
 *
 * Uji cepat (curl):
 *   # Daftar buku
 *   curl http://localhost:3002/buku
 *
 *   # Tambah buku
 *   curl -X POST http://localhost:3002/buku \
 *     -H "Content-Type: application/json" \
 *     -d '{"judul":"Belajar Node.js","penulis":"Andi","tahun":2024,"stok":3}'
 *
 *   # Pinjam buku id 1
 *   curl -X POST http://localhost:3002/buku/1/peminjaman
 *
 *   # Kembalikan pinjaman id 1
 *   curl -X PATCH http://localhost:3002/peminjaman/1/pengembalian
 *
 *   # Hapus buku id 1
 *   curl -X DELETE http://localhost:3002/buku/1
 */

const http = require("node:http");
const { URL } = require("node:url");

const PORT = 3002;

// ---------- "Database" di memori ----------
let buku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
  { id: 3, judul: "REST API untuk Pemula", penulis: "Citra", tahun: 2025, stok: 5 },
];
let peminjaman = []; // { id, bukuId, peminjam, status: "dipinjam" | "kembali" }
let nextBukuId = 4;
let nextPinjamId = 1;

// ---------- Helpers ----------
function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(payload, null, 2));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

// Mencari buku berdasarkan id; id pada URL selalu string
function cariBuku(id) {
  return buku.find((b) => b.id === Number(id));
}

async function handleBookCollection(method, path, req, res) {
  // ================= RESOURCE: /buku =================
  // GET /buku -> daftar semua buku.
  if (path !== "/buku") return false;
  if (method === "GET") {
    sendJSON(res, 200, { success: true, total: buku.length, data: buku });
    return true;
  }
  // POST /buku -> tambah buku baru.
  if (method !== "POST") return false;

  const body = await readBody(req);
  const { judul, penulis, tahun, stok } = body || {};
  if (!judul || !penulis || tahun === undefined || stok === undefined) {
    sendJSON(res, 400, {
      success: false,
      message: "Field 'judul', 'penulis', 'tahun', dan 'stok' wajib diisi",
    });
    return true;
  }
  const baru = { id: nextBukuId++, judul, penulis, tahun, stok };
  buku.push(baru);
  sendJSON(res, 201, { success: true, message: "Buku berhasil ditambahkan", data: baru });
  return true;
}

async function handleBookById(method, path, req, res) {
  // GET /buku/:id -> detail satu buku.
  // PUT /buku/:id -> ganti seluruh data buku.
  // PATCH /buku/:id -> ubah sebagian data, misalnya hanya stok.
  // DELETE /buku/:id -> hapus buku.
  const match = path.match(/^\/buku\/(\d+)$/);
  if (!match) return false;
  // ID pada URL berbentuk string, sehingga cariBuku melakukan konversi ke angka.
  const found = cariBuku(match[1]);
  if (!found) {
    sendJSON(res, 404, { success: false, message: `Buku dengan id ${match[1]} tidak ditemukan` });
    return true;
  }
  if (method === "GET") {
    sendJSON(res, 200, { success: true, data: found });
    return true;
  }
  if (method === "PUT") {
    // PUT mengganti seluruh data, jadi semua field wajib dikirim.
    const body = await readBody(req);
    const { judul, penulis, tahun, stok } = body || {};
    if (!judul || !penulis || tahun === undefined || stok === undefined) {
      sendJSON(res, 400, { success: false, message: "PUT mengganti seluruh data: semua field wajib diisi" });
      return true;
    }
    Object.assign(found, { judul, penulis, tahun, stok });
    sendJSON(res, 200, { success: true, data: found });
    return true;
  }
  if (method === "PATCH") {
    // PATCH hanya mengubah field yang diperlukan; latihan ini membatasi perubahan pada stok.
    const body = await readBody(req);
    if (body?.stok === undefined) {
      sendJSON(res, 400, { success: false, message: "Field 'stok' wajib diisi" });
      return true;
    }
    found.stok = body.stok;
    sendJSON(res, 200, { success: true, data: found });
    return true;
  }
  if (method === "DELETE") {
    // Cari index agar data buku dapat dihapus dari array menggunakan splice.
    const index = buku.findIndex((book) => book.id === Number(match[1]));
    const [hapus] = buku.splice(index, 1);
    sendJSON(res, 200, { success: true, message: "Buku berhasil dihapus", data: hapus });
    return true;
  }
  return false;
}

async function handleBorrowing(method, path, res) {
  // POST /buku/:id/peminjaman -> pinjam buku dan kurangi stok.
  const match = path.match(/^\/buku\/(\d+)\/peminjaman$/);
  if (!match || method !== "POST") return false;
  const found = cariBuku(match[1]);
  if (!found) {
    sendJSON(res, 404, { success: false, message: `Buku dengan id ${match[1]} tidak ditemukan` });
    return true;
  }
  if (found.stok === 0) {
    // Buku tidak boleh dipinjam jika stok sudah habis.
    sendJSON(res, 400, { success: false, message: `Stok buku "${found.judul}" habis, tidak dapat dipinjam` });
    return true;
  }
  found.stok -= 1;
  const transaksi = { id: nextPinjamId++, bukuId: found.id, peminjam: "Mahasiswa (dummy)", status: "dipinjam" };
  peminjaman.push(transaksi);
  sendJSON(res, 201, { success: true, message: `Buku "${found.judul}" berhasil dipinjam, sisa stok: ${found.stok}`, data: transaksi });
  return true;
}

async function handleReturn(method, path, res) {
  // PATCH /peminjaman/:id/pengembalian -> kembalikan buku dan tambah stok.
  const match = path.match(/^\/peminjaman\/(\d+)\/pengembalian$/);
  if (!match || method !== "PATCH") return false;
  const trx = peminjaman.find((item) => item.id === Number(match[1]) && item.status === "dipinjam");
  if (!trx) {
    sendJSON(res, 404, { success: false, message: "Pinjaman aktif tidak ditemukan" });
    return true;
  }
  trx.status = "kembali";
  const book = buku.find((item) => item.id === trx.bukuId);
  if (book) book.stok += 1;
  sendJSON(res, 200, {
    success: true,
    message: `Buku dikembalikan, stok "${book ? book.judul : "?"}" sekarang: ${book ? book.stok : "?"}`,
    data: trx,
  });
  return true;
}

// ---------- Server ----------
// Callback ini hanya mengatur parsing URL dan meneruskan request ke handler.
const server = http.createServer(async (req, res) => {
  const { method } = req;
  const path = new URL(req.url, `http://localhost:${PORT}`).pathname;
  console.log(`${method} ${path}`);

  if (await handleBookCollection(method, path, req, res)) return;
  if (await handleBookById(method, path, req, res)) return;
  if (await handleBorrowing(method, path, res)) return;
  if (await handleReturn(method, path, res)) return;
  // GET /peminjaman -> daftar seluruh transaksi peminjaman.
  if (method === "GET" && path === "/peminjaman") {
    return sendJSON(res, 200, { success: true, data: peminjaman });
  }
  // Selain endpoint di atas -> 404 Not Found.
  return sendJSON(res, 404, { success: false, message: `Endpoint ${method} ${path} tidak ditemukan` });
});

server.listen(PORT, () =>
  console.log(`API Perpustakaan berjalan di http://localhost:${PORT}`)
);