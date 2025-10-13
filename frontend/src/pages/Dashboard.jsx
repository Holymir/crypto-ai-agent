import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useSentimentStats, useSentimentTrend, useLatestArticles } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { StatCard } from '../components/StatCard';
import { SentimentBadge } from '../components/SentimentBadge';

const COLORS = {
  BULLISH: '#22c55e',
  BEARISH: '#ef4444',
  NEUTRAL: '#64748b',
  ERROR: '#9ca3af',
};

export const Dashboard = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats();
  const { data: trendData, isLoading: trendLoading } = useSentimentTrend(7);
  const { data: latestData, isLoading: latestLoading } = useLatestArticles(5);

  if (statsLoading || trendLoading || latestLoading) {
    return <LoadingSpinner />;
  }

  if (statsError) {
    return <ErrorMessage message={statsError.message} />;
  }

  const pieData = [
    { name: 'Bullish', value: stats?.BULLISH || 0 },
    { name: 'Bearish', value: stats?.BEARISH || 0 },
    { name: 'Neutral', value: stats?.NEUTRAL || 0 },
  ].filter(item => item.value > 0);

  const trendChartData = trendData?.trend || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crypto Sentiment Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time cryptocurrency news sentiment analysis</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={stats?.total || 0}
          icon={BarChart3}
          color="blue"
        />
        <StatCard
          title="Bullish"
          value={stats?.BULLISH || 0}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Bearish"
          value={stats?.BEARISH || 0}
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title="Neutral"
          value={stats?.NEUTRAL || 0}
          icon={Minus}
          color="gray"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Sentiment Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
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

        {/* Line Chart */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">7-Day Sentiment Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="BULLISH" stroke={COLORS.BULLISH} strokeWidth={2} />
              <Line type="monotone" dataKey="BEARISH" stroke={COLORS.BEARISH} strokeWidth={2} />
              <Line type="monotone" dataKey="NEUTRAL" stroke={COLORS.NEUTRAL} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Articles */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Latest Articles</h2>
        <div className="space-y-4">
          {latestData?.articles?.map((article) => (
            <div
              key={article.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{article.title}</h3>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <SentimentBadge sentiment={article.sentiment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
