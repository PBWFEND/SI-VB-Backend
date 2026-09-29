// Service.js

// Simulasi delay 100–300 ms
const delay = () =>
  new Promise((resolve) => {
    const ms = 100 + Math.floor(Math.random() * 201);
    setTimeout(resolve, ms);
  });

// Database in-memory
let laboratorium = [
  { id: 1, nama: 'Lab Rekayasa Perangkat Lunak', kapasitas: 40, lokasi: 'Gedung A Lantai 2', status: 'tersedia' },
  { id: 2, nama: 'Lab Jaringan Komputer', kapasitas: 30, lokasi: 'Gedung B Lantai 1', status: 'tersedia' },
  { id: 3, nama: 'Lab Multimedia', kapasitas: 25, lokasi: 'Gedung C Lantai 3', status: 'perbaikan' }
];

let nextId = 4;

// GET /laboratorium
const findAll = async () => {
  await delay();
  return laboratorium.map(({ id, nama, kapasitas, lokasi, status }) => ({
    id, nama, kapasitas, lokasi, status
  }));
};

// GET /laboratorium/:id
const findById = async (id) => {
  await delay();
  const lab = laboratorium.find((item) => item.id === Number(id));
  return lab ?? null;
};

// POST /laboratorium
const create = async ({ nama, kapasitas, lokasi, status = 'tersedia' }) => {
  await delay();
  const labBaru = {
    id: nextId++,
    nama,
    kapasitas: Number(kapasitas),
    lokasi,
    status
  };
  laboratorium.push(labBaru);
  return labBaru;
};

// PUT /laboratorium/:id
const update = async (id, data) => {
  await delay();
  const index = laboratorium.findIndex((item) => item.id === Number(id));

  if (index === -1) return null;

  const labLama = laboratorium[index];
  const labBaru = { ...labLama, ...data, id: labLama.id };
  
  laboratorium[index] = labBaru;
  return labBaru;
};

// DELETE /laboratorium/:id
const hapus = async (id) => {
  await delay();
  const index = laboratorium.findIndex((item) => item.id === Number(id));

  if (index === -1) return null;

  const [labDihapus] = laboratorium.splice(index, 1);
  return labDihapus;
};

module.exports = { findAll, findById, create, update, delete: hapus };