
import express from "express";

import {
    getBuku,
    getBukuById,
    postBuku,
    patchBuku,
    deleteBuku,
} from "../controller/buku.controller.ts";

const bukuRoutes = express.Router();

bukuRoutes.get("/", getBuku);
bukuRoutes.get("/:id", getBukuById);
bukuRoutes.post("/", postBuku);
bukuRoutes.patch("/:id", patchBuku);
bukuRoutes.delete("/:id", deleteBuku);

export { bukuRoutes };
