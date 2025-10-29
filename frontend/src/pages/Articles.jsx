import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, TrendingUp, TrendingDown, Minus, Calendar, BarChart3, ArrowUpCircle, Loader2, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInfiniteArticles } from '../hooks/useArticles';
import { useCountUp } from '../hooks/useCountUp';
import { Navigation } from '../components/Navigation';
import { ArticleCard } from '../components/ArticleCard';
import { ArticlesListSkeleton } from '../components/Skeleton';
import { ScrollReveal } from '../components/ScrollReveal';
import { SEO } from '../components/SEO';
import { FilterButtonGroup } from '../components/FilterButtonGroup';
import { DATE_FILTERS } from '../constants/filters';

export const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedSentiment, setSelectedSentiment] = useState(searchParams.get('sentiment') || '');
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Intersection Observer ref for infinite scroll
  const loadMoreRef = useRef(null);

  // Build query params, excluding empty values
  const articleParams = {
    limit: 20,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedSentiment && { sentiment: selectedSentiment }),
    ...(selectedDateRange && { days: selectedDateRange }),
    orderBy: 'publishedAt',
    order: 'desc',
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useInfiniteArticles(articleParams);

  // Flatten all pages into a single articles array
  const articles = data?.pages?.flatMap((page) => page.articles) || [];
  const totalCount = data?.pages?.[0]?.pagination?.total || 0;
  const animatedCount = useCountUp(totalCount, 1000);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSentimentFilter = (sentiment) => {
    setSelectedSentiment(selectedSentiment === sentiment ? '' : sentiment);
  };

  // Infinite scroll with Intersection Observer
  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    const option = { threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  // Scroll listener for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Articles"
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
          <div className="glass-strong rounded-2xl p-4 sm:p-6 mb-4 shadow-2xl hover-lift hover-glow-secondary">
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-bullish-500/20 to-bullish-500/20">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-bullish-600 dark:text-bullish-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bullish</div>
                  <div className="text-lg sm:text-2xl font-bold text-bullish-600 dark:text-bullish-400">
                    {articles.filter(a => a.sentiment === 'BULLISH').length}
                    {totalCount > articles.length && (
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                        / {Math.round((articles.filter(a => a.sentiment === 'BULLISH').length / articles.length) * totalCount)}
                      </span>
                    )}
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
                <div className="p-2 rounded-lg bg-gradient-to-br from-bearish-500/20 to-bearish-500/20">
                  <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-bearish-600 dark:text-bearish-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Bearish</div>
                  <div className="text-lg sm:text-2xl font-bold text-bearish-600 dark:text-bearish-400">
                    {articles.filter(a => a.sentiment === 'BEARISH').length}
                    {totalCount > articles.length && (
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                        / {Math.round((articles.filter(a => a.sentiment === 'BEARISH').length / articles.length) * totalCount)}
                      </span>
                    )}
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
                    {totalCount > articles.length && (
                      <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                        / {Math.round((articles.filter(a => a.sentiment === 'NEUTRAL').length / articles.length) * totalCount)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Date Range Filters */}
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <FilterButtonGroup
              options={DATE_FILTERS}
              selected={selectedDateRange}
              onChange={setSelectedDateRange}
              variant="primary"
            />
          </div>
        </motion.div>

        {/* Search and Filters */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="glass-strong rounded-2xl card-spacing shadow-2xl hover-lift hover-glow mb-6 sm:mb-8">
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
                      ? 'bg-gradient-to-r from-bullish-500 to-bullish-600 text-white shadow-xl scale-105 border-2 border-bullish-400'
                      : 'bg-gradient-to-r from-bullish-50 to-bullish-50 dark:from-bullish-900/20 dark:to-bullish-900/20 text-bullish-700 dark:text-bullish-400 hover:from-bullish-100 hover:to-bullish-100 dark:hover:from-bullish-900/30 dark:hover:to-bullish-900/30 border-2 border-bullish-200 dark:border-bullish-700'
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
                      ? 'bg-gradient-to-r from-bearish-500 to-bearish-600 text-white shadow-xl scale-105 border-2 border-bearish-400'
                      : 'bg-gradient-to-r from-bearish-50 to-bearish-50 dark:from-bearish-900/20 dark:to-bearish-900/20 text-bearish-700 dark:text-bearish-400 hover:from-bearish-100 hover:to-bearish-100 dark:hover:from-bearish-900/30 dark:hover:to-bearish-900/30 border-2 border-bearish-200 dark:border-bearish-700'
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
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full font-medium"
                    >
                      Sentiment: {selectedSentiment}
                      <button
                        onClick={() => setSelectedSentiment('')}
                        className="ml-1 hover:text-purple-900 dark:hover:text-purple-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  )}

                  {searchTerm && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-medium"
                    >
                      Search: &quot;{searchTerm}&quot;
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-1 hover:text-blue-900 dark:hover:text-blue-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedSentiment('');
                      setSearchParams({});
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-full font-medium transition-colors"
                  >
                    <X className="w-3 h-3" />
                    Clear all
                  </motion.button>
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
                Total articles available: {totalCount}
              </p>
            </div>
          ) : (
            <>
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="py-8">
                {isFetchingNextPage && (
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                    <span className="text-gray-600 dark:text-dark-muted font-medium">
                      Loading more articles...
                    </span>
                  </div>
                )}
                {!hasNextPage && articles.length > 0 && (
                  <div className="text-center text-gray-500 dark:text-dark-muted text-sm">
                    You've reached the end • {totalCount} total articles
                  </div>
                )}
              </div>
            </>
          )}
        </div>


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
