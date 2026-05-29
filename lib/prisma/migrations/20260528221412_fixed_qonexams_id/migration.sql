/*
  Warnings:

  - The primary key for the `QuestionsOnExams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `QuestionsOnExams` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuestionsOnExams" (
    "questionId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "gotRight" BOOLEAN,
    "selectedAlternativeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("questionId", "examId"),
    CONSTRAINT "QuestionsOnExams_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_selectedAlternativeId_fkey" FOREIGN KEY ("selectedAlternativeId") REFERENCES "Alternatives" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QuestionsOnExams" ("createdAt", "examId", "gotRight", "questionId", "selectedAlternativeId", "updatedAt") SELECT "createdAt", "examId", "gotRight", "questionId", "selectedAlternativeId", "updatedAt" FROM "QuestionsOnExams";
DROP TABLE "QuestionsOnExams";
ALTER TABLE "new_QuestionsOnExams" RENAME TO "QuestionsOnExams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
