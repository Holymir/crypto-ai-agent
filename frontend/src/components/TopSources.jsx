import { motion } from 'framer-motion';
import { Newspaper } from 'lucide-react';
import { useTopSources } from '../hooks/useArticles';
import { getSentimentFromValue } from '../lib/sentiment';

/**
 * Top Sources Widget
 * Displays the top news sources by article count
 */
export const TopSources = ({ period = 7, className = '' }) => {
  const { data, isLoading } = useTopSources(period, 5);

  const displaySources = data?.sources || [];

  const maxCount = Math.max(...displaySources.map(s => s.count));

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'BULLISH':
        return 'bg-bullish-500';
      case 'BEARISH':
        return 'bg-rose-500';
      case 'NEUTRAL':
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <div className={`glass-strong rounded-2xl card-spacing shadow-2xl hover-lift ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
          <Newspaper className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Top Sources
        </h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && displaySources.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No sources found for this period</p>
        </div>
      )}

      {/* Sources List */}
      {!isLoading && displaySources.length > 0 && (
        <div className="space-y-4">
        {displaySources.map((source, index) => (
          <motion.div
            key={source.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-gray-400 dark:text-gray-600 w-6">
                  {index + 1}
                </span>
                <span className="font-semibold text-gray-900 dark:text-dark-text">
                  {source.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {source.count}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">articles</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(source.count / maxCount) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: 'easeOut' }}
                className={`h-full ${getSentimentColor(getSentimentFromValue(source.avgBullishValue))} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
        </div>
      )}

      {/* Footer Note */}
      {!isLoading && displaySources.length > 0 && (
        <div className="mt-6 p-3 glass rounded-lg">
          <p className="text-xs text-gray-600 dark:text-dark-muted text-center">
            Top news sources by article count in the selected period
          </p>
        </div>
      )}
    </div>
  );
};
