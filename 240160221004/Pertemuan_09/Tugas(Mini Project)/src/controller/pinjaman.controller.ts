import type { Request, Response, NextFunction } from "express";
import * as pinjamanService from "../service/pinjaman.service";

export async function getList(req: Request, res: Response, next: NextFunction) {
  try {
    const status = typeof req.query.status === "string" ? req.query.status : undefined;
    res.status(200).json({ data: await pinjamanService.findAllPinjaman(status) });
  } catch (err) { next(err); }
}

export async function getDetail(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });
    const data = await pinjamanService.findPinjamanById(id);
    if (!data) return res.status(404).json({ message: "Pinjaman tidak ditemukan" });
    res.status(200).json({ data });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const v = pinjamanService.validateCreatePinjaman(req.body);
    if (!v.ok) return res.status(400).json({ message: "Validasi gagal", errors: v.errors });

    const result = await pinjamanService.createPinjaman(v.data.bukuId, v.data.penggunaId);
    if (!result.ok) return res.status(result.code!).json({ message: result.message });

    res.status(201).json({ message: "Pinjaman dibuat", data: result.data });
  } catch (err) { next(err); }
}

export async function kembalikan(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });

    const result = await pinjamanService.kembalikanPinjaman(id);
    if (!result.ok) return res.status(result.code!).json({ message: result.message });

    res.status(200).json({ message: "Dikembalikan", data: result.data });
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "id harus angka" });
    if (!(await pinjamanService.findPinjamanById(id))) return res.status(404).json({ message: "Pinjaman tidak ditemukan" });

    await pinjamanService.deletePinjaman(id);
    res.status(204).send();
  } catch (err) { next(err); }
}