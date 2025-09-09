-- AlterTable
ALTER TABLE "public"."Post" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "subcategories" SET DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "Post_categories_idx" ON "public"."Post" USING GIN ("categories");

-- CreateIndex
CREATE INDEX "Post_subcategories_idx" ON "public"."Post" USING GIN ("subcategories");
