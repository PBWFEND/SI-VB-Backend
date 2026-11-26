/**
 * Pertemuan 12 — Entry point.
 * Tujuan: menjalankan server, menangani uncaughtException (exit) dan
 *         unhandledRejection (catat, lanjut).
 */

import { app } from "./app.ts";
import { konfigurasi } from "./src/config/env.ts";
import { logger } from "./src/logger/logger.ts";

/**
 * uncaughtException: state proses tidak bisa dijamin aman.
 * Sebaiknya dicatat lalu proses dihentikan (exit) agar proses manager
 * (PM2/Docker) me-restart dengan kondisi bersih.
 */
process.on("uncaughtException", (error) => {
  logger.error("uncaughtException — proses dihentikan", {
    pesan: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

/**
 * unhandledRejection: belum tentu fatal, cukup dicatat lalu proses lanjut.
 * (Pada Node modern default-nya crash, namun banyak tim memilih mencatat saja.)
 */
process.on("unhandledRejection", (reason) => {
  logger.warn("unhandledRejection — dicatat, proses lanjut", {
    alasan: reason instanceof Error ? reason.message : String(reason),
  });
});

app.listen(konfigurasi.port, () => {
  logger.info("server berjalan", {
    port: konfigurasi.port,
    env: konfigurasi.nodeEnv,
    logLevel: konfigurasi.logLevel,
  });
});