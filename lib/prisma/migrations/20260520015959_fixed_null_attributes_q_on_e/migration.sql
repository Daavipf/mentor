/*
  Warnings:

  - You are about to drop the column `discipline` on the `Exams` table. All the data in the column will be lost.
  - You are about to drop the column `discipline` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `area` to the `Exams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `area` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Exams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Exams" ("date", "id", "userId") SELECT "date", "id", "userId" FROM "Exams";
DROP TABLE "Exams";
ALTER TABLE "new_Exams" RENAME TO "Exams";
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "context" TEXT,
    "alternativesIntroduction" TEXT,
    "area" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT
);
INSERT INTO "new_Questions" ("alternativesIntroduction", "context", "id", "index", "language", "title", "year") SELECT "alternativesIntroduction", "context", "id", "index", "language", "title", "year" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE TABLE "new_QuestionsOnExams" (
    "questionId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "gotRight" BOOLEAN,
    "alternativeId" TEXT,

    PRIMARY KEY ("questionId", "examId"),
    CONSTRAINT "QuestionsOnExams_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternatives" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QuestionsOnExams" ("alternativeId", "examId", "gotRight", "questionId") SELECT "alternativeId", "examId", "gotRight", "questionId" FROM "QuestionsOnExams";
DROP TABLE "QuestionsOnExams";
ALTER TABLE "new_QuestionsOnExams" RENAME TO "QuestionsOnExams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
