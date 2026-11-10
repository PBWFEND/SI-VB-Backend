/*
  Warnings:

  - The primary key for the `Pengguna` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Pengguna` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pengguna" (
    "nim" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'mahasiswa'
);
INSERT INTO "new_Pengguna" ("email", "nama", "nim", "role") SELECT "email", "nama", "nim", "role" FROM "Pengguna";
DROP TABLE "Pengguna";
ALTER TABLE "new_Pengguna" RENAME TO "Pengguna";
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
