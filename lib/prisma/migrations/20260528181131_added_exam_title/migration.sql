/*
  Warnings:

  - Added the required column `title` to the `Exams` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "Exams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exams" ("date", "id", "userId") SELECT "date", "id", "userId" FROM "Exams";
DROP TABLE "Exams";
ALTER TABLE "new_Exams" RENAME TO "Exams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
