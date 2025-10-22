import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSentimentStats, useLatestArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { Navigation } from '../components/Navigation';
import { StatsOverview } from '../components/StatsOverview';
import { SentimentCharts } from '../components/SentimentCharts';
import { SentimentGauge } from '../components/SentimentGauge';
import { TopSources } from '../components/TopSources';
import { QuickInsights } from '../components/QuickInsights';
import { SEO } from '../components/SEO';

const TIME_PERIODS = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
];

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats({ days: selectedPeriod });
  const { data: latestData, isLoading: latestLoading } = useLatestArticles(5);

  // TODO: Fetch real previous period stats from API
  // For now, calculate mock previous stats (90% of current) to show trend indicators
  // In reality, this should fetch stats for the same period duration, but one period earlier
  // e.g., if viewing last 7 days, compare to the 7 days before that
  const previousStats = stats ? {
    total: Math.floor((stats.total || 0) * 0.9),
    BULLISH: Math.floor((stats.BULLISH || 0) * 0.85),
    BEARISH: Math.floor((stats.BEARISH || 0) * 1.1),
    NEUTRAL: Math.floor((stats.NEUTRAL || 0) * 0.95),
  } : null;

  // Calculate sentiment score (0-100)
  // Formula: (Bullish% - Bearish%) normalized to 0-100 scale
  // 100% bullish = 100, 100% bearish = 0, equal mix = 50
  const calculateSentimentScore = (data) => {
    if (!data || data.total === 0) return 50;
    const bullishPercent = (data.BULLISH / data.total) * 100;
    const bearishPercent = (data.BEARISH / data.total) * 100;
    // Score = 50 + (bullish% - bearish%) / 2
    // This maps: 100% bullish -> 100, 100% bearish -> 0, 50/50 -> 50
    return Math.round(50 + (bullishPercent - bearishPercent) / 2);
  };

  const sentimentScore = calculateSentimentScore(stats);

  // Get sentiment info for hero
  const getSentimentHero = (score) => {
    if (score >= 70) {
      return {
        mood: 'Bullish',
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'from-emerald-500/20 to-green-500/20',
        icon: TrendingUp,
        description: 'Strong positive sentiment detected in the crypto market',
      };
    } else if (score <= 30) {
      return {
        mood: 'Bearish',
        color: 'text-rose-600 dark:text-rose-400',
        bgColor: 'from-rose-500/20 to-red-500/20',
        icon: TrendingDown,
        description: 'Cautious sentiment prevails across crypto news',
      };
    } else {
      return {
        mood: 'Neutral',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'from-slate-500/20 to-gray-500/20',
        icon: Activity,
        description: 'Balanced sentiment across the crypto market',
      };
    }
  };

  const sentimentHero = getSentimentHero(sentimentScore);

  // Last updated time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  if (statsLoading || latestLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
        <Navigation />
        <ErrorMessage message={statsError.message} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Analytics Dashboard"
        description="View comprehensive cryptocurrency sentiment analytics, market trends, and the latest news analysis in one dashboard."
        keywords="crypto dashboard, sentiment analytics, market trends, crypto statistics, real-time analysis"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-spacing"
        >
          {/* Main Title with Dynamic Sentiment */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Market Sentiment
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
              />
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Live</span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <sentimentHero.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${sentimentHero.color}`} />
              <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${sentimentHero.color}`}>
                {sentimentHero.mood}
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-muted max-w-2xl mx-auto mb-6">
              {sentimentHero.description}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className={`glass-strong rounded-2xl p-6 mb-6 bg-gradient-to-r ${sentimentHero.bgColor} border-2 border-white/20 dark:border-white/10`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Sentiment Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 p-3 glass rounded-xl"
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${sentimentHero.bgColor}`}>
                  <Activity className={`w-5 h-5 ${sentimentHero.color}`} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Score</div>
                  <div className={`text-2xl font-bold ${sentimentHero.color}`}>{sentimentScore}/100</div>
                </div>
              </motion.div>

              {/* Total Articles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Articles</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-dark-text">{stats?.total || 0}</div>
                </div>
              </motion.div>

              {/* Last Updated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3 p-3 glass rounded-xl"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Updated</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-dark-text">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Time Period Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-dark-muted">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold">Time Period:</span>
            </div>
            <div className="flex gap-2">
              {TIME_PERIODS.map((period) => (
                <motion.button
                  key={period.days}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPeriod(period.days)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedPeriod === period.days
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-glow-primary'
                      : 'bg-white/80 dark:bg-neutral-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-600'
                  }`}
                >
                  {period.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <StatsOverview stats={stats} previousStats={previousStats} period={selectedPeriod} className="mb-8 sm:mb-12" />

        {/* Sentiment Score Gauge & Top Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <SentimentGauge score={sentimentScore} />
          <TopSources period={selectedPeriod} />
        </div>

        {/* Charts Grid */}
        <SentimentCharts stats={stats} className="mb-8 sm:mb-12" />

        {/* Quick Insights */}
        <QuickInsights stats={stats} className="mb-8 sm:mb-12" />

        {/* Latest Articles */}
        <div className="glass-strong rounded-2xl card-spacing shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-display-sm bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <Link
              to="/articles"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all hover-lift"
            >
              View All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestData?.articles?.map((article) => (
              <div
                key={article.id}
                className="flex items-start justify-between p-4 glass rounded-xl hover-lift smooth-transition"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text text-sm sm:text-base mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-600 dark:text-dark-muted">
                    <span className="font-medium">{article.source}</span>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <SentimentBadge sentiment={article.sentiment} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
