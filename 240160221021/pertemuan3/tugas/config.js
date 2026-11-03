/**
 * Tugas 2 - Konfigurasi aplikasi Node.js
 * Semua pengaturan dibaca dari environment variable.
 * Jika tidak diisi, dipakai nilai bawaan.
 */

export const APP_NAME = process.env.APP_NAME ?? "Server Informasi Kelas";
export const PORT = Number(process.env.PORT ?? 3003);
export const NODE_ENV = process.env.NODE_ENV ?? "development";

export const getConfig = () => ({
  appName: APP_NAME,
  port: PORT,
  environment: NODE_ENV,
});