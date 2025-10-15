import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, BarChart3, Search, Sparkles, Zap, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { useSentimentStats, useSentimentTrend, useLatestArticles, useArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { ArticleCard } from '../components/ArticleCard';
import { StatsOverviewSkeleton, ChartSkeleton, ArticlesListSkeleton } from '../components/Skeleton';

const COLORS = {
  BULLISH: '#22c55e',
  BEARISH: '#ef4444',
  NEUTRAL: '#64748b',
};

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState('');
  const [page, setPage] = useState(1);

  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats();
  const { data: trendData, isLoading: trendLoading } = useSentimentTrend(7);

  // Build query params, excluding empty values
  const articleParams = {
    page: page,
    limit: 10,
    ...(searchTerm && { search: searchTerm }),
    ...(selectedSentiment && { sentiment: selectedSentiment }),
  };

  const { data: articlesData, isLoading: articlesLoading, error: articlesError } = useArticles(articleParams);

  // Debug logging
  console.log('Articles Data:', articlesData);
  console.log('Articles Loading:', articlesLoading);
  console.log('Articles Error:', articlesError);

  // Keep loading states but render skeleton UI instead of spinner
  const isInitialLoading = statsLoading || trendLoading;

  if (statsError) {
    return <ErrorMessage message={statsError.message} />;
  }

  const pieData = [
    { name: 'Bullish', value: stats?.BULLISH || 0 },
    { name: 'Bearish', value: stats?.BEARISH || 0 },
    { name: 'Neutral', value: stats?.NEUTRAL || 0 },
  ].filter(item => item.value > 0);

  const trendChartData = trendData?.trend || [];
  const articles = articlesData?.articles || [];
  const pagination = articlesData?.pagination || { page: 1, totalPages: 1, total: 0 };

  const bullishPercentage = stats?.total > 0 ? Math.round((stats?.BULLISH / stats?.total) * 100) : 0;
  const bearishPercentage = stats?.total > 0 ? Math.round((stats?.BEARISH / stats?.total) * 100) : 0;

  // Handle filter changes - reset to page 1
  const handleSentimentChange = (sentiment) => {
    setSelectedSentiment(selectedSentiment === sentiment ? '' : sentiment);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Hero Section with Stats */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

        {/* Animated gradient orbs - more vibrant colors */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl transform hover:scale-110 transition-transform">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Crypto AI Agent
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4">
              AI-powered real-time sentiment analysis for cryptocurrency news
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse" />
              <span className="text-xs sm:text-sm text-gray-600 font-medium">Powered by OpenAI GPT-3.5</span>
            </div>
          </div>

          {/* Stats Cards */}
          {isInitialLoading ? (
            <StatsOverviewSkeleton />
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Total */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-2xl border border-blue-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-blue-100">Total Articles</span>
                <BarChart3 className="w-5 h-5 text-blue-200" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.total || 0}</div>
              <div className="text-xs text-blue-200 mt-1 font-medium">All time analyzed</div>
            </div>

            {/* Bullish */}
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-6 shadow-2xl border border-emerald-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-emerald-100">Bullish</span>
                <TrendingUp className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.BULLISH || 0}</div>
              <div className="text-xs text-emerald-200 mt-1 font-medium">{bullishPercentage}% positive signals</div>
            </div>

            {/* Bearish */}
            <div className="bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl p-6 shadow-2xl border border-rose-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-rose-100">Bearish</span>
                <TrendingDown className="w-5 h-5 text-rose-200" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.BEARISH || 0}</div>
              <div className="text-xs text-rose-200 mt-1 font-medium">{bearishPercentage}% negative signals</div>
            </div>

            {/* Neutral */}
            <div className="bg-gradient-to-br from-slate-500 to-gray-600 rounded-2xl p-6 shadow-2xl border border-slate-400 hover:shadow-3xl transition-all hover:-translate-y-2 hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-100">Neutral</span>
                <Minus className="w-5 h-5 text-slate-200" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white">{stats?.NEUTRAL || 0}</div>
              <div className="text-xs text-slate-200 mt-1 font-medium">Balanced outlook</div>
            </div>
          </div>
          )}

          {/* Charts Section */}
          {isInitialLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <ChartSkeleton />
              <ChartSkeleton />
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Sentiment Distribution */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-purple-200 hover:border-purple-400 transition-all">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Sentiment Distribution</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name.toUpperCase()]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Trend Chart */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-blue-200 hover:border-blue-400 transition-all">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">7-Day Trend</h2>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendChartData}>
                  <defs>
                    <linearGradient id="colorBullish" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.BULLISH} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.BULLISH} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBearish" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.BEARISH} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={COLORS.BEARISH} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Area type="monotone" dataKey="BULLISH" stroke={COLORS.BULLISH} fillOpacity={1} fill="url(#colorBullish)" strokeWidth={2} />
                  <Area type="monotone" dataKey="BEARISH" stroke={COLORS.BEARISH} fillOpacity={1} fill="url(#colorBearish)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Articles Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search and Filters */}
        <div className="bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border-2 border-purple-200 mb-6 sm:mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-sm sm:text-base bg-white"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Sentiment Filters */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => handleSentimentChange('BULLISH')}
                className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                  selectedSentiment === 'BULLISH'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl scale-105 border-2 border-emerald-400'
                    : 'bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 hover:from-emerald-100 hover:to-green-100 border-2 border-emerald-200'
                }`}
              >
                <TrendingUp className="w-4 h-4 inline-block mr-1" />
                Bullish
              </button>
              <button
                onClick={() => handleSentimentChange('BEARISH')}
                className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                  selectedSentiment === 'BEARISH'
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-xl scale-105 border-2 border-rose-400'
                    : 'bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 hover:from-rose-100 hover:to-red-100 border-2 border-rose-200'
                }`}
              >
                <TrendingDown className="w-4 h-4 inline-block mr-1" />
                Bearish
              </button>
              <button
                onClick={() => handleSentimentChange('NEUTRAL')}
                className={`flex-1 min-w-[100px] px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base ${
                  selectedSentiment === 'NEUTRAL'
                    ? 'bg-gradient-to-r from-slate-500 to-gray-600 text-white shadow-xl scale-105 border-2 border-slate-400'
                    : 'bg-gradient-to-r from-slate-50 to-gray-50 text-slate-700 hover:from-slate-100 hover:to-gray-100 border-2 border-slate-200'
                }`}
              >
                <Minus className="w-4 h-4 inline-block mr-1" />
                Neutral
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="space-y-3 sm:space-y-4">
          {articlesError ? (
            <div className="bg-gradient-to-r from-red-50 to-rose-50 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-red-200 text-center">
              <p className="text-red-600 text-base sm:text-lg font-medium">Error loading articles: {articlesError.message}</p>
              <p className="text-sm text-red-500 mt-2">Check console for details</p>
            </div>
          ) : articlesLoading ? (
            <ArticlesListSkeleton count={10} />
          ) : articles.length === 0 ? (
            <div className="bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-md rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-purple-200 text-center">
              <p className="text-gray-600 text-base sm:text-lg font-medium">No articles found matching your filters.</p>
              <p className="text-sm text-gray-500 mt-2">Total articles available: {articlesData?.pagination?.total || 0}</p>
            </div>
          ) : (
            articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!articlesError && !articlesLoading && articles.length > 0 && pagination.totalPages > 1 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-white/90 to-purple-50/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-purple-200">
            {/* Page info */}
            <div className="text-sm text-gray-700 font-medium">
              Showing page <span className="font-bold text-purple-600">{pagination.page}</span> of{' '}
              <span className="font-bold text-purple-600">{pagination.totalPages}</span>
              {' '}({pagination.total} total articles)
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`p-2 rounded-lg font-semibold transition-all ${
                  page === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page numbers */}
              <div className="flex gap-1 sm:gap-2">
                {/* First page */}
                {pagination.page > 3 && (
                  <>
                    <button
                      onClick={() => setPage(1)}
                      className="px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm bg-white text-purple-600 hover:bg-purple-100 transition-all border border-purple-200"
                    >
                      1
                    </button>
                    {pagination.page > 4 && (
                      <span className="px-2 py-2 text-gray-500">...</span>
                    )}
                  </>
                )}

                {/* Pages around current */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(pageNum => {
                    return pageNum === pagination.page ||
                           (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1);
                  })
                  .map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        pageNum === pagination.page
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110'
                          : 'bg-white text-purple-600 hover:bg-purple-100 border border-purple-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                {/* Last page */}
                {pagination.page < pagination.totalPages - 2 && (
                  <>
                    {pagination.page < pagination.totalPages - 3 && (
                      <span className="px-2 py-2 text-gray-500">...</span>
                    )}
                    <button
                      onClick={() => setPage(pagination.totalPages)}
                      className="px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm bg-white text-purple-600 hover:bg-purple-100 transition-all border border-purple-200"
                    >
                      {pagination.totalPages}
                    </button>
                  </>
                )}
              </div>

              {/* Next button */}
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.totalPages}
                className={`p-2 rounded-lg font-semibold transition-all ${
                  page === pagination.totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 shadow-lg">
          <p className="text-sm sm:text-base font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🔄 Updates every 2 hours • Built with React, Tailwind CSS, and OpenAI
          </p>
        </div>
      </div>
    </div>
  );
};
