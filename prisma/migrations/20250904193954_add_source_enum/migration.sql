/*
  Warnings:

  - Changed the type of `source` on the `Post` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Create enum if it doesn't already exist
DO $$ BEGIN
    CREATE TYPE "public"."Source" AS ENUM ('REDDIT', 'TWITTER', 'YOUTUBE', 'TELEGRAM', 'FARCASTER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Normalize existing text values so the USING cast will succeed.
-- Map common lowercase variants to the enum values. Unknown values are set to a safe default ('REDDIT')
-- so the conversion doesn't fail; adjust the ELSE branch if you prefer a different fallback.
UPDATE "public"."Post" SET "source" =
  CASE lower("source")
    WHEN 'reddit' THEN 'REDDIT'
    WHEN 'twitter' THEN 'TWITTER'
    WHEN 'youtube' THEN 'YOUTUBE'
    WHEN 'telegram' THEN 'TELEGRAM'
    WHEN 'farcaster' THEN 'FARCASTER'
    ELSE 'REDDIT'
  END
WHERE "source" IS NOT NULL;

-- Alter the column type in-place using a safe cast. This preserves existing values.
ALTER TABLE "public"."Post"
  ALTER COLUMN "source" TYPE "public"."Source"
  USING ("source"::text::"public"."Source");

-- Apply NOT NULL constraint after successful conversion.
ALTER TABLE "public"."Post"
  ALTER COLUMN "source" SET NOT NULL;
