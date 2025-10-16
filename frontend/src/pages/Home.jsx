import { Activity, Sparkles, TrendingUp, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSentimentStats } from '../hooks/useArticles';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatsOverviewSkeleton, ChartSkeleton } from '../components/Skeleton';
import { Navigation } from '../components/Navigation';
import { StatsOverview } from '../components/StatsOverview';
import { SentimentCharts } from '../components/SentimentCharts';
import { SEO } from '../components/SEO';

export const Home = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats();

  const isInitialLoading = statsLoading;

  if (statsError) {
    return <ErrorMessage message={statsError.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Home"
        description="Real-time cryptocurrency sentiment analysis powered by AI. Track market mood with advanced sentiment analytics for Bitcoin, Ethereum, and more."
        keywords="crypto sentiment analysis, cryptocurrency news, bitcoin sentiment, ethereum analysis, AI crypto analytics, market sentiment tracker"
      />

      <Navigation />

      {/* Hero Section with Stats */}
      <div id="home" className="relative overflow-hidden scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              {/* <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-xl transform hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div> */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent">
                AI-Powered Crypto News Sentiment
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-dark-muted max-w-2xl mx-auto px-4">
              Because every market move starts with a story — and crypto news is where those stories ignite.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-muted font-medium">Powered by OpenAI GPT-3.5</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/articles">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white dark:bg-dark-card text-primary-600 dark:text-primary-400 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-primary-200 dark:border-primary-800"
                >
                  Browse Articles
                </motion.button>
              </Link>
            </div>

            {/* Social Proof - Live Stats */}
            {!isInitialLoading && stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-10 text-sm sm:text-base text-gray-600 dark:text-dark-muted"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.total.toLocaleString()}</span>
                  <span>Articles Analyzed</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">Live Updates</span>
                  <span>Every 2 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary-500" />
                  <span className="font-semibold text-gray-900 dark:text-white">AI-Powered</span>
                  <span>Sentiment Analysis</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-dark-border hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-Time Analysis</h3>
              <p className="text-gray-600 dark:text-dark-muted">
                Get instant AI-powered sentiment analysis on the latest crypto news from top sources every 2 hours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-dark-border hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Visual Insights</h3>
              <p className="text-gray-600 dark:text-dark-muted">
                Track sentiment trends with interactive charts and comprehensive analytics dashboards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-lg border border-neutral-200 dark:border-dark-border hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-200 dark:from-primary-900/30 dark:to-secondary-800/30 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Trusted Sources</h3>
              <p className="text-gray-600 dark:text-dark-muted">
                Aggregates news from CoinDesk, CoinTelegraph, and other leading crypto news platforms.
              </p>
            </motion.div>
          </div>

          {/* Stats Cards */}
          {isInitialLoading ? (
            <StatsOverviewSkeleton />
          ) : (
            <StatsOverview stats={stats} className="mb-8 sm:mb-12" />
          )}

          {/* Charts Section */}
          <div id="analytics" className="scroll-mt-20">
            {isInitialLoading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                <ChartSkeleton />
                <ChartSkeleton />
              </div>
            ) : (
              <SentimentCharts stats={stats} className="mb-8 sm:mb-12" />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-6 shadow-lg">
          <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Updates every 2 hours • Built with React, Tailwind CSS, and OpenAI
          </p>
        </div>
      </div>
    </div>
  );
};
