/**
 * Konfigurasi aplikasi melalui environment variable.
 * Memisahkan konfigurasi dari kode utama agar mudah diubah
 * tanpa menyentuh server.js.
 */

export const APP_NAME = process.env.APP_NAME ?? "API E-Warung Kampus";
export const PORT = Number(process.env.PORT ?? 3003);
export const NODE_ENV = process.env.NODE_ENV ?? "development";
export const COURSE_CODE = process.env.COURSE_CODE ?? "CPMK115";

export const getConfig = () => ({
  appName: APP_NAME,
  port: PORT,
  environment: NODE_ENV,
  courseCode: COURSE_CODE,
});