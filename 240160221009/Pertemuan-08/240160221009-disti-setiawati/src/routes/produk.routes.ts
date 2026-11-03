import { Router } from "express";
import * as ProdukController from "../controller/produk.controller.ts";

const router = Router();

router.get("/", ProdukController.getAllProduk);
router.get("/:id", ProdukController.getProdukById);
router.post("/", ProdukController.createProduk);
router.patch("/:id", ProdukController.updateProduk);
router.delete("/:id", ProdukController.deleteProduk);

export default router;
