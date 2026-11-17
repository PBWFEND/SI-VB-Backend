/**
 * UTS Mini Project (Laboratorium) - Lapisan route.
 * Hanya mengelompokkan endpoint resource peralatan. Tidak memvalidasi input dan tidak menyentuh Prisma.
 * Dipasang di app.ts dengan: app.use("/peralatan", peralatanRoutes)
 */

import { Router } from "express";
import {
  handlerDaftarPeralatan,
  handlerDetailPeralatan,
  handlerCreatePeralatan,
  handlerPatchPeralatan,
  handlerDeletePeralatan,
} from "../controller/peralatan.controller.ts";

const peralatanRoutes = Router();

peralatanRoutes.get("/", handlerDaftarPeralatan);
peralatanRoutes.get("/:id", handlerDetailPeralatan);
peralatanRoutes.post("/", handlerCreatePeralatan);
peralatanRoutes.patch("/:id", handlerPatchPeralatan);
peralatanRoutes.delete("/:id", handlerDeletePeralatan);

export { peralatanRoutes };