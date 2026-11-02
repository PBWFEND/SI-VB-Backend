-- CreateTable
CREATE TABLE "anggota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "npm" TEXT NOT NULL,
    "divisi" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "anggota_npm_key" ON "anggota"("npm");
