/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nim` to the `pengguna` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_nim_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_pengguna" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_pengguna" ("createdAt", "email", "id", "nama", "passwordHash") SELECT "createdAt", "email", "id", "nama", "passwordHash" FROM "pengguna";
DROP TABLE "pengguna";
ALTER TABLE "new_pengguna" RENAME TO "pengguna";
CREATE UNIQUE INDEX "pengguna_nim_key" ON "pengguna"("nim");
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
