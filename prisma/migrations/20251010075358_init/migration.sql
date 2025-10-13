-- CreateTable
CREATE TABLE "articles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "sentiment" TEXT NOT NULL DEFAULT 'NEUTRAL',
    "url" TEXT,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "analyzedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "sentiment_stats" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "bullishCount" INTEGER NOT NULL DEFAULT 0,
    "bearishCount" INTEGER NOT NULL DEFAULT 0,
    "neutralCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "articles_title_key" ON "articles"("title");

-- CreateIndex
CREATE INDEX "articles_sentiment_idx" ON "articles"("sentiment");

-- CreateIndex
CREATE INDEX "articles_publishedAt_idx" ON "articles"("publishedAt");

-- CreateIndex
CREATE INDEX "articles_source_idx" ON "articles"("source");

-- CreateIndex
CREATE UNIQUE INDEX "sentiment_stats_date_key" ON "sentiment_stats"("date");

-- CreateIndex
CREATE INDEX "sentiment_stats_date_idx" ON "sentiment_stats"("date");
