import { motion } from 'framer-motion';

// Custom Tooltip for Pie Chart
export const PieChartTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const { name, value } = data;

  const colors = {
    Bullish: 'from-bullish-500 to-bullish-600',
    Bearish: 'from-bearish-500 to-bearish-600',
    Neutral: 'from-slate-500 to-gray-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className="bg-white dark:bg-dark-card rounded-lg shadow-lg border border-neutral-200 dark:border-dark-border px-3 py-2 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-gradient-to-r ${colors[name]} text-white`}>
          {name}
        </span>
        <span className="text-sm font-bold text-neutral-900 dark:text-dark-text">
          {value} articles
        </span>
      </div>
    </motion.div>
  );
};

// Custom Tooltip for Trend Chart
export const TrendChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.15 }}
      className="bg-white dark:bg-dark-card rounded-xl shadow-xl border-2 border-neutral-200 dark:border-dark-border p-4 backdrop-blur-md"
    >
      <div className="text-sm font-semibold text-neutral-700 dark:text-dark-muted mb-3">
        {label}
      </div>
      <div className="space-y-2">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm font-medium text-neutral-700 dark:text-dark-text">
                {entry.name === 'BULLISH' ? 'Bullish' : 'Bearish'}
              </span>
            </div>
            <span className="text-sm font-bold text-neutral-900 dark:text-dark-text">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
