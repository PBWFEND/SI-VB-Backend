// services/laboratoriumService.js
const prisma = require('../lib/prisma');

// GET collection + filter + sort
const findAll = async ({ status, minKapasitas, search, sortBy = 'id', order = 'asc' } = {}) => {
  const where = {};

  if (status) where.status = status;

  if (minKapasitas !== undefined) {
    where.kapasitas = { gte: Number(minKapasitas) };
  }

  if (search) {
    where.OR = [
      { nama: { contains: search } },
      { lokasi: { contains: search } },
    ];
  }

  return prisma.laboratorium.findMany({
    where,
    orderBy: { [sortBy]: order },
  });
};

// GET detail
const findById = async (id) => {
  return prisma.laboratorium.findUnique({
    where: { id: Number(id) },
  });
};

// POST create
const create = async ({ nama, kapasitas, lokasi, status }) => {
  return prisma.laboratorium.create({
    data: {
      nama: nama.trim(),
      kapasitas: Number(kapasitas),
      lokasi: lokasi.trim(),
      ...(status !== undefined ? { status } : {}),
    },
  });
};

// PUT / PATCH update
const update = async (id, data) => {
  const dataToUpdate = {};

  if (data.nama !== undefined) dataToUpdate.nama = data.nama.trim();
  if (data.kapasitas !== undefined) dataToUpdate.kapasitas = Number(data.kapasitas);
  if (data.lokasi !== undefined) dataToUpdate.lokasi = data.lokasi.trim();
  if (data.status !== undefined) dataToUpdate.status = data.status;

  try {
    return await prisma.laboratorium.update({
      where: { id: Number(id) },
      data: dataToUpdate,
    });
  } catch (err) {
    // P2025 = record yang ingin di-update tidak ditemukan
    if (err.code === 'P2025') return null;
    throw err;
  }
};

// DELETE
const remove = async (id) => {
  try {
    return await prisma.laboratorium.delete({
      where: { id: Number(id) },
    });
  } catch (err) {
    if (err.code === 'P2025') return null;
    throw err;
  }
};

module.exports = { findAll, findById, create, update, remove };