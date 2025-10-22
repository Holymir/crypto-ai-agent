import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

/**
 * Sentiment Score Gauge Component
 * Displays a visual gauge showing overall market sentiment (0-100)
 * 0-30: Bearish, 30-70: Neutral, 70-100: Bullish
 */
export const SentimentGauge = ({ score = 50, className = '' }) => {
  // Clamp score between 0-100
  const clampedScore = Math.max(0, Math.min(100, score));

  // Calculate rotation for the needle (-90deg to 90deg)
  const needleRotation = (clampedScore / 100) * 180 - 90;

  // Determine sentiment level and color
  const getSentimentInfo = (value) => {
    if (value <= 30) {
      return {
        label: 'Bearish',
        color: '#e66b6b',
        bgColor: 'from-bearish-500 to-bearish-600',
        textColor: 'text-bearish-600 dark:text-bearish-400',
      };
    }
    if (value <= 70) {
      return {
        label: 'Neutral',
        color: '#64748b',
        bgColor: 'from-slate-500 to-gray-600',
        textColor: 'text-slate-600 dark:text-slate-400',
      };
    }
    return {
      label: 'Bullish',
      color: '#3d9970',
      bgColor: 'from-bullish-500 to-bullish-600',
      textColor: 'text-bullish-600 dark:text-bullish-400',
    };
  };

  const sentimentInfo = getSentimentInfo(clampedScore);

  return (
    <div className={`glass-strong rounded-2xl card-spacing shadow-2xl hover-lift ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`p-2 bg-gradient-to-br ${sentimentInfo.bgColor} rounded-lg`}>
            <Gauge className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Sentiment Score
          </h2>
        </div>
      </div>

      {/* Gauge Container */}
      <div className="relative flex flex-col items-center">
        {/* Gauge Arc */}
        <div className="relative w-full max-w-xs mx-auto">
          <svg
            viewBox="0 0 200 120"
            className="w-full h-auto"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e66b6b" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#3d9970" />
              </linearGradient>
            </defs>

            {/* Background Arc (full semicircle) */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="16"
              strokeLinecap="round"
              className="dark:opacity-20"
            />

            {/* Active Arc (animated gradient) */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * clampedScore) / 100}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * clampedScore) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Needle */}
            <motion.g
              initial={{ rotate: -90 }}
              animate={{ rotate: needleRotation }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{ transformOrigin: '100px 100px' }}
            >
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="35"
                stroke={sentimentInfo.color}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="100" r="6" fill={sentimentInfo.color} />
            </motion.g>

            {/* Scale markers */}
            <text x="20" y="115" fontSize="10" fill="#e66b6b" className="dark:fill-bearish-400" textAnchor="middle" fontWeight="600">0</text>
            <text x="100" y="25" fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="middle" fontWeight="600">50</text>
            <text x="180" y="115" fontSize="10" fill="#3d9970" className="dark:fill-bullish-400" textAnchor="middle" fontWeight="600">100</text>
          </svg>
        </div>

        {/* Score Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center -mt-2"
        >
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className={`text-4xl sm:text-5xl font-bold ${sentimentInfo.textColor}`}>
              {clampedScore}
            </span>
            <span className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400">/100</span>
          </div>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${sentimentInfo.bgColor} text-white text-sm font-semibold shadow-lg`}>
            <span>{sentimentInfo.label}</span>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <div className="mt-6 p-4 glass rounded-xl">
        <p className="text-sm text-gray-600 dark:text-dark-muted text-center">
          The sentiment score represents overall market sentiment based on analyzed news articles.
          Higher values indicate more bullish sentiment, lower values indicate bearish sentiment.
        </p>
      </div>
    </div>
  );
};
