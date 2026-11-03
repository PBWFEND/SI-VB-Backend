-- CreateTable
CREATE TABLE "Laboratorium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "lokasi" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'tersedia',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
