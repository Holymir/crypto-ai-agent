import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight, Filter, Calendar, BarChart3, ArrowUpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '../hooks/useArticles';
import { useCountUp } from '../hooks/useCountUp';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { Navigation } from '../components/Navigation';
import { ArticleCard } from '../components/ArticleCard';
import { ArticlesListSkeleton } from '../components/Skeleton';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';

const DATE_FILTERS = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: 'All', days: null },
];

export const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [page, setPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Build query params, excluding empty values
  const articleParams = {
    page: page,
    limit: 20,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedSentiment && { sentiment: selectedSentiment }),
    ...(selectedDateRange && { days: selectedDateRange }),
    orderBy: 'publishedAt',
    order: 'desc',
  };

  const { data, isLoading, error } = useArticles(articleParams);

  // Animated count for results
  const totalCount = data?.pagination?.total || 0;
  const animatedCount = useCountUp(totalCount, 1000);

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
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          {/* Stats Summary Bar */}
          <div className="glass-strong rounded-2xl p-4 sm:p-6 mb-4 border-2 border-white/20 dark:border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Total Results */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 sm:gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Results</div>
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-dark-text">{animatedCount}</div>
                </div>
              </motion.div>

              {/* Bullish */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 sm:gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bullish</div>
                  <div className="text-lg sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {articles.filter(a => a.sentiment === 'BULLISH').length}
                  </div>
                </div>
              </motion.div>

              {/* Bearish */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 sm:gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/20">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bearish</div>
                  <div className="text-lg sm:text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {articles.filter(a => a.sentiment === 'BEARISH').length}
                  </div>
                </div>
              </motion.div>

              {/* Neutral */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 sm:gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-slate-500/20 to-gray-500/20">
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Neutral</div>
                  <div className="text-lg sm:text-2xl font-bold text-slate-600 dark:text-slate-400">
                    {articles.filter(a => a.sentiment === 'NEUTRAL').length}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex gap-2">
              {DATE_FILTERS.map((filter) => (
                <motion.button
                  key={filter.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedDateRange(filter.days);
                    setPage(1);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedDateRange === filter.days
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-white/80 dark:bg-neutral-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-600'
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="glass-strong rounded-2xl card-spacing shadow-2xl mb-6 sm:mb-8">
            <div className="flex flex-col gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-12 pr-4 py-3 sm:py-4 glass rounded-xl focus-ring smooth-transition text-sm sm:text-base dark:text-dark-text"
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
            <div className="glass-strong rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-red-200/50 dark:border-red-800/50 text-center">
              <p className="text-red-600 dark:text-red-400 text-base sm:text-lg font-medium">
                Error loading articles: {error.message}
              </p>
            </div>
          ) : isLoading ? (
            <ArticlesListSkeleton count={20} />
          ) : articles.length === 0 ? (
            <div className="glass-strong rounded-2xl p-8 sm:p-12 shadow-2xl text-center">
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
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
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

        {/* Back to Top Floating Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full shadow-2xl hover:shadow-glow-primary z-50 group"
              aria-label="Back to top"
            >
              <ArrowUpCircle className="w-6 h-6 group-hover:animate-bounce" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
