/**
 * Pertemuan 12 — Middleware keamanan dasar: helmet + CORS selektif.
 */

import cors from "cors";
import helmet from "helmet";
import { konfigurasi } from "../config/env.ts";

export const securityHeaders = helmet();

export const corsTerbatas = cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    callback(null, konfigurasi.corsOrigin.includes(origin));
  },
});