/**
 * Pertemuan 12 — Middleware 404 -> AppError agar melewati error handler.
 */

import type { RequestHandler } from "express";
import { notFoundError } from "../errors/app-error.ts";

export const tanganiTidakDitemukan: RequestHandler = (request, _response, next) => {
  next(notFoundError(`Endpoint ${request.method} ${request.originalUrl} tidak ditemukan`));
};