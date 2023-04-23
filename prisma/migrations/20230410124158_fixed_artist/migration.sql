/*
  Warnings:

  - Made the column `photo` on table `Artist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "photo" SET NOT NULL;
