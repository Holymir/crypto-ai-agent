import { motion } from 'framer-motion';

export const StatCard = ({ title, value, icon: Icon, color = 'blue', delay = 0 }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="card cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className="text-3xl font-bold text-gray-900 mt-1"
          >
            {value}
          </motion.p>
        </div>
        {Icon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.1, type: 'spring', stiffness: 200 }}
            className={`p-3 rounded-lg ${colorClasses[color]}`}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
