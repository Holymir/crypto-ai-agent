import { Brain, TrendingUp, Zap, Target, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const About = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced GPT-powered sentiment analysis reads between the lines to understand true market sentiment.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Tracking',
      description: 'Continuous monitoring of hundreds of news sources with automated updates every hour.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Instant Insights',
      description: 'Get immediate access to sentiment trends, keyword analysis, and market mood indicators.',
      color: 'from-orange-500 to-amber-500'
    },
    {
      icon: Target,
      title: 'Actionable Data',
      description: 'Turn news sentiment into trading signals with our comprehensive analytics dashboard.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { label: 'News Sources', value: '50+' },
    { label: 'Articles Analyzed', value: '10K+' },
    { label: 'Daily Updates', value: '24x' },
    { label: 'Accuracy Rate', value: '95%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="About"
        description="Learn about SentiFi - AI-powered crypto sentiment analysis platform. Our mission, technology, and team behind the sentiment intelligence."
        keywords="about sentifi, crypto sentiment analysis, AI news analysis, team, mission"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                About SentiFi
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Understanding Market{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Sentiment
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We turn crypto news into actionable intelligence using AI-powered sentiment analysis.
              Our mission is to help traders and investors make smarter decisions by understanding market psychology.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-6 text-center hover-lift"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Mission Section */}
        <ScrollReveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              In crypto markets, information travels faster than price. Every headline, tweet, and news article
              influences trader psychology and market movements. But separating signal from noise is nearly impossible
              for human traders monitoring hundreds of sources.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">SentiFi</strong> was built to solve this problem.
              We use advanced AI to analyze sentiment across crypto media in real-time, giving you a clear view of
              market psychology before it shows up in price charts.
            </p>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-strong rounded-2xl p-8 shadow-xl hover-lift hover-glow"
                  >
                    <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Technology Section */}
        <ScrollReveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Our Technology
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                <strong className="text-gray-900 dark:text-white">AI-Powered Analysis:</strong> We use OpenAI's GPT models
                to understand context, tone, and implications in news articles - not just keyword matching.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Multi-Source Aggregation:</strong> Our system monitors
                50+ crypto news sources, from major outlets to niche crypto media, giving you comprehensive market coverage.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Real-Time Processing:</strong> Articles are analyzed
                and classified within minutes of publication, ensuring you always have the latest sentiment data.
              </p>
              <p>
                <strong className="text-gray-900 dark:text-white">Advanced Visualization:</strong> Interactive dashboards
                turn complex data into clear, actionable insights with trend charts, heatmaps, and keyword analysis.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Values Section */}
        <ScrollReveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl hover-lift">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Transparency</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We show you the data and methodology behind every sentiment score
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Accuracy</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Continuous improvement of our AI models to provide the most accurate analysis
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Making professional-grade sentiment analysis available to all traders
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Start Analyzing?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of traders using SentiFi to gain an edge in crypto markets
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                View Dashboard
              </motion.button>
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
};
