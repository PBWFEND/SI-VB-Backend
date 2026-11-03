/**
 * ============================================================
 * Pertemuan 2 — Alat Laboratorium Service
 * ============================================================
 * Studi kasus mini: service memisahkan LOGIKA BISNIS
 * dari HTTP. Database menggunakan data in-memory.
 */

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// "Database" in-memory + id berjalan
let alat = [
  {
    id: 1,
    nama: "Mikroskop",
    jumlah: 5,
    kondisi: "Baik",
  },
  {
    id: 2,
    nama: "Multimeter",
    jumlah: 10,
    kondisi: "Baik",
  },
  {
    id: 3,
    nama: "Oscilloscope",
    jumlah: 3,
    kondisi: "Baik",
  },
];

let nextId = 4;

// ---------- Service: semua fungsi async ----------

async function findAll() {
  await delay(100);
  return alat;
}

async function findById(id) {
  await delay(100);
  return alat.find((item) => item.id === Number(id)) ?? null;
}

async function create({
  nama,
  jumlah,
  kondisi = "Baik",
}) {
  await delay(100);

  const baru = {
    id: nextId++,
    nama,
    jumlah,
    kondisi,
  };

  alat.push(baru);

  return baru;
}

async function update(id, data) {
  const found = await findById(id);

  if (!found) return null;

  Object.assign(found, data);

  return found;
}

async function deleteAlat(id) {
 await delay(Math.floor(Math.random() * 201) + 100);

  const index = alat.findIndex(
    (item) => item.id === Number(id)
  );

  if (index === -1) return null;

  const [deleted] = alat.splice(index, 1);

  return deleted;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteAlat,
};