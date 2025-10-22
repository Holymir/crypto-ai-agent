import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Quick Insights Component
 * Displays automated insights based on sentiment data
 */
export const QuickInsights = ({ stats, className = '' }) => {
  // Generate insights based on stats
  const generateInsights = (data) => {
    if (!data || data.total === 0) {
      return [
        {
          type: 'info',
          icon: AlertCircle,
          message: 'No data available for the selected period',
        },
      ];
    }

    const insights = [];
    const bullishPercent = (data.BULLISH / data.total) * 100;
    const bearishPercent = (data.BEARISH / data.total) * 100;
    const neutralPercent = (data.NEUTRAL / data.total) * 100;

    // Insight 1: Overall market sentiment
    if (bullishPercent > 50) {
      insights.push({
        type: 'bullish',
        icon: TrendingUp,
        message: `Strong bullish sentiment detected with ${Math.round(bullishPercent)}% positive articles`,
      });
    } else if (bearishPercent > 50) {
      insights.push({
        type: 'bearish',
        icon: TrendingDown,
        message: `Bearish sentiment dominates with ${Math.round(bearishPercent)}% negative articles`,
      });
    } else {
      insights.push({
        type: 'neutral',
        icon: CheckCircle,
        message: `Market sentiment is balanced with ${Math.round(neutralPercent)}% neutral coverage`,
      });
    }

    // Insight 2: Article volume
    if (data.total > 100) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        message: `High media activity detected with ${data.total} articles analyzed`,
      });
    } else if (data.total < 20) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        message: `Low media coverage with only ${data.total} articles in this period`,
      });
    }

    // Insight 3: Sentiment distribution
    const sentimentDiff = Math.abs(bullishPercent - bearishPercent);
    if (sentimentDiff < 10) {
      insights.push({
        type: 'neutral',
        icon: CheckCircle,
        message: 'Bullish and bearish sentiments are nearly equal - market is indecisive',
      });
    } else if (bullishPercent > bearishPercent + 20) {
      insights.push({
        type: 'bullish',
        icon: TrendingUp,
        message: 'Bullish sentiment significantly outweighs bearish - positive market outlook',
      });
    } else if (bearishPercent > bullishPercent + 20) {
      insights.push({
        type: 'bearish',
        icon: TrendingDown,
        message: 'Bearish sentiment significantly outweighs bullish - cautious market outlook',
      });
    }

    return insights.slice(0, 3); // Show max 3 insights
  };

  const insights = generateInsights(stats);

  const getInsightStyle = (type) => {
    switch (type) {
      case 'bullish':
        return {
          bg: 'bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20',
          border: 'border-emerald-200 dark:border-emerald-800',
          icon: 'text-bullish-600 dark:text-bullish-400',
          text: 'text-emerald-900 dark:text-emerald-100',
        };
      case 'bearish':
        return {
          bg: 'bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20',
          border: 'border-rose-200 dark:border-rose-800',
          icon: 'text-bearish-600 dark:text-bearish-400',
          text: 'text-rose-900 dark:text-rose-100',
        };
      case 'neutral':
        return {
          bg: 'bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20',
          border: 'border-slate-200 dark:border-slate-800',
          icon: 'text-slate-600 dark:text-slate-400',
          text: 'text-slate-900 dark:text-slate-100',
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20',
          border: 'border-amber-200 dark:border-amber-800',
          icon: 'text-amber-600 dark:text-amber-400',
          text: 'text-amber-900 dark:text-amber-100',
        };
      case 'info':
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400',
          text: 'text-blue-900 dark:text-blue-100',
        };
    }
  };

  return (
    <div className={`glass-strong rounded-2xl card-spacing shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg">
          <Lightbulb className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
          Quick Insights
        </h2>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const style = getInsightStyle(insight.type);
          const Icon = insight.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex items-start gap-3 p-4 rounded-xl border-2 ${style.bg} ${style.border} hover-lift smooth-transition`}
            >
              <div className={`flex-shrink-0 ${style.icon}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={`text-sm font-medium ${style.text} flex-1`}>
                {insight.message}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-6 p-3 glass rounded-lg">
        <p className="text-xs text-gray-600 dark:text-dark-muted text-center">
          Automated insights generated from sentiment analysis data
        </p>
      </div>
    </div>
  );
};
