import { motion } from 'framer-motion';

export const LoadingSpinner = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center p-8"
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-500"
      />
    </motion.div>
  );
};
