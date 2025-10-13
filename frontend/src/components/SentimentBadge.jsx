export const SentimentBadge = ({ sentiment }) => {
  const badgeClasses = {
    BULLISH: 'badge-bullish',
    BEARISH: 'badge-bearish',
    NEUTRAL: 'badge-neutral',
    ERROR: 'badge-error',
  };

  return (
    <span className={badgeClasses[sentiment] || 'badge-neutral'}>
      {sentiment}
    </span>
  );
};
