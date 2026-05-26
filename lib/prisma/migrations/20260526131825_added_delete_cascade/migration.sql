-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternatives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "text" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "imagePath" TEXT,
    CONSTRAINT "Alternatives_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Alternatives" ("id", "imagePath", "isCorrect", "questionId", "text") SELECT "id", "imagePath", "isCorrect", "questionId", "text" FROM "Alternatives";
DROP TABLE "Alternatives";
ALTER TABLE "new_Alternatives" RENAME TO "Alternatives";
CREATE TABLE "new_QuestionImages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    CONSTRAINT "QuestionImages_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuestionImages" ("id", "path", "questionId") SELECT "id", "path", "questionId" FROM "QuestionImages";
DROP TABLE "QuestionImages";
ALTER TABLE "new_QuestionImages" RENAME TO "QuestionImages";
CREATE TABLE "new_QuestionTopics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    CONSTRAINT "QuestionTopics_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QuestionTopics" ("id", "questionId", "topic") SELECT "id", "questionId", "topic" FROM "QuestionTopics";
DROP TABLE "QuestionTopics";
ALTER TABLE "new_QuestionTopics" RENAME TO "QuestionTopics";
CREATE TABLE "new_QuestionsOnExams" (
    "questionId" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "gotRight" BOOLEAN,
    "selectedAlternativeId" TEXT,

    PRIMARY KEY ("questionId", "examId"),
    CONSTRAINT "QuestionsOnExams_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exams" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuestionsOnExams_selectedAlternativeId_fkey" FOREIGN KEY ("selectedAlternativeId") REFERENCES "Alternatives" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_QuestionsOnExams" ("examId", "gotRight", "questionId", "selectedAlternativeId") SELECT "examId", "gotRight", "questionId", "selectedAlternativeId" FROM "QuestionsOnExams";
DROP TABLE "QuestionsOnExams";
ALTER TABLE "new_QuestionsOnExams" RENAME TO "QuestionsOnExams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
