-- AlterTable
ALTER TABLE "articles" DROP COLUMN "sentiment";

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "bullishValue" SET DEFAULT 50;

-- DropEnum
DROP TYPE "Sentiment";
