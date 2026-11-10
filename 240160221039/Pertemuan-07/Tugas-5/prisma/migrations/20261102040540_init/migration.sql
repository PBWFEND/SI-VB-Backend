-- CreateTable
CREATE TABLE "Pengguna" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nim" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'mahasiswa'
);

-- CreateIndex
CREATE UNIQUE INDEX "Pengguna_nim_key" ON "Pengguna"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");
