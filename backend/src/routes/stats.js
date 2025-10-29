const express = require('express');
const { query } = require('express-validator');
const articleService = require('../services/articleService');
const { validate } = require('../middleware/validation');

const router = express.Router();

/**
 * GET /api/sentiment/stats
 * Get sentiment statistics for a date range
 */
router.get(
  '/stats',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('startDate').optional().isISO8601().toDate(),
    query('endDate').optional().isISO8601().toDate(),
  ],
  validate,
  async (req, res, next) => {
    try {
      let startDate, endDate;

      // Priority: days parameter > explicit date range > default (all time)
      if (req.query.days) {
        endDate = new Date();
        startDate = new Date();
        startDate.setDate(startDate.getDate() - parseInt(req.query.days));
      } else {
        endDate = req.query.endDate || new Date();
        startDate = req.query.startDate || new Date('2020-01-01');
      }

      const stats = await articleService.getSentimentStats(startDate, endDate);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/sources
 * Get top news sources by article count
 * Query params:
 *   - days: number of days to look back (default: 7)
 *   - limit: number of sources to return (default: 5)
 */
router.get(
  '/sources',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 20 }).toInt(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const limit = req.query.limit ? parseInt(req.query.limit) : 5;

      const sources = await articleService.getTopSources(days, limit);
      res.json({ sources });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/trend
 * Get sentiment trend over time
 * Query params:
 *   - hours: number of hours to look back (overrides days if provided)
 *   - days: number of days to look back (default: 7)
 *   - granularity: 'hourly' or 'daily' (default: 'daily')
 */
router.get(
  '/trend',
  [
    query('hours').optional().isInt({ min: 1, max: 168 }).toInt(),
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('granularity').optional().isIn(['hourly', 'daily']),
  ],
  validate,
  async (req, res, next) => {
    try {
      const hours = req.query.hours ? parseInt(req.query.hours) : null;
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const granularity = req.query.granularity || 'daily';

      console.log('[STATS/TREND] Request params:', { hours, days, granularity });

      const trend = await articleService.getSentimentTrend(hours, days, granularity);

      console.log('[STATS/TREND] Returned', trend.length, 'data points');

      res.json({ trend });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/assets
 * Get top assets (cryptocurrencies) by article count
 * Query params:
 *   - days: number of days to look back (default: 7)
 *   - limit: number of assets to return (default: 10)
 */
router.get(
  '/assets',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;

      const assets = await articleService.getAssetStats(days, limit);
      res.json({ assets });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/categories
 * Get top categories by article count
 * Query params:
 *   - days: number of days to look back (default: 7)
 *   - limit: number of categories to return (default: 10)
 */
router.get(
  '/categories',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;

      const categories = await articleService.getCategoryStats(days, limit);
      res.json({ categories });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/chains
 * Get top blockchain chains by article count
 * Query params:
 *   - days: number of days to look back (default: 7)
 *   - limit: number of chains to return (default: 10)
 */
router.get(
  '/chains',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;

      const chains = await articleService.getChainStats(days, limit);
      res.json({ chains });
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/sentiment/keywords
 * Get trending keywords
 * Query params:
 *   - days: number of days to look back (default: 7)
 *   - limit: number of keywords to return (default: 10)
 */
router.get(
  '/keywords',
  [
    query('days').optional().isInt({ min: 1, max: 365 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 50 }).toInt(),
  ],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days ? parseInt(req.query.days) : 7;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;

      const keywords = await articleService.getTrendingKeywords(days, limit);
      res.json({ keywords });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
