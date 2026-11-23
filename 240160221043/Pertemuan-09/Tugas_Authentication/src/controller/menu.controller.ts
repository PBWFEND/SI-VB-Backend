import type { Request, Response, NextFunction } from "express";
import * as menuService from "../service/menu.service.ts";

const isNotFoundError = (error: unknown): boolean => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2025"
  );
};

export const getAllMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const menu = await menuService.getAllMenu();
    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

export const getMenuById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID menu tidak valid" });
      return;
    }

    const menu = await menuService.getMenuById(id);

    if (!menu) {
      res.status(404).json({ message: "Menu tidak ditemukan" });
      return;
    }

    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

export const createMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { nama, harga, kategori, tersedia } = req.body;

    if (
      typeof nama !== "string" ||
      nama.trim() === "" ||
      typeof harga !== "number" ||
      !Number.isInteger(harga) ||
      harga <= 0 ||
      typeof kategori !== "string" ||
      kategori.trim() === "" ||
      (tersedia !== undefined && typeof tersedia !== "boolean")
    ) {
      res.status(400).json({ message: "Data menu tidak valid" });
      return;
    }

    const menu = await menuService.createMenu({
      nama: nama.trim(),
      harga,
      kategori: kategori.trim(),
      tersedia,
    });

    res.status(201).json({
      message: "Menu berhasil ditambahkan",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);
    const { nama, harga, kategori, tersedia } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID menu tidak valid" });
      return;
    }

    if (
      !req.body ||
      typeof req.body !== "object" ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0
    ) {
      res.status(400).json({ message: "Data perubahan tidak boleh kosong" });
      return;
    }

    if (
      (nama !== undefined &&
        (typeof nama !== "string" || nama.trim() === "")) ||
      (harga !== undefined &&
        (typeof harga !== "number" ||
          !Number.isInteger(harga) ||
          harga <= 0)) ||
      (kategori !== undefined &&
        (typeof kategori !== "string" || kategori.trim() === "")) ||
      (tersedia !== undefined && typeof tersedia !== "boolean")
    ) {
      res.status(400).json({ message: "Data perubahan tidak valid" });
      return;
    }

    const data: {
      nama?: string;
      harga?: number;
      kategori?: string;
      tersedia?: boolean;
    } = {};

    if (nama !== undefined) data.nama = nama.trim();
    if (harga !== undefined) data.harga = harga;
    if (kategori !== undefined) data.kategori = kategori.trim();
    if (tersedia !== undefined) data.tersedia = tersedia;

    const menu = await menuService.updateMenu(id, data);

    res.status(200).json({
      message: "Menu berhasil diperbarui",
      data: menu,
    });
    } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).json({ message: "Menu tidak ditemukan" });
      return;
    }

    next(error);
  }
};

export const deleteMenu = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({ message: "ID menu tidak valid" });
      return;
    }

    await menuService.deleteMenu(id);
    res.status(204).send();
    } catch (error) {
    if (isNotFoundError(error)) {
      res.status(404).json({ message: "Menu tidak ditemukan" });
      return;
    }

    next(error);
  }
};