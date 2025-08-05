const Parser = require('rss-parser');
const parser = new Parser();

module.exports = async function fetchNews() {
  const feedUrls = [
    'https://www.coindesk.com/arc/outboundfeeds/rss/',
    'https://cointelegraph.com/rss'
  ];

  const articles = [];

  for (const url of feedUrls) {
    const feed = await parser.parseURL(url);
    feed.items.slice(0, 5).forEach(item => {
      articles.push({
        title: item.title,
        content: item.contentSnippet
      });
    });
  }

  return articles;
};
