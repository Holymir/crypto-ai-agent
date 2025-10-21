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
        <div className="text-center section-spacing">
          <h1 className="text-display bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-muted">
            Real-time cryptocurrency news sentiment analysis
          </p>
        </div>

        {/* Stats Grid */}
        <StatsOverview stats={stats} className="mb-8 sm:mb-12" />

        {/* Charts Grid */}
        <SentimentCharts stats={stats} className="mb-8 sm:mb-12" />

        {/* Latest Articles */}
        <div className="glass-strong rounded-2xl card-spacing shadow-2xl">
          <h2 className="text-display-sm bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Latest Articles
          </h2>
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
