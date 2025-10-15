const app = require('./app');
const { startCronJob } = require('./cron/newsAnalyzer');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 CryptoSentinel AI Server Started`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 API Server: http://localhost:${PORT}`);
  console.log(`\n📊 Available Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/articles`);
  console.log(`   GET  /api/articles/latest`);
  console.log(`   GET  /api/articles/:id`);
  console.log(`   GET  /api/stats/sentiment`);
  console.log(`   GET  /api/stats/trend`);
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Start cron job for news analysis
  startCronJob();
});
