import { Request, Response, NextFunction } from 'express';
import * as service from '../services/laboratoriumService';
import ApiError from '../utils/ApiError';
import { success } from '../utils/response';
import {
  CreateLaboratoriumInput,
  UpdateLaboratoriumInput,
  FindAllFilters,
} from '../types/laboratorium';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, minKapasitas, search, sortBy, order } = req.query;

    const filters: FindAllFilters = {
      status: status as FindAllFilters['status'],
      minKapasitas: minKapasitas !== undefined ? Number(minKapasitas) : undefined,
      search: search as string | undefined,
      sortBy: sortBy as FindAllFilters['sortBy'],
      order: order as FindAllFilters['order'],
    };

    const data = await service.findAll(filters);

    return success(res, {
      statusCode: 200,
      message: 'Daftar laboratorium berhasil diambil',
      data,
      meta: {
        total: data.length,
        filter: {
          status: filters.status ?? null,
          minKapasitas: filters.minKapasitas ?? null,
          search: filters.search ?? null,
        },
        sort: {
          sortBy: filters.sortBy ?? 'id',
          order: filters.order ?? 'asc',
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await service.findById(Number(req.params.id));
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);

    return success(res, { statusCode: 200, message: 'Detail laboratorium', data: lab });
  } catch (err) {
    next(err);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = req.body as CreateLaboratoriumInput;
    const lab = await service.create(input);
    res.setHeader('Location', `/api/laboratorium/${lab.id}`);
    return success(res, { statusCode: 201, message: 'Laboratorium berhasil dibuat', data: lab });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await service.update(Number(req.params.id), req.body as UpdateLaboratoriumInput);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);

    return success(res, { statusCode: 200, message: 'Laboratorium berhasil diperbarui', data: lab });
  } catch (err) {
    next(err);
  }
};

export const patch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await service.update(Number(req.params.id), req.body as UpdateLaboratoriumInput);
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);

    return success(res, { statusCode: 200, message: 'Laboratorium berhasil diperbarui sebagian', data: lab });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lab = await service.remove(Number(req.params.id));
    if (!lab) throw new ApiError(404, `Laboratorium dengan id ${req.params.id} tidak ditemukan`);

    // 204 No Content — tanpa body
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};