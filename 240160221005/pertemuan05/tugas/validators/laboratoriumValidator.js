// validators/laboratoriumValidator.js
const ApiError = require('../utils/ApiError');

const STATUS = ['tersedia', 'digunakan', 'perbaikan'];
const SORT_FIELDS = ['id', 'nama', 'kapasitas', 'lokasi', 'status'];

const isNonEmptyString = (v) => typeof v === 'string' && v.trim().length > 0;
const isPositiveInt = (v) => Number.isInteger(Number(v)) && Number(v) > 0;

const validateCreate = (req, res, next) => {
  const errors = [];
  const { nama, kapasitas, lokasi, status } = req.body || {};

  if (!isNonEmptyString(nama) || nama.trim().length < 3) {
    errors.push({ field: 'nama', message: 'nama wajib diisi, string minimal 3 karakter' });
  } else if (nama.trim().length > 100) {
    errors.push({ field: 'nama', message: 'nama maksimal 100 karakter' });
  }
  if (kapasitas === undefined || kapasitas === null || kapasitas === '') {
    errors.push({ field: 'kapasitas', message: 'kapasitas wajib diisi' });
  } else if (!isPositiveInt(kapasitas)) {
    errors.push({ field: 'kapasitas', message: 'kapasitas harus bilangan bulat > 0' });
  }
  if (!isNonEmptyString(lokasi) || lokasi.trim().length < 3) {
    errors.push({ field: 'lokasi', message: 'lokasi wajib diisi, string minimal 3 karakter' });
  }
  if (status !== undefined && !STATUS.includes(status)) {
    errors.push({ field: 'status', message: `status harus salah satu dari: ${STATUS.join(', ')}` });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

// PUT — seluruh field wajib (replace)
const validateUpdate = (req, res, next) => {
  const errors = [];
  const { nama, kapasitas, lokasi, status } = req.body || {};

  if (!isNonEmptyString(nama) || nama.trim().length < 3) {
    errors.push({ field: 'nama', message: 'nama wajib diisi, string minimal 3 karakter' });
  }
  if (!isPositiveInt(kapasitas)) {
    errors.push({ field: 'kapasitas', message: 'kapasitas wajib diisi, bilangan bulat > 0' });
  }
  if (!isNonEmptyString(lokasi) || lokasi.trim().length < 3) {
    errors.push({ field: 'lokasi', message: 'lokasi wajib diisi, string minimal 3 karakter' });
  }
  if (!status || !STATUS.includes(status)) {
    errors.push({ field: 'status', message: `status wajib diisi, salah satu dari: ${STATUS.join(', ')}` });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

// PATCH — minimal 1 field, field bebas sebagian
const validatePatch = (req, res, next) => {
  const errors = [];
  const body = req.body || {};
  const allowed = ['nama', 'kapasitas', 'lokasi', 'status'];
  const keys = Object.keys(body);

  if (!keys.length) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'PATCH memerlukan minimal satu field' }
    ]));
  }
  const unknown = keys.filter((k) => !allowed.includes(k));
  if (unknown.length) {
    errors.push({ field: unknown.join(','), message: `field tidak dikenali: ${unknown.join(', ')}` });
  }
  if (body.nama !== undefined) {
    if (!isNonEmptyString(body.nama) || body.nama.trim().length < 3 || body.nama.trim().length > 100) {
      errors.push({ field: 'nama', message: 'nama harus string 3-100 karakter' });
    }
  }
  if (body.kapasitas !== undefined && !isPositiveInt(body.kapasitas)) {
    errors.push({ field: 'kapasitas', message: 'kapasitas harus bilangan bulat > 0' });
  }
  if (body.lokasi !== undefined) {
    if (!isNonEmptyString(body.lokasi) || body.lokasi.trim().length < 3) {
      errors.push({ field: 'lokasi', message: 'lokasi harus string minimal 3 karakter' });
    }
  }
  if (body.status !== undefined && !STATUS.includes(body.status)) {
    errors.push({ field: 'status', message: `status harus salah satu dari: ${STATUS.join(', ')}` });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

const validateId = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new ApiError(400, 'Parameter id tidak valid', [
      { field: 'id', message: 'id harus bilangan bulat positif' }
    ]));
  }
  next();
};

const validateQuery = (req, res, next) => {
  const errors = [];
  const { status, minKapasitas, search, sortBy, order } = req.query;

  if (status !== undefined && !STATUS.includes(status)) {
    errors.push({ field: 'status', message: `status harus salah satu dari: ${STATUS.join(', ')}` });
  }
  if (minKapasitas !== undefined && (!Number.isInteger(Number(minKapasitas)) || Number(minKapasitas) < 0)) {
    errors.push({ field: 'minKapasitas', message: 'minKapasitas harus bilangan bulat >= 0' });
  }
  if (search !== undefined && typeof search !== 'string') {
    errors.push({ field: 'search', message: 'search harus berupa string' });
  }
  if (sortBy !== undefined && !SORT_FIELDS.includes(sortBy)) {
    errors.push({ field: 'sortBy', message: `sortBy harus salah satu dari: ${SORT_FIELDS.join(', ')}` });
  }
  if (order !== undefined && !['asc', 'desc'].includes(order)) {
    errors.push({ field: 'order', message: 'order harus asc atau desc' });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi query gagal', errors));
  next();
};

module.exports = { validateCreate, validateUpdate, validatePatch, validateId, validateQuery };