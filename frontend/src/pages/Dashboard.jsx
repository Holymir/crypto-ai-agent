import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, TrendingUp, TrendingDown, Activity, Clock, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSentimentStats, useLatestArticles, useSentimentTrend } from '../hooks/useArticles';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { SentimentBadge } from '../components/SentimentBadge';
import { Navigation } from '../components/Navigation';
import { StatsOverview } from '../components/StatsOverview';
import { SentimentGauge } from '../components/SentimentGauge';
import { TopSources } from '../components/TopSources';
import { QuickInsights } from '../components/QuickInsights';
import { SEO } from '../components/SEO';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { PieChartTooltip, TrendChartTooltip } from '../components/ChartTooltip';
import { ScrollReveal } from '../components/ScrollReveal';

const TIME_PERIODS = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
];

const TREND_TIME_PERIODS = [
  { label: '24H', days: 1 },
  { label: '7D', days: 7 },
];

// Get sentiment colors from Tailwind theme - softer, more professional tones
const COLORS = {
  BULLISH: '#3d9970',   // bullish-500 from tailwind.config (softer teal-green)
  BEARISH: '#e66b6b',   // bearish-500 from tailwind.config (softer coral-red)
  NEUTRAL: '#6B7280',   // neutral-500 from tailwind.config
};

