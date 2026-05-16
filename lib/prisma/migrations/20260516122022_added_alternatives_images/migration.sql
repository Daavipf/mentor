-- CreateTable
CREATE TABLE "AlternativeImages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "alternativeId" TEXT NOT NULL,
    CONSTRAINT "AlternativeImages_alternativeId_fkey" FOREIGN KEY ("alternativeId") REFERENCES "Alternatives" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AlternativeImages_alternativeId_key" ON "AlternativeImages"("alternativeId");
