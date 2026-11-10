import { Request, Response, NextFunction } from 'express';
import { bukuService } from '../service/buku.service';
import {
  validateCreate,
  validateId,
  validatePatch,
  validateUpdate
} from '../validator/buku.validator';
import { BadRequestError } from '../errors';

export const bukuController = {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q : undefined;
      const penulis =
        typeof req.query.penulis === 'string' ? req.query.penulis : undefined;

      let tahun: number | undefined;
      if (req.query.tahun !== undefined) {
        if (typeof req.query.tahun !== 'string') {
          throw new BadRequestError('Query tahun harus berupa angka');
        }
        const t = Number(req.query.tahun);
        if (!Number.isInteger(t)) {
          throw new BadRequestError('Query tahun harus berupa angka');
        }
        tahun = t;
      }

      const data = await bukuService.findAll({ q, penulis, tahun });
      res.status(200).json({ success: true, total: data.length, data });
    } catch (err) {
      next(err);
    }
  },

  async detail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      if (id === null) throw new BadRequestError('ID buku tidak valid');
      const data = await bukuService.findById(id);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = validateCreate(req.body);
      if (!result.valid) {
        throw new BadRequestError('Data buku tidak valid', result.errors);
      }
      const data = await bukuService.create(result.data);
      res
        .status(201)
        .json({ success: true, message: 'Buku berhasil ditambahkan', data });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      if (id === null) throw new BadRequestError('ID buku tidak valid');
      const result = validateUpdate(req.body);
      if (!result.valid) {
        throw new BadRequestError('Data buku tidak valid', result.errors);
      }
      const data = await bukuService.update(id, result.data);
      res
        .status(200)
        .json({ success: true, message: 'Buku berhasil diperbarui', data });
    } catch (err) {
      next(err);
    }
  },

  async patch(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      if (id === null) throw new BadRequestError('ID buku tidak valid');
      const result = validatePatch(req.body);
      if (!result.valid) {
        throw new BadRequestError('Data buku tidak valid', result.errors);
      }
      const data = await bukuService.patch(id, result.data);
      res.status(200).json({
        success: true,
        message: 'Buku berhasil diperbarui sebagian',
        data
      });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = validateId(req.params.id);
      if (id === null) throw new BadRequestError('ID buku tidak valid');
      await bukuService.remove(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};