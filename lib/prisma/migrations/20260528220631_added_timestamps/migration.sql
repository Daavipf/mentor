/*
  Warnings:

  - The primary key for the `QuestionsOnExams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `QuestionsOnExams` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Exams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Exams" ("date", "id", "title", "userId") SELECT "date", "id", "title", "userId" FROM "Exams";
DROP TABLE "Exams";
ALTER TABLE "new_Exams" RENAME TO "Exams";
CREATE TABLE "new_History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" DATETIME,
    CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "History_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_History" ("examId", "finishedAt", "id", "score", "userId") SELECT "examId", "finishedAt", "id", "score", "userId" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "context" TEXT,
    "alternativesIntroduction" TEXT,
    "area" TEXT NOT NULL,
    "discipline" TEXT,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Questions" ("alternativesIntroduction", "area", "context", "discipline", "id", "index", "language", "title", "year") SELECT "alternativesIntroduction", "area", "context", "discipline", "id", "index", "language", "title", "year" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
CREATE TABLE "new_QuestionsOnExams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "gotRight" BOOLEAN,
    "selectedAlternativeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuestionsOnExams_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_selectedAlternativeId_fkey" FOREIGN KEY ("selectedAlternativeId") REFERENCES "Alternatives" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QuestionsOnExams" ("examId", "gotRight", "questionId", "selectedAlternativeId") SELECT "examId", "gotRight", "questionId", "selectedAlternativeId" FROM "QuestionsOnExams";
DROP TABLE "QuestionsOnExams";
ALTER TABLE "new_QuestionsOnExams" RENAME TO "QuestionsOnExams";
CREATE TABLE "new_Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Users" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
