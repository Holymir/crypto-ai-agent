const prisma = require('../models/prisma');

class ArticleService {
  /**
   * Create a new article
   */
  async createArticle(data) {
    return await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        source: data.source,
        url: data.url,
        publishedAt: data.publishedAt || new Date(),
        analyzedAt: new Date(),
        // AI analysis fields
        asset: data.asset,
        category: data.category,
        chain: data.chain,
        sentimentScore: data.sentimentScore || 50,
        keywords: data.keywords,
      },
    });
  }

  /**
   * Find article by title (to avoid duplicates)
   */
  async findByTitle(title) {
    return await prisma.article.findUnique({
      where: { title },
    });
  }

  /**
   * Get all articles with pagination and filters
   */
  async getArticles(options = {}) {
    const {
      page = 1,
      limit = 20,
      sentiment,
      source,
      search,
      days,
      asset,
      category,
      chain,
      orderBy = 'publishedAt',
      order = 'desc',
    } = options;

    // Ensure page and limit are integers
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;
    const where = {};

    // Map sentiment categories to sentimentScore ranges
    if (sentiment) {
      if (sentiment === 'BULLISH') {
        where.sentimentScore = { gte: 67 };
      } else if (sentiment === 'BEARISH') {
        where.sentimentScore = { lte: 33 };
      } else if (sentiment === 'NEUTRAL') {
        where.sentimentScore = { gte: 34, lte: 66 };
      }
    }

    if (source) {
      where.source = source;
    }

    if (asset) {
      where.asset = asset;
    }

    if (category) {
      where.category = category;
    }

    if (chain) {
      where.chain = chain;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Add date filtering if days parameter is provided
    if (days) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - parseInt(days, 10));
      where.publishedAt = {
        gte: startDate,
      };
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take: limitInt,
        orderBy: { [orderBy]: order },
      }),
      prisma.article.count({ where }),
    ]);

    return {
      articles,
      pagination: {
        page: pageInt,
        limit: limitInt,
        total,
        totalPages: Math.ceil(total / limitInt),
      },
    };
  }

  /**
   * Get article by ID
   */
  async getArticleById(id) {
    return await prisma.article.findUnique({
      where: { id },
    });
  }

  /**
   * Get sentiment statistics for a date range
   * Calculates stats from sentimentScore ranges:
   * - BEARISH: 0-33
   * - NEUTRAL: 34-66
   * - BULLISH: 67-100
   */
  async getSentimentStats(startDate, endDate) {
    const articles = await prisma.article.findMany({
      where: {
        publishedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        sentimentScore: true,
      },
    });

    const stats = {
      BULLISH: 0,
      BEARISH: 0,
      NEUTRAL: 0,
      total: articles.length,
    };

    articles.forEach((article) => {
      const value = article.sentimentScore || 50;
      if (value >= 67) {
        stats.BULLISH++;
      } else if (value <= 33) {
        stats.BEARISH++;
      } else {
        stats.NEUTRAL++;
      }
    });

    return stats;
  }

  /**
   * Get sentiment trend over time
   * Calculates sentiment from sentimentScore ranges
   * @param {number} hours - Number of hours to look back (if provided, overrides days)
   * @param {number} days - Number of days to look back
   * @param {string} granularity - 'hourly' or 'daily' (default: 'daily')
   */
  async getSentimentTrend(hours = null, days = 7, granularity = 'daily') {
    const startDate = new Date();

    // If hours is provided, use hours for lookback (more precise for 24h view)
    if (hours !== null) {
      startDate.setHours(startDate.getHours() - hours);
    } else {
      startDate.setDate(startDate.getDate() - days);
    }

    const articles = await prisma.article.findMany({
      where: {
        publishedAt: {
          gte: startDate,
        },
      },
      select: {
        publishedAt: true,
        sentimentScore: true,
      },
      orderBy: {
        publishedAt: 'asc',
      },
    });

    // Group by date or hour
    const trendMap = {};

    articles.forEach((article) => {
      let dateKey;

      if (granularity === 'hourly') {
        // Format: "YYYY-MM-DD HH:00"
        const date = new Date(article.publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hour = String(date.getHours()).padStart(2, '0');
        dateKey = `${year}-${month}-${day} ${hour}:00`;
      } else {
        // Format: "YYYY-MM-DD"
        dateKey = article.publishedAt.toISOString().split('T')[0];
      }

      if (!trendMap[dateKey]) {
        trendMap[dateKey] = {
          date: dateKey,
          BULLISH: 0,
          BEARISH: 0,
          NEUTRAL: 0,
          total: 0,
        };
      }

      // Categorize based on sentimentScore
      const value = article.sentimentScore || 50;
      if (value >= 67) {
        trendMap[dateKey].BULLISH++;
      } else if (value <= 33) {
        trendMap[dateKey].BEARISH++;
      } else {
        trendMap[dateKey].NEUTRAL++;
      }

      trendMap[dateKey].total++;
    });

    return Object.values(trendMap);
  }

  /**
   * Get latest articles
   */
  async getLatestArticles(limit = 10) {
    return await prisma.article.findMany({
      take: limit,
      orderBy: {
        publishedAt: 'desc',
      },
    });
  }

  /**
   * Get top news sources by article count
   * Calculates average sentimentScore per source
   * @param {number} days - Number of days to look back
   * @param {number} limit - Number of sources to return
   */
  async getTopSources(days = 7, limit = 5) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all articles in the date range
    const articles = await prisma.article.findMany({
      where: {
        publishedAt: {
          gte: startDate,
        },
      },
      select: {
        source: true,
        sentimentScore: true,
      },
    });

    // Group by source and calculate average sentimentScore
    const sourceMap = {};

    articles.forEach((article) => {
      if (!sourceMap[article.source]) {
        sourceMap[article.source] = {
          name: article.source,
          count: 0,
          sentimentScores: [],
        };
      }

      sourceMap[article.source].count++;
      if (article.sentimentScore !== null && article.sentimentScore !== undefined) {
        sourceMap[article.source].sentimentScores.push(article.sentimentScore);
      }
    });

    // Convert to array and calculate avgSentimentScore
    const sources = Object.values(sourceMap).map((source) => {
      const avgSentimentScore = source.sentimentScores.length > 0
        ? Math.round(source.sentimentScores.reduce((a, b) => a + b, 0) / source.sentimentScores.length)
        : 50;

      return {
        name: source.name,
        count: source.count,
        avgSentimentScore,
      };
    });

    // Sort by count and return top N
    return sources
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Get statistics by asset (cryptocurrency)
   * @param {number} days - Number of days to look back
   * @param {number} limit - Number of assets to return
   */
  async getAssetStats(days = 7, limit = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const articles = await prisma.article.findMany({
      where: {
        publishedAt: { gte: startDate },
        asset: { not: null },
      },
      select: {
        asset: true,
        sentimentScore: true,
      },
    });

    const assetMap = {};

    articles.forEach((article) => {
      if (!assetMap[article.asset]) {
        assetMap[article.asset] = {
          name: article.asset,
          count: 0,
          sentimentScores: [],
        };
      }

      assetMap[article.asset].count++;
      if (article.sentimentScore !== null && article.sentimentScore !== undefined) {
        assetMap[article.asset].sentimentScores.push(article.sentimentScore);
      }
    });

    // Calculate average bullish value
    const assets = Object.values(assetMap).map((asset) => {
      const avgSentimentScore = asset.sentimentScores.length > 0
        ? Math.round(asset.sentimentScores.reduce((a, b) => a + b, 0) / asset.sentimentScores.length)
        : 50;

      return {
        name: asset.name,
        count: asset.count,
        avgSentimentScore,
      };
    });

    return assets.sort((a, b) => b.count - a.count).slice(0, limit);
  }

  /**
   * Get statistics by category
   * @param {number} days - Number of days to look back
   * @param {number} limit - Number of categories to return
   */
  async getCategoryStats(days = 7, limit = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const articles = await prisma.article.findMany({
      where: {
        publishedAt: { gte: startDate },
        category: { not: null },
      },
      select: {
        category: true,
        sentimentScore: true,
      },
    });

    const categoryMap = {};

    articles.forEach((article) => {
      if (!categoryMap[article.category]) {
        categoryMap[article.category] = {
          name: article.category,
          count: 0,
          sentimentScores: [],
        };
      }

      categoryMap[article.category].count++;
      if (article.sentimentScore !== null && article.sentimentScore !== undefined) {
        categoryMap[article.category].sentimentScores.push(article.sentimentScore);
      }
    });

    const categories = Object.values(categoryMap).map((category) => {
      const avgSentimentScore = category.sentimentScores.length > 0
        ? Math.round(category.sentimentScores.reduce((a, b) => a + b, 0) / category.sentimentScores.length)
        : 50;

      return {
        name: category.name,
        count: category.count,
        avgSentimentScore,
      };
    });

    return categories.sort((a, b) => b.count - a.count).slice(0, limit);
  }

  /**
   * Get statistics by blockchain
   * @param {number} days - Number of days to look back
   * @param {number} limit - Number of chains to return
   */
  async getChainStats(days = 7, limit = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const articles = await prisma.article.findMany({
      where: {
        publishedAt: { gte: startDate },
        chain: { not: null },
      },
      select: {
        chain: true,
        sentimentScore: true,
      },
    });

    const chainMap = {};

    articles.forEach((article) => {
      if (!chainMap[article.chain]) {
        chainMap[article.chain] = {
          name: article.chain,
          count: 0,
          sentimentScores: [],
        };
      }

      chainMap[article.chain].count++;
      if (article.sentimentScore !== null && article.sentimentScore !== undefined) {
        chainMap[article.chain].sentimentScores.push(article.sentimentScore);
      }
    });

    const chains = Object.values(chainMap).map((chain) => {
      const avgSentimentScore = chain.sentimentScores.length > 0
        ? Math.round(chain.sentimentScores.reduce((a, b) => a + b, 0) / chain.sentimentScores.length)
        : 50;

      return {
        name: chain.name,
        count: chain.count,
        avgSentimentScore,
      };
    });

    return chains.sort((a, b) => b.count - a.count).slice(0, limit);
  }

  /**
   * Get trending keywords
   * @param {number} days - Number of days to look back
   * @param {number} limit - Number of keywords to return
   */
  async getTrendingKeywords(days = 7, limit = 10) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const articles = await prisma.article.findMany({
      where: {
        publishedAt: { gte: startDate },
        keywords: { not: null },
      },
      select: {
        keywords: true,
      },
    });

    const keywordMap = {};

    articles.forEach((article) => {
      if (article.keywords) {
        const keywords = article.keywords.split(',').map(k => k.trim());
        keywords.forEach((keyword) => {
          if (keyword) {
            keywordMap[keyword] = (keywordMap[keyword] || 0) + 1;
          }
        });
      }
    });

    const keywords = Object.entries(keywordMap)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return keywords;
  }
}

module.exports = new ArticleService();
