require('dotenv').config();
const cron = require('node-cron');
const fetchNews = require('../services/newsFetcher');
const analyzeSentiment = require('../services/sentimentAnalyzer');
const articleService = require('../services/articleService');

/**
 * Process news articles: fetch, analyze sentiment, and save to database
 */
async function processNews() {
  console.log(`\n[CRON] Starting news analysis cycle at ${new Date().toISOString()}`);

  try {
    // Fetch latest news
    const newsItems = await fetchNews();
    console.log(`[CRON] Fetched ${newsItems.length} articles`);

    let newArticles = 0;
    let skippedArticles = 0;
    let errors = 0;

    for (const item of newsItems) {
      try {
        // Check if article already exists
        const existing = await articleService.findByTitle(item.title);

        if (existing) {
          skippedArticles++;
          continue;
        }

        // Analyze sentiment and extract comprehensive AI analysis
        const analysis = await analyzeSentiment(item.title + '\n\n' + item.content);

        // Save to database with all AI analysis fields
        await articleService.createArticle({
          ...item,
          sentiment: analysis.sentiment,
          asset: analysis.asset,
          category: analysis.category,
          chain: analysis.chain,
          bullishValue: analysis.bullishValue,
          keywords: analysis.keywords,
        });

        console.log(`[NEWS] ${analysis.sentiment.padEnd(8)} [${analysis.bullishValue}/100] ${analysis.asset} → ${item.title.substring(0, 60)}...`);
        newArticles++;

      } catch (err) {
        console.error(`[ERROR] Failed to process article "${item.title}":`, err.message);
        errors++;
      }
    }

    console.log(`[CRON] Cycle complete: ${newArticles} new, ${skippedArticles} skipped, ${errors} errors\n`);

  } catch (err) {
    console.error('[CRON ERROR]', err);
  }
}

/**
 * Start the cron job
 * Runs every hour: 0 (star) (star) (star) (star)
 * For testing every minute: (star) (star) (star) (star) (star)
 */
function startCronJob() {
  // Run immediately on startup
  console.log('[CRON] Running initial news analysis...');
  processNews();

  // Schedule to run every hour
  cron.schedule('0 * * * *', processNews);

  console.log('[CRON] Scheduler started - runs every hour');
}

module.exports = { startCronJob, processNews };
