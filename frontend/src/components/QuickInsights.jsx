import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, CheckCircle, BarChart3, Info } from 'lucide-react';

/**
 * Quick Insights Component
 * Displays automated insights based on sentiment data with sophisticated analysis
 */
export const QuickInsights = ({ stats, className = '' }) => {
  // Generate insights based on stats with prioritization
  const generateInsights = (data) => {
    if (!data || data.total === 0) {
      return [
        {
          type: 'info',
          icon: AlertCircle,
          message: 'No data available for the selected period',
          priority: 1,
        },
      ];
    }

    const insights = [];
    const bullishPercent = (data.BULLISH / data.total) * 100;
    const bearishPercent = (data.BEARISH / data.total) * 100;
    const neutralPercent = (data.NEUTRAL / data.total) * 100;
    const sentimentDiff = Math.abs(bullishPercent - bearishPercent);
    const opinionatedPercent = bullishPercent + bearishPercent;

    // HIGH PRIORITY: Extreme sentiment conditions (>60% in one direction)
    if (bullishPercent >= 60) {
      insights.push({
        type: 'bullish',
        icon: TrendingUp,
        message: `Overwhelmingly positive media sentiment at ${Math.round(bullishPercent)}% - strong bullish narrative`,
        priority: 1,
      });
    } else if (bearishPercent >= 60) {
      insights.push({
        type: 'bearish',
        icon: TrendingDown,
        message: `Predominantly negative media sentiment at ${Math.round(bearishPercent)}% - caution advised`,
        priority: 1,
      });
    }

    // HIGH PRIORITY: Very high neutral coverage (market uncertainty indicator)
    else if (neutralPercent >= 60) {
      insights.push({
        type: 'neutral',
        icon: CheckCircle,
        message: `High neutral coverage at ${Math.round(neutralPercent)}% - market in wait-and-see mode`,
        priority: 1,
      });
    }

    // MEDIUM PRIORITY: Moderate sentiment skew (40-60%)
    else if (bullishPercent >= 40 && bullishPercent < 60) {
      insights.push({
        type: 'bullish',
        icon: TrendingUp,
        message: `Moderately positive sentiment at ${Math.round(bullishPercent)}% - cautiously optimistic media tone`,
        priority: 2,
      });
    } else if (bearishPercent >= 40 && bearishPercent < 60) {
      insights.push({
        type: 'bearish',
        icon: TrendingDown,
        message: `Moderately negative sentiment at ${Math.round(bearishPercent)}% - skeptical media coverage`,
        priority: 2,
      });
    }

    // LOW PRIORITY: Balanced sentiment
    else if (sentimentDiff < 15) {
      insights.push({
        type: 'neutral',
        icon: CheckCircle,
        message: `Balanced media sentiment - ${Math.round(bullishPercent)}% bullish vs ${Math.round(bearishPercent)}% bearish`,
        priority: 3,
      });
    }

    // Article volume insights
    if (data.total >= 200) {
      insights.push({
        type: 'info',
        icon: BarChart3,
        message: `Exceptionally high media activity with ${data.total} articles - major market attention`,
        priority: 1,
      });
    } else if (data.total >= 100) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        message: `Strong media coverage with ${data.total} articles analyzed - active news cycle`,
        priority: 2,
      });
    } else if (data.total < 20) {
      insights.push({
        type: 'warning',
        icon: AlertCircle,
        message: `Limited media coverage with only ${data.total} articles - data may be less reliable`,
        priority: 2,
      });
    } else if (data.total >= 50) {
      insights.push({
        type: 'info',
        icon: Info,
        message: `Moderate coverage with ${data.total} articles - sufficient data for analysis`,
        priority: 3,
      });
    }

    // Opinionated vs Neutral ratio insights
    if (opinionatedPercent >= 80) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        message: `Highly opinionated media at ${Math.round(opinionatedPercent)}% - strong directional bias`,
        priority: 2,
      });
    } else if (opinionatedPercent < 40) {
      insights.push({
        type: 'neutral',
        icon: Info,
        message: `Mostly neutral coverage at ${Math.round(neutralPercent)}% - objective reporting dominates`,
        priority: 2,
      });
    }

    // Sentiment polarization insight
    if (sentimentDiff >= 50 && bullishPercent > 20 && bearishPercent > 20) {
      const dominantSentiment = bullishPercent > bearishPercent ? 'bullish' : 'bearish';
      insights.push({
        type: dominantSentiment,
        icon: dominantSentiment === 'bullish' ? TrendingUp : TrendingDown,
        message: `Strong sentiment divide - ${Math.round(Math.max(bullishPercent, bearishPercent))}% ${dominantSentiment} vs ${Math.round(Math.min(bullishPercent, bearishPercent))}% opposing`,
        priority: 1,
      });
    }

    // Sort by priority (lower number = higher priority) and limit to top 4 insights
    return insights.sort((a, b) => a.priority - b.priority).slice(0, 4);
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

  // Get priority badge
  const getPriorityBadge = (priority) => {
    if (priority === 1) {
      return (
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white uppercase tracking-wide">
          High
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`glass-strong rounded-2xl card-spacing shadow-2xl ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-lg shadow-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
              Quick Insights
            </h2>
            <p className="text-xs text-gray-500 dark:text-dark-muted">
              AI-powered analysis
            </p>
          </div>
        </div>
        <div className="px-3 py-1 glass rounded-full">
          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
            {insights.length} {insights.length === 1 ? 'insight' : 'insights'}
          </span>
        </div>
      </div>

      {/* Insights List */}
      <div className="space-y-3">
        {insights.map((insight, index) => {
          const style = getInsightStyle(insight.type);
          const Icon = insight.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.02, x: 4 }}
              className={`relative overflow-hidden flex items-start gap-3 p-4 rounded-xl border-2 ${style.bg} ${style.border} smooth-transition cursor-default group`}
            >
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className={`absolute inset-0 bg-gradient-to-r ${style.bg} opacity-50`}></div>
              </div>

              {/* Content */}
              <div className="relative flex items-start gap-3 w-full">
                <div className={`flex-shrink-0 ${style.icon} transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-medium ${style.text} leading-relaxed`}>
                      {insight.message}
                    </p>
                    {getPriorityBadge(insight.priority)}
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute top-0 right-0 w-20 h-20 ${style.bg} opacity-20 blur-2xl rounded-full -mr-10 -mt-10`}></div>
            </motion.div>
          );
        })}
      </div>

      {/* Enhanced Footer */}
      <div className="mt-6 p-4 glass rounded-xl border border-neutral-200 dark:border-dark-border">
        <div className="flex items-center justify-center gap-2">
          <Info className="w-4 h-4 text-gray-500 dark:text-dark-muted" />
          <p className="text-xs text-gray-600 dark:text-dark-muted text-center">
            Insights are automatically generated from real-time sentiment analysis
          </p>
        </div>
      </div>
    </div>
  );
};
