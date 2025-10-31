/**
 * Utility functions for sentiment calculation based on sentimentScore
 */

/**
 * Get sentiment category from sentimentScore (0-100)
 * @param {number} sentimentScore - Score from 0 (bearish) to 100 (bullish)
 * @returns {'BULLISH' | 'BEARISH' | 'NEUTRAL'}
 */
export function getSentimentFromValue(sentimentScore) {
  if (sentimentScore === null || sentimentScore === undefined) {
    return 'NEUTRAL';
  }

  if (sentimentScore >= 67) {
    return 'BULLISH';
  } else if (sentimentScore <= 33) {
    return 'BEARISH';
  } else {
    return 'NEUTRAL';
  }
}

/**
 * Get sentiment configuration for UI styling
 * @param {number} sentimentScore - Score from 0 (bearish) to 100 (bullish)
 * @returns {Object} Configuration with label, color, icon, etc.
 */
export function getSentimentConfig(sentimentScore) {
  const value = sentimentScore || 50;

  if (value >= 67) {
    return {
      sentiment: 'BULLISH',
      label: 'Bullish',
      color: '#10b981', // green
      bgColor: '#dcfce7',
      textColor: '#166534',
      className: 'badge-bullish',
    };
  } else if (value <= 33) {
    return {
      sentiment: 'BEARISH',
      label: 'Bearish',
      color: '#ef4444', // red
      bgColor: '#fee2e2',
      textColor: '#991b1b',
      className: 'badge-bearish',
    };
  } else {
    return {
      sentiment: 'NEUTRAL',
      label: 'Neutral',
      color: '#64748b', // gray
      bgColor: '#f1f5f9',
      textColor: '#475569',
      className: 'badge-neutral',
    };
  }
}

/**
 * Get color based on sentimentScore for charts
 * @param {number} sentimentScore - Score from 0 (bearish) to 100 (bullish)
 * @returns {string} Hex color code
 */
export function getSentimentColor(sentimentScore) {
  const value = sentimentScore || 50;

  if (value >= 67) {
    return '#10b981'; // green
  } else if (value <= 33) {
    return '#ef4444'; // red
  } else {
    return '#64748b'; // gray
  }
}

/**
 * Get sentiment score label
 * @param {number} sentimentScore - Score from 0 (bearish) to 100 (bullish)
 * @returns {string} Descriptive label
 */
export function getSentimentScoreLabel(sentimentScore) {
  if (sentimentScore === null || sentimentScore === undefined) {
    return 'Unknown';
  }

  if (sentimentScore >= 90) return 'Extremely Bullish';
  if (sentimentScore >= 75) return 'Very Bullish';
  if (sentimentScore >= 67) return 'Bullish';
  if (sentimentScore >= 60) return 'Slightly Bullish';
  if (sentimentScore >= 41) return 'Neutral';
  if (sentimentScore >= 34) return 'Slightly Bearish';
  if (sentimentScore >= 26) return 'Bearish';
  if (sentimentScore >= 11) return 'Very Bearish';
  return 'Extremely Bearish';
}

/**
 * Calculate sentiment statistics from articles with sentimentScore
 * @param {Array} articles - Array of articles with sentimentScore property
 * @returns {Object} Stats object with BULLISH, BEARISH, NEUTRAL counts
 */
export function calculateSentimentStats(articles) {
  const stats = {
    BULLISH: 0,
    BEARISH: 0,
    NEUTRAL: 0,
    total: articles.length,
  };

  articles.forEach((article) => {
    const sentiment = getSentimentFromValue(article.sentimentScore);
    stats[sentiment]++;
  });

  return stats;
}
