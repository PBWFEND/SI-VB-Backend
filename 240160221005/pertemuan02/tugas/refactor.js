const delay = () =>
  new Promise((resolve) => {
    const ms = 100 + Math.floor(Math.random() * 201);
    setTimeout(resolve, ms);
  });

let laboratorium = [
  { id: 1, nama: 'Lab Rekayasa Perangkat Lunak', kapasitas: 40, lokasi: 'Gedung A Lantai 2', status: 'tersedia' },
  { id: 2, nama: 'Lab Jaringan Komputer', kapasitas: 30, lokasi: 'Gedung B Lantai 1', status: 'tersedia' },
  { id: 3, nama: 'Lab Multimedia', kapasitas: 25, lokasi: 'Gedung C Lantai 3', status: 'perbaikan' }
];

let nextId = 4;

const findAll = async () => {
  await delay();
  // Array method: map + destructuring
  return laboratorium.map(({ id, nama, kapasitas, lokasi, status }) => ({
    id, nama, kapasitas, lokasi, status
  }));
};

const findById = async (id) => {
  await delay();
  // Array method: find
  const lab = laboratorium.find((item) => item.id === Number(id));
  return lab ?? null;
};

const create = async ({ nama, kapasitas, lokasi, status = 'tersedia' }) => {
  await delay();
  // Default value: status = 'tersedia'
  const labBaru = { id: nextId++, nama, kapasitas: Number(kapasitas), lokasi, status };
  laboratorium.push(labBaru);
  return labBaru;
};

const update = async (id, data) => {
  await delay();
  // Array method: findIndex
  const index = laboratorium.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const labLama = laboratorium[index];
  // Spread operator
  const labBaru = { ...labLama, ...data, id: labLama.id };
  laboratorium[index] = labBaru;
  return labBaru;
};

const hapus = async (id) => {
  await delay();
  const index = laboratorium.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const [labDihapus] = laboratorium.splice(index, 1);
  return labDihapus;
};

module.exports = { findAll, findById, create, update, delete: hapus };