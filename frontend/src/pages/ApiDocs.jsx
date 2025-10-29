import { Code, Database, Zap, Lock, BookOpen, Copy, Check, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const ApiDocs = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [activeSection, setActiveSection] = useState('articles');
  const [expandedCategories, setExpandedCategories] = useState({ sentiment: true });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const sectionRefs = useRef({});

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(id);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const baseUrl = 'https://api.sentifi.xyz';

  // Scroll to section handler
  const scrollToSection = (id) => {
    const element = sectionRefs.current[id];
    if (element) {
      const offset = 100;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
      setIsMobileNavOpen(false);
    }
  };

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Intersection observer for active section highlighting
  useEffect(() => {
    const observers = [];
    const options = {
      root: null,
      rootMargin: '-100px 0px -66%',
      threshold: 0
    };

    Object.entries(sectionRefs.current).forEach(([id, element]) => {
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        }, options);
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const apiTree = [
    {
      id: 'articles',
      label: 'Articles',
      path: '/api/articles',
      method: 'GET'
    },
    {
      id: 'sentiment',
      label: 'Sentiment',
      isCategory: true,
      children: [
        { id: 'stats', label: 'Statistics', path: '/api/sentiment/stats', method: 'GET' },
        { id: 'trend', label: 'Trend', path: '/api/sentiment/trend', method: 'GET' },
        { id: 'assets', label: 'Assets', path: '/api/sentiment/assets', method: 'GET' },
        { id: 'categories', label: 'Categories', path: '/api/sentiment/categories', method: 'GET' },
        { id: 'keywords', label: 'Keywords', path: '/api/sentiment/keywords', method: 'GET' }
      ]
    }
  ];

  const endpoints = [
    {
      id: 'articles',
      method: 'GET',
      path: '/api/articles',
      title: 'Get Articles',
      description: 'Retrieve paginated list of analyzed articles with filtering options',
      params: [
        { name: 'limit', type: 'number', default: '20', description: 'Number of articles per page (max 100)' },
        { name: 'offset', type: 'number', default: '0', description: 'Pagination offset' },
        { name: 'sentiment', type: 'string', description: 'Filter by sentiment: BULLISH, BEARISH, NEUTRAL' },
        { name: 'search', type: 'string', description: 'Search in title and content' },
        { name: 'days', type: 'number', description: 'Filter articles from last N days' },
        { name: 'orderBy', type: 'string', default: 'publishedAt', description: 'Sort field' },
        { name: 'order', type: 'string', default: 'desc', description: 'Sort order: asc or desc' }
      ],
      example: `${baseUrl}/api/articles?limit=10&sentiment=BULLISH&days=7`,
      response: {
        articles: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            title: 'Bitcoin Reaches New All-Time High',
            content: 'Article content...',
            url: 'https://example.com/article',
            source: 'CoinDesk',
            publishedAt: '2025-10-29T10:30:00Z',
            sentiment: 'BULLISH',
            bullishValue: 85,
            asset: 'BTC',
            category: 'PRICE_ANALYSIS',
            chain: 'BITCOIN',
            keywords: 'bitcoin, ATH, bull market'
          }
        ],
        pagination: {
          total: 1234,
          limit: 10,
          offset: 0,
          hasMore: true
        }
      }
    },
    {
      id: 'stats',
      method: 'GET',
      path: '/api/sentiment/stats',
      title: 'Get Sentiment Statistics',
      description: 'Get overall sentiment statistics and counts',
      params: [
        { name: 'days', type: 'number', default: '7', description: 'Calculate stats for last N days' }
      ],
      example: `${baseUrl}/api/sentiment/stats?days=7`,
      response: {
        total: 1234,
        BULLISH: 456,
        BEARISH: 234,
        NEUTRAL: 544,
        averageBullishValue: 58.5,
        period: '7 days'
      }
    },
    {
      id: 'trend',
      method: 'GET',
      path: '/api/sentiment/trend',
      title: 'Get Sentiment Trend',
      description: 'Get sentiment trend data over time',
      params: [
        { name: 'days', type: 'number', default: '30', description: 'Number of days to include' },
        { name: 'granularity', type: 'string', default: 'day', description: 'Granularity: hour, day, week' }
      ],
      example: `${baseUrl}/api/sentiment/trend?days=30&granularity=day`,
      response: {
        data: [
          {
            date: '2025-10-29',
            averageScore: 62,
            bullishCount: 45,
            bearishCount: 23,
            neutralCount: 32,
            totalCount: 100
          }
        ]
      }
    },
    {
      id: 'assets',
      method: 'GET',
      path: '/api/sentiment/assets',
      title: 'Get Assets Sentiment',
      description: 'Get sentiment breakdown by cryptocurrency asset',
      params: [
        { name: 'days', type: 'number', default: '7', description: 'Time period' },
        { name: 'limit', type: 'number', default: '10', description: 'Number of assets to return' }
      ],
      example: `${baseUrl}/api/sentiment/assets?days=7&limit=10`,
      response: {
        assets: [
          {
            name: 'BTC',
            count: 324,
            sentiment: 'BULLISH',
            avgBullishValue: 78
          }
        ]
      }
    },
    {
      id: 'categories',
      method: 'GET',
      path: '/api/sentiment/categories',
      title: 'Get Categories Sentiment',
      description: 'Get sentiment breakdown by article category',
      params: [
        { name: 'days', type: 'number', default: '7', description: 'Time period' },
        { name: 'limit', type: 'number', default: '10', description: 'Number of categories to return' }
      ],
      example: `${baseUrl}/api/sentiment/categories?days=7`,
      response: {
        categories: [
          {
            name: 'PRICE_ANALYSIS',
            count: 156,
            sentiment: 'BULLISH',
            avgBullishValue: 72
          }
        ]
      }
    },
    {
      id: 'keywords',
      method: 'GET',
      path: '/api/sentiment/keywords',
      title: 'Get Trending Keywords',
      description: 'Get trending keywords from articles',
      params: [
        { name: 'days', type: 'number', default: '7', description: 'Time period' },
        { name: 'limit', type: 'number', default: '20', description: 'Number of keywords to return' }
      ],
      example: `${baseUrl}/api/sentiment/keywords?days=7&limit=20`,
      response: {
        keywords: [
          {
            keyword: 'bitcoin',
            count: 245
          }
        ]
      }
    }
  ];

  const quickStart = `# Install dependencies (if using Node.js)
npm install axios

# Make a request
const axios = require('axios');

async function getSentiment() {
  try {
    const response = await axios.get('${baseUrl}/api/sentiment/stats?days=7');
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

getSentiment();`;

  const pythonExample = `import requests

# Get sentiment statistics
response = requests.get('${baseUrl}/api/sentiment/stats?days=7')
data = response.json()

print(f"Total articles: {data['total']}")
print(f"Bullish: {data['BULLISH']}")
print(f"Bearish: {data['BEARISH']}")
print(f"Average score: {data['averageBullishValue']}")`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="API Documentation"
        description="SentiFi API Documentation - Access crypto sentiment data programmatically. REST API endpoints for articles, sentiment stats, and trend analysis."
        keywords="API documentation, REST API, crypto sentiment API, developer docs, API endpoints"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Mobile Navigation Toggle */}
        <motion.button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        {/* API Tree Navigation Sidebar */}
        <AnimatePresence>
          {(isMobileNavOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed left-0 top-24 bottom-0 w-72 glass-strong border-r border-gray-200 dark:border-gray-800 overflow-y-auto z-40 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  API Reference
                </h3>

                <nav className="space-y-1">
                  {apiTree.map((item) => (
                    <div key={item.id}>
                      {item.isCategory ? (
                        <>
                          <button
                            onClick={() => toggleCategory(item.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-left"
                          >
                            {expandedCategories[item.id] ? (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-500" />
                            )}
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.label}
                            </span>
                          </button>

                          <AnimatePresence>
                            {expandedCategories[item.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child) => (
                                  <button
                                    key={child.id}
                                    onClick={() => scrollToSection(child.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left text-sm ${
                                      activeSection === child.id
                                        ? 'bg-primary-500 text-white'
                                        : 'hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300'
                                    }`}
                                  >
                                    <span className={`px-1.5 py-0.5 rounded text-xs font-mono font-bold ${
                                      activeSection === child.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-blue-500 text-white'
                                    }`}>
                                      {child.method}
                                    </span>
                                    <span className="truncate">{child.label}</span>
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left ${
                            activeSection === item.id
                              ? 'bg-primary-500 text-white'
                              : 'hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <span className={`px-1.5 py-0.5 rounded text-xs font-mono font-bold ${
                            activeSection === item.id
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {item.method}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="lg:ml-80">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                API Documentation
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                SentiFi API
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Access real-time crypto sentiment data programmatically. Simple REST API with comprehensive documentation.
            </p>
          </div>
        </ScrollReveal>

        {/* Quick Info Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Base URL</div>
              <div className="text-xs font-mono text-primary-600 dark:text-primary-400 break-all">
                {baseUrl}
              </div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <Code className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Format</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">JSON</div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <Lock className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Auth</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">Public</div>
            </div>
            <div className="glass-strong rounded-xl p-6 text-center hover-lift">
              <Database className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rate Limit</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white">100/min</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Start */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Node.js / JavaScript</h3>
                  <button
                    onClick={() => copyToClipboard(quickStart, 'quickstart-js')}
                    className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    {copiedEndpoint === 'quickstart-js' ? (
                      <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy</>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-900 dark:bg-black text-green-400 p-6 rounded-xl overflow-x-auto text-sm font-mono">
                  {quickStart}
                </pre>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Python</h3>
                  <button
                    onClick={() => copyToClipboard(pythonExample, 'quickstart-py')}
                    className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    {copiedEndpoint === 'quickstart-py' ? (
                      <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy</>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-900 dark:bg-black text-green-400 p-6 rounded-xl overflow-x-auto text-sm font-mono">
                  {pythonExample}
                </pre>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* API Endpoints */}
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            API Endpoints
          </h2>
        </ScrollReveal>

        <div className="space-y-8">
          {endpoints.map((endpoint, index) => (
            <ScrollReveal key={endpoint.path}>
              <motion.div
                ref={(el) => (sectionRefs.current[endpoint.id] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 shadow-xl hover-lift"
              >
                {/* Endpoint Header */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                    endpoint.method === 'GET' ? 'bg-blue-500 text-white' :
                    endpoint.method === 'POST' ? 'bg-green-500 text-white' :
                    'bg-gray-500 text-white'
                  }`}>
                    {endpoint.method}
                  </span>
                  <code className="text-lg font-mono text-gray-900 dark:text-white">
                    {endpoint.path}
                  </code>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {endpoint.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {endpoint.description}
                </p>

                {/* Parameters */}
                {endpoint.params && endpoint.params.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Parameters</h4>
                    <div className="glass rounded-xl p-4 space-y-3">
                      {endpoint.params.map((param) => (
                        <div key={param.name} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <code className="font-mono text-sm font-bold text-primary-600 dark:text-primary-400">
                              {param.name}
                            </code>
                            <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                              {param.type}
                            </span>
                            {param.default && (
                              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                                default: {param.default}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {param.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Example Request */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Example Request</h4>
                    <button
                      onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                      className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
                    >
                      {copiedEndpoint === `example-${index}` ? (
                        <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-4 h-4" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-xs font-mono">
                    {endpoint.example}
                  </pre>
                </div>

                {/* Example Response */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">Example Response</h4>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${index}`)}
                      className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-sm"
                    >
                      {copiedEndpoint === `response-${index}` ? (
                        <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-4 h-4" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-blue-400 p-4 rounded-xl overflow-x-auto text-xs font-mono max-h-96">
                    {JSON.stringify(endpoint.response, null, 2)}
                  </pre>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Rate Limiting */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mt-16 shadow-xl border-2 border-amber-500/30">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rate Limiting</h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                To ensure fair usage, our API implements rate limiting:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span><strong className="text-gray-900 dark:text-white">100 requests per minute</strong> per IP address</span></li>
                <li className="flex gap-2"><span>•</span><span>Rate limit headers included in all responses</span></li>
                <li className="flex gap-2"><span>•</span><span>HTTP 429 status code when limit exceeded</span></li>
                <li className="flex gap-2"><span>•</span><span>Contact us for higher rate limits</span></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Support */}
        <ScrollReveal>
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Need Help?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Contact us if you have questions or need assistance integrating our API
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
            >
              <Code className="w-5 h-5" />
              Contact Support
            </a>
          </div>
        </ScrollReveal>
        </div>
        {/* End Main Content */}
      </div>

      <Footer />
    </div>
  );
};
