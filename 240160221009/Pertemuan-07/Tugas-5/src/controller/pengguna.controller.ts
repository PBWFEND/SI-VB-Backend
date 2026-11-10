import type { Request, Response, NextFunction } from "express";
import {
  getAllPengguna,
  getPenggunaByNim,
  createPengguna,
  updatePengguna,
  deletePengguna,
} from "../service/pengguna.service.ts";

// Helper untuk memeriksa apakah body berupa objek JSON
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Helper validasi format email sederhana
function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET /pengguna - Mengambil seluruh data pengguna
export const getAllPenggunaController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pengguna = await getAllPengguna();
    return res.status(200).json({
      success: true,
      message: "Data pengguna berhasil diambil",
      data: pengguna,
    });
  } catch (error) {
    return next(error);
  }
};

// GET /pengguna/:nim - Mengambil detail pengguna berdasarkan NIM
export const getPenggunaByNimController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nimRaw = req.params.nim;
    if (typeof nimRaw !== "string" || !nimRaw.trim()) {
      return res.status(400).json({
        success: false,
        message: "NIM wajib diisi",
      });
    }

    const nim = nimRaw.trim();
    const pengguna = await getPenggunaByNim(nim);

    if (!pengguna) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail pengguna berhasil diambil",
      data: pengguna,
    });
  } catch (error) {
    return next(error);
  }
};

// POST /pengguna - Menambahkan pengguna baru
export const createPenggunaController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!isPlainObject(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Body request harus berupa objek JSON",
      });
    }

    const { nim, nama, email, role } = req.body;
    const errors: string[] = [];

    if (typeof nim !== "string" || !nim.trim()) {
      errors.push("Field nim wajib diisi");
    }
    if (typeof nama !== "string" || !nama.trim()) {
      errors.push("Field nama wajib diisi");
    }
    if (typeof email !== "string" || !email.trim()) {
      errors.push("Field email wajib diisi");
    } else if (!isEmailValid(email.trim())) {
      errors.push("Field email harus berformat email valid");
    }
    if (typeof role !== "string" || !role.trim()) {
      errors.push("Field role wajib diisi");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Data pengguna tidak valid",
        details: errors,
      });
    }

    const pengguna = await createPengguna({
      nim: (nim as string).trim(),
      nama: (nama as string).trim(),
      email: (email as string).trim(),
      role: (role as string).trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Pengguna berhasil dibuat",
      data: pengguna,
    });
  } catch (error: any) {
    // Tangani error duplikasi data unik (NIM atau Email)
    if (error?.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "NIM atau email sudah terdaftar",
      });
    }
    return next(error);
  }
};

// PATCH /pengguna/:nim - Memperbarui sebagian data pengguna
export const updatePenggunaController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nimRaw = req.params.nim;
    if (typeof nimRaw !== "string" || !nimRaw.trim()) {
      return res.status(400).json({
        success: false,
        message: "NIM wajib diisi",
      });
    }

    const nim = nimRaw.trim();

    if (!isPlainObject(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Body request harus berupa objek JSON",
      });
    }

    const allowedFields = ["nama", "email", "role"];
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Minimal satu field harus dikirim",
      });
    }

    const errors: string[] = [];
    const updateData: { nama?: string; email?: string; role?: string } = {};

    for (const key of keys) {
      if (!allowedFields.includes(key)) {
        errors.push(`Field '${key}' tidak boleh diperbarui`);
        continue;
      }

      const val = req.body[key];
      if (typeof val !== "string" || !val.trim()) {
        errors.push(`Field ${key} harus berupa teks dan tidak boleh kosong`);
        continue;
      }

      if (key === "email" && !isEmailValid(val.trim())) {
        errors.push("Field email harus berformat email valid");
        continue;
      }

      if (key === "nama") updateData.nama = val.trim();
      if (key === "email") updateData.email = val.trim();
      if (key === "role") updateData.role = val.trim();
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Data perubahan tidak valid",
        details: errors,
      });
    }

    // Periksa apakah pengguna dengan NIM tersebut ada
    const penggunaLama = await getPenggunaByNim(nim);
    if (!penggunaLama) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    const penggunaDiperbarui = await updatePengguna(nim, updateData);

    return res.status(200).json({
      success: true,
      message: "Data pengguna berhasil diperbarui",
      data: penggunaDiperbarui,
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Email sudah digunakan oleh pengguna lain",
      });
    }
    return next(error);
  }
};

// DELETE /pengguna/:nim - Menghapus pengguna berdasarkan NIM
export const deletePenggunaController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nimRaw = req.params.nim;
    if (typeof nimRaw !== "string" || !nimRaw.trim()) {
      return res.status(400).json({
        success: false,
        message: "NIM wajib diisi",
      });
    }

    const nim = nimRaw.trim();
    const pengguna = await getPenggunaByNim(nim);

    if (!pengguna) {
      return res.status(404).json({
        success: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    await deletePengguna(nim);

    // 204 No Content tanpa response body
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
