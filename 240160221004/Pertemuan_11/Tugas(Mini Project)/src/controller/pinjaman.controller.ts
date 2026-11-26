import type { Request, Response, NextFunction } from "express";
import * as pinjamanService from "../service/pinjaman.service";
import { AppError } from "../errors/AppError";

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    res.status(200).json({ data: await pinjamanService.findAllPinjaman(status) });
  } catch (err) { next(err); }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);
    const data = await pinjamanService.findPinjamanById(id);
    if (!data) throw new AppError("Pinjaman tidak ditemukan", 404);
    res.status(200).json({ data });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const v = pinjamanService.validateCreatePinjaman(req.body);
    if (!v.ok) throw new AppError("Validasi gagal", 400);

    const result = await pinjamanService.createPinjaman(v.data.bukuId, v.data.penggunaId);
    if (!result.ok) throw new AppError(result.message!, result.code!);
    res.status(201).json({ message: "Pinjaman dibuat", data: result.data });
  } catch (err) { next(err); }
}

export async function kembalikan(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);

    const result = await pinjamanService.kembalikanPinjaman(id);
    if (!result.ok) throw new AppError(result.message!, result.code!);
    res.status(200).json({ message: "Dikembalikan", data: result.data });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);
    if (!(await pinjamanService.findPinjamanById(id))) throw new AppError("Pinjaman tidak ditemukan", 404);

    await pinjamanService.deletePinjaman(id);
    res.status(204).send();
  } catch (err) { next(err); }
}