import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpDown, Filter } from 'lucide-react';
import { useAssetStats } from '../hooks/useArticles';
import { CurrencyCard } from './CurrencyCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { ScrollReveal } from './ScrollReveal';

/**
 * CurrencySentimentGrid Component
 * Displays a grid of cryptocurrency sentiment cards with sorting and filtering
 *
 * @param {number} days - Number of days to look back (default: 7)
 * @param {number} limit - Maximum number of assets to display (default: 20)
 */
export const CurrencySentimentGrid = ({ days = 7, limit = 20 }) => {
  const { data, isLoading, error } = useAssetStats(days, limit);
  const [sortBy, setSortBy] = useState('count'); // 'count', 'sentiment', 'name'
  const [filterSentiment, setFilterSentiment] = useState('all'); // 'all', 'bullish', 'bearish', 'neutral'

  const assets = data?.assets || [];

  // Filter and sort assets
  const processedAssets = useMemo(() => {
    let filtered = [...assets];

    // Apply sentiment filter
    if (filterSentiment !== 'all') {
      filtered = filtered.filter((asset) => {
        if (filterSentiment === 'bullish') return asset.avgBullishValue >= 71;
        if (filterSentiment === 'bearish') return asset.avgBullishValue <= 30;
        if (filterSentiment === 'neutral') return asset.avgBullishValue > 30 && asset.avgBullishValue < 71;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'sentiment':
          return b.avgBullishValue - a.avgBullishValue; // Highest sentiment first
        case 'name':
          return a.name.localeCompare(b.name); // Alphabetical
        case 'count':
        default:
          return b.count - a.count; // Most articles first
      }
    });

    return filtered;
  }, [assets, sortBy, filterSentiment]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (assets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">
          No cryptocurrency data available for the selected period.
        </p>
      </div>
    );
  }

  return (
    <ScrollReveal>
      <div className="glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Cryptocurrency Sentiment Heatmap
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Real-time sentiment analysis across {assets.length} cryptocurrencies
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Sort By */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  px-3 py-2 rounded-lg text-sm font-medium
                  bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-primary-500
                  cursor-pointer
                  transition-all
                "
              >
                <option value="count">Most Articles</option>
                <option value="sentiment">Highest Sentiment</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Filter By Sentiment */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                Filter:
              </span>
              <select
                value={filterSentiment}
                onChange={(e) => setFilterSentiment(e.target.value)}
                className="
                  px-3 py-2 rounded-lg text-sm font-medium
                  bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600
                  text-gray-900 dark:text-gray-100
                  focus:ring-2 focus:ring-primary-500
                  cursor-pointer
                  transition-all
                "
              >
                <option value="all">All Sentiments</option>
                <option value="bullish">Bullish Only</option>
                <option value="neutral">Neutral Only</option>
                <option value="bearish">Bearish Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        {filterSentiment !== 'all' && (
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {processedAssets.length} of {assets.length} cryptocurrencies
          </div>
        )}

        {/* Grid */}
        {processedAssets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No cryptocurrencies match the selected filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {processedAssets.map((asset, index) => (
              <CurrencyCard key={asset.name} asset={asset} index={index} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-bullish-500 to-bullish-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Bullish (71-100)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neutral-500 to-neutral-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Neutral (31-70)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-bearish-500 to-bearish-600" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Bearish (0-30)
              </span>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};
