import type { Request, Response, NextFunction } from "express";
import * as ProdukService from "../service/produk.service.ts";

// GET /produk
export const getAllProduk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const produk = await ProdukService.getAllProduk();
    res.status(200).json(produk);
  } catch (error) {
    next(error);
  }
};

// GET /produk/:id
export const getProdukById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID produk tidak valid" });
      return;
    }

    const produk = await ProdukService.getProdukById(id);

    if (!produk) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
      return;
    }

    res.status(200).json(produk);
  } catch (error) {
    next(error);
  }
};

// Helper untuk memeriksa apakah body berupa objek JSON yang valid
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// POST /produk
export const createProduk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!isPlainObject(req.body)) {
      res.status(400).json({ message: "Body request harus berupa objek JSON" });
      return;
    }

    const allowedFields = ["nama", "harga", "kategori", "tersedia"];
    const keys = Object.keys(req.body);

    if (keys.some((key) => !allowedFields.includes(key))) {
      res.status(400).json({ message: "Terdapat field yang tidak diizinkan" });
      return;
    }

    const { nama, harga, kategori, tersedia } = req.body;

    if (
      typeof nama !== "string" ||
      nama.trim() === "" ||
      typeof harga !== "number" ||
      !Number.isInteger(harga) ||
      harga < 0 ||
      typeof kategori !== "string" ||
      kategori.trim() === "" ||
      (tersedia !== undefined && typeof tersedia !== "boolean")
    ) {
      res.status(400).json({
        message: "Data produk tidak valid. Periksa nama, harga, kategori, dan tersedia.",
      });
      return;
    }

    const produk = await ProdukService.createProduk({
      nama: nama.trim(),
      harga,
      kategori: kategori.trim(),
      tersedia,
    });

    res.status(201).json(produk);
  } catch (error) {
    next(error);
  }
};

// PATCH /produk/:id
export const updateProduk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID produk tidak valid" });
      return;
    }

    if (!isPlainObject(req.body)) {
      res.status(400).json({ message: "Body request harus berupa objek JSON" });
      return;
    }

    const allowedFields = ["nama", "harga", "kategori", "tersedia"];
    const keys = Object.keys(req.body);

    if (
      keys.length === 0 ||
      keys.some((key) => !allowedFields.includes(key))
    ) {
      res.status(400).json({ message: "Data pembaruan tidak valid atau kosong" });
      return;
    }

    const existing = await ProdukService.getProdukById(id);
    if (!existing) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
      return;
    }

    const data: {
      nama?: string;
      harga?: number;
      kategori?: string;
      tersedia?: boolean;
    } = {};

    if ("nama" in req.body) {
      const nama = req.body.nama;
      if (typeof nama !== "string" || nama.trim() === "") {
        res.status(400).json({ message: "Nama harus berupa teks dan tidak boleh kosong" });
        return;
      }
      data.nama = nama.trim();
    }

    if ("harga" in req.body) {
      const harga = req.body.harga;
      if (
        typeof harga !== "number" ||
        !Number.isInteger(harga) ||
        harga < 0
      ) {
        res.status(400).json({ message: "Harga harus berupa bilangan bulat minimal 0" });
        return;
      }
      data.harga = harga;
    }

    if ("kategori" in req.body) {
      const kategori = req.body.kategori;
      if (typeof kategori !== "string" || kategori.trim() === "") {
        res.status(400).json({ message: "Kategori tidak boleh kosong" });
        return;
      }
      data.kategori = kategori.trim();
    }

    if ("tersedia" in req.body) {
      const tersedia = req.body.tersedia;
      if (typeof tersedia !== "boolean") {
        res.status(400).json({ message: "Tersedia harus berupa boolean" });
        return;
      }
      data.tersedia = tersedia;
    }

    const produk = await ProdukService.updateProduk(id, data);
    res.status(200).json(produk);
  } catch (error) {
    next(error);
  }
};

// DELETE /produk/:id
export const deleteProduk = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID produk tidak valid" });
      return;
    }

    const existing = await ProdukService.getProdukById(id);
    if (!existing) {
      res.status(404).json({ message: "Produk tidak ditemukan" });
      return;
    }

    await ProdukService.deleteProduk(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
