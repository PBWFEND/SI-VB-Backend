
// Konfigurasi aplikasi
export const APP_NAME =
  process.env.APP_NAME ?? "API Absensi Perkuliahan Mahasiswa";

export const PORT = Number(process.env.PORT ?? 3003);

export const NODE_ENV =
  process.env.NODE_ENV ?? "development";

// Kode mata kuliah, default CPMK115 sesuai instruksi dosen
export const COURSE_CODE =
  process.env.COURSE_CODE ?? "CPMK115";

// Menggabungkan seluruh konfigurasi aplikasi
export const getConfig = () => ({
  appName: APP_NAME,
  port: PORT,
  environment: NODE_ENV,
  courseCode: COURSE_CODE,
});
