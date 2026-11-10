import type { Request, Response, NextFunction } from "express";
import * as bukuService from "../service/buku.service";

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    res.status(200).json({ data: await bukuService.findAllBuku(status) });
  } catch (err) { next(err); }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });

    const data = await bukuService.findBukuById(id);
    if (!data) return res.status(404).json({ message: "Buku tidak ditemukan" });

    res.status(200).json({ data });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const v = bukuService.validateCreateBuku(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    res.status(201).json({ message: "Buku dibuat", data: await bukuService.createBuku(v.data) });
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });
    if (!(await bukuService.findBukuById(id))) return res.status(404).json({ message: "Buku tidak ditemukan" });

    const v = bukuService.validateUpdateBuku(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    res.status(200).json({ message: "Buku diupdate", data: await bukuService.updateBuku(id, v.data) });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });
    if (!(await bukuService.findBukuById(id))) return res.status(404).json({ message: "Buku tidak ditemukan" });

    await bukuService.deleteBuku(id);
    res.status(204).send();
  } catch (err) { next(err); }
}