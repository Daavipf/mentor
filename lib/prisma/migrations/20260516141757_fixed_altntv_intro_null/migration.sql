-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Questions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "context" TEXT,
    "alternativesIntroduction" TEXT,
    "discipline" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "language" TEXT,
    "index" INTEGER NOT NULL,
    "title" TEXT
);
INSERT INTO "new_Questions" ("alternativesIntroduction", "context", "discipline", "id", "index", "language", "title", "year") SELECT "alternativesIntroduction", "context", "discipline", "id", "index", "language", "title", "year" FROM "Questions";
DROP TABLE "Questions";
ALTER TABLE "new_Questions" RENAME TO "Questions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
