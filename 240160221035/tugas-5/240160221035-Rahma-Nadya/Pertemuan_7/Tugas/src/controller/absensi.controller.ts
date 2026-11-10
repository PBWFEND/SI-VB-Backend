import type { Request, Response, NextFunction } from "express";

import {
  ambilSemuaAbsensi,
  ambilAbsensiById,
  buatAbsensi,
  ubahAbsensi,
  hapusAbsensi,
} from "../service/absensi.service.ts";

const daftarStatus = ["Hadir", "Izin", "Sakit", "Alpha"];

const kodeErrorPrisma = (error: unknown): string | undefined => {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return undefined;
};

const idValid = (id: number) =>
  Number.isInteger(id) && id > 0;

// GET /absensi
export const getSemuaAbsensi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const filter: { anggota_id?: number; status?: string } = {};

  if (req.query.anggota_id !== undefined) {
    if (typeof req.query.anggota_id !== "string") {
      return res.status(400).json({
        success: false,
        message: "anggota_id tidak valid",
      });
    }

    const anggota_id = Number(req.query.anggota_id);

    if (!idValid(anggota_id)) {
      return res.status(400).json({
        success: false,
        message: "anggota_id harus berupa bilangan bulat positif",
      });
    }

    filter.anggota_id = anggota_id;
  }

  if (req.query.status !== undefined) {
    if (
      typeof req.query.status !== "string" ||
      !daftarStatus.includes(req.query.status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status harus Hadir, Izin, Sakit, atau Alpha",
      });
    }

    filter.status = req.query.status;
  }

  try {
    const absensi = await ambilSemuaAbsensi(filter);

    return res.status(200).json({
      success: true,
      message: "Data absensi berhasil diambil",
      total: absensi.length,
      data: absensi,
    });
  } catch (error) {
    next(error);
  }
};

// GET /absensi/:id
export const getAbsensiById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  if (!idValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  try {
    const absensi = await ambilAbsensiById(id);

    if (!absensi) {
      return res.status(404).json({
        success: false,
        message: "Absensi tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data absensi berhasil diambil",
      data: absensi,
    });
  } catch (error) {
    next(error);
  }
};

// POST /absensi
export const postAbsensi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { anggota_id, kegiatan_id, status } = req.body ?? {};

  if (
    !idValid(anggota_id) ||
    !idValid(kegiatan_id) ||
    typeof status !== "string" ||
    !daftarStatus.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Data absensi tidak valid",
    });
  }

  try {
    const absensi = await buatAbsensi({
      anggota_id,
      kegiatan_id,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Absensi berhasil ditambahkan",
      data: absensi,
    });
  } catch (error) {
    if (kodeErrorPrisma(error) === "P2003") {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    next(error);
  }
};

// PUT /absensi/:id
export const putAbsensi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);
  const { anggota_id, kegiatan_id, status } = req.body ?? {};

  if (
    !idValid(id) ||
    !idValid(anggota_id) ||
    !idValid(kegiatan_id) ||
    typeof status !== "string" ||
    !daftarStatus.includes(status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Data absensi tidak valid",
    });
  }

  try {
    const absensi = await ubahAbsensi(id, {
      anggota_id,
      kegiatan_id,
      status,
    });

    return res.status(200).json({
      success: true,
      message: "Absensi berhasil diperbarui",
      data: absensi,
    });
  } catch (error) {
    const kode = kodeErrorPrisma(error);

    if (kode === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Absensi tidak ditemukan",
      });
    }

    if (kode === "P2003") {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    next(error);
  }
};

// PATCH /absensi/:id
export const patchAbsensi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);
  const { anggota_id, kegiatan_id, status } = req.body ?? {};

  if (!idValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  const data: {
    anggota_id?: number;
    kegiatan_id?: number;
    status?: string;
  } = {};

  if (anggota_id !== undefined) {
    if (!idValid(anggota_id)) {
      return res.status(400).json({
        success: false,
        message: "anggota_id tidak valid",
      });
    }

    data.anggota_id = anggota_id;
  }

  if (kegiatan_id !== undefined) {
    if (!idValid(kegiatan_id)) {
      return res.status(400).json({
        success: false,
        message: "kegiatan_id tidak valid",
      });
    }

    data.kegiatan_id = kegiatan_id;
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !daftarStatus.includes(status)
    ) {
      return res.status(400).json({
        success: false,
        message: "Status harus Hadir, Izin, Sakit, atau Alpha",
      });
    }

    data.status = status;
  }

  if (Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Masukkan data yang ingin diperbarui",
    });
  }

  try {
    const absensi = await ubahAbsensi(id, data);

    return res.status(200).json({
      success: true,
      message: "Absensi berhasil diperbarui",
      data: absensi,
    });
  } catch (error) {
    const kode = kodeErrorPrisma(error);

    if (kode === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Absensi tidak ditemukan",
      });
    }

    if (kode === "P2003") {
      return res.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan",
      });
    }

    next(error);
  }
};

// DELETE /absensi/:id
export const deleteAbsensi = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  if (!idValid(id)) {
    return res.status(400).json({
      success: false,
      message: "ID absensi tidak valid",
    });
  }

  try {
    await hapusAbsensi(id);

    return res.status(204).send();
  } catch (error) {
    if (kodeErrorPrisma(error) === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Absensi tidak ditemukan",
      });
    }

    next(error);
  }
};