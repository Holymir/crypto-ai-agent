import { motion } from 'framer-motion';

// Base skeleton component with shimmer effect
export const Skeleton = ({ className = '', variant = 'rectangular', width, height }) => {
  const baseClasses = 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 bg-[length:200%_100%] animate-shimmer';

  const variantClasses = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

// Article Card Skeleton
export const ArticleCardSkeleton = ({ index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card bg-white dark:bg-dark-card border-2 border-neutral-200 dark:border-dark-border"
    >
      {/* Header: Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-7 w-16" />
      </div>

      {/* Title */}
      <div className="space-y-2 mb-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
      </div>

      {/* Content */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Button */}
      <Skeleton className="h-10 w-36" />
    </motion.div>
  );
};

// Stat Card Skeleton
export const StatCardSkeleton = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card bg-white dark:bg-dark-card border-2 border-neutral-200 dark:border-dark-border"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-9 w-16" />
        </div>
        <Skeleton variant="circular" className="w-12 h-12" />
      </div>
    </motion.div>
  );
};

// Chart Skeleton
export const ChartSkeleton = ({ height = 280 }) => {
  return (
    <div className="bg-white/90 dark:bg-dark-card/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border-2 border-neutral-200 dark:border-dark-border">
      <div className="flex items-center gap-2 mb-6">
        <Skeleton variant="circular" className="w-10 h-10" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="flex items-end justify-around gap-2" style={{ height: `${height}px` }}>
        {[...Array(7)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-full"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
};

// Stats Overview Skeleton
export const StatsOverviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[0, 1, 2, 3].map((i) => (
        <StatCardSkeleton key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

// Articles List Skeleton
export const ArticlesListSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, i) => (
        <ArticleCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
};
