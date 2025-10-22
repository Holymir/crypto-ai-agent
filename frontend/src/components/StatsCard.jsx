import { motion } from 'framer-motion';

/**
 * Reusable Stats Card Component
 * Displays a single stat with icon, label, and value
 */
export const StatsCard = ({
  icon: Icon,
  label,
  value,
  iconColor = 'from-primary-500 to-secondary-500',
  textColor = 'text-gray-900 dark:text-dark-text',
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`flex items-center gap-2 sm:gap-3 p-3 glass rounded-xl ${className}`}
    >
      <div className={`p-2 rounded-lg bg-gradient-to-br ${iconColor}`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div>
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
          {label}
        </div>
        <div className={`text-lg sm:text-2xl font-bold ${textColor}`}>
          {value}
        </div>
      </div>
    </motion.div>
  );
};
