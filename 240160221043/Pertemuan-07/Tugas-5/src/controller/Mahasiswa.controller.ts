
import type { Request, Response, NextFunction } from "express";
import {
  ambilSemuaMahasiswa,
  ambilMahasiswaByNim,
  tambahMahasiswa,
  ubahMahasiswa,
  hapusMahasiswa,
} from "../service/Mahasiswa.service.ts";

// GET semua mahasiswa
export async function getSemuaMahasiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ambilSemuaMahasiswa();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

// GET mahasiswa berdasarkan NIM
export async function getMahasiswaByNim(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await ambilMahasiswaByNim(req.params.nim as string);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

// POST tambah mahasiswa
export async function postMahasiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { nim, nama, prodi, semester } = req.body;
    const errors: string[] = [];

    if (typeof nim !== "string" || !nim.trim())
      errors.push("NIM wajib diisi");

    if (typeof nama !== "string" || !nama.trim())
      errors.push("Nama wajib diisi");

    if (typeof prodi !== "string" || !prodi.trim())
      errors.push("Prodi wajib diisi");

    if (
      typeof semester !== "number" ||
      !Number.isInteger(semester) ||
      semester < 1
    )
      errors.push("Semester harus berupa bilangan bulat minimal 1");

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details: errors,
      });
    }

    const data = await tambahMahasiswa({
      nim: nim.trim(),
      nama: nama.trim(),
      prodi: prodi.trim(),
      semester,
    });

    res.status(201).json({
      success: true,
      message: "Mahasiswa berhasil ditambahkan",
      data,
    });
  } catch (error) {
    next(error);
  }
}

// PATCH ubah mahasiswa
export async function patchMahasiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const nim = req.params.nim as string;
    const { nama, prodi, semester } = req.body;
    const errors: string[] = [];

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Body harus berupa objek",
      });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tidak ada data yang diubah",
      });
    }

    if (nama !== undefined && (typeof nama !== "string" || !nama.trim()))
      errors.push("Nama harus berupa teks");

    if (prodi !== undefined && (typeof prodi !== "string" || !prodi.trim()))
      errors.push("Prodi harus berupa teks");

    if (
      semester !== undefined &&
      (typeof semester !== "number" ||
        !Number.isInteger(semester) ||
        semester < 1)
    )
      errors.push("Semester harus berupa bilangan bulat minimal 1");

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validasi gagal",
        details: errors,
      });
    }

    const mahasiswa = await ambilMahasiswaByNim(nim);

    if (!mahasiswa) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
      });
    }

    const data = await ubahMahasiswa(nim, {
      ...(nama !== undefined ? { nama: nama.trim() } : {}),
      ...(prodi !== undefined ? { prodi: prodi.trim() } : {}),
      ...(semester !== undefined ? { semester } : {}),
    });

    res.status(200).json({
      success: true,
      message: "Data mahasiswa berhasil diubah",
      data,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE mahasiswa
export async function deleteMahasiswa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const nim = req.params.nim as string;
    const mahasiswa = await ambilMahasiswaByNim(nim);

    if (!mahasiswa) {
      return res.status(404).json({
        success: false,
        message: "Mahasiswa tidak ditemukan",
      });
    }

    await hapusMahasiswa(nim);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
