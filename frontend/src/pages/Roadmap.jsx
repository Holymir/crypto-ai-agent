import { CheckCircle2, Clock, Zap, TrendingUp, Target, Rocket, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const Roadmap = () => {
  const roadmapPhases = [
    {
      phase: 'Completed',
      icon: CheckCircle2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      items: [
        {
          title: 'AI-Powered Sentiment Analysis',
          description: 'Real-time sentiment scoring using GPT-4 for crypto news articles',
          status: 'completed'
        },
        {
          title: 'Multi-Source News Aggregation',
          description: '50+ crypto news sources with automated fetching and analysis',
          status: 'completed'
        },
        {
          title: 'Interactive Dashboard',
          description: 'Beautiful dashboard with sentiment trends, charts, and insights',
          status: 'completed'
        },
        {
          title: 'Advanced Article Filtering',
          description: 'Search and filter by sentiment, asset, category, and keywords',
          status: 'completed'
        },
        {
          title: 'Professional UI/UX',
          description: 'Dark mode, glassmorphism design, and mobile-responsive layout',
          status: 'completed'
        },
        {
          title: 'Public API',
          description: 'REST API for programmatic access to sentiment data',
          status: 'completed'
        }
      ]
    },
    {
      phase: 'In Progress',
      icon: Clock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      items: [
        {
          title: 'Visual Currency Sentiments',
          description: 'Real-time sentiment heatmap for top cryptocurrencies with color-coded cards',
          status: 'in-progress',
          eta: '1 week'
        },
        {
          title: 'Enhanced Analytics',
          description: 'Advanced sentiment correlation and trend prediction algorithms',
          status: 'in-progress',
          eta: '2 weeks'
        }
      ]
    },
    {
      phase: 'Next Up',
      icon: Target,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      items: [
        {
          title: 'Mainstream Finance News Sentiment (MFNS)',
          description: 'Integrate traditional finance news (Bloomberg, CNBC, WSJ) to correlate with crypto sentiment',
          status: 'planned',
          eta: '3-4 weeks'
        },
        {
          title: 'Portfolio Integration',
          description: 'Connect crypto wallets to see personalized sentiment for your holdings',
          status: 'planned',
          eta: '4-5 weeks'
        },
        {
          title: 'Sentiment Alerts',
          description: 'Real-time notifications for major sentiment shifts via email/Discord/Telegram',
          status: 'planned',
          eta: '5-6 weeks'
        },
        {
          title: 'Historical Backtesting',
          description: 'Analyze how sentiment correlated with price movements historically',
          status: 'planned',
          eta: '6-8 weeks'
        }
      ]
    },
    {
      phase: 'Future Vision',
      icon: Rocket,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      items: [
        {
          title: 'AI Trading Signals',
          description: 'ML-powered trading signals based on sentiment analysis and market data',
          status: 'research',
          eta: '3+ months'
        },
        {
          title: 'Social Sentiment Integration',
          description: 'Twitter, Reddit, and Telegram sentiment analysis integrated with news data',
          status: 'research',
          eta: '3+ months'
        },
        {
          title: 'Premium Analytics Suite',
          description: 'Advanced tools for professional traders and analysts',
          status: 'research',
          eta: '4+ months'
        },
        {
          title: 'Mobile Apps',
          description: 'Native iOS and Android apps for on-the-go sentiment tracking',
          status: 'research',
          eta: '5+ months'
        },
        {
          title: 'API Marketplace',
          description: 'Developer ecosystem for building custom sentiment applications',
          status: 'research',
          eta: '6+ months'
        }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      completed: { label: 'Completed', color: 'bg-green-500 text-white' },
      'in-progress': { label: 'In Progress', color: 'bg-blue-500 text-white' },
      planned: { label: 'Planned', color: 'bg-amber-500 text-white' },
      research: { label: 'Research', color: 'bg-purple-500 text-white' }
    };
    return badges[status] || badges.planned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Product Roadmap"
        description="See what we're building at SentiFi. Our roadmap shows completed features, current progress, and future plans for crypto sentiment analysis."
        keywords="roadmap, product roadmap, development roadmap, crypto sentiment, upcoming features"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Product Roadmap
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Building the{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Future of Sentiment
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Track our progress as we build the most comprehensive crypto sentiment analysis platform.
              Transparency is at the core of what we do.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">6</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Planned</div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Future Vision</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Last Updated */}
        <ScrollReveal>
          <div className="glass-strong rounded-xl p-4 mb-12 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Last Updated:</span> October 29, 2025
              <span className="mx-2">•</span>
              <span className="font-semibold text-gray-900 dark:text-white">Version:</span> 2.0
            </p>
          </div>
        </ScrollReveal>

        {/* Roadmap Phases */}
        <div className="space-y-12">
          {roadmapPhases.map((phase, phaseIndex) => (
            <ScrollReveal key={phase.phase}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: phaseIndex * 0.1 }}
              >
                {/* Phase Header */}
                <div className={`flex items-center gap-3 mb-6 pb-4 border-b-2 ${phase.borderColor}`}>
                  <div className={`p-3 rounded-xl ${phase.bgColor}`}>
                    <phase.icon className={`w-6 h-6 ${phase.color}`} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {phase.phase}
                  </h2>
                </div>

                {/* Phase Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {phase.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIndex * 0.05 }}
                      className="glass-strong rounded-2xl p-6 hover-lift border-l-4"
                      style={{ borderLeftColor: phase.color.replace('text-', '') }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-2">
                          {item.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getStatusBadge(item.status).color}`}>
                          {getStatusBadge(item.status).label}
                        </span>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {item.description}
                      </p>

                      {item.eta && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500 dark:text-gray-400">
                            ETA: {item.eta}
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA Section */}
        <ScrollReveal>
          <div className="mt-16 glass-strong rounded-2xl p-8 sm:p-12 text-center">
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Want to Shape Our Roadmap?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              We value community feedback! Share your ideas for features you'd like to see,
              or report bugs and issues on our GitHub repository.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://github.com/Holymir/crypto-ai-agent/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all hover-lift"
              >
                <Zap className="w-5 h-5" />
                Request a Feature
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 glass-strong rounded-xl font-semibold text-gray-900 dark:text-white shadow-xl hover:shadow-2xl transition-all hover-lift"
              >
                Contact Us
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
};
