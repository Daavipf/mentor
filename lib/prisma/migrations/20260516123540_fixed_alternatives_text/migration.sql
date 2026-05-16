-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alternatives" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "questionId" TEXT NOT NULL,
    "text" TEXT,
    "isCorrect" BOOLEAN NOT NULL,
    "imagePath" TEXT,
    CONSTRAINT "Alternatives_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Alternatives" ("id", "imagePath", "isCorrect", "questionId", "text") SELECT "id", "imagePath", "isCorrect", "questionId", "text" FROM "Alternatives";
DROP TABLE "Alternatives";
ALTER TABLE "new_Alternatives" RENAME TO "Alternatives";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
