const Parser = require("rss-parser");
const axios = require("axios");
const parser = new Parser({
  customFields: {
    item: ["media:content", "dc:creator"],
  },
});

const FEED_SOURCES = [
  { name: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
  // { name: "CoinTelegraph", url: "https://cointelegraph.com/rss" }, // Disabled: RSS feed missing version attribute
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
      // Fetch with custom headers to avoid being blocked
      const response = await axios.get(feedSource.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/rss+xml, application/xml, text/xml",
        },
        timeout: 10000,
      });

      // Fix missing version attribute in RSS tag (some feeds like CoinTelegraph don't include it)
      let xmlData =
        typeof response.data === "string"
          ? response.data
          : response.data.toString();

      // Check if RSS version attribute is missing and add it
      if (!xmlData.match(/version\s*=\s*["']/)) {
        xmlData = xmlData.replace(/<rss\s/, '<rss version="2.0" ');
      }

      // Parse the XML response
      const feed = await parser.parseString(xmlData);

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
