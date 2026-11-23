import { Request, Response } from "express";
import { bukuService, BukuInput } from "../service/buku.service";

const TAHUN_MIN = 1000;
const TAHUN_MAX = 2100;

const isInt = (v: unknown): v is number =>
  typeof v === "number" && Number.isInteger(v);
const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

function parseId(raw: unknown): number | null {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Validasi body. partial=true untuk PATCH (field boleh sebagian).
function validateBuku(body: any, partial: boolean) {
  const errors: string[] = [];
  const data: Partial<BukuInput> = {};

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { errors: ["Body harus berupa objek JSON"], data };
  }

  if (body.judul !== undefined || !partial) {
    if (!isNonEmptyString(body.judul)) errors.push("judul wajib berupa string tidak kosong");
    else data.judul = body.judul.trim();
  }
  if (body.penulis !== undefined || !partial) {
    if (!isNonEmptyString(body.penulis)) errors.push("penulis wajib berupa string tidak kosong");
    else data.penulis = body.penulis.trim();
  }
  if (body.tahun !== undefined || !partial) {
    if (!isInt(body.tahun) || body.tahun < TAHUN_MIN || body.tahun > TAHUN_MAX)
      errors.push(`tahun wajib berupa bilangan bulat ${TAHUN_MIN}-${TAHUN_MAX}`);
    else data.tahun = body.tahun;
  }
  if (body.stok !== undefined) {
    if (!isInt(body.stok) || body.stok < 0)
      errors.push("stok harus berupa bilangan bulat >= 0");
    else data.stok = body.stok;
  }

  if (partial && errors.length === 0 && Object.keys(data).length === 0) {
    errors.push("Minimal satu field harus diisi (judul, penulis, tahun, stok)");
  }
  return { errors, data };
}

export const bukuController = {
  async list(req: Request, res: Response) {
    const { judul, penulis, tahun } = req.query;
    const filter: { judul?: string; penulis?: string; tahun?: number } = {};
    if (typeof judul === "string" && judul) filter.judul = judul;
    if (typeof penulis === "string" && penulis) filter.penulis = penulis;
    if (typeof tahun === "string" && tahun) {
      const t = Number(tahun);
      if (!Number.isInteger(t))
        return res.status(400).json({ error: "query tahun harus berupa bilangan bulat" });
      filter.tahun = t;
    }
    res.status(200).json(await bukuService.findAll(filter));
  },

  async detail(req: Request, res: Response) {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: "id harus berupa bilangan bulat positif" });
    const buku = await bukuService.findById(id);
    if (!buku) return res.status(404).json({ error: `Buku dengan id ${id} tidak ditemukan` });
    res.status(200).json(buku);
  },

  async create(req: Request, res: Response) {
    const { errors, data } = validateBuku(req.body, false);
    if (errors.length) return res.status(400).json({ error: "Validasi gagal", details: errors });
    const buku = await bukuService.create(data as BukuInput);
    res.status(201).json(buku);
  },

  async update(req: Request, res: Response) {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: "id harus berupa bilangan bulat positif" });
    const { errors, data } = validateBuku(req.body, true);
    if (errors.length) return res.status(400).json({ error: "Validasi gagal", details: errors });
    const buku = await bukuService.update(id, data);
    if (!buku) return res.status(404).json({ error: `Buku dengan id ${id} tidak ditemukan` });
    res.status(200).json(buku);
  },

  async remove(req: Request, res: Response) {
    const id = parseId(req.params.id);
    if (id === null) return res.status(400).json({ error: "id harus berupa bilangan bulat positif" });
    const berhasil = await bukuService.remove(id);
    if (!berhasil) return res.status(404).json({ error: `Buku dengan id ${id} tidak ditemukan` });
    res.status(204).send();
  },
};
