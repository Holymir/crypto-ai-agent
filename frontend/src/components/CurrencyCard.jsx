import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

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
        bgGradient: 'from-bullish-500/5 to-bullish-600/5',
        hoverBgGradient: 'from-bullish-500/10 to-bullish-600/10',
        borderColor: 'border-transparent',
        hoverBorderColor: 'hover:border-bullish-300 dark:hover:border-bullish-700',
        textColor: 'text-bullish-600 dark:text-bullish-400',
        scoreGradient: 'from-bullish-500 to-bullish-600',
        progressBg: 'bg-bullish-500',
        icon: TrendingUp,
        label: 'Bullish',
      };
    } else if (avgBullishValue <= 30) {
      return {
        bgGradient: 'from-bearish-500/5 to-bearish-600/5',
        hoverBgGradient: 'from-bearish-500/10 to-bearish-600/10',
        borderColor: 'border-transparent',
        hoverBorderColor: 'hover:border-bearish-300 dark:hover:border-bearish-700',
        textColor: 'text-bearish-600 dark:text-bearish-400',
        scoreGradient: 'from-bearish-500 to-bearish-600',
        progressBg: 'bg-bearish-500',
        icon: TrendingDown,
        label: 'Bearish',
      };
    } else {
      return {
        bgGradient: 'from-neutral-500/5 to-neutral-600/5',
        hoverBgGradient: 'from-neutral-500/10 to-neutral-600/10',
        borderColor: 'border-transparent',
        hoverBorderColor: 'hover:border-neutral-300 dark:hover:border-neutral-700',
        textColor: 'text-neutral-600 dark:text-neutral-400',
        scoreGradient: 'from-neutral-500 to-neutral-600',
        progressBg: 'bg-neutral-500',
        icon: Minus,
        label: 'Neutral',
      };
    }
  };

  const config = getSentimentConfig();
  const SentimentIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`
        relative overflow-hidden
        glass rounded-lg p-2.5
        border ${config.borderColor} ${config.hoverBorderColor}
        hover:shadow-xl smooth-transition
        h-full
        flex flex-col items-center justify-center
        group cursor-pointer
      `}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${config.hoverBgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        initial={false}
      />

      {/* Rank badge */}
      <motion.div
        className={`absolute top-1 right-1 w-5 h-5 rounded-full bg-gradient-to-br ${config.scoreGradient} flex items-center justify-center shadow-md`}
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-[10px] font-bold text-white">
          {index + 1}
        </span>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full text-center space-y-1.5">
        {/* Icon with rotation on hover */}
        <div className="flex justify-center">
          <motion.div
            className={`p-1.5 rounded-lg bg-gradient-to-br ${config.scoreGradient}`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <SentimentIcon className="w-3 h-3 text-white" />
          </motion.div>
        </div>

        {/* Currency Name */}
        <h3 className="text-xs font-bold text-gray-900 dark:text-dark-text">
          {name}
        </h3>

        {/* Sentiment Score with gradient */}
        <motion.div
          className={`text-xl font-extrabold bg-gradient-to-r ${config.scoreGradient} bg-clip-text text-transparent`}
          whileHover={{ scale: 1.1 }}
        >
          {avgBullishValue}
        </motion.div>

        {/* Sentiment Badge */}
        <div>
          <motion.span
            className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${config.textColor} bg-gray-100 dark:bg-gray-700 flex items-center gap-1 justify-center`}
            whileHover={{ scale: 1.1 }}
          >
            {config.label}
          </motion.span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full">
          <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${config.progressBg}`}
              initial={{ width: 0 }}
              animate={{ width: `${avgBullishValue}%` }}
              transition={{ duration: 0.8, delay: index * 0.03 }}
            />
          </div>
        </div>

        {/* Article Count */}
        <div className="flex items-center justify-center gap-1 text-[10px] text-gray-600 dark:text-gray-400 pt-0.5">
          <div className={`w-1 h-1 rounded-full ${config.progressBg}`}></div>
          <span className="font-medium">
            {count} {count === 1 ? 'article' : 'articles'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
