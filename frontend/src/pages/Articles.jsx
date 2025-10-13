import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';

export const Articles = () => {
  const [filters, setFilters] = useState({
    search: '',
    sentiment: '',
    source: '',
    page: 1,
    limit: 20,
  });

  const { data, isLoading, error } = useArticles(filters);

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleSentimentFilter = (sentiment) => {
    setFilters((prev) => ({
      ...prev,
      sentiment: prev.sentiment === sentiment ? '' : sentiment,
      page: 1,
    }));
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  const { articles = [], pagination = {} } = data || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">All Articles</h1>
        <p className="text-gray-600 mt-1">Browse and filter analyzed cryptocurrency news</p>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Sentiment Filters */}
          <div className="flex gap-2">
            <button
              onClick={() => handleSentimentFilter('BULLISH')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.sentiment === 'BULLISH'
                  ? 'bg-bullish-100 text-bullish-700 border-2 border-bullish-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bullish
            </button>
            <button
              onClick={() => handleSentimentFilter('BEARISH')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.sentiment === 'BEARISH'
                  ? 'bg-bearish-100 text-bearish-700 border-2 border-bearish-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Bearish
            </button>
            <button
              onClick={() => handleSentimentFilter('NEUTRAL')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filters.sentiment === 'NEUTRAL'
                  ? 'bg-neutral-100 text-neutral-700 border-2 border-neutral-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Neutral
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(filters.sentiment || filters.search) && (
          <div className="mt-4 flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.sentiment && (
              <span className="badge-neutral">{filters.sentiment}</span>
            )}
            {filters.search && (
              <span className="badge-neutral">Search: "{filters.search}"</span>
            )}
            <button
              onClick={() => setFilters({ search: '', sentiment: '', source: '', page: 1, limit: 20 })}
              className="text-sm text-blue-600 hover:text-blue-700 ml-2"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No articles found matching your filters.</p>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <SentimentBadge sentiment={article.sentiment} />
                    <span className="text-sm text-gray-500">{article.source}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h3>
                  {article.content && article.content !== 'Historical article - content not available' && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {article.content}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Published: {new Date(article.publishedAt).toLocaleString()}</span>
                    {article.url && (
                      <>
                        <span>•</span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Read more →
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