// Sentiment Trend Card Component
const SentimentTrendCard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);
  const granularity = selectedPeriod === 1 ? 'hourly' : 'daily';
  const hours = selectedPeriod === 1 ? 24 : null;
  const days = selectedPeriod === 1 ? 1 : selectedPeriod;

  const { data: trendData, isLoading: trendLoading } = useSentimentTrend(hours, days, granularity);
  const trendChartData = trendData?.trend || [];

  return (
    <ScrollReveal direction="right" delay={0.1}>
      <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl hover-lift hover-glow-secondary h-full">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              Sentiment Trend
            </h2>
          </div>
          <div className="flex gap-2">
            {TREND_TIME_PERIODS.map((period) => (
              <button
                key={period.days}
                onClick={() => setSelectedPeriod(period.days)}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedPeriod === period.days
                    ? 'bg-gradient-to-r from-secondary-500 to-primary-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
        {trendLoading ? (
          <div className="flex items-center justify-center h-[240px] sm:h-[280px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
          </div>
        ) : (
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
                className="dark:opacity-50"
                tickFormatter={(value) => {
                  if (granularity === 'hourly') {
                    return value.split(' ')[1];
                  }
                  const [, month, day] = value.split('-');
                  return `${month}/${day}`;
                }}
              />
              <YAxis stroke="#9ca3af" className="dark:opacity-50" />
              <Tooltip
                content={<TrendChartTooltip />}
                cursor={{ stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Area
                type="monotone"
                dataKey="BULLISH"
                stroke={COLORS.BULLISH}
                fillOpacity={1}
                fill="url(#colorBullish)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="BEARISH"
                stroke={COLORS.BEARISH}
                fillOpacity={1}
                fill="url(#colorBearish)"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </ScrollReveal>
  );
};

// Sentiment Distribution Card Component
const SentimentDistributionCard = ({ stats }) => {
  const pieData = [
    { name: 'Bullish', value: stats?.BULLISH || 0, color: COLORS.BULLISH },
    { name: 'Bearish', value: stats?.BEARISH || 0, color: COLORS.BEARISH },
    { name: 'Neutral', value: stats?.NEUTRAL || 0, color: COLORS.NEUTRAL },
  ].filter(item => item.value > 0);

  // Custom label renderer with better positioning
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    // Position label outside the pie with more distance
    const radius = outerRadius + 35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#334155"
        className="dark:fill-gray-300"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: '600' }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ScrollReveal direction="left" delay={0.1}>
      <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl hover-lift hover-glow h-full">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Sentiment Distribution
          </h2>
        </div>

        {/* Stats Summary */}
        <div className="flex justify-center gap-4 mb-4">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>

        <div className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={{
                  stroke: '#94a3b8',
                  strokeWidth: 1,
                }}
                label={renderCustomLabel}
                outerRadius={80}
                innerRadius={45}
                fill="#8884d8"
                dataKey="value"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth={3}
                isAnimationActive={true}
                animationBegin={0}
                animationDuration={800}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="outline-none focus:outline-none hover:opacity-80 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip
                content={<PieChartTooltip />}
                cursor={false}
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(249, 115, 22, 0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ScrollReveal>
  );
};

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(7);

  const { data: stats, isLoading: statsLoading, error: statsError } = useSentimentStats({ days: selectedPeriod });
  const { data: latestData, isLoading: latestLoading } = useLatestArticles(5);

  // TODO: Fetch real previous period stats from API
  // For now, calculate mock previous stats (90% of current) to show trend indicators
  // In reality, this should fetch stats for the same period duration, but one period earlier
  // e.g., if viewing last 7 days, compare to the 7 days before that
  const previousStats = stats ? {
    total: Math.floor((stats.total || 0) * 0.9),
    BULLISH: Math.floor((stats.BULLISH || 0) * 0.85),
    BEARISH: Math.floor((stats.BEARISH || 0) * 1.1),
    NEUTRAL: Math.floor((stats.NEUTRAL || 0) * 0.95),
  } : null;

  // Calculate sentiment score (0-100)
  // Formula: (Bullish% - Bearish%) normalized to 0-100 scale
  // 100% bullish = 100, 100% bearish = 0, equal mix = 50
  const calculateSentimentScore = (data) => {
    if (!data || data.total === 0) return 50;
    const bullishPercent = (data.BULLISH / data.total) * 100;
    const bearishPercent = (data.BEARISH / data.total) * 100;
    // Score = 50 + (bullish% - bearish%) / 2
    // This maps: 100% bullish -> 100, 100% bearish -> 0, 50/50 -> 50
    return Math.round(50 + (bullishPercent - bearishPercent) / 2);
  };

  const sentimentScore = calculateSentimentScore(stats);

  // Get sentiment info for hero
  const getSentimentHero = (score) => {
    if (score >= 70) {
      return {
        mood: 'Bullish',
        color: 'text-bullish-600 dark:text-bullish-400',
        bgColor: 'from-bullish-500/20 to-bullish-400/20',
        icon: TrendingUp,
        description: 'Strong positive sentiment detected in the crypto market',
      };
    } else if (score <= 30) {
      return {
        mood: 'Bearish',
        color: 'text-bearish-600 dark:text-bearish-400',
        bgColor: 'from-bearish-500/20 to-bearish-400/20',
        icon: TrendingDown,
        description: 'Cautious sentiment prevails across crypto news',
      };
    } else {
      return {
        mood: 'Neutral',
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'from-slate-500/20 to-gray-500/20',
        icon: Activity,
        description: 'Balanced sentiment across the crypto market',
      };
    }
  };

  const sentimentHero = getSentimentHero(sentimentScore);

  // Last updated time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Compact Hero Section with Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Header Bar: Title + Time Period Filter */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
                />
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Live
                </span>
              </div>
              <div className="flex items-center gap-3">
                <sentimentHero.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${sentimentHero.color}`} />
                <div>
                  <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${sentimentHero.color}`}>
                    {sentimentHero.mood}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-dark-muted">
                    Market Sentiment
                  </p>
                </div>
              </div>
            </div>

            {/* Time Period Filter - Now in header */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-gray-600 dark:text-dark-muted">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase">Period:</span>
              </div>
              <div className="flex gap-2">
                {TIME_PERIODS.map((period) => (
                  <motion.button
                    key={period.days}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPeriod(period.days)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedPeriod === period.days
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-glow-primary'
                        : 'bg-white/80 dark:bg-neutral-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-600'
                    }`}
                  >
                    {period.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Quick Stats Bar */}
          <div className={`glass-strong rounded-xl p-4 bg-gradient-to-r ${sentimentHero.bgColor} border border-white/20 dark:border-white/10`}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Sentiment Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 p-2 glass rounded-lg"
              >
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${sentimentHero.bgColor}`}>
                  <Activity className={`w-4 h-4 ${sentimentHero.color}`} />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                  <div className={`text-lg font-bold ${sentimentHero.color}`}>{sentimentScore}/100</div>
                </div>
              </motion.div>

              {/* Total Articles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2 p-2 glass rounded-lg"
              >
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Articles</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-dark-text">{stats?.total || 0}</div>
                </div>
              </motion.div>

              {/* Bullish Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 p-2 glass rounded-lg"
              >
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-bullish-500/20 to-bullish-400/20">
                  <TrendingUp className="w-4 h-4 text-bullish-600 dark:text-bullish-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Bullish</div>
                  <div className="text-lg font-bold text-bullish-600 dark:text-bullish-400">{stats?.BULLISH || 0}</div>
                </div>
              </motion.div>

              {/* Last Updated */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-2 p-2 glass rounded-lg"
              >
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Updated</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-dark-text">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* PRIMARY SECTION: Sentiment Gauge & Trend */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Sentiment Gauge - Left Side */}
          <div className="lg:col-span-2">
            <SentimentGauge score={sentimentScore} />
          </div>

          {/* Sentiment Trend - Right Side */}
          <div className="lg:col-span-3">
            <SentimentTrendCard />
          </div>
        </div>

        {/* SECONDARY SECTION: Stats Overview */}
        <StatsOverview stats={stats} previousStats={previousStats} period={selectedPeriod} className="mb-6 sm:mb-8" />

        {/* TERTIARY SECTION: Distribution Chart & Top Sources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="lg:col-span-2">
            <SentimentDistributionCard stats={stats} />
          </div>
          <div className="lg:col-span-1">
            <TopSources period={selectedPeriod} />
          </div>
        </div>

        {/* INSIGHTS SECTION */}
        <QuickInsights stats={stats} className="mb-6 sm:mb-8" />

        {/* LATEST ARTICLES SECTION */}
        <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Latest Articles
            </h2>
            <Link
              to="/articles"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg hover:shadow-primary-500/50 transition-all hover-lift"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestData?.articles?.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 glass rounded-xl hover-lift smooth-transition"
              >
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                  <h3 className="font-semibold text-gray-900 dark:text-dark-text text-sm sm:text-base mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-dark-muted flex-wrap">
                    <span className="font-medium truncate max-w-[150px]">{article.source}</span>
                    <span>•</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start sm:self-center">
                  <SentimentBadge sentiment={article.sentiment} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
