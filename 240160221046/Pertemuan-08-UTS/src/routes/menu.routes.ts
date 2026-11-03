/**
 * Routes Layer — Domain E-Warung (Resource: Menu)
 *
 * Mendefinisikan endpoint RESTful untuk resource Menu dan mengarahkan ke controller.
 */

import { Router } from "express";
import * as menuController from "../controller/menu.controller.ts";

const router = Router();

// Endpoint CRUD Resource Menu
router.get("/", menuController.getDaftarMenu);
router.get("/:id", menuController.getMenuById);
router.post("/", menuController.createMenu);
router.patch("/:id", menuController.updateMenu);
router.delete("/:id", menuController.deleteMenu);

export { router as menuRoutes };
