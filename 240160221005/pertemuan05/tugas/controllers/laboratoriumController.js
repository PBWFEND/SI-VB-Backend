// controllers/laboratoriumController.js
const service = require('../services/laboratoriumService');
const ApiError = require('../utils/ApiError');
const { success } = require('../utils/response');

const getAll = async (req, res, next) => {
  try {
    const { status, minKapasitas, search, sortBy, order } = req.query;
    const data = await service.findAll({ status, minKapasitas, search, sortBy, order });

    return success(res, {
      statusCode: 200,
      message: 'Daftar laboratorium berhasil diambil',
      data,
      meta: {
        total: data.length,
        filter: {
          status: status ?? null,
          minKapasitas: minKapasitas ?? null,
          search: search ?? null
        },
        sort: { sortBy: sortBy ?? 'id', order: order ?? 'asc' }
      }
    });
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const lab = await service.findById(req.params.id);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);
    return success(res, { statusCode: 200, message: 'Detail laboratorium', data: lab });
  } catch (err) { next(err); }
};

const create = async (req, res, next) => {
  try {
    const lab = await service.create(req.body);
    res.setHeader('Location', `/api/laboratorium/${lab.id}`);
    return success(res, { statusCode: 201, message: 'Laboratorium berhasil dibuat', data: lab });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const lab = await service.update(req.params.id, req.body);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);
    return success(res, { statusCode: 200, message: 'Laboratorium berhasil diperbarui', data: lab });
  } catch (err) { next(err); }
};

const patch = async (req, res, next) => {
  try {
    const lab = await service.update(req.params.id, req.body);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);
    return success(res, { statusCode: 200, message: 'Laboratorium berhasil diperbarui sebagian', data: lab });
  } catch (err) { next(err); }
};

const remove = async (req, res, next) => {
  try {
    const lab = await service.remove(req.params.id);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);
    // 204 No Content — tidak ada body
    return res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, patch, remove };