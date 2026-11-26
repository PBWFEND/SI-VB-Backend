/**
 * Pertemuan 12 — Logger terstruktur.
 * Tujuan: menulis log JSON dengan level minimum dari konfigurasi, serta
 *         menyensor field sensitif (password) menjadi "[REDACTED]".
 * Contoh pengujian: log payload login memuat password: "[REDACTED]".
 */

import { konfigurasi } from "../config/env.ts";

const peringkat: Record<string, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const ambang = peringkat[konfigurasi.logLevel] ?? 20;

/**
 * Menyensor field sensitif secara rekursif pada objek konteks log.
 * Field "password" diganti "[REDACTED]" agar tidak pernah bocor ke log.
 */
export function redactSensitiveData<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => redactSensitiveData(item)) as unknown as T;
  }
  if (data && typeof data === "object") {
    const hasil: Record<string, unknown> = {};
    for (const [kunci, nilai] of Object.entries(data as Record<string, unknown>)) {
      if (kunci.toLowerCase() === "password") {
        hasil[kunci] = "[REDACTED]";
      } else {
        hasil[kunci] = redactSensitiveData(nilai);
      }
    }
    return hasil as T;
  }
  return data;
}

function tulis(level: keyof typeof peringkat, pesan: string, konteks?: unknown) {
  if (peringkat[level] < ambang) return;
  const baris = {
    waktu: new Date().toISOString(),
    level,
    pesan,
    ...(konteks !== undefined ? { konteks: redactSensitiveData(konteks) } : {}),
  };
  console.log(JSON.stringify(baris));
}

export const logger = {
  debug: (pesan: string, konteks?: unknown) => tulis("debug", pesan, konteks),
  info: (pesan: string, konteks?: unknown) => tulis("info", pesan, konteks),
  warn: (pesan: string, konteks?: unknown) => tulis("warn", pesan, konteks),
  error: (pesan: string, konteks?: unknown) => tulis("error", pesan, konteks),
};