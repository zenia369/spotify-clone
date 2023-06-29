/*
  Warnings:

  - Added the required column `photo` to the `PlayList` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayList" ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "photo" TEXT NOT NULL;
