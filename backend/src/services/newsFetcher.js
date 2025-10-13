const Parser = require('rss-parser');
const parser = new Parser();

const FEED_SOURCES = [
  { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
  { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss' }
];

module.exports = async function fetchNews() {
  const articles = [];

  for (const feedSource of FEED_SOURCES) {
    try {
      const feed = await parser.parseURL(feedSource.url);

      feed.items.slice(0, 5).forEach(item => {
        articles.push({
          title: item.title,
          content: item.contentSnippet || item.content || '',
          source: feedSource.name,
          url: item.link,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        });
      });
    } catch (error) {
      console.error(`[ERROR] Failed to fetch from ${feedSource.name}:`, error.message);
    }
  }

  return articles;
};
