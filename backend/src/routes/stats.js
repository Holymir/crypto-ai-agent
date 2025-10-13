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
 */
router.get(
  '/trend',
  [query('days').optional().isInt({ min: 1, max: 365 }).toInt()],
  validate,
  async (req, res, next) => {
    try {
      const days = req.query.days || 7;
      const trend = await articleService.getSentimentTrend(days);
      res.json({ trend });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
