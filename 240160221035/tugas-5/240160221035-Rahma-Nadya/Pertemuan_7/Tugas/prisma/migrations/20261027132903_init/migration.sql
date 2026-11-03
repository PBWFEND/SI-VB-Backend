-- CreateTable
CREATE TABLE "anggota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "nim" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "absensi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "anggota_id" INTEGER NOT NULL,
    "kegiatan_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "absensi_anggota_id_fkey" FOREIGN KEY ("anggota_id") REFERENCES "anggota" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "anggota_nim_key" ON "anggota"("nim");
