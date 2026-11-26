import type { Request, Response, NextFunction } from "express";
import * as bukuService from "../service/buku.service";
import { AppError } from "../errors/AppError";

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    res.status(200).json({ data: await bukuService.findAllBuku(status) });
  } catch (err) { next(err); }
}
export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);
    const data = await bukuService.findBukuById(id);
    if (!data) throw new AppError("Buku tidak ditemukan", 404);
    res.status(200).json({ data });
  } catch (err) { next(err); }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const v = bukuService.validateCreateBuku(req.body);
    if (!v.ok) throw new AppError("Validasi gagal", 400);
    res.status(201).json({ message: "Buku dibuat", data: await bukuService.createBuku(v.data) });
  } catch (err) { next(err); }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);
    if (!(await bukuService.findBukuById(id))) throw new AppError("Buku tidak ditemukan", 404);
    const v = bukuService.validateUpdateBuku(req.body);
    if (!v.ok) throw new AppError("Validasi gagal", 400);
    res.status(200).json({ message: "Buku diupdate", data: await bukuService.updateBuku(id, v.data) });
  } catch (err) { next(err); }
}
export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw new AppError("id harus angka", 400);
    if (!(await bukuService.findBukuById(id))) throw new AppError("Buku tidak ditemukan", 404);
    await bukuService.deleteBuku(id);
    res.status(204).send();
  } catch (err) { next(err); }
}