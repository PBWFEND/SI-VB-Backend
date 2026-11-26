/**
 * Pertemuan 12 — Prisma Client dengan adapter SQLite.
 */

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./prisma/generated/client.ts";
import { konfigurasi } from "./src/config/env.ts";

const adapter = new PrismaBetterSqlite3({ url: konfigurasi.databaseUrl });
const prisma = new PrismaClient({ adapter });

export { prisma };