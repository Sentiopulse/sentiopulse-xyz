/*
  Warnings:

  - Changed the type of `source` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."Source" AS ENUM ('REDDIT', 'TWITTER', 'YOUTUBE', 'TELEGRAM', 'FARCASTER');

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "source",
ADD COLUMN     "source" "public"."Source" NOT NULL;
