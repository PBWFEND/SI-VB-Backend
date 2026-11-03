// services/laboratoriumService.js

const delay = () =>
  new Promise((resolve) => {
    const ms = 100 + Math.floor(Math.random() * 201);
    setTimeout(resolve, ms);
  });

let laboratorium = [
  { id: 1, nama: 'Lab Rekayasa Perangkat Lunak', kapasitas: 40, lokasi: 'Gedung A Lantai 2', status: 'tersedia' },
  { id: 2, nama: 'Lab Jaringan Komputer',        kapasitas: 30, lokasi: 'Gedung B Lantai 1', status: 'tersedia' },
  { id: 3, nama: 'Lab Multimedia',               kapasitas: 25, lokasi: 'Gedung C Lantai 3', status: 'perbaikan' }
];

let nextId = 4;

const findAll = async ({ status, minKapasitas, search, sortBy, order } = {}) => {
  await delay();

  let result = laboratorium.map(({ id, nama, kapasitas, lokasi, status }) => ({
    id, nama, kapasitas, lokasi, status
  }));

  if (status) {
    result = result.filter((lab) => lab.status === status);
  }
  if (minKapasitas !== undefined) {
    result = result.filter((lab) => lab.kapasitas >= Number(minKapasitas));
  }
  if (search) {
    const q = String(search).toLowerCase();
    result = result.filter(
      (lab) =>
        lab.nama.toLowerCase().includes(q) ||
        lab.lokasi.toLowerCase().includes(q)
    );
  }
  if (sortBy) {
    const dir = order === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      if (a[sortBy] > b[sortBy]) return 1 * dir;
      if (a[sortBy] < b[sortBy]) return -1 * dir;
      return 0;
    });
  }

  return result;
};

const findById = async (id) => {
  await delay();
  const lab = laboratorium.find((item) => item.id === Number(id));
  return lab ?? null;
};

const create = async ({ nama, kapasitas, lokasi, status = 'tersedia' }) => {
  await delay();
  const labBaru = {
    id: nextId++,
    nama: nama.trim(),
    kapasitas: Number(kapasitas),
    lokasi: lokasi.trim(),
    status
  };
  laboratorium.push(labBaru);
  return labBaru;
};

const update = async (id, data) => {
  await delay();
  const index = laboratorium.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const labLama = laboratorium[index];
  const labBaru = {
    ...labLama,
    ...data,
    id: labLama.id,
    kapasitas: data.kapasitas !== undefined ? Number(data.kapasitas) : labLama.kapasitas
  };

  laboratorium[index] = labBaru;
  return labBaru;
};

const remove = async (id) => {
  await delay();
  const index = laboratorium.findIndex((item) => item.id === Number(id));
  if (index === -1) return null;

  const [labDihapus] = laboratorium.splice(index, 1);
  return labDihapus;
};

module.exports = { findAll, findById, create, update, remove };