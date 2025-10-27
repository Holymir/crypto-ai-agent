import { ArrowRight, Brain, Clock, Database, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSentimentStats } from '../hooks/useArticles';
import { ErrorMessage } from '../components/ErrorMessage';
import { Navigation } from '../components/Navigation';
import { SEO } from '../components/SEO';
import dashboardDemo from '../assets/dashboard-demo.png';
import { motion } from 'framer-motion';


export const Home = () => {
  const { data: stats, error: statsError } = useSentimentStats();

  if (statsError) {
    return <ErrorMessage message={statsError.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="SentiFi"
        description="Real-time cryptocurrency media sentiment analysis powered by AI. Track how crypto is portrayed in the news with advanced sentiment analytics from hundreds of sources."
        keywords="crypto media sentiment, cryptocurrency news analysis, bitcoin news sentiment, media coverage analytics, AI news sentiment, crypto journalism tracker"
      />

      <Navigation />

      {/* Hero Section with Stats */}
      <div id="home" className="relative overflow-hidden scroll-mt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-800 -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
          {/* Enhanced Hero Section - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 sm:mb-20">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              {/* Eyebrow Text */}
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse"></div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  AI-Powered Market Intelligence
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                Ignore the noise.
                <br />
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent">
                  Don't fall for short-term FUD.
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
                In crypto, <strong className="text-gray-900 dark:text-white">information travels faster than price</strong>. Every headline, tweet, and rumor sparks waves of emotion — fear, greed, and FOMO. But not all news deserves your reaction.
              </p>

              <p className="text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
                Our AI reads the markets the way traders wish they could: by analyzing sentiment across hundreds of crypto and mainstream news sources, <strong className="text-gray-900 dark:text-white">separating real shifts from emotional noise</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    View Dashboard
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link to="/articles">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-10 py-4 bg-transparent text-gray-700 dark:text-dark-text rounded-xl font-semibold text-base hover:bg-white/50 dark:hover:bg-dark-card/50 transition-all duration-300 border-2 border-gray-300 dark:border-dark-border"
                  >
                    Explore Articles
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Dashboard Screenshot (Hidden on Mobile) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              {/* Dashboard Screenshot with Mockup Frame */}
              <div className="relative group">
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>

                {/* Screenshot Container */}
                <div className="relative glass-strong rounded-2xl p-4 shadow-2xl border-2 border-primary-200/30 dark:border-primary-800/30 overflow-hidden">
                  {/* Browser Chrome Mockup */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 mx-4 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-500 dark:text-gray-400">
                      dashboard
                    </div>
                  </div>

                  {/* Actual Screenshot */}
                  <img
                    src={dashboardDemo}
                    alt="Crypto Sentiment Analysis Dashboard - Real-time sentiment tracking with AI-powered insights"
                    className="w-full h-auto rounded-lg shadow-lg"
                    loading="eager"
                  />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-gradient-to-br from-secondary-400/10 to-primary-400/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>

          {/* Trust Signals - Live Stats */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-8 px-8 py-6 glass-strong rounded-2xl shadow-xl mb-16 sm:mb-20"
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
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">Every 2hrs</div>
                  <div className="text-sm text-gray-600 dark:text-dark-muted">Auto Updates</div>
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

          {/* Why It Matters Section */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-4">
                <span className="text-2xl">💡</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Why It Matters</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Markets React to News, but News Reflects the Market.
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-muted max-w-3xl mx-auto leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Crypto news within the community</strong> often drives what the degens feel and expect, while <strong className="text-gray-900 dark:text-white">crypto coverage in mainstream media</strong> signals what the mass retail crowd is about to do.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-strong rounded-2xl p-8 shadow-lg hover-lift border-2 border-primary-200/30 dark:border-primary-800/30"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  Leading Indicator
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  By tracking both crypto-native and mainstream sentiment, we turn news into a <strong className="text-gray-900 dark:text-white">psychological map of fear and greed</strong> — a leading indicator of market mood before the price chart shows it.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-strong rounded-2xl p-8 shadow-lg hover-lift border-2 border-secondary-200/30 dark:border-secondary-800/30"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                    <LineChart className="w-6 h-6 text-white" />
                  </div>
                  See Before Others
                </h3>
                <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                  Our analytics let you see when the crowd is <strong className="text-gray-900 dark:text-white">euphoric, cautious, or panicking</strong> — giving you the edge to anticipate moves instead of chasing them.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Our Mission Section */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-3xl p-12 shadow-2xl border-2 border-primary-200/30 dark:border-primary-800/30 text-center relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-primary-900/10 dark:via-secondary-900/10 dark:to-primary-900/10 opacity-50"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6">
                  <span className="text-2xl">🚀</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Our Mission</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 max-w-3xl mx-auto leading-tight">
                  Give Traders a Smarter Lens on the Market
                </h2>

                <p className="text-lg text-gray-600 dark:text-dark-muted max-w-3xl mx-auto leading-relaxed mb-6">
                  Not through speculation, but through <strong className="text-gray-900 dark:text-white">data-driven sentiment intelligence</strong>.
                </p>

                <p className="text-lg text-gray-600 dark:text-dark-muted max-w-3xl mx-auto leading-relaxed">
                  We believe the future of trading is <strong className="text-gray-900 dark:text-white">emotion-aware</strong>, and understanding the crowd is the edge that separates winners from followers.
                </p>
              </div>
            </motion.div>
          </div>

          {/* How It Works Section */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-4">
                <span className="text-2xl">🔍</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">How It Works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                AI That Reads the Market for You
              </h2>
              <p className="text-lg text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
                Our AI scans and classifies news in real time, turning information into actionable intelligence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Connecting Line (Desktop only) */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-200 dark:from-primary-900 dark:via-secondary-900 dark:to-primary-900 -z-10" style={{ top: '64px' }}></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="relative"
              >
                <div className="glass-strong rounded-2xl p-6 shadow-lg hover-lift border-2 border-primary-200/50 dark:border-primary-800/50 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Scans News</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    Continuously monitors hundreds of crypto and mainstream news sources in real time
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
                <div className="glass-strong rounded-2xl p-6 shadow-lg hover-lift border-2 border-secondary-200/50 dark:border-secondary-800/50 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float" style={{ animationDelay: '0.3s' }}>
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Detects Tone</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    Identifies keywords, emotional triggers, and context to understand true sentiment
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="glass-strong rounded-2xl p-6 shadow-lg hover-lift border-2 border-primary-200/50 dark:border-primary-800/50 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float" style={{ animationDelay: '0.6s' }}>
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Measures Sentiment</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    Tracks sentiment across crypto-native and mainstream media sources
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="glass-strong rounded-2xl p-6 shadow-lg hover-lift border-2 border-secondary-200/50 dark:border-secondary-800/50 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl animate-float" style={{ animationDelay: '0.9s' }}>
                    <span className="text-3xl font-bold text-white">4</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center">Visualizes Mood</h3>
                  <p className="text-sm text-gray-600 dark:text-dark-muted text-center leading-relaxed">
                    Shows you mood shifts so you can anticipate moves, not chase them
                  </p>
                </div>
              </motion.div>
            </div>
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
