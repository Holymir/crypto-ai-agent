import { motion } from 'framer-motion';
import { ExternalLink, Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { SentimentBadge } from './SentimentBadge';
import { useState } from 'react';

export const ArticleCard = ({ article, index = 0 }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: 'easeOut' }}
      className="card group relative overflow-hidden hover:-translate-y-1 transition-transform duration-200"
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
            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          {/* Share Button */}
          <div className="relative">
            <button
              onClick={() => setShowShareMenu(!showShareMenu)}
              className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-800 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Share Menu - Icons Only */}
            {showShareMenu && (
              <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-neutral-200 p-2 z-10 flex gap-1">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 rounded-lg hover:bg-blue-50 text-neutral-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on Twitter"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 rounded-lg hover:bg-blue-50 text-neutral-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 rounded-lg hover:bg-blue-50 text-neutral-600 hover:text-blue-600 transition-colors"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className={`p-2 rounded-lg transition-colors border-l border-neutral-200 ml-1 pl-2 ${
                    copied ? 'bg-primary-50 text-primary-600' : 'hover:bg-primary-50 text-neutral-600 hover:text-primary-600'
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

        {/* Title */}
        <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors leading-snug">
          {article.title}
        </h3>

        {/* Content Preview */}
        {article.content && article.content !== 'Historical article - content not available' && (
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
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
