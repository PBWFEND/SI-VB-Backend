const anggota = [
  {
    id: 1,
    nama: "Rasya Putri Ramadhani",
    npm: "240160221055",
    divisi: "Backend"
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const findAll = async () => {
  await delay(200);
  return anggota;
};

const findById = async (id) => {
  await delay(200);
  return anggota.find(item => item.id === id) || null;
};

const create = async (data = {}) => {
  await delay(200);

  const newId =
    anggota.length > 0
      ? Math.max(...anggota.map(item => item.id)) + 1
      : 1;

  const newAnggota = {
    id: newId,
    ...data
  };

  anggota.push(newAnggota);

  return newAnggota;
};

const update = async (id, data = {}) => {
  await delay(200);

  const index = anggota.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  anggota[index] = {
    ...anggota[index],
    ...data
  };

  return anggota[index];
};

const deleteData = async (id) => {
  await delay(200);

  const index = anggota.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const deleted = anggota.splice(index, 1);

  return deleted[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  delete: deleteData
};