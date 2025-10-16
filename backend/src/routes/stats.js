const express = require('express');
const { query } = require('express-validator');
const articleService = require('../services/articleService');
const { validate } = require('../middleware/validation');

const router = express.Router();

/**
 * GET /api/stats/sentiment
 * Get sentiment statistics for a date range
 */
router.get(
  '/sentiment',
  [
    query('startDate').optional().isISO8601().toDate(),
    query('endDate').optional().isISO8601().toDate(),
  ],
  validate,
  async (req, res, next) => {
    try {
      // If no date range specified, get ALL articles (use a very old start date)
      const endDate = req.query.endDate || new Date();
      const startDate = req.query.startDate || new Date('2020-01-01');

      const stats = await articleService.getSentimentStats(startDate, endDate);
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/stats/trend
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

module.exports = router;
