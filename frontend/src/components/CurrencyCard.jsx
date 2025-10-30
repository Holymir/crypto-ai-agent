import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * CurrencyCard Component
 * Displays a cryptocurrency with its sentiment score, article count, and styling based on sentiment
 *
 * @param {Object} asset - Asset data from API
 * @param {string} asset.name - Cryptocurrency name (e.g., "BTC", "ETH")
 * @param {number} asset.avgBullishValue - Sentiment score (0-100)
 * @param {string} asset.sentiment - Sentiment category ("BULLISH", "BEARISH", "NEUTRAL")
 * @param {number} asset.count - Number of articles
 * @param {number} index - Card index for staggered animation
 */
export const CurrencyCard = ({ asset, index = 0 }) => {
  const { name, avgBullishValue, sentiment, count } = asset;

  // Determine sentiment styling and icon
  const getSentimentConfig = () => {
    if (avgBullishValue >= 71) {
      return {
        bgGradient: 'from-bullish-500/10 to-bullish-600/10',
        borderColor: 'border-bullish-500/30',
        glowColor: 'shadow-bullish-500/20',
        textColor: 'text-bullish-600 dark:text-bullish-400',
        scoreGradient: 'from-bullish-500 to-bullish-600',
        icon: TrendingUp,
        label: 'Bullish',
        hoverGlow: 'hover:shadow-bullish-500/40',
      };
    } else if (avgBullishValue <= 30) {
      return {
        bgGradient: 'from-bearish-500/10 to-bearish-600/10',
        borderColor: 'border-bearish-500/30',
        glowColor: 'shadow-bearish-500/20',
        textColor: 'text-bearish-600 dark:text-bearish-400',
        scoreGradient: 'from-bearish-500 to-bearish-600',
        icon: TrendingDown,
        label: 'Bearish',
        hoverGlow: 'hover:shadow-bearish-500/40',
      };
    } else {
      return {
        bgGradient: 'from-neutral-500/10 to-neutral-600/10',
        borderColor: 'border-neutral-500/30',
        glowColor: 'shadow-neutral-500/20',
        textColor: 'text-neutral-600 dark:text-neutral-400',
        scoreGradient: 'from-neutral-500 to-neutral-600',
        icon: Minus,
        label: 'Neutral',
        hoverGlow: 'hover:shadow-neutral-500/40',
      };
    }
  };

  const config = getSentimentConfig();
  const SentimentIcon = config.icon;

  return (
    <Link to={`/articles?asset=${encodeURIComponent(name)}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className={`
          relative group cursor-pointer
          glass-strong rounded-2xl p-5
          border-2 ${config.borderColor}
          bg-gradient-to-br ${config.bgGradient}
          shadow-lg ${config.glowColor} ${config.hoverGlow}
          transition-all duration-300
          h-full
        `}
      >
        {/* Animated glow on hover */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          bg-gradient-to-br ${config.bgGradient}
          blur-xl transition-opacity duration-300 -z-10
        `} />

        {/* Header: Currency Name + Icon */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {name}
          </h3>
          <SentimentIcon className={`w-6 h-6 ${config.textColor}`} />
        </div>

        {/* Sentiment Score - Large Display */}
        <div className="flex items-center justify-center mb-4">
          <div className={`
            relative
            text-5xl font-extrabold
            bg-gradient-to-r ${config.scoreGradient}
            bg-clip-text text-transparent
          `}>
            {avgBullishValue}
            <span className="text-2xl">/100</span>
          </div>
        </div>

        {/* Sentiment Label */}
        <div className="text-center mb-3">
          <span className={`
            inline-block px-3 py-1 rounded-full text-sm font-semibold
            ${config.textColor}
            bg-white/50 dark:bg-gray-800/50
          `}>
            {config.label}
          </span>
        </div>

        {/* Article Count */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
          <span className="font-medium">
            {count} {count === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {/* Hover effect indicator */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <span>View articles</span>
            <TrendingUp className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
