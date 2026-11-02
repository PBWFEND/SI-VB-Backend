
import type { Request, Response, NextFunction } from "express";
import {
  ambilSemuaMahasiswa,
  ambilMahasiswaByNim,
  tambahMahasiswa,
  ubahMahasiswa,
  hapusMahasiswa,
} from "../service/mahasiswa.service.ts";

const validasiNim = (nim: unknown): nim is string => {
  return typeof nim === "string" && nim.trim().length > 0;
};

export const getMahasiswa = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await ambilSemuaMahasiswa();
    return res.status(200).json({
      success: true,
      message: "Daftar mahasiswa berhasil diambil",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getMahasiswaByNim = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nim: unknown = req.params.nim;
    if (!validasiNim(nim)) {
      return res.status(400).json({
        success: false,
        message: "NIM tidak valid",
        details: ["Parameter NIM wajib berupa teks dan tidak kosong"],
      });
    }

    const data = await ambilMahasiswaByNim(nim.trim());
    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
        details: [`Mahasiswa dengan NIM ${nim} tidak ditemukan`],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail mahasiswa berhasil diambil",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const postMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: unknown = req.body;

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return res.status(400).json({
        success: false,
        message: "Data mahasiswa tidak valid",
        details: ["Body harus berupa object"],
      });
    }

    const data = body as Record<string, unknown>;
    const details: string[] = [];

    if (typeof data.nim !== "string" || !data.nim.trim())
      details.push("NIM wajib diisi dengan teks");
    if (typeof data.nama !== "string" || !data.nama.trim())
      details.push("Nama wajib diisi dengan teks");
    if (typeof data.prodi !== "string" || !data.prodi.trim())
      details.push("Prodi wajib diisi dengan teks");
    if (typeof data.angkatan !== "number" ||
        !Number.isInteger(data.angkatan) || data.angkatan < 1900)
      details.push("Angkatan harus berupa bilangan bulat minimal 1900");

    if (details.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
    }

    const mahasiswaBaru = await tambahMahasiswa({
      nim: (data.nim as string).trim(),
      nama: (data.nama as string).trim(),
      prodi: (data.prodi as string).trim(),
      angkatan: data.angkatan as number,
    });

    return res.status(201).json({
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data: mahasiswaBaru,
    });
  } catch (error) {
    next(error);
  }
};

export const patchMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nim: unknown = req.params.nim;
    if (!validasiNim(nim)) {
      return res.status(400).json({
        success: false,
        message: "NIM tidak valid",
        details: ["Parameter NIM wajib diisi"],
      });
    }

    const body: unknown = req.body;
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return res.status(400).json({
        success: false,
        message: "Data perubahan tidak valid",
        details: ["Body harus berupa object"],
      });
    }

    const input = body as Record<string, unknown>;
    const data: { nama?: string; prodi?: string; angkatan?: number } = {};
    const details: string[] = [];

    if (Object.keys(input).length === 0) {
      details.push("Minimal satu field harus diubah");
    }

    for (const key of Object.keys(input)) {
      if (!["nama", "prodi", "angkatan"].includes(key)) {
        details.push(`Field ${key} tidak boleh diubah`);
      }
    }

    if ("nama" in input) {
      if (typeof input.nama !== "string" || !input.nama.trim())
        details.push("Nama harus berupa teks dan tidak kosong");
      else data.nama = input.nama.trim();
    }

    if ("prodi" in input) {
      if (typeof input.prodi !== "string" || !input.prodi.trim())
        details.push("Prodi harus berupa teks dan tidak kosong");
      else data.prodi = input.prodi.trim();
    }

    if ("angkatan" in input) {
      if (typeof input.angkatan !== "number" ||
          !Number.isInteger(input.angkatan) || input.angkatan < 1900)
        details.push("Angkatan harus berupa bilangan bulat minimal 1900");
      else data.angkatan = input.angkatan;
    }

    if (details.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details,
      });
    }

    const hasil = await ubahMahasiswa(nim.trim(), data);
    if (!hasil) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
        details: [`Mahasiswa dengan NIM ${nim} tidak ditemukan`],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mahasiswa berhasil diperbarui",
      data: hasil,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMahasiswa = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nim: unknown = req.params.nim;
    if (!validasiNim(nim)) {
      return res.status(400).json({
        success: false,
        message: "NIM tidak valid",
        details: ["Parameter NIM wajib diisi"],
      });
    }

    const hasil = await hapusMahasiswa(nim.trim());
    if (!hasil) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
        details: [`Mahasiswa dengan NIM ${nim} tidak ditemukan`],
      });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
