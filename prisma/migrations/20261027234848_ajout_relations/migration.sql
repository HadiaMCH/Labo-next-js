-- CreateTable
CREATE TABLE "Cours" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "formationId" INTEGER NOT NULL,
    CONSTRAINT "Cours_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "Formation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Etudiant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "etudiantId" INTEGER NOT NULL,
    CONSTRAINT "Profil_etudiantId_fkey" FOREIGN KEY ("etudiantId") REFERENCES "Etudiant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_EtudiantToFormation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EtudiantToFormation_A_fkey" FOREIGN KEY ("A") REFERENCES "Etudiant" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EtudiantToFormation_B_fkey" FOREIGN KEY ("B") REFERENCES "Formation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Formation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Formation" ("description", "id", "nom") SELECT "description", "id", "nom" FROM "Formation";
DROP TABLE "Formation";
ALTER TABLE "new_Formation" RENAME TO "Formation";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Profil_etudiantId_key" ON "Profil"("etudiantId");

-- CreateIndex
CREATE UNIQUE INDEX "_EtudiantToFormation_AB_unique" ON "_EtudiantToFormation"("A", "B");

-- CreateIndex
CREATE INDEX "_EtudiantToFormation_B_index" ON "_EtudiantToFormation"("B");
