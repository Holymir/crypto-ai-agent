import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getSentimentFromValue } from '../lib/sentiment';

export const SentimentBadge = ({ bullishValue, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const sentiment = getSentimentFromValue(bullishValue);

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
  };

  const { className, icon: Icon, label } = config[sentiment] || config.NEUTRAL;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className={`${className} ${sizeClasses[size]} inline-flex items-center gap-1.5 cursor-default`}
    >
      <motion.div
        animate={{
          rotate: sentiment === 'BULLISH' ? [0, -10, 0] : sentiment === 'BEARISH' ? [0, 10, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Icon className="w-4 h-4" />
      </motion.div>
      {label}
    </motion.span>
  );
};
