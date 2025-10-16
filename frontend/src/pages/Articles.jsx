import { useState } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { Navigation } from '../components/Navigation';
import { ArticleCard } from '../components/ArticleCard';
import { ArticlesListSkeleton } from '../components/Skeleton';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

export const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [page, setPage] = useState(1);

  // Build query params, excluding empty values
  const articleParams = {
    page: page,
    limit: 20,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedSentiment && { sentiment: selectedSentiment }),
  };

  const { data, isLoading, error } = useArticles(articleParams);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleSentimentFilter = (sentiment) => {
    setSelectedSentiment(selectedSentiment === sentiment ? '' : sentiment);
    setPage(1);
  };

  const { articles = [], pagination = { page: 1, totalPages: 1, total: 0 } } = data || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="All Articles"
        description="Browse and filter analyzed cryptocurrency news articles. Search through our comprehensive database of sentiment-analyzed crypto news from top sources."
        keywords="crypto articles, cryptocurrency news, bitcoin news, ethereum articles, crypto analysis, filtered news"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent mb-2">
            All Articles
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-dark-muted">
            Browse and filter analyzed cryptocurrency news
          </p>
        </div>

        {/* Search and Filters */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-gradient-to-r from-white/90 to-primary-50/90 dark:from-dark-card/90 dark:to-neutral-800/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-primary-200 dark:border-dark-border mb-6 sm:mb-8">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-primary-200 dark:border-dark-border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm sm:text-base bg-white dark:bg-dark-card dark:text-dark-text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Sentiment Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <motion.button
                  onClick={() => handleSentimentFilter('BULLISH')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    selectedSentiment === 'BULLISH'
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl scale-105 border-2 border-emerald-400'
                      : 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-700 dark:text-emerald-400 hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 border-2 border-emerald-200 dark:border-emerald-700'
                  }`}
                >
                  <TrendingUp className="w-4 h-4 inline-block mr-1" />
                  Bullish
                </motion.button>
                <motion.button
                  onClick={() => handleSentimentFilter('BEARISH')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    selectedSentiment === 'BEARISH'
                      ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xl scale-105 border-2 border-rose-400'
                      : 'bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20 text-rose-700 dark:text-rose-400 hover:from-rose-100 hover:to-red-100 dark:hover:from-rose-900/30 dark:hover:to-red-900/30 border-2 border-rose-200 dark:border-rose-700'
                  }`}
                >
                  <TrendingDown className="w-4 h-4 inline-block mr-1" />
                  Bearish
                </motion.button>
                <motion.button
                  onClick={() => handleSentimentFilter('NEUTRAL')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                    selectedSentiment === 'NEUTRAL'
                      ? 'bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-xl scale-105 border-2 border-slate-400'
                      : 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20 text-slate-700 dark:text-slate-400 hover:from-slate-100 hover:to-gray-100 dark:hover:from-slate-900/30 dark:hover:to-gray-900/30 border-2 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <Minus className="w-4 h-4 inline-block mr-1" />
                  Neutral
                </motion.button>
              </div>

              {/* Active Filters Badge */}
              {(selectedSentiment || searchTerm) && (
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-gray-600 dark:text-dark-muted font-medium">Filtered by:</span>
                  {selectedSentiment && (
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full font-medium">
                      {selectedSentiment}
                    </span>
                  )}
                  {searchTerm && (
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-medium">
                      &quot;{searchTerm}&quot;
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSentiment('');
                      setPage(1);
                    }}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium ml-2"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Articles List */}
        <div className="space-y-3 sm:space-y-4">
          {error ? (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-red-200 dark:border-red-800 text-center">
              <p className="text-red-600 dark:text-red-400 text-base sm:text-lg font-medium">
                Error loading articles: {error.message}
              </p>
            </div>
          ) : isLoading ? (
            <ArticlesListSkeleton count={20} />
          ) : articles.length === 0 ? (
            <div className="bg-gradient-to-r from-white/90 to-primary-50/90 dark:from-dark-card/90 dark:to-neutral-800/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-primary-200 dark:border-dark-border text-center">
              <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg font-medium">
                No articles found matching your filters.
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-muted mt-2">
                Total articles available: {pagination.total || 0}
              </p>
            </div>
          ) : (
            articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!error && !isLoading && articles.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white/90 to-primary-50/90 dark:from-dark-card/90 dark:to-neutral-800/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-primary-200 dark:border-dark-border">
            {/* Page info */}
            <div className="text-sm text-gray-700 dark:text-dark-muted font-medium">
              Showing page <span className="font-bold text-primary-600">{pagination.page}</span> of{' '}
              <span className="font-bold text-primary-600">{pagination.totalPages}</span>
              {' '}({pagination.total} total articles)
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <motion.button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                whileHover={{ scale: page === 1 ? 1 : 1.05 }}
                whileTap={{ scale: page === 1 ? 1 : 0.95 }}
                className={`p-2 rounded-lg font-semibold transition-all ${
                  page === 1
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>

              {/* Page numbers */}
              <div className="flex gap-1 sm:gap-2">
                {/* First page */}
                {pagination.page > 3 && (
                  <>
                    <motion.button
                      onClick={() => setPage(1)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-neutral-700 transition-all border border-primary-200 dark:border-dark-border"
                    >
                      1
                    </motion.button>
                    {pagination.page > 4 && (
                      <span className="px-2 py-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Pages around current */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(pageNum => {
                    return pageNum === pagination.page ||
                           (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1);
                  })
                  .map(pageNum => (
                    <motion.button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      whileHover={{ scale: pageNum === pagination.page ? 1 : 1.05 }}
                      whileTap={{ scale: pageNum === pagination.page ? 1 : 0.95 }}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        pageNum === pagination.page
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-110'
                          : 'bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-neutral-700 border border-primary-200 dark:border-dark-border'
                      }`}
                    >
                      {pageNum}
                    </motion.button>
                  ))}

                {/* Last page */}
                {pagination.page < pagination.totalPages - 2 && (
                  <>
                    {pagination.page < pagination.totalPages - 3 && (
                      <span className="px-2 py-2 text-gray-500">...</span>
                    )}
                    <motion.button
                      onClick={() => setPage(pagination.totalPages)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-neutral-700 transition-all border border-primary-200 dark:border-dark-border"
                    >
                      {pagination.totalPages}
                    </motion.button>
                  </>
                )}
              </div>

              {/* Next button */}
              <motion.button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                whileHover={{ scale: page === pagination.totalPages ? 1 : 1.05 }}
                whileTap={{ scale: page === pagination.totalPages ? 1 : 0.95 }}
                className={`p-2 rounded-lg font-semibold transition-all ${
                  page === pagination.totalPages
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-600 hover:to-secondary-600 shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
