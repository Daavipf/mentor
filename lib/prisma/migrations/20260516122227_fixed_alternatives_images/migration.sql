/*
  Warnings:

  - You are about to drop the `AlternativeImages` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Alternatives" ADD COLUMN "imagePath" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AlternativeImages";
PRAGMA foreign_keys=on;
