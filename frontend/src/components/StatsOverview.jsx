import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrendIndicator } from './TrendIndicator';
import { useCountUp } from '../hooks/useCountUp';

/**
 * Reusable stats overview component displaying sentiment statistics
 */
export const StatsOverview = ({ stats, previousStats, period = null, className = '' }) => {
  const bullishPercentage = stats?.total > 0 ? Math.round((stats?.BULLISH / stats?.total) * 100) : 0;
  const bearishPercentage = stats?.total > 0 ? Math.round((stats?.BEARISH / stats?.total) * 100) : 0;

  // Animated counts
  const animatedTotal = useCountUp(stats?.total || 0, 1500);
  const animatedBullish = useCountUp(stats?.BULLISH || 0, 1500);
  const animatedBearish = useCountUp(stats?.BEARISH || 0, 1500);
  const animatedNeutral = useCountUp(stats?.NEUTRAL || 0, 1500);

  // Get comparison period text
  const getComparisonText = () => {
    if (!previousStats) return '';
    if (period === 1) return 'vs previous day';
    if (period === 7) return 'vs previous week';
    if (period === 30) return 'vs previous month';
    return 'vs previous period';
  };

  const comparisonText = getComparisonText();

  // Calculate trends (percentage change vs previous period)
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const trends = previousStats ? {
    total: calculateTrend(stats?.total || 0, previousStats?.total || 0),
    bullish: calculateTrend(stats?.BULLISH || 0, previousStats?.BULLISH || 0),
    bearish: calculateTrend(stats?.BEARISH || 0, previousStats?.BEARISH || 0),
    neutral: calculateTrend(stats?.NEUTRAL || 0, previousStats?.NEUTRAL || 0),
  } : null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {/* Total */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-6 shadow-2xl border border-primary-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-primary-100">Total Articles</span>
          <BarChart3 className="w-5 h-5 text-primary-200" />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold text-white">{animatedTotal}</div>
          {trends && <TrendIndicator value={trends.total} className="text-white" />}
        </div>
        <div className="text-xs text-primary-200 mt-1 font-medium">
          {trends ? comparisonText : 'All time analyzed'}
        </div>
      </motion.div>

      {/* Bullish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gradient-to-br from-bullish-500 to-bullish-600 rounded-2xl p-6 shadow-2xl border border-bullish-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-bullish-100">Bullish</span>
          <TrendingUp className="w-5 h-5 text-bullish-200" />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold text-white">{animatedBullish}</div>
          {trends && <TrendIndicator value={trends.bullish} className="text-white" />}
        </div>
        <div className="text-xs text-bullish-200 mt-1 font-medium">
          {trends ? `${bullishPercentage}% • ${comparisonText}` : `${bullishPercentage}% positive signals`}
        </div>
      </motion.div>

      {/* Bearish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gradient-to-br from-bearish-500 to-bearish-600 rounded-2xl p-6 shadow-2xl border border-bearish-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-bearish-100">Bearish</span>
          <TrendingDown className="w-5 h-5 text-bearish-200" />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold text-white">{animatedBearish}</div>
          {trends && <TrendIndicator value={trends.bearish} className="text-white" />}
        </div>
        <div className="text-xs text-bearish-200 mt-1 font-medium">
          {trends ? `${bearishPercentage}% • ${comparisonText}` : `${bearishPercentage}% negative signals`}
        </div>
      </motion.div>

      {/* Neutral */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl p-6 shadow-2xl border border-slate-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-100">Neutral</span>
          <Minus className="w-5 h-5 text-slate-200" />
        </div>
        <div className="flex items-baseline gap-2">
          <div className="text-3xl sm:text-4xl font-bold text-white">{animatedNeutral}</div>
          {trends && <TrendIndicator value={trends.neutral} className="text-white" />}
        </div>
        <div className="text-xs text-slate-200 mt-1 font-medium">
          {trends ? comparisonText : 'Balanced outlook'}
        </div>
      </motion.div>
    </div>
  );
};
