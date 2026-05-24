/*
  Warnings:

  - You are about to drop the column `area` on the `Exams` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "ExamAreas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examsId" TEXT,
    "area" TEXT NOT NULL,
    CONSTRAINT "ExamAreas_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "Exams" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Exams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exams" ("date", "id", "userId") SELECT "date", "id", "userId" FROM "Exams";
DROP TABLE "Exams";
ALTER TABLE "new_Exams" RENAME TO "Exams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
