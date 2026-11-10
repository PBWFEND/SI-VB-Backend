-- CreateTable
CREATE TABLE "Buku" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "judul" TEXT NOT NULL,
    "penulis" TEXT NOT NULL,
    "tahun" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pengguna" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Pinjaman" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bukuId" INTEGER NOT NULL,
    "penggunaId" INTEGER NOT NULL,
    "tanggalPinjam" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalKembali" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'aktif',
    CONSTRAINT "Pinjaman_bukuId_fkey" FOREIGN KEY ("bukuId") REFERENCES "Buku" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Pinjaman_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");
