// scheduler/cronJob.js
require('dotenv').config()
const cron = require('node-cron');
const fetchNews = require('../services/newsFetcher');
const analyzeSentiment = require('../services/sentimentAnalyzer');
const fs = require('fs');
const path = require('path');

const processedNewsPath = path.join(__dirname, 'processedNews.json');

// 🧠 Зареждаме вече обработени заглавия
let processedNews = new Set();

if (fs.existsSync(processedNewsPath)) {
  const raw = fs.readFileSync(processedNewsPath);
  try {
    processedNews = new Set(JSON.parse(raw));
  } catch (e) {
    console.error('❌ Invalid JSON in processedNews.json');
  }
}

// 🕑 Cron – на всеки 2 часа
cron.schedule('* * * * *', async () => {
  console.log(`[CRON] Започвам нов цикъл на ${new Date().toISOString()}`);

  try {
    const newsItems = await fetchNews();
    const newItems = newsItems.filter(item => !processedNews.has(item.title));

    console.log(`[CRON] Намерени нови заглавия: ${newItems.length}`);

    for (const item of newItems) {
      const sentiment = await analyzeSentiment(item.title + "\n\n" + item.content)
      console.log(`[NEWS] ${item.title} → ${sentiment}`);

      // маркираме като обработено
      processedNews.add(item.title);
    }

    // записваме новите заглавия обратно
    fs.writeFileSync(processedNewsPath, JSON.stringify(Array.from(processedNews), null, 2));
  } catch (err) {
    console.error('[CRON ERROR]', err);
  }
});
