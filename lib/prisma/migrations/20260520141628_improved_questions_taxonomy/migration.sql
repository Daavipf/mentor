-- AlterTable
ALTER TABLE "Questions" ADD COLUMN "discipline" TEXT;

-- CreateTable
CREATE TABLE "QuestionTopics" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    CONSTRAINT "QuestionTopics_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
