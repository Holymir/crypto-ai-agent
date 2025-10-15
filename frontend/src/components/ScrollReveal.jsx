import { motion } from 'framer-motion';

export const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  const { x, y } = directions[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        x,
        y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: '-50px',
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const ScrollRevealStagger = ({
  children,
  staggerDelay = 0.1,
  className = '',
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        margin: '-50px',
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollRevealItem = ({ children, direction = 'up', className = '' }) => {
  const directions = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { y: 0, x: 20 },
    right: { y: 0, x: -20 },
  };

  const { x, y } = directions[direction];

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x,
          y,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
