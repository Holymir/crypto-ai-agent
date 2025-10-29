import { motion } from 'framer-motion';
import { ExternalLink, Share2, Twitter, Facebook, Linkedin, Copy, Check, Bookmark, Clock } from 'lucide-react';
import { SentimentBadge } from './SentimentBadge';
import { useState } from 'react';

export const ArticleCard = ({ article, index = 0 }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleShare = (platform) => {
    const url = article.url || window.location.href;
    const text = article.title;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }

    setShowShareMenu(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  // Calculate read time based on content length
  const calculateReadTime = () => {
    if (!article.content || article.content === 'Historical article - content not available') {
      return 2; // Default 2 min for articles without content
    }
    const wordsPerMinute = 200;
    const wordCount = article.title.split(' ').length + (article.content?.split(' ').length || 0);
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to localStorage or a backend
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: 'easeOut' }}
      className="glass-strong rounded-2xl p-6 shadow-xl hover-lift hover-glow-secondary group relative overflow-hidden"
    >

      <div className="relative">
        {/* Header: Badges and Meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <SentimentBadge sentiment={article.sentiment} />

            {/* Source Badge */}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-full text-xs font-semibold shadow-sm"
            >
              {article.source}
            </motion.span>

            {/* Time Badge */}
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full text-xs font-medium">
              {formatDate(article.publishedAt)}
            </span>

            {/* Read Time Badge */}
            <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {calculateReadTime()} min read
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Bookmark Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                  : 'bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>

            {/* Share Button */}
            <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Share Menu - Icons Only */}
            {showShareMenu && (
              <div className="fixed sm:absolute right-4 sm:right-0 top-auto sm:top-full bottom-20 sm:bottom-auto mt-0 sm:mt-2 bg-white dark:bg-dark-card rounded-xl shadow-2xl border border-neutral-200 dark:border-dark-border p-2 z-50 flex gap-1 whitespace-nowrap">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Share on Twitter"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 text-neutral-600 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className={`p-2 rounded-lg transition-colors border-l border-neutral-200 dark:border-neutral-600 ml-1 pl-2 ${
                    copied
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-primary-50 dark:hover:bg-primary-900/30 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  aria-label="Copy link"
                  title={copied ? 'Copied!' : 'Copy link'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 dark:text-dark-text mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Content Preview */}
        {article.content && article.content !== 'Historical article - content not available' && (
          <p className="text-sm text-neutral-600 dark:text-dark-muted mb-4 line-clamp-2 leading-relaxed">
            {article.content}
          </p>
        )}

        {/* Footer: Read More Button */}
        {article.url && (
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold text-sm hover:from-primary-600 hover:to-secondary-600 transition-all shadow-sm hover:shadow-md group/button"
          >
            Read Full Article
            <ExternalLink className="w-4 h-4 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 transition-transform" />
          </a>
        )}
      </div>
    </motion.article>
  );
};
