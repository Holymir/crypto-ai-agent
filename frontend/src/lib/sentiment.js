/**
 * Utility functions for sentiment calculation based on bullishValue
 */

/**
 * Get sentiment category from bullishValue (0-100)
 * @param {number} bullishValue - Score from 0 (bearish) to 100 (bullish)
 * @returns {'BULLISH' | 'BEARISH' | 'NEUTRAL'}
 */
export function getSentimentFromValue(bullishValue) {
  if (bullishValue === null || bullishValue === undefined) {
    return 'NEUTRAL';
  }

  if (bullishValue >= 67) {
    return 'BULLISH';
  } else if (bullishValue <= 33) {
    return 'BEARISH';
  } else {
    return 'NEUTRAL';
  }
}

/**
 * Get sentiment configuration for UI styling
 * @param {number} bullishValue - Score from 0 (bearish) to 100 (bullish)
 * @returns {Object} Configuration with label, color, icon, etc.
 */
export function getSentimentConfig(bullishValue) {
  const value = bullishValue || 50;

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
 * Get color based on bullishValue for charts
 * @param {number} bullishValue - Score from 0 (bearish) to 100 (bullish)
 * @returns {string} Hex color code
 */
export function getSentimentColor(bullishValue) {
  const value = bullishValue || 50;

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
 * @param {number} bullishValue - Score from 0 (bearish) to 100 (bullish)
 * @returns {string} Descriptive label
 */
export function getSentimentScoreLabel(bullishValue) {
  if (bullishValue === null || bullishValue === undefined) {
    return 'Unknown';
  }

  if (bullishValue >= 90) return 'Extremely Bullish';
  if (bullishValue >= 75) return 'Very Bullish';
  if (bullishValue >= 67) return 'Bullish';
  if (bullishValue >= 60) return 'Slightly Bullish';
  if (bullishValue >= 41) return 'Neutral';
  if (bullishValue >= 34) return 'Slightly Bearish';
  if (bullishValue >= 26) return 'Bearish';
  if (bullishValue >= 11) return 'Very Bearish';
  return 'Extremely Bearish';
}

/**
 * Calculate sentiment statistics from articles with bullishValue
 * @param {Array} articles - Array of articles with bullishValue property
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
    const sentiment = getSentimentFromValue(article.bullishValue);
    stats[sentiment]++;
  });

  return stats;
}
