-- AlterTable
ALTER TABLE "articles" ADD COLUMN "asset" TEXT;
ALTER TABLE "articles" ADD COLUMN "bullishValue" INTEGER;
ALTER TABLE "articles" ADD COLUMN "category" TEXT;
ALTER TABLE "articles" ADD COLUMN "chain" TEXT;
ALTER TABLE "articles" ADD COLUMN "keywords" TEXT;

-- CreateIndex
CREATE INDEX "articles_asset_idx" ON "articles"("asset");

-- CreateIndex
CREATE INDEX "articles_category_idx" ON "articles"("category");

-- CreateIndex
CREATE INDEX "articles_chain_idx" ON "articles"("chain");
