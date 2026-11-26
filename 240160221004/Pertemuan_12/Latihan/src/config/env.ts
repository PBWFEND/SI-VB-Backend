/**
 * Pertemuan 12 — Konfigurasi environment terpusat.
 * Tujuan: membaca .env sekali, memvalidasi, dan mengekspor objek bertipe agar
 *         seluruh modul memakai sumber konfigurasi yang sama.
 * Jika nilai tidak valid, proses dihentikan sejak awal (fail fast).
 */

import "dotenv/config";

function angkaValid(nama: string, nilai: string | undefined): number {
  const angka = Number(nilai);
  if (!Number.isFinite(angka) || angka <= 0) {
    throw new Error(`${nama} harus berupa angka yang valid. Proses dihentikan.`);
  }
  return angka;
}

function teksValid(nama: string, nilai: string | undefined): string {
  if (!nilai || nilai.trim() === "") {
    throw new Error(`${nama} wajib diisi. Proses dihentikan.`);
  }
  return nilai;
}

const levelLog = ["debug", "info", "warn", "error"] as const;
type LevelLog = (typeof levelLog)[number];

function levelValid(nilai: string | undefined): LevelLog {
  if (!nilai || !levelLog.includes(nilai as LevelLog)) {
    throw new Error(
      `LOG_LEVEL harus salah satu dari ${levelLog.join(", ")}. Proses dihentikan.`,
    );
  }
  return nilai as LevelLog;
}

export const konfigurasi = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: angkaValid("PORT", process.env.PORT),
  databaseUrl: teksValid("DATABASE_URL", process.env.DATABASE_URL),
  logLevel: levelValid(process.env.LOG_LEVEL),
  corsOrigin: teksValid("CORS_ORIGIN", process.env.CORS_ORIGIN)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
};