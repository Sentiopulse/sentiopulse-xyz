/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `signalTime` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `subcategory` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "category",
DROP COLUMN "signalTime",
DROP COLUMN "subcategory",
ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "subcategories" TEXT[];
