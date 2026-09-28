let barang = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, stok: 10 },
  { id: 2, nama: "Mie Instan", harga: 5000, stok: 20 },
  { id: 3, nama: "Roti", harga: 8000, stok: 15 }
];

const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const findAll = async () => {
  await delay(200);
  return barang;
};

const findById = async (id) => {
  await delay(200);
  return barang.find((item) => item.id === id) ?? null;
};

const create = async (data) => {
  await delay(200);
  const newBarang = {
    id: barang.length + 1,
    ...data
  };
  barang.push(newBarang);
  return newBarang;
};

const update = async (id, data) => {
  await delay(200);

  const index = barang.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  barang[index] = {
    ...barang[index],
    ...data
  };

  return barang[index];
};

const remove = async (id) => {
  await delay(200);

  const index = barang.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const deletedBarang = barang.splice(index, 1);

  return deletedBarang[0];
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};