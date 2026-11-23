/**
 * ============================================================
 * Tugas 1 — Refactor Kode Warisan (Sebelum & Sesudah)
 * ============================================================
 * Kode warisan dari pemantik kasus: proses peminjaman buku
 * yang menyusun string JSON manual dan sulit dipelihara.
 */

// ============================================================
// VERSI SEBELUM (ES5, code smell)
// ============================================================
/*
function prosesPeminjaman0(req, res) {
  const id = req.body.id;
  var buku = cariBuku(id);
  if (buku == null) {
    res.end('{"success":false,"message":"Buku tidak ditemukan"}');
  } else if (buku.stok == 0) {
    res.end('{"success":false,"message":"Stok habis"}');
  } else {
    var pesan = '{"success":true,"message":"Peminjaman berhasil","data":{"judul":"' + buku.judul + '","penulis":"' + buku.penulis + '","tahun":' + buku.tahun + '}}';
    res.end(pesan);
  }
}
*/

// ============================================================
// VERSI SESUDAH (ES6+, ringkas & mudah dipelihara)
// ============================================================

// Database in-memory sederhana untuk demo
const daftarBuku = [
  { id: 1, judul: "Belajar Node.js", penulis: "Andi", tahun: 2024, stok: 3 },
  { id: 2, judul: "Dasar JavaScript", penulis: "Budi", tahun: 2023, stok: 0 },
];

// Arrow function + find (array method)
const cariBuku = (id) => daftarBuku.find((b) => b.id === Number(id)) ?? null;

// Helper response dengan destructuring parameter + default value
const buatResponse = ({ success = true, message = "", data = null } = {}) => ({
  success,
  message,
  data,
});

// Handler peminjaman — refactored
export function prosesPeminjaman(req, res) {
  // Destructuring + optional chaining + nullish coalescing
  const { id } = req.body ?? {};

  // Validasi input
  if (id == null) {
    return res.end(JSON.stringify(buatResponse({
      success: false,
      message: "Field id wajib diisi",
    })));
  }

  const buku = cariBuku(id);

  // Early return: buku tidak ditemukan
  if (buku === null) {
    return res.end(JSON.stringify(buatResponse({
      success: false,
      message: "Buku tidak ditemukan",
    })));
  }

  // Early return: stok habis
  if (buku.stok === 0) {
    return res.end(JSON.stringify(buatResponse({
      success: false,
      message: "Stok habis",
    })));
  }

  // Sukses — template literal + destructuring
  const { judul, penulis, tahun } = buku;
  return res.end(JSON.stringify(buatResponse({
    success: true,
    message: "Peminjaman berhasil",
    data: { judul, penulis, tahun },
  })));
}

// ---------- Demo refactor ----------
export function demoRefactor() {
  const mockRes = {
    end: (payload) => {
      console.log("  Response:", payload);
    },
  };

  console.log("\n=== Demo Refactor ===");
  console.log("1. Buku tidak ditemukan (id=999):");
  prosesPeminjaman({ body: { id: 999 } }, mockRes);

  console.log("2. Stok habis (id=2):");
  prosesPeminjaman({ body: { id: 2 } }, mockRes);

  console.log("3. Peminjaman berhasil (id=1):");
  prosesPeminjaman({ body: { id: 1 } }, mockRes);

  console.log("4. Body tanpa id:");
  prosesPeminjaman({ body: {} }, mockRes);
}