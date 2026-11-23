-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pengguna" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" TEXT NOT NULL DEFAULT 'pengguna',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Pengguna" ("createdAt", "email", "id", "nama", "passwordHash", "updatedAt") SELECT "createdAt", "email", "id", "nama", "passwordHash", "updatedAt" FROM "Pengguna";
DROP TABLE "Pengguna";
ALTER TABLE "new_Pengguna" RENAME TO "Pengguna";
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
