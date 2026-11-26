/**
 * Pertemuan 12 — AppError dan kode error.
 * Tujuan: menyatukan bentuk error aplikasi beserta status HTTP-nya.
 */

export type KodeError =
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "FORBIDDEN"
  | "CONFLICT"
  | "INTERNAL_SERVER_ERROR";

export class AppError extends Error {
  readonly statusCode: number;
  readonly kode: KodeError;

  constructor(pesan: string, statusCode: number, kode: KodeError) {
    super(pesan);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.kode = kode;
  }
}

export const notFoundError = (pesan: string) =>
  new AppError(pesan, 404, "NOT_FOUND");

export const validationError = (pesan: string) =>
  new AppError(pesan, 400, "VALIDATION_ERROR");

/** Kode error baru: FORBIDDEN (403). */
export const forbiddenError = (pesan: string) =>
  new AppError(pesan, 403, "FORBIDDEN");

export const conflictError = (pesan: string) =>
  new AppError(pesan, 409, "CONFLICT");