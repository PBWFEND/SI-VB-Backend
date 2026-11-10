import { Request, Response, NextFunction } from 'express';
import ApiError, { FieldError } from '../utils/ApiError';
import {
  STATUS_VALUES,
  SORT_FIELDS,
  LabStatus,
  SortField,
  OrderDir,
} from '../types/laboratorium';

// ---------- GERBANG typeof ----------
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const isString = (v: unknown): v is string => typeof v === 'string';
const isNonEmptyString = (v: unknown): v is string =>
  typeof v === 'string' && v.trim().length > 0;
const isIntegerNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isInteger(v);
const isStatus = (v: unknown): v is LabStatus =>
  typeof v === 'string' && (STATUS_VALUES as readonly string[]).includes(v);
const isSortField = (v: unknown): v is SortField =>
  typeof v === 'string' && (SORT_FIELDS as readonly string[]).includes(v);
const isOrderDir = (v: unknown): v is OrderDir => v === 'asc' || v === 'desc';

// ---------- Aturan rentang ----------
const NAME_MIN = 3;
const NAME_MAX = 100;
const LOCATION_MIN = 3;
const LOCATION_MAX = 100;
const CAPACITY_MIN = 1;
const CAPACITY_MAX = 500;

const validateNama = (v: unknown, errors: FieldError[]) => {
  if (!isNonEmptyString(v)) {
    errors.push({ field: 'nama', message: 'nama wajib berupa string tidak kosong' });
    return;
  }
  const t = v.trim();
  if (t.length < NAME_MIN) errors.push({ field: 'nama', message: `nama minimal ${NAME_MIN} karakter` });
  else if (t.length > NAME_MAX) errors.push({ field: 'nama', message: `nama maksimal ${NAME_MAX} karakter` });
};

const validateKapasitas = (v: unknown, errors: FieldError[]) => {
  if (v === undefined || v === null) {
    errors.push({ field: 'kapasitas', message: 'kapasitas wajib diisi' });
    return;
  }
  if (typeof v !== 'number') {
    errors.push({ field: 'kapasitas', message: `kapasitas wajib bertipe number (diterima: ${typeof v})` });
    return;
  }
  if (!isIntegerNumber(v)) {
    errors.push({ field: 'kapasitas', message: 'kapasitas harus bilangan bulat' });
    return;
  }
  if (v < CAPACITY_MIN || v > CAPACITY_MAX) {
    errors.push({ field: 'kapasitas', message: `kapasitas harus di rentang ${CAPACITY_MIN}–${CAPACITY_MAX}` });
  }
};

const validateLokasi = (v: unknown, errors: FieldError[]) => {
  if (!isNonEmptyString(v)) {
    errors.push({ field: 'lokasi', message: 'lokasi wajib berupa string tidak kosong' });
    return;
  }
  const t = v.trim();
  if (t.length < LOCATION_MIN) errors.push({ field: 'lokasi', message: `lokasi minimal ${LOCATION_MIN} karakter` });
  else if (t.length > LOCATION_MAX) errors.push({ field: 'lokasi', message: `lokasi maksimal ${LOCATION_MAX} karakter` });
};

const validateStatus = (v: unknown, required: boolean, errors: FieldError[]) => {
  if (v === undefined) {
    if (required) {
      errors.push({ field: 'status', message: `status wajib diisi, salah satu dari: ${STATUS_VALUES.join(', ')}` });
    }
    return;
  }
  if (!isStatus(v)) {
    errors.push({ field: 'status', message: `status harus salah satu dari: ${STATUS_VALUES.join(', ')}` });
  }
};

// ---------- Middleware per-endpoint ----------

export const validateCreate = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const body = req.body;

  if (!isPlainObject(body)) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'body wajib berupa objek JSON' },
    ]));
  }

  const allowed = new Set(['nama', 'kapasitas', 'lokasi', 'status']);
  const unknown = Object.keys(body).filter((k) => !allowed.has(k));
  if (unknown.length) {
    errors.push({ field: unknown.join(','), message: `field tidak dikenali: ${unknown.join(', ')}` });
  }

  validateNama(body.nama, errors);
  validateKapasitas(body.kapasitas, errors);
  validateLokasi(body.lokasi, errors);
  validateStatus(body.status, false, errors);

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

export const validateUpdate = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const body = req.body;

  if (!isPlainObject(body)) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'body wajib berupa objek JSON' },
    ]));
  }

  validateNama(body.nama, errors);
  validateKapasitas(body.kapasitas, errors);
  validateLokasi(body.lokasi, errors);
  validateStatus(body.status, true, errors);

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

export const validatePatch = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const body = req.body;

  if (!isPlainObject(body)) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'body wajib berupa objek JSON' },
    ]));
  }

  const allowed = new Set(['nama', 'kapasitas', 'lokasi', 'status']);
  const keys = Object.keys(body);

  if (keys.length === 0) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'PATCH memerlukan minimal satu field' },
    ]));
  }

  const unknown = keys.filter((k) => !allowed.has(k));
  if (unknown.length) {
    errors.push({ field: unknown.join(','), message: `field tidak dikenali: ${unknown.join(', ')}` });
  }

  if ('nama' in body) validateNama(body.nama, errors);
  if ('kapasitas' in body) validateKapasitas(body.kapasitas, errors);
  if ('lokasi' in body) validateLokasi(body.lokasi, errors);
  if ('status' in body) validateStatus(body.status, true, errors);

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

export const validateId = (req: Request, _res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return next(new ApiError(400, 'Parameter id tidak valid', [
      { field: 'id', message: 'id harus bilangan bulat positif' },
    ]));
  }
  next();
};

export const validateQuery = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const { status, minKapasitas, search, sortBy, order } = req.query;

  if (status !== undefined && !isStatus(status)) {
    errors.push({ field: 'status', message: `status harus salah satu dari: ${STATUS_VALUES.join(', ')}` });
  }
  if (minKapasitas !== undefined) {
    if (!isString(minKapasitas) || !/^\d+$/.test(minKapasitas)) {
      errors.push({ field: 'minKapasitas', message: 'minKapasitas harus bilangan bulat >= 0' });
    }
  }
  if (search !== undefined && !isString(search)) {
    errors.push({ field: 'search', message: 'search harus berupa string' });
  }
  if (sortBy !== undefined && !isSortField(sortBy)) {
    errors.push({ field: 'sortBy', message: `sortBy harus salah satu dari: ${SORT_FIELDS.join(', ')}` });
  }
  if (order !== undefined && !isOrderDir(order)) {
    errors.push({ field: 'order', message: 'order harus asc atau desc' });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi query gagal', errors));
  next();
};