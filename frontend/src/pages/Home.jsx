import { Activity, Sparkles, TrendingUp, Zap, Shield, BarChart3, ArrowRight, Brain, Clock, Database, LineChart } from 'lucide-react';
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
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-4 mb-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Make Smarter Crypto Decisions
              </h1>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent">
                With AI Sentiment Analysis
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-dark-muted max-w-3xl mx-auto px-4 mb-8"
            >
              Track real-time market sentiment from thousands of crypto news articles. Get actionable insights updated every 2 hours to stay ahead of market trends.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link to="/articles">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-12 py-5 bg-transparent text-gray-700 dark:text-dark-text rounded-xl font-semibold text-lg hover:bg-white/50 dark:hover:bg-dark-card/50 transition-all duration-300 border-2 border-gray-300 dark:border-dark-border"
                >
                  Explore Articles
                </motion.button>
              </Link>
            </motion.div>

            {/* Social Proof - Live Stats */}
            {!isInitialLoading && stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex flex-wrap items-center justify-center gap-8 px-8 py-4 glass-strong rounded-2xl shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 dark:text-dark-muted">Articles Analyzed</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-300 dark:bg-dark-border hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">2hrs</div>
                    <div className="text-sm text-gray-600 dark:text-dark-muted">Update Frequency</div>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-300 dark:bg-dark-border hidden sm:block"></div>
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">GPT-3.5</div>
                    <div className="text-sm text-gray-600 dark:text-dark-muted">AI-Powered</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Why Use Our Platform?
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
                Everything you need to understand crypto market sentiment at a glance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass rounded-2xl card-spacing shadow-lg hover-lift hover-glow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">AI-Powered Insights</h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Advanced GPT-3.5 analysis evaluates sentiment from thousands of articles, identifying bullish, bearish, or neutral trends to help you make informed decisions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl card-spacing shadow-lg hover-lift hover-glow-secondary"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <LineChart className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Monitor sentiment changes with interactive charts and dashboards. Automatic updates every 2 hours ensure you never miss important market shifts.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl card-spacing shadow-lg hover-lift hover-glow"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Premium Sources</h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Curated content from CoinDesk, CoinTelegraph, and leading crypto publications. Only reliable, high-quality sources for accurate sentiment analysis.
                </p>
              </motion.div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
                Simple, automated sentiment analysis in three steps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-200 dark:from-primary-900 dark:via-secondary-900 dark:to-primary-900 -z-10" style={{ top: '64px' }}></div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="glass rounded-2xl card-spacing shadow-lg hover-lift border-2 border-primary-200/50 dark:border-primary-800/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">News Aggregation</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    Our system continuously collects crypto news from trusted sources like CoinDesk, CoinTelegraph, and more.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="glass rounded-2xl card-spacing shadow-lg hover-lift border-2 border-secondary-200/50 dark:border-secondary-800/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float" style={{ animationDelay: '0.5s' }}>
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">AI Analysis</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    GPT-3.5 analyzes each article to determine sentiment (positive, negative, or neutral) with high accuracy.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="glass rounded-2xl card-spacing shadow-lg hover-lift border-2 border-primary-200/50 dark:border-primary-800/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">Visual Insights</h3>
                  <p className="text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    View trends through interactive charts and dashboards, updated every 2 hours for real-time market insights.
                  </p>
                </div>
              </motion.div>
            </div>
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

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 rounded-3xl p-12 sm:p-16 text-center shadow-2xl"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Stay Ahead of the Market?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join traders and investors using AI-powered sentiment analysis to make smarter crypto decisions.
          </p>
          <Link to="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-white text-primary-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
            >
              Start Analyzing Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
          <p className="text-sm text-white/70 mt-6">No credit card required • Free to use</p>
        </motion.div>
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
