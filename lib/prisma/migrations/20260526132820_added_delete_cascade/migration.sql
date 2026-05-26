-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExamAreas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "examsId" TEXT,
    "area" TEXT NOT NULL,
    CONSTRAINT "ExamAreas_examsId_fkey" FOREIGN KEY ("examsId") REFERENCES "Exams" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExamAreas" ("area", "examsId", "id") SELECT "area", "examsId", "id" FROM "ExamAreas";
DROP TABLE "ExamAreas";
ALTER TABLE "new_ExamAreas" RENAME TO "ExamAreas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
