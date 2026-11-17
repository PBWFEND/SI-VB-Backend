import type { Request, Response, NextFunction } from "express";
import * as bukuService from "../service/buku.service";

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    const list = await bukuService.findAllBuku(status);
    res.status(200).json({ data: list });
  } catch (err) {
    next(err);
  }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });

    const buku = await bukuService.findBukuById(id);
    if (!buku) return res.status(404).json({ message: `Buku id ${id} tidak ditemukan` });

    res.status(200).json({ data: buku });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const v = bukuService.validateCreateBuku(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    const buku = await bukuService.createBuku(v.data);
    res.status(201).json({ message: "Buku berhasil dibuat", data: buku });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });

    const exists = await bukuService.findBukuById(id);
    if (!exists) return res.status(404).json({ message: `Buku id ${id} tidak ditemukan` });

    const v = bukuService.validateUpdateBuku(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    const buku = await bukuService.updateBuku(id, v.data);
    res.status(200).json({ message: "Buku berhasil diupdate", data: buku });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });

    const exists = await bukuService.findBukuById(id);
    if (!exists) return res.status(404).json({ message: `Buku id ${id} tidak ditemukan` });

    await bukuService.deleteBuku(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}