const app = require("./app");
const { startCronJob } = require("./cron/newsAnalyzer");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 SentiFi AI Server Started`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 API Server: http://localhost:${PORT}`);
  console.log(`\n📊 Available Endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`\n   📄 Articles:`);
  console.log(`   GET  /api/articles`);
  console.log(`   GET  /api/articles/latest`);
  console.log(`   GET  /api/articles/:id`);
  console.log(`\n   📊 Sentiment Analysis:`);
  console.log(`   GET  /api/sentiment/stats`);
  console.log(`   GET  /api/sentiment/trend`);
  console.log(`   GET  /api/sentiment/assets`);
  console.log(`   GET  /api/sentiment/categories`);
  console.log(`   GET  /api/sentiment/keywords`);
  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  // Start cron job for news analysis
  startCronJob();
});
