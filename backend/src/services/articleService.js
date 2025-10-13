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
        { title: { contains: search } },
        { content: { contains: search } },
      ];
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
   */
  async getSentimentTrend(days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

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

    // Group by date
    const trendMap = {};

    articles.forEach((article) => {
      const dateKey = article.publishedAt.toISOString().split('T')[0];

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
}

module.exports = new ArticleService();
