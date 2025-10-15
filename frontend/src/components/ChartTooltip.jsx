import { motion } from 'framer-motion';

// Custom Tooltip for Pie Chart
export const PieChartTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0];
  const { name, value } = data;

  const colors = {
    Bullish: 'from-emerald-500 to-green-600',
    Bearish: 'from-rose-500 to-red-600',
    Neutral: 'from-slate-500 to-gray-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.15 }}
      className="bg-white dark:bg-dark-card rounded-xl shadow-xl border-2 border-neutral-200 dark:border-dark-border p-4 backdrop-blur-md"
    >
      <div className={`inline-block px-3 py-1 rounded-lg bg-gradient-to-r ${colors[name]} text-white text-sm font-bold mb-2`}>
        {name}
      </div>
      <div className="text-2xl font-bold text-neutral-900 dark:text-dark-text">
        {value}
      </div>
      <div className="text-xs text-neutral-500 dark:text-dark-muted mt-1">
        articles
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
