/**
 * Controller Layer — Domain E-Warung (Resource: Menu)
 *
 * Bertanggung jawab pada lapisan HTTP:
 * - Validasi input (gerbang typeof, rentang nilai, sanitasi string)
 * - Pemilihan kode status HTTP yang semantik (200, 201, 204, 400, 404, 500)
 * - Pembentukan response JSON seragam { success, message, data?, details? }
 */

import type { Request, Response } from "express";
import * as menuService from "../service/menu.service.ts";

/** Helper helper pengiriman response sukses. */
const sendSuccess = (res: Response, statusCode: number, message: string, data?: unknown) => {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined && { data }),
  });
};

/** Helper pengiriman response error. */
const sendError = (res: Response, statusCode: number, message: string, details?: unknown) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(details !== undefined && { details }),
  });
};

/**
 * Validasi dan konversi ID parameter dari URL.
 * Mengembalikan integer positif atau null jika format tidak valid.
 */
const parseIdParam = (idRaw: string | undefined): number | null => {
  if (!idRaw || typeof idRaw !== "string") return null;
  const id = Number(idRaw);
  if (Number.isNaN(id) || !Number.isInteger(id) || id < 1) return null;
  return id;
};

/**
 * GET /menu
 * Mengambil semua daftar menu dengan dukungan filter query (?kategori=...&tersedia=...)
 */
export const getDaftarMenu = async (req: Request, res: Response) => {
  try {
    const { kategori, tersedia } = req.query;

    const filter: menuService.FilterMenu = {};

    if (typeof kategori === "string" && kategori.trim() !== "") {
      filter.kategori = kategori.trim();
    }

    if (tersedia !== undefined) {
      if (tersedia === "true" || tersedia === "1") {
        filter.tersedia = true;
      } else if (tersedia === "false" || tersedia === "0") {
        filter.tersedia = false;
      }
    }

    const daftarMenu = await menuService.ambilDaftarMenu(filter);

    return res.status(200).json({
      success: true,
      message: "Daftar menu berhasil diambil",
      total: daftarMenu.length,
      data: daftarMenu,
    });
  } catch (error: any) {
    console.error("[getDaftarMenu] Error:", error.message);
    return sendError(res, 500, "Gagal mengambil daftar menu");
  }
};

/**
 * GET /menu/:id
 * Mengambil detail menu berdasarkan ID.
 */
export const getMenuById = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);
    if (!id) {
      return sendError(res, 400, "Parameter id harus berupa bilangan bulat positif");
    }

    const menu = await menuService.ambilMenuBerdasarkanId(id);
    if (!menu) {
      return sendError(res, 404, `Menu dengan id ${id} tidak ditemukan`);
    }

    return sendSuccess(res, 200, "Detail menu berhasil diambil", menu);
  } catch (error: any) {
    console.error("[getMenuById] Error:", error.message);
    return sendError(res, 500, "Gagal mengambil detail menu");
  }
};

/**
 * POST /menu
 * Menambahkan menu baru dengan validasi ketat.
 */
export const createMenu = async (req: Request, res: Response) => {
  try {
    const body = req.body ?? {};
    const errors: string[] = [];

    const { nama, harga, kategori, tersedia } = body;

    // 1. Validasi nama: wajib, string non-kosong
    if (typeof nama !== "string" || nama.trim() === "") {
      errors.push("Field nama wajib diisi dan berupa string non-kosong");
    }

    // 2. Validasi harga: wajib, number integer non-negatif (>= 0)
    if (typeof harga !== "number" || !Number.isInteger(harga) || harga < 0) {
      errors.push("Field harga wajib berupa bilangan bulat positif (>= 0)");
    }

    // 3. Validasi kategori: wajib, string non-kosong
    if (typeof kategori !== "string" || kategori.trim() === "") {
      errors.push("Field kategori wajib diisi dan berupa string non-kosong");
    }

    // 4. Validasi tersedia: opsional, harus boolean jika dikirim
    if (tersedia !== undefined && typeof tersedia !== "boolean") {
      errors.push("Field tersedia harus bertipe boolean (true/false)");
    }

    if (errors.length > 0) {
      return sendError(res, 400, "Validasi gagal: data menu tidak valid", errors);
    }

    const menuBaru = await menuService.buatMenu({
      nama: (nama as string).trim(),
      harga: harga as number,
      kategori: (kategori as string).trim(),
      ...(tersedia !== undefined && { tersedia: tersedia as boolean }),
    });

    return sendSuccess(res, 201, "Menu berhasil ditambahkan", menuBaru);
  } catch (error: any) {
    console.error("[createMenu] Error:", error.message);
    return sendError(res, 500, "Gagal membuat menu baru");
  }
};

/**
 * PATCH /menu/:id
 * Memperbarui data menu secara parsial.
 */
export const updateMenu = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);
    if (!id) {
      return sendError(res, 400, "Parameter id harus berupa bilangan bulat positif");
    }

    // Pastikan data menu ada terlebih dahulu
    const menuAda = await menuService.ambilMenuBerdasarkanId(id);
    if (!menuAda) {
      return sendError(res, 404, `Menu dengan id ${id} tidak ditemukan`);
    }

    const body = req.body ?? {};
    if (typeof body !== "object" || Object.keys(body).length === 0) {
      return sendError(res, 400, "Request body tidak boleh kosong untuk pembaruan data");
    }

    const errors: string[] = [];
    const dataUpdate: menuService.PerbaruiMenuInput = {};

    if ("nama" in body) {
      if (typeof body.nama !== "string" || body.nama.trim() === "") {
        errors.push("Field nama harus berupa string non-kosong");
      } else {
        dataUpdate.nama = body.nama.trim();
      }
    }

    if ("harga" in body) {
      if (typeof body.harga !== "number" || !Number.isInteger(body.harga) || body.harga < 0) {
        errors.push("Field harga harus berupa bilangan bulat positif (>= 0)");
      } else {
        dataUpdate.harga = body.harga;
      }
    }

    if ("kategori" in body) {
      if (typeof body.kategori !== "string" || body.kategori.trim() === "") {
        errors.push("Field kategori harus berupa string non-kosong");
      } else {
        dataUpdate.kategori = body.kategori.trim();
      }
    }

    if ("tersedia" in body) {
      if (typeof body.tersedia !== "boolean") {
        errors.push("Field tersedia harus bertipe boolean (true/false)");
      } else {
        dataUpdate.tersedia = body.tersedia;
      }
    }

    if (errors.length > 0) {
      return sendError(res, 400, "Validasi pembaruan gagal", errors);
    }

    const menuUpdated = await menuService.perbaruiMenu(id, dataUpdate);
    return sendSuccess(res, 200, "Menu berhasil diperbarui", menuUpdated);
  } catch (error: any) {
    console.error("[updateMenu] Error:", error.message);
    return sendError(res, 500, "Gagal memperbarui menu");
  }
};

/**
 * DELETE /menu/:id
 * Menghapus menu dari database (mengembalikan 204 No Content bila sukses).
 */
export const deleteMenu = async (req: Request, res: Response) => {
  try {
    const id = parseIdParam(req.params.id);
    if (!id) {
      return sendError(res, 400, "Parameter id harus berupa bilangan bulat positif");
    }

    const menuAda = await menuService.ambilMenuBerdasarkanId(id);
    if (!menuAda) {
      return sendError(res, 404, `Menu dengan id ${id} tidak ditemukan`);
    }

    await menuService.hapusMenu(id);
    return res.status(204).send();
  } catch (error: any) {
    console.error("[deleteMenu] Error:", error.message);
    return sendError(res, 500, "Gagal menghapus menu");
  }
};
