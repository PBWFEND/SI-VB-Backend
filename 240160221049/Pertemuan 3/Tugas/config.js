/**
 * ============================================================
 * Tugas 2 — Konfigurasi Aplikasi
 * ============================================================
 * Semua konfigurasi dibaca dari environment variable.
 * Nilai default diberikan agar aplikasi tetap dapat dijalankan
 * tanpa konfigurasi tambahan.
 */

export const APP_NAME = process.env.APP_NAME ?? "API Informasi Kelas";
export const PORT = Number(process.env.PORT ?? 3003);
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const COURSE_CODE = process.env.COURSE_CODE ?? "CPMK115";

// Validasi port agar tidak NaN
if (Number.isNaN(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error(`PORT tidak valid: ${process.env.PORT}`);
}

export const getConfig = () => ({
  appName: APP_NAME,
  port: PORT,
  environment: NODE_ENV,
  courseCode: COURSE_CODE,
});