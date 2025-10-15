import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react';

export const SentimentBadge = ({ sentiment, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = {
    BULLISH: {
      className: 'badge-bullish',
      icon: TrendingUp,
      label: 'Bullish',
    },
    BEARISH: {
      className: 'badge-bearish',
      icon: TrendingDown,
      label: 'Bearish',
    },
    NEUTRAL: {
      className: 'badge-neutral',
      icon: Minus,
      label: 'Neutral',
    },
    ERROR: {
      className: 'badge-error',
      icon: AlertCircle,
      label: 'Error',
    },
  };

  const { className, icon: Icon, label } = config[sentiment] || config.NEUTRAL;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={`${className} ${sizeClasses[size]} inline-flex items-center gap-1.5`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </motion.span>
  );
};
