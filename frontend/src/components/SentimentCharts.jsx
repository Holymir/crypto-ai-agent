import { Zap, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ScrollReveal } from './ScrollReveal';
import { PieChartTooltip, TrendChartTooltip } from './ChartTooltip';
import { useSentimentTrend } from '../hooks/useArticles';

// Colors from tailwind.config.js - softer, more professional tones
const COLORS = {
  BULLISH: '#3d9970',   // bullish-500 (softer teal-green)
  BEARISH: '#e66b6b',   // bearish-500 (softer coral-red)
  NEUTRAL: '#6B7280',   // neutral-500
};

/**
 * Reusable media sentiment charts component displaying distribution and trend
 * Shows sentiment analysis from news articles over time
 * Now accepts selectedPeriod from parent to sync with dashboard time filter
 */
export const SentimentCharts = ({ stats, selectedPeriod = 7, className = '' }) => {
  const granularity = selectedPeriod === 1 ? 'hourly' : 'daily';

  // For 24H view: use hours=24, for 7D view: use days=7
  // TODO: For "All" (null), currently using 90 days as a workaround.
  // Need to update API to support fetching all historical data without time limit
  // or implement proper pagination/aggregation for large datasets
  const hours = selectedPeriod === 1 ? 24 : null;
  const days = selectedPeriod === 1 ? 1 : (selectedPeriod || 90);

  const { data: trendData, isLoading: trendLoading } = useSentimentTrend(hours, days, granularity);

  const pieData = [
    { name: 'Bullish', value: stats?.BULLISH || 0 },
    { name: 'Bearish', value: stats?.BEARISH || 0 },
    { name: 'Neutral', value: stats?.NEUTRAL || 0 },
  ].filter(item => item.value > 0);

  const trendChartData = trendData?.trend || [];

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 ${className}`}>
      <ScrollReveal direction="left" delay={0.1}>
        {/* Sentiment Distribution */}
        <div className="glass-strong rounded-2xl card-spacing shadow-2xl hover-lift hover-glow">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Media Sentiment Distribution</h2>
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
                stroke="none"
                activeShape={null}
                isAnimationActive={true}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[entry.name.toUpperCase()]}
                    className="outline-none focus:outline-none"
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
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={0.2}>
        {/* Trend Chart */}
        <div className="glass-strong rounded-2xl card-spacing shadow-2xl hover-lift hover-glow-secondary">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <div className="p-2 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Media Sentiment Trend
              </h2>
              <p className="text-xs text-neutral-500 dark:text-dark-muted">
                {selectedPeriod === 1 ? '24-hour news coverage' : selectedPeriod === 7 ? '7-day news coverage' : `${selectedPeriod}-day news coverage`}
              </p>
            </div>
          </div>
          {trendLoading ? (
            <div className="flex items-center justify-center h-[280px]">
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
                interval="preserveStartEnd"
                minTickGap={30}
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => {
                  if (granularity === 'hourly') {
                    // Parse the date string directly without timezone conversion
                    // Format from backend: "YYYY-MM-DD HH:00"
                    const parts = value.match(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):00/);
                    if (!parts) {
                      // Fallback: just show the hour part
                      return value.split(' ')[1] || '';
                    }

                    const hour = parseInt(parts[4], 10);

                    // Convert to 12-hour format
                    if (hour === 0) return '12 AM';
                    if (hour < 12) return `${hour} AM`;
                    if (hour === 12) return '12 PM';
                    return `${hour - 12} PM`;
                  }
                  // For daily view, format as "MMM DD"
                  const date = new Date(value + 'T00:00:00');
                  if (isNaN(date.getTime())) {
                    // Fallback to old format if parsing fails
                    const [, month, day] = value.split('-');
                    return `${month}/${day}`;
                  }
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  });
                }}
              />
              <YAxis
                stroke="#9ca3af"
                className="dark:opacity-50"
                tick={{ fontSize: 10 }}
                label={{
                  value: 'Articles',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#6b7280' }
                }}
              />
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
    </div>
  );
};
