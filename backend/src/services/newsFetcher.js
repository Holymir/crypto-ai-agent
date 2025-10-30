const Parser = require("rss-parser");
const parser = new Parser({
  customFields: {
    item: ["media:content", "dc:creator"],
  },
});

const FEED_SOURCES = [
  { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
  { name: "CoinTelegraph", url: "https://cointelegraph.com/rss" },
  { name: "The Block", url: "https://www.theblock.co/rss.xml" },
  { name: "Decrypt", url: "https://decrypt.co/feed" },
  // { name: "CryptoSlate", url: "https://cryptoslate.com/feed/" }, // Disabled: Returns 403 Forbidden
  { name: "NewsBTC", url: "https://www.newsbtc.com/feed/" },
  { name: "Bitcoinist", url: "https://bitcoinist.com/feed/" },
  { name: "BeInCrypto", url: "https://beincrypto.com/feed/" },
  { name: "Blockworks", url: "https://blockworks.co/feed" },
];

module.exports = async function fetchNews() {
  const articles = [];

  for (const feedSource of FEED_SOURCES) {
    try {
      const feed = await parser.parseURL(feedSource.url);

      feed.items.slice(0, 5).forEach((item) => {
        articles.push({
          title: item.title,
          content: item.contentSnippet || item.content || "",
          source: feedSource.name,
          url: item.link,
          publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
        });
      });
    } catch (error) {
      console.error(
        `[ERROR] Failed to fetch from ${feedSource.name}:`,
        error.message
      );
    }
  }

  return articles;
};
