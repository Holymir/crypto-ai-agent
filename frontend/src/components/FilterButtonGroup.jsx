import { motion } from 'framer-motion';

/**
 * Reusable Filter Button Group Component
 * Used for time periods, sentiment filters, etc.
 */
export const FilterButtonGroup = ({
  options,
  selected,
  onChange,
  size = 'default', // 'sm' | 'default'
  variant = 'primary' // 'primary' | 'white'
}) => {
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
  };

  const variants = {
    primary: {
      active: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-glow-primary',
      inactive: 'bg-white/80 dark:bg-neutral-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-neutral-700 border border-gray-200 dark:border-neutral-600',
    },
    white: {
      active: 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg',
      inactive: 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600',
    },
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(option.value)}
          className={`
            ${sizes[size]}
            rounded-lg
            font-semibold
            transition-all
            ${selected === option.value ? variants[variant].active : variants[variant].inactive}
          `}
        >
          {option.label}
        </motion.button>
      ))}
    </div>
  );
};
