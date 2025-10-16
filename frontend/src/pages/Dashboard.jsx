import { useSentimentStats, useLatestArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { Navigation } from '../components/Navigation';
import { StatsOverview } from '../components/StatsOverview';
import { SentimentCharts } from '../components/SentimentCharts';
import { SEO } from '../components/SEO';

export const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats();
  const { data: latestData, isLoading: latestLoading } = useLatestArticles(5);

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
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-dark-muted">
            Real-time cryptocurrency news sentiment analysis
          </p>
        </div>

        {/* Stats Grid */}
        <StatsOverview stats={stats} className="mb-8 sm:mb-12" />

        {/* Charts Grid */}
        <SentimentCharts stats={stats} className="mb-8 sm:mb-12" />

        {/* Latest Articles */}
        <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-primary-200 dark:border-dark-border">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Latest Articles
          </h2>
          <div className="space-y-4">
            {latestData?.articles?.map((article) => (
              <div
                key={article.id}
                className="flex items-start justify-between p-4 bg-gradient-to-r from-gray-50 to-purple-50/50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl hover:shadow-md transition-all hover:scale-[1.02]"
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
