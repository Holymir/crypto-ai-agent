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
        sentiment: data.sentiment || 'NEUTRAL',
        url: data.url,
        publishedAt: data.publishedAt || new Date(),
        analyzedAt: new Date(),
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
      orderBy = 'publishedAt',
      order = 'desc',
    } = options;

    // Ensure page and limit are integers
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const skip = (pageInt - 1) * limitInt;
    const where = {};

    if (sentiment) {
      where.sentiment = sentiment;
    }

    if (source) {
      where.source = source;
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
        sentiment: true,
      },
    });

    const stats = {
      BULLISH: 0,
      BEARISH: 0,
      NEUTRAL: 0,
      ERROR: 0,
      total: articles.length,
    };

    articles.forEach((article) => {
      stats[article.sentiment]++;
    });

    return stats;
  }

  /**
   * Get sentiment trend over time
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
        sentiment: true,
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
          ERROR: 0,
          total: 0,
        };
      }

      trendMap[dateKey][article.sentiment]++;
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
        sentiment: true,
      },
    });

    // Group by source and count
    const sourceMap = {};

    articles.forEach((article) => {
      if (!sourceMap[article.source]) {
        sourceMap[article.source] = {
          name: article.source,
          count: 0,
          sentiments: {
            BULLISH: 0,
            BEARISH: 0,
            NEUTRAL: 0,
            ERROR: 0,
          },
        };
      }

      sourceMap[article.source].count++;
      sourceMap[article.source].sentiments[article.sentiment]++;
    });

    // Convert to array and calculate dominant sentiment
    const sources = Object.values(sourceMap).map((source) => {
      const { BULLISH, BEARISH, NEUTRAL } = source.sentiments;
      let dominantSentiment = 'NEUTRAL';

      if (BULLISH > BEARISH && BULLISH > NEUTRAL) {
        dominantSentiment = 'BULLISH';
      } else if (BEARISH > BULLISH && BEARISH > NEUTRAL) {
        dominantSentiment = 'BEARISH';
      }

      return {
        name: source.name,
        count: source.count,
        sentiment: dominantSentiment,
      };
    });

    // Sort by count and return top N
    return sources
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }
}

module.exports = new ArticleService();
