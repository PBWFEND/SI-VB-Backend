import { CreateBukuInput, PatchBukuInput } from '../types/buku';

const ALLOWED_FIELDS = ['judul', 'penulis', 'tahun', 'stok'] as const;

export interface Ok<T> {
  valid: true;
  data: T;
}
export interface Fail {
  valid: false;
  errors: string[];
}
export type ValidationResult<T> = Ok<T> | Fail;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function rejectUnknownFields(
  body: Record<string, unknown>,
  errors: string[]
) {
  const unknown = Object.keys(body).filter(
    (k) => !(ALLOWED_FIELDS as readonly string[]).includes(k)
  );
  if (unknown.length > 0) {
    errors.push(`Field tidak dikenal: ${unknown.join(', ')}`);
  }
}

/** Validasi untuk POST dan PUT (payload wajib lengkap). */
export function validateCreate(body: unknown): ValidationResult<CreateBukuInput> {
  // Gerbang typeof: body harus objek JSON
  if (!isPlainObject(body)) {
    return { valid: false, errors: ['Request body harus berupa objek JSON'] };
  }

  const errors: string[] = [];

  // Gerbang typeof + tipe + rentang
  if (typeof body.judul !== 'string' || body.judul.trim() === '') {
    errors.push('judul wajib berupa string tidak kosong');
  }
  if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
    errors.push('penulis wajib berupa string tidak kosong');
  }
  if (
    typeof body.tahun !== 'number' ||
    !Number.isInteger(body.tahun) ||
    body.tahun < 0 ||
    body.tahun > 9999
  ) {
    errors.push('tahun wajib integer dengan rentang 0–9999');
  }
  if (
    typeof body.stok !== 'number' ||
    !Number.isInteger(body.stok) ||
    body.stok < 0 ||
    body.stok > 100000
  ) {
    errors.push('stok wajib integer dengan rentang 0–100000');
  }

  rejectUnknownFields(body, errors);

  if (errors.length > 0) return { valid: false, errors };

  return {
    valid: true,
    data: {
      judul: (body.judul as string).trim(),
      penulis: (body.penulis as string).trim(),
      tahun: body.tahun as number,
      stok: body.stok as number
    }
  };
}

/** PUT = full update, aturan sama dengan create. */
export function validateUpdate(body: unknown) {
  return validateCreate(body);
}

/** PATCH = partial update, minimal satu field, tiap field tetap divalidasi. */
export function validatePatch(body: unknown): ValidationResult<PatchBukuInput> {
  if (!isPlainObject(body)) {
    return { valid: false, errors: ['Request body harus berupa objek JSON'] };
  }

  const keys = Object.keys(body);
  if (keys.length === 0) {
    return {
      valid: false,
      errors: ['Minimal satu field harus dikirim untuk diperbarui']
    };
  }

  const errors: string[] = [];
  const data: PatchBukuInput = {};

  if (body.judul !== undefined) {
    if (typeof body.judul !== 'string' || body.judul.trim() === '') {
      errors.push('judul wajib berupa string tidak kosong');
    } else {
      data.judul = body.judul.trim();
    }
  }
  if (body.penulis !== undefined) {
    if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
      errors.push('penulis wajib berupa string tidak kosong');
    } else {
      data.penulis = body.penulis.trim();
    }
  }
  if (body.tahun !== undefined) {
    if (
      typeof body.tahun !== 'number' ||
      !Number.isInteger(body.tahun) ||
      body.tahun < 0 ||
      body.tahun > 9999
    ) {
      errors.push('tahun wajib integer dengan rentang 0–9999');
    } else {
      data.tahun = body.tahun;
    }
  }
  if (body.stok !== undefined) {
    if (
      typeof body.stok !== 'number' ||
      !Number.isInteger(body.stok) ||
      body.stok < 0 ||
      body.stok > 100000
    ) {
      errors.push('stok wajib integer dengan rentang 0–100000');
    } else {
      data.stok = body.stok;
    }
  }

  rejectUnknownFields(body, errors);

  if (errors.length > 0) return { valid: false, errors };
  return { valid: true, data };
}

/** Validasi route parameter `:id` — wajib digit positif. */
export function validateId(idParam: string): number | null {
  if (!/^\d+$/.test(idParam)) return null;
  const id = Number(idParam);
  return Number.isInteger(id) && id > 0 ? id : null;
}