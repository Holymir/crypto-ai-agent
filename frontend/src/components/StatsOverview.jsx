import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Reusable stats overview component displaying sentiment statistics
 */
export const StatsOverview = ({ stats, className = '' }) => {
  const bullishPercentage = stats?.total > 0 ? Math.round((stats?.BULLISH / stats?.total) * 100) : 0;
  const bearishPercentage = stats?.total > 0 ? Math.round((stats?.BEARISH / stats?.total) * 100) : 0;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {/* Total */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0 }}
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl border border-blue-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-blue-100">Total Articles</span>
          <BarChart3 className="w-5 h-5 text-blue-200" />
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.total || 0}</div>
        <div className="text-xs text-blue-200 mt-1 font-medium">All time analyzed</div>
      </motion.div>

      {/* Bullish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 shadow-2xl border border-emerald-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-emerald-100">Bullish</span>
          <TrendingUp className="w-5 h-5 text-emerald-200" />
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.BULLISH || 0}</div>
        <div className="text-xs text-emerald-200 mt-1 font-medium">{bullishPercentage}% positive signals</div>
      </motion.div>

      {/* Bearish */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 shadow-2xl border border-rose-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-rose-100">Bearish</span>
          <TrendingDown className="w-5 h-5 text-rose-200" />
        </div>
        <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.BEARISH || 0}</div>
        <div className="text-xs text-rose-200 mt-1 font-medium">{bearishPercentage}% negative signals</div>
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
        <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.NEUTRAL || 0}</div>
        <div className="text-xs text-slate-200 mt-1 font-medium">Balanced outlook</div>
      </motion.div>
    </div>
  );
};
