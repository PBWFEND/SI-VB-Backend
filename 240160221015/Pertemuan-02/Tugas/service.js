/**
 * ============================================================
 * Tugas 1 Pertemuan 2 — Service E-Warung Kampus
 * ============================================================
 * Layer service: memisahkan logika bisnis dari HTTP.
 * Semua fungsi async dan mensimulasikan delay database (100-300 ms).
 * Jalankan mandiri: node service.js
 */

// Simulasi delay async (versi Promise dari setTimeout)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---------- "Database" in-memory ----------
let menu = [
  { id: 1, nama: "Nasi Goreng Spesial", harga: 15000, kategori: "Makanan", stok: 20 },
  { id: 2, nama: "Mie Ayam", harga: 12000, kategori: "Makanan", stok: 15 },
  { id: 3, nama: "Es Teh Manis", harga: 5000, kategori: "Minuman", stok: 50 },
];
let nextId = 4;

// ---------- Service: semua fungsi async ----------

/**
 * Mengambil seluruh daftar menu.
 * @returns {Promise<Array>} array menu
 */
async function findAll() {
  await delay(150); // simulasi SELECT * FROM menu
  return menu;
}

/**
 * Mengambil satu menu berdasarkan id.
 * @param {number|string} id
 * @returns {Promise<Object|null>} object menu atau null jika tidak ada
 */
async function findById(id) {
  await delay(100);
  // ?? null: kembalikan null eksplisit agar client bisa bedakan "tidak ada" vs error
  return menu.find((m) => m.id === Number(id)) ?? null;
}

/**
 * Menambah menu baru.
 * @param {Object} data - { nama, harga, kategori, stok }
 * @returns {Promise<Object>} menu yang baru dibuat
 */
async function create({ nama, harga, kategori, stok = 0 }) {
  await delay(200);
  // Destructuring parameter + default value untuk stok
  const baru = { id: nextId++, nama, harga, kategori, stok };
  menu.push(baru);
  return baru;
}

/**
 * Mengubah sebagian data menu (partial update ala PATCH).
 * @param {number|string} id
 * @param {Object} data - field yang ingin diubah
 * @returns {Promise<Object|null>} menu yang sudah diubah atau null
 */
async function update(id, data) {
  const found = await findById(id);
  if (!found) return null;
  // Object.assign: partial update, hanya field yang dikirim yang berubah
  Object.assign(found, data);
  return found;
}

/**
 * Menghapus menu berdasarkan id.
 * @param {number|string} id
 * @returns {Promise<Object|null>} menu yang dihapus atau null
 */
async function remove(id) {
  await delay(150);
  const index = menu.findIndex((m) => m.id === Number(id));
  if (index === -1) return null;
  // splice mengembalikan array berisi elemen yang dihapus
  const [dihapus] = menu.splice(index, 1);
  return dihapus;
}

// ---------- Ekspor untuk dipakai demo.js ----------
module.exports = { findAll, findById, create, update, remove };

// ---------- Jalankan langsung (node service.js) ----------
if (require.main === module) {
  (async () => {
    console.log("=== Uji Service E-Warung ===");
    console.log("Total awal:", (await findAll()).length, "menu");

    const baru = await create({ nama: "Bakso Urat", harga: 13000, kategori: "Makanan", stok: 10 });
    console.log("Menu baru:", baru);

    const diubah = await update(2, { stok: 30 });
    console.log("Setelah update stok:", { id: diubah.id, nama: diubah.nama, stok: diubah.stok });

    const dihapus = await remove(3);
    console.log("Menu dihapus:", dihapus);

    const tidakAda = await findById(999);
    console.log("Cari id 999:", tidakAda, "(null = tidak ditemukan)");
  })();
}