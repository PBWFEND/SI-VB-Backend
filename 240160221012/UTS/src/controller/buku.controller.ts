import { Request, Response, NextFunction } from 'express';
import { bukuService } from '../service/buku.service';

const ALLOWED_FIELDS = ['judul', 'penulis', 'tahun', 'stok'];
const TAHUN_MIN = 1000;
const TAHUN_MAX = 2100;

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function unknownFields(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).filter((k) => !ALLOWED_FIELDS.includes(k));
}

function validateCreate(body: unknown): string[] {
  if (!isPlainObject(body)) return ['Request body harus berupa objek JSON'];
  const errors: string[] = [];

  if (typeof body.judul !== 'string' || body.judul.trim() === '') {
    errors.push('judul wajib diisi dan berupa string');
  }
  if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
    errors.push('penulis wajib diisi dan berupa string');
  }
  if (
    typeof body.tahun !== 'number' ||
    !Number.isInteger(body.tahun) ||
    body.tahun < TAHUN_MIN ||
    body.tahun > TAHUN_MAX
  ) {
    errors.push(`tahun wajib bilangan bulat antara ${TAHUN_MIN}-${TAHUN_MAX}`);
  }
  if (body.stok !== undefined) {
    if (
      typeof body.stok !== 'number' ||
      !Number.isInteger(body.stok) ||
      body.stok < 0
    ) {
      errors.push('stok wajib bilangan bulat >= 0');
    }
  }

  const unknown = unknownFields(body);
  if (unknown.length > 0) {
    errors.push(`Field tidak dikenal: ${unknown.join(', ')}`);
  }

  return errors;
}

function validateUpdate(body: unknown): string[] {
  if (!isPlainObject(body)) return ['Request body harus berupa objek JSON'];
  const keys = Object.keys(body);
  if (keys.length === 0) return ['Minimal satu field harus dikirim'];

  const errors: string[] = [];

  if (body.judul !== undefined) {
    if (typeof body.judul !== 'string' || body.judul.trim() === '') {
      errors.push('judul tidak boleh kosong');
    }
  }
  if (body.penulis !== undefined) {
    if (typeof body.penulis !== 'string' || body.penulis.trim() === '') {
      errors.push('penulis tidak boleh kosong');
    }
  }
  if (body.tahun !== undefined) {
    if (
      typeof body.tahun !== 'number' ||
      !Number.isInteger(body.tahun) ||
      body.tahun < TAHUN_MIN ||
      body.tahun > TAHUN_MAX
    ) {
      errors.push(`tahun wajib bilangan bulat antara ${TAHUN_MIN}-${TAHUN_MAX}`);
    }
  }
  if (body.stok !== undefined) {
    if (
      typeof body.stok !== 'number' ||
      !Number.isInteger(body.stok) ||
      body.stok < 0
    ) {
      errors.push('stok wajib bilangan bulat >= 0');
    }
  }

  const unknown = unknownFields(body);
  if (unknown.length > 0) {
    errors.push(`Field tidak dikenal: ${unknown.join(', ')}`);
  }

  return errors;
}

// --- PERBAIKAN DI SINI ---
// Mengubah parameter menjadi string | string[] untuk mengakomodasi tipe Express
function parseId(param: string | string[]): number | null {
  const idStr = Array.isArray(param) ? param[0] : param;
  if (!idStr) return null;
  
  const id = Number(idStr);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function isNotFoundPrisma(err: unknown): boolean {
  return !!err && typeof err === 'object' && (err as { code?: string }).code === 'P2025';
}

export const bukuController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, penulis, tahun } = req.query;

      let tahunNum: number | undefined;
      if (tahun !== undefined) {
        tahunNum = Number(tahun);
        if (!Number.isInteger(tahunNum)) {
          return res.status(400).json({
            success: false,
            message: 'Query tahun harus berupa angka'
          });
        }
      }

      const data = await bukuService.findAll({
        q: q ? String(q) : undefined,
        penulis: penulis ? String(penulis) : undefined,
        tahun: tahunNum
      });

      res.status(200).json({ success: true, total: data.length, data });
    } catch (err) {
      next(err);
    }
  },

  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      if (id === null) {
        return res.status(400).json({ success: false, message: 'ID tidak valid' });
      }
      const item = await bukuService.findById(id);
      if (!item) {
        return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });
      }
      res.status(200).json({ success: true, data: item });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validateCreate(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors
        });
      }
      const item = await bukuService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Buku berhasil ditambahkan',
        data: item
      });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      if (id === null) {
        return res.status(400).json({ success: false, message: 'ID tidak valid' });
      }
      const errors = validateUpdate(req.body);
      if (errors.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Data tidak valid',
          errors
        });
      }
      const data = await bukuService.update(id, {
        judul: req.body.judul,
        penulis: req.body.penulis,
        tahun: req.body.tahun,
        stok: req.body.stok
      });
      res.status(200).json({
        success: true,
        message: 'Buku berhasil diperbarui',
        data
      });
    } catch (err) {
      if (isNotFoundPrisma(err)) {
        return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });
      }
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseId(req.params.id);
      if (id === null) {
        return res.status(400).json({ success: false, message: 'ID tidak valid' });
      }
      await bukuService.remove(id);
      res.status(204).send();
    } catch (err) {
      if (isNotFoundPrisma(err)) {
        return res.status(404).json({ success: false, message: 'Buku tidak ditemukan' });
      }
      next(err);
    }
  }
};