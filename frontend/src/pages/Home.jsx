import { Activity, Sparkles } from 'lucide-react';
import { useSentimentStats, useSentimentTrend } from '../hooks/useArticles';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatsOverviewSkeleton, ChartSkeleton } from '../components/Skeleton';
import { Navigation } from '../components/Navigation';
import { StatsOverview } from '../components/StatsOverview';
import { SentimentCharts } from '../components/SentimentCharts';
import { SEO } from '../components/SEO';

export const Home = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats();
  const { data: trendData, isLoading: trendLoading } = useSentimentTrend(7);

  const isInitialLoading = statsLoading || trendLoading;

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
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-secondary-300 to-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-primary-300 to-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-xl transform hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
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
              <SentimentCharts stats={stats} trendData={trendData} className="mb-8 sm:mb-12" />
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
