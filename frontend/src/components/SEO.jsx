import { useEffect } from 'react';

/**
 * SEO component for managing document meta tags
 * Use this component to set page-specific SEO metadata
 */
export const SEO = ({
  title,
  description,
  keywords = '',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image'
}) => {
  useEffect(() => {
    // Update document title
    const fullTitle = title ? `${title} | CryptoSentinel AI` : 'CryptoSentinel AI - AI-Powered Crypto Sentiment Analysis';
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', ogType, 'property');
    updateMetaTag('og:image', window.location.origin + ogImage, 'property');
    updateMetaTag('og:url', window.location.href, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', window.location.origin + ogImage);

    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'CryptoSentinel AI');
    updateMetaTag('language', 'English');

    // Cleanup function - restore default title on unmount
    return () => {
      document.title = 'CryptoSentinel AI - AI-Powered Crypto Sentiment Analysis';
    };
  }, [title, description, keywords, ogImage, ogType, twitterCard]);

  return null;
};
