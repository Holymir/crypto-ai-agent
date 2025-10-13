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

        // Analyze sentiment
        const sentiment = await analyzeSentiment(item.title + '\n\n' + item.content);

        // Save to database
        await articleService.createArticle({
          ...item,
          sentiment,
        });

        console.log(`[NEWS] ${sentiment.padEnd(8)} → ${item.title.substring(0, 80)}...`);
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
 * Runs every 2 hours: 0 (star-slash)2 (star) (star) (star)
 * For testing every minute: (star) (star) (star) (star) (star)
 */
function startCronJob() {
  // Run immediately on startup
  console.log('[CRON] Running initial news analysis...');
  processNews();

  // Schedule to run every 2 hours
  cron.schedule('0 */2 * * *', processNews);

  console.log('[CRON] Scheduler started - runs every 2 hours');
}

module.exports = { startCronJob, processNews };
