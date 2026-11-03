
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./prisma/generated/client.ts";

// Membuat koneksi ke database SQLite
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});

// Membuat satu instance Prisma Client
const prisma = new PrismaClient({ adapter });

// Membagikan instance Prisma agar bisa digunakan file lain
export { prisma };
