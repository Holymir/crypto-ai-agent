import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrendIndicator = ({ value, showIcon = true, className = '' }) => {
  if (!value || value === 0) {
    return showIcon ? (
      <div className={`flex items-center gap-1 text-gray-400 ${className}`}>
        <Minus className="w-4 h-4" />
        <span className="text-sm font-semibold">0%</span>
      </div>
    ) : null;
  }

  const isPositive = value > 0;
  const displayValue = Math.abs(value).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-1 ${className}`}
    >
      {showIcon && (
        isPositive ? (
          <TrendingUp className="w-4 h-4" />
        ) : (
          <TrendingDown className="w-4 h-4" />
        )
      )}
      <span className="text-sm font-bold">
        {isPositive ? '+' : ''}{displayValue}%
      </span>
    </motion.div>
  );
};
