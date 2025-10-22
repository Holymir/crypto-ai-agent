import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

/**
 * Sentiment Score Gauge Component
 * Displays a visual progress bar showing overall market sentiment (0-100)
 * 0-30: Bearish, 30-70: Neutral, 70-100: Bullish
 */
export const SentimentGauge = ({ score = 50, className = '' }) => {
  // Clamp score between 0-100
  const clampedScore = Math.max(0, Math.min(100, score));

  // Determine sentiment level and color
  const getSentimentInfo = (value) => {
    if (value <= 30) {
      return {
        label: 'Bearish',
        icon: TrendingDown,
        bgGradient: 'from-bearish-500 to-bearish-600',
        textColor: 'text-bearish-600 dark:text-bearish-400',
        barColor: 'bg-gradient-to-r from-bearish-500 to-bearish-600',
      };
    }
    if (value <= 70) {
      return {
        label: 'Neutral',
        icon: Activity,
        bgGradient: 'from-slate-500 to-gray-600',
        textColor: 'text-slate-600 dark:text-slate-400',
        barColor: 'bg-gradient-to-r from-slate-500 to-gray-600',
      };
    }
    return {
      label: 'Bullish',
      icon: TrendingUp,
      bgGradient: 'from-bullish-500 to-bullish-600',
      textColor: 'text-bullish-600 dark:text-bullish-400',
      barColor: 'bg-gradient-to-r from-bullish-500 to-bullish-600',
    };
  };

  const sentimentInfo = getSentimentInfo(clampedScore);
  const Icon = sentimentInfo.icon;

  return (
    <div className={`glass-strong rounded-2xl card-spacing shadow-2xl hover-lift h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 bg-gradient-to-br ${sentimentInfo.bgGradient} rounded-lg`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Sentiment Score
        </h2>
      </div>

      {/* Large Score Display */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <span className={`text-6xl sm:text-7xl font-bold ${sentimentInfo.textColor}`}>
            {clampedScore}
          </span>
          <span className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400">/100</span>
        </div>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${sentimentInfo.bgGradient} text-white text-base font-semibold shadow-lg`}>
          <Icon className="w-4 h-4" />
          <span>{sentimentInfo.label}</span>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${clampedScore}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full ${sentimentInfo.barColor} rounded-full shadow-lg`}
          />
        </div>

        {/* Scale Labels */}
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs font-semibold text-bearish-600 dark:text-bearish-400">0 - Bearish</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">50 - Neutral</span>
          <span className="text-xs font-semibold text-bullish-600 dark:text-bullish-400">100 - Bullish</span>
        </div>
      </div>

      {/* Sentiment Zones */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <div className={`p-3 rounded-lg glass text-center ${clampedScore <= 30 ? 'ring-2 ring-bearish-500' : ''}`}>
          <div className="text-2xl font-bold text-bearish-600 dark:text-bearish-400">0-30</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bearish Zone</div>
        </div>
        <div className={`p-3 rounded-lg glass text-center ${clampedScore > 30 && clampedScore <= 70 ? 'ring-2 ring-slate-500' : ''}`}>
          <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">31-70</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Neutral Zone</div>
        </div>
        <div className={`p-3 rounded-lg glass text-center ${clampedScore > 70 ? 'ring-2 ring-bullish-500' : ''}`}>
          <div className="text-2xl font-bold text-bullish-600 dark:text-bullish-400">71-100</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Bullish Zone</div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 glass rounded-xl">
        <p className="text-sm text-gray-600 dark:text-dark-muted text-center">
          The sentiment score represents overall market sentiment based on analyzed news articles.
          Higher values indicate more bullish sentiment, lower values indicate bearish sentiment.
        </p>
      </div>
    </div>
  );
};
