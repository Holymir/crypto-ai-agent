import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

/**
 * Media Sentiment Score Gauge Component
 * Displays a visual progress bar showing media sentiment from analyzed news (0-100)
 * 0-30: Bearish media coverage, 30-70: Neutral coverage, 70-100: Bullish coverage
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
    <div className={`glass-strong rounded-xl p-4 sm:p-5 shadow-lg ${className}`}>
      {/* Horizontal Layout: Title + Score + Progress Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        {/* Title with Icon */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className={`p-1.5 bg-gradient-to-br ${sentimentInfo.bgGradient} rounded-lg`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent whitespace-nowrap">
            Media Sentiment
          </h2>
        </div>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-shrink-0"
        >
          <div className="flex items-baseline gap-1">
            <span className={`text-3xl sm:text-4xl font-bold ${sentimentInfo.textColor}`}>
              {clampedScore}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">/100</span>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${sentimentInfo.bgGradient} text-white text-xs font-semibold shadow-md`}>
            <Icon className="w-3 h-3" />
            <span>{sentimentInfo.label}</span>
          </div>
        </motion.div>

        {/* Progress Bar - Takes remaining space */}
        <div className="flex-1 w-full sm:w-auto min-w-0">
          <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${clampedScore}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={`h-full ${sentimentInfo.barColor} rounded-full shadow-md`}
            />
          </div>

          {/* Scale Labels - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex justify-between mt-1 px-1">
            <span className="text-[10px] font-medium text-bearish-600 dark:text-bearish-400">Bearish</span>
            <span className="text-[10px] font-medium text-slate-600 dark:text-slate-400">Neutral</span>
            <span className="text-[10px] font-medium text-bullish-600 dark:text-bullish-400">Bullish</span>
          </div>
        </div>
      </div>
    </div>
  );
};
