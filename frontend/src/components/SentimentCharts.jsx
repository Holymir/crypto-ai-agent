import { Zap, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ScrollReveal } from './ScrollReveal';
import { PieChartTooltip, TrendChartTooltip } from './ChartTooltip';

const COLORS = {
  BULLISH: '#22c55e',
  BEARISH: '#ef4444',
  NEUTRAL: '#64748b',
};

/**
 * Reusable sentiment charts component displaying pie chart and trend chart
 */
export const SentimentCharts = ({ stats, trendData, className = '' }) => {
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
        <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-purple-200 dark:border-dark-border hover:border-purple-400 dark:hover:border-purple-600 transition-all">
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
              <Tooltip content={<PieChartTooltip />} cursor={false} />
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
        <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border-2 border-blue-200 dark:border-dark-border hover:border-blue-400 dark:hover:border-blue-600 transition-all">
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
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:opacity-20" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10 }}
                stroke="#9ca3af"
                className="dark:opacity-50"
              />
              <YAxis stroke="#9ca3af" className="dark:opacity-50" />
              <Tooltip content={<TrendChartTooltip />} cursor={{ stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '5 5' }} />
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
        </div>
      </ScrollReveal>
    </div>
  );
};
