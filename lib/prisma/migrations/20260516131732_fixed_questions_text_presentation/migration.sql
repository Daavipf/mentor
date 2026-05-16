/*
  Warnings:

  - You are about to drop the column `text` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `alternativesIntroduction` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "context" TEXT,
    "alternativesIntroduction" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT
);
INSERT INTO "new_Questions" ("discipline", "id", "index", "language", "title", "year") SELECT "discipline", "id", "index", "language", "title", "year" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
