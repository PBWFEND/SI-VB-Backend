/*
  Warnings:

  - You are about to drop the `Pengguna` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pengguna";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "nim" TEXT NOT NULL PRIMARY KEY,
    "nama" TEXT NOT NULL,
    "prodi" TEXT NOT NULL,
    "semester" INTEGER NOT NULL
);
