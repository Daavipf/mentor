/*
  Warnings:

  - You are about to drop the column `image` on the `Questions` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "QuestionImages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "QuestionImages_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT
);
INSERT INTO "new_Questions" ("discipline", "id", "index", "language", "text", "title", "year") SELECT "discipline", "id", "index", "language", "text", "title", "year" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
