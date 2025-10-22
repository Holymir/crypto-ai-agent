/**
 * Reusable Card Component
 * Provides consistent glass-morphism styling across the app
 */
export const Card = ({
  children,
  className = '',
  variant = 'glass', // 'glass' | 'glass-strong'
  hover = false,
  padding = 'default' // 'none' | 'sm' | 'default' | 'lg'
}) => {
  const variants = {
    glass: 'glass',
    'glass-strong': 'glass-strong',
  };

  const paddings = {
    none: '',
    sm: 'p-3 sm:p-4',
    default: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  const hoverClasses = hover ? 'hover-lift' : '';

  return (
    <div
      className={`
        ${variants[variant]}
        rounded-2xl
        shadow-2xl
        ${paddings[padding]}
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
