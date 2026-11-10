
import type { Request, Response } from "express";
import * as bukuService from "../service/buku.service.ts";

export const getBuku = async (_req: Request, res: Response) => {
  const data = await bukuService.ambilDaftarBuku();
  return res.status(200).json({
    success: true,
    message: "Daftar buku",
    data,
  });
};

export const getBukuById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID buku tidak valid",
    });
  }

  const data = await bukuService.ambilBukuById(id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Buku tidak ditemukan",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Detail buku",
    data,
  });
};

export const postBuku = async (req: Request, res: Response) => {
  const { judul, penulis, tahun, stok } = req.body;

  if (!judul || !penulis || !Number.isInteger(tahun)) {
    return res.status(400).json({
      success: false,
      message: "Judul, penulis, dan tahun wajib diisi",
    });
  }

  const data = await bukuService.buatBuku({
    judul,
    penulis,
    tahun,
    stok,
  });

  return res.status(201).json({
    success: true,
    message: "Buku berhasil ditambahkan",
    data,
  });
};

export const patchBuku = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID buku tidak valid",
    });
  }

  const data = await bukuService.ubahBuku(id, req.body);

  return res.status(200).json({
    success: true,
    message: "Buku berhasil diperbarui",
    data,
  });
};

export const deleteBuku = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: "ID buku tidak valid",
    });
  }

  await bukuService.hapusBuku(id);

  return res.status(204).send();
};
