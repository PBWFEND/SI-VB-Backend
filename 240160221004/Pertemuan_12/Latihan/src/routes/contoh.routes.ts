/**
 * Route bantu untuk membuktikan Latihan Individu 17:
 * - GET /contoh/forbidden -> AppError FORBIDDEN (403)   [Latihan No.2]
 * - POST /contoh/login    -> memicu log password [REDACTED] [Latihan No.4]
 */

import { Router } from "express";
import { forbiddenError } from "../errors/app-error.ts";
import { logger } from "../logger/logger.ts";

const contohRoutes = Router();

contohRoutes.get("/forbidden", () => {
  throw forbiddenError("Anda tidak memiliki akses ke resource ini.");
});

contohRoutes.post("/login", (request, response) => {
  // Log memuat field password; logger otomatis menggantinya menjadi [REDACTED].
  logger.info("payload login diterima", { body: request.body });
  response.status(200).json({ success: true, data: { pesan: "login diterima" } });
});

export { contohRoutes };