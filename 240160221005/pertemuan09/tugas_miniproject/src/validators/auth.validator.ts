import { Request, Response, NextFunction } from 'express';
import ApiError, { FieldError } from '../utils/ApiError';

// ---------- GERBANG typeof ----------
const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

// ---------- Aturan format & rentang ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX = 254;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 100;
const NAME_MAX = 100;

const validateEmail = (v: unknown, errors: FieldError[]) => {
  if (typeof v !== 'string' || v.trim().length === 0) {
    errors.push({ field: 'email', message: 'email wajib berupa string tidak kosong' });
    return;
  }
  const t = v.trim();
  if (t.length > EMAIL_MAX) {
    errors.push({ field: 'email', message: `email maksimal ${EMAIL_MAX} karakter` });
  } else if (!EMAIL_RE.test(t)) {
    errors.push({ field: 'email', message: 'format email tidak valid' });
  }
};

const validatePassword = (v: unknown, errors: FieldError[]) => {
  if (typeof v !== 'string') {
    errors.push({ field: 'password', message: 'password wajib berupa string' });
    return;
  }
  if (v.length < PASSWORD_MIN) {
    errors.push({ field: 'password', message: `password minimal ${PASSWORD_MIN} karakter` });
  } else if (v.length > PASSWORD_MAX) {
    errors.push({ field: 'password', message: `password maksimal ${PASSWORD_MAX} karakter` });
  }
};

const validateName = (v: unknown, errors: FieldError[]) => {
  if (v === undefined) return;
  if (typeof v !== 'string') {
    errors.push({ field: 'name', message: 'name wajib berupa string' });
    return;
  }
  if (v.trim().length > NAME_MAX) {
    errors.push({ field: 'name', message: `name maksimal ${NAME_MAX} karakter` });
  }
};

// ---------- Middleware ----------

export const validateRegister = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const body = req.body;

  if (!isPlainObject(body)) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'body wajib berupa objek JSON' },
    ]));
  }

  const allowed = new Set(['email', 'password', 'name']);
  const unknown = Object.keys(body).filter((k) => !allowed.has(k));
  if (unknown.length) {
    errors.push({ field: unknown.join(','), message: `field tidak dikenali: ${unknown.join(', ')}` });
  }

  validateEmail(body.email, errors);
  validatePassword(body.password, errors);
  validateName(body.name, errors);

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};

export const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const errors: FieldError[] = [];
  const body = req.body;

  if (!isPlainObject(body)) {
    return next(new ApiError(400, 'Validasi input gagal', [
      { field: 'body', message: 'body wajib berupa objek JSON' },
    ]));
  }

  const allowed = new Set(['email', 'password']);
  const unknown = Object.keys(body).filter((k) => !allowed.has(k));
  if (unknown.length) {
    errors.push({ field: unknown.join(','), message: `field tidak dikenali: ${unknown.join(', ')}` });
  }

  validateEmail(body.email, errors);
  if (typeof body.password !== 'string' || body.password.length === 0) {
    errors.push({ field: 'password', message: 'password wajib diisi' });
  }

  if (errors.length) return next(new ApiError(400, 'Validasi input gagal', errors));
  next();
};