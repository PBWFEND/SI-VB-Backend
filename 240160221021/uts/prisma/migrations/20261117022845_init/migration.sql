-- CreateTable
CREATE TABLE "peralatan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "kondisi" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL DEFAULT 1
);

-- CreateIndex
CREATE UNIQUE INDEX "peralatan_kode_key" ON "peralatan"("kode");
