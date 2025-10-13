const express = require('express');
const { query, param } = require('express-validator');
const articleService = require('../services/articleService');
const { validate } = require('../middleware/validation');

const router = express.Router();

/**
 * GET /api/articles
 * Get all articles with optional filters and pagination
 */
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).toInt(),
    query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
    query('sentiment').optional().isIn(['BULLISH', 'BEARISH', 'NEUTRAL', 'ERROR']),
    query('source').optional().isString(),
    query('search').optional().isString(),
    query('orderBy').optional().isIn(['publishedAt', 'analyzedAt', 'createdAt']),
    query('order').optional().isIn(['asc', 'desc']),
  ],
  validate,
  async (req, res, next) => {
    try {
      const result = await articleService.getArticles(req.query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET /api/articles/latest
 * Get latest articles
 */
router.get('/latest', async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const articles = await articleService.getLatestArticles(limit);
    res.json({ articles });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/articles/:id
 * Get single article by ID
 */
router.get(
  '/:id',
  [param('id').isString()],
  validate,
  async (req, res, next) => {
    try {
      const article = await articleService.getArticleById(req.params.id);

      if (!article) {
        return res.status(404).json({ error: 'Article not found' });
      }

      res.json(article);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
