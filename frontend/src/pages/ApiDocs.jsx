import { Code, Database, Zap, Lock, BookOpen, Copy, Check, ChevronDown, ChevronRight, Menu, X, FileText, TrendingUp, BarChart3, Hash } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export const ApiDocs = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [activeSection, setActiveSection] = useState('articles');
  const [expandedCategories, setExpandedCategories] = useState({ sentiment: true });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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

  // Check window width for sidebar visibility
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection observer for active section highlighting
  useEffect(() => {
    const observers = [];
    const options = {
      root: null,
      rootMargin: '-150px 0px -50%',
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

  const getEndpointIcon = (id) => {
    const icons = {
      articles: FileText,
      stats: BarChart3,
      trend: TrendingUp,
      assets: Database,
      categories: Code,
      keywords: Hash
    };
    return icons[id] || Code;
  };

  const apiTree = [
    {
      id: 'articles',
      label: 'Articles',
      path: '/api/articles',
      method: 'GET',
      description: 'Get paginated articles'
    },
    {
      id: 'sentiment',
      label: 'Sentiment Analysis',
      isCategory: true,
      children: [
        { id: 'stats', label: 'Statistics', path: '/api/sentiment/stats', method: 'GET', description: 'Overall sentiment stats' },
        { id: 'trend', label: 'Trend', path: '/api/sentiment/trend', method: 'GET', description: 'Sentiment over time' },
        { id: 'assets', label: 'Assets', path: '/api/sentiment/assets', method: 'GET', description: 'By cryptocurrency' },
        { id: 'categories', label: 'Categories', path: '/api/sentiment/categories', method: 'GET', description: 'By article type' },
        { id: 'keywords', label: 'Keywords', path: '/api/sentiment/keywords', method: 'GET', description: 'Trending keywords' }
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

  const curlExample = `# Get sentiment statistics
curl -X GET "${baseUrl}/api/sentiment/stats?days=7" \\
  -H "Content-Type: application/json"

# Get recent bullish articles
curl -X GET "${baseUrl}/api/articles?limit=5&sentiment=BULLISH" \\
  -H "Content-Type: application/json"`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="API Documentation"
        description="SentiFi API Documentation - Access crypto sentiment data programmatically. REST API endpoints for articles, sentiment stats, and trend analysis."
        keywords="API documentation, REST API, crypto sentiment API, developer docs, API endpoints"
      />

      <Navigation />

      {/* Compact Layout Container */}
      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <AnimatePresence>
          {(isMobileNavOpen || isSidebarVisible) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-72 glass-strong border-r border-gray-200 dark:border-gray-800 overflow-y-auto z-50 lg:sticky lg:top-0 lg:h-screen shadow-2xl lg:shadow-none pt-20"
            >
              <div className="p-6">
                {/* Sidebar Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      API Reference
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    6 endpoints • RESTful • JSON
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="mb-6 space-y-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => copyToClipboard(baseUrl, 'sidebar-base-url')}
                    className="glass rounded-lg p-3 cursor-pointer hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Base URL</span>
                    </div>
                    <code className="text-xs text-primary-600 dark:text-primary-400 break-all">
                      {baseUrl}
                    </code>
                    {copiedEndpoint === 'sidebar-base-url' && (
                      <div className="text-xs text-green-500 mt-1 font-semibold">Copied!</div>
                    )}
                  </motion.div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="glass rounded-lg p-2 text-center">
                      <Code className="w-4 h-4 mx-auto mb-1 text-blue-500" />
                      <div className="text-xs font-bold text-gray-900 dark:text-white">JSON</div>
                    </div>
                    <div className="glass rounded-lg p-2 text-center">
                      <Lock className="w-4 h-4 mx-auto mb-1 text-green-500" />
                      <div className="text-xs font-bold text-gray-900 dark:text-white">Public</div>
                    </div>
                    <div className="glass rounded-lg p-2 text-center">
                      <Database className="w-4 h-4 mx-auto mb-1 text-purple-500" />
                      <div className="text-xs font-bold text-gray-900 dark:text-white">100/m</div>
                    </div>
                  </div>
                </div>

                {/* API Tree Navigation */}
                <nav className="space-y-1">
                  {apiTree.map((item) => (
                    <div key={item.id}>
                      {item.isCategory ? (
                        <>
                          <button
                            onClick={() => toggleCategory(item.id)}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-left group"
                          >
                            <div className="flex items-center gap-2">
                              {expandedCategories[item.id] ? (
                                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                              )}
                              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                {item.label}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {item.children.length}
                            </span>
                          </button>

                          <AnimatePresence>
                            {expandedCategories[item.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child) => {
                                  const Icon = getEndpointIcon(child.id);
                                  return (
                                    <button
                                      key={child.id}
                                      onClick={() => scrollToSection(child.id)}
                                      className={`w-full flex items-start gap-2 px-3 py-2 rounded-lg transition-all text-left group ${
                                        activeSection === child.id
                                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                                          : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                        activeSection === child.id
                                          ? 'text-white'
                                          : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                      }`} />
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                          <span className={`text-xs font-bold truncate ${
                                            activeSection === child.id ? 'text-white' : ''
                                          }`}>
                                            {child.label}
                                          </span>
                                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0 ${
                                            activeSection === child.id
                                              ? 'bg-white/20 text-white'
                                              : 'bg-blue-500 text-white'
                                          }`}>
                                            {child.method}
                                          </span>
                                        </div>
                                        <p className={`text-[10px] leading-tight ${
                                          activeSection === child.id
                                            ? 'text-white/90'
                                            : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                          {child.description}
                                        </p>
                                      </div>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full flex items-start gap-2 px-3 py-2.5 rounded-lg transition-all text-left group ${
                            activeSection === item.id
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                              : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {(() => {
                            const Icon = getEndpointIcon(item.id);
                            return <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              activeSection === item.id
                                ? 'text-white'
                                : 'text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                            }`} />;
                          })()}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-xs font-bold truncate ${
                                activeSection === item.id ? 'text-white' : ''
                              }`}>
                                {item.label}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex-shrink-0 ${
                                activeSection === item.id
                                  ? 'bg-white/20 text-white'
                                  : 'bg-blue-500 text-white'
                              }`}>
                                {item.method}
                              </span>
                            </div>
                            <p className={`text-[10px] leading-tight ${
                              activeSection === item.id
                                ? 'text-white/90'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {item.description}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Toggle */}
        <motion.button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Compact Header */}
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 glass-strong rounded-full mb-4"
              >
                <BookOpen className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  API Documentation
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Build with{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  SentiFi API
                </span>
              </h1>

              <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                Access real-time crypto sentiment data programmatically. Simple REST API with comprehensive documentation.
              </p>

              {/* Key Features Inline */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">No API Key</span>
                </div>
                <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Real-Time</span>
                </div>
                <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <Database className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">50+ Sources</span>
                </div>
                <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">RESTful</span>
                </div>
              </div>
            </div>

            {/* Quick Start */}
            <div className="glass-strong rounded-2xl p-6 mb-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Quick Start</h2>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">JS</span>
                      Node.js / JavaScript
                    </h3>
                    <button
                      onClick={() => copyToClipboard(quickStart, 'quickstart-js')}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-js' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-xs font-mono border-2 border-gray-700">
                    {quickStart}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">PY</span>
                      Python
                    </h3>
                    <button
                      onClick={() => copyToClipboard(pythonExample, 'quickstart-py')}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-py' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-xs font-mono border-2 border-gray-700">
                    {pythonExample}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-500 text-white text-xs font-bold rounded">cURL</span>
                      Command Line
                    </h3>
                    <button
                      onClick={() => copyToClipboard(curlExample, 'quickstart-curl')}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-curl' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-xs font-mono border-2 border-gray-700">
                    {curlExample}
                  </pre>
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              API Endpoints
            </h2>

            <div className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.id}
                  ref={(el) => (sectionRefs.current[endpoint.id] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-strong rounded-2xl p-6 shadow-xl hover-lift"
                >
                  {/* Endpoint Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg font-mono font-bold text-xs bg-blue-500 text-white">
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-gray-900 dark:text-white break-all">
                        {endpoint.path}
                      </code>
                    </div>
                    <a
                      href={endpoint.example}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all hover-lift"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Try It
                    </a>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {endpoint.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {endpoint.description}
                  </p>

                  {/* Parameters */}
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Parameters</h4>
                      <div className="glass rounded-xl p-3 space-y-2">
                        {endpoint.params.map((param) => (
                          <div key={param.name} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-2 last:pb-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <code className="font-mono text-xs font-bold text-primary-600 dark:text-primary-400">
                                {param.name}
                              </code>
                              <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                                {param.type}
                              </span>
                              {param.default && (
                                <span className="text-[10px] px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                                  default: {param.default}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {param.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Example Request */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Example Request</h4>
                      <button
                        onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                      >
                        {copiedEndpoint === `example-${index}` ? (
                          <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 dark:bg-black text-green-400 p-3 rounded-xl overflow-x-auto text-xs font-mono border-2 border-gray-700">
                      {endpoint.example}
                    </pre>
                  </div>

                  {/* Example Response */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Example Response</h4>
                        <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded">
                          200 OK
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${index}`)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                      >
                        {copiedEndpoint === `response-${index}` ? (
                          <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-3.5 h-3.5" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 dark:bg-black text-blue-400 p-3 rounded-xl overflow-x-auto text-xs font-mono max-h-64 border-2 border-gray-700">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>

                  {/* Error Responses */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Error Responses</h4>
                    <div className="glass rounded-xl p-3 space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-red-500 text-white font-bold rounded flex-shrink-0">400</span>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Bad Request</div>
                          <div className="text-gray-600 dark:text-gray-400">Invalid parameters</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-amber-500 text-white font-bold rounded flex-shrink-0">429</span>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Too Many Requests</div>
                          <div className="text-gray-600 dark:text-gray-400">Rate limit exceeded</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="px-2 py-0.5 bg-gray-500 text-white font-bold rounded flex-shrink-0">500</span>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">Internal Server Error</div>
                          <div className="text-gray-600 dark:text-gray-400">Server error</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rate Limiting */}
            <div className="glass-strong rounded-2xl p-6 mt-8 shadow-xl border-2 border-amber-500/30">
              <div className="flex items-center gap-3 mb-3">
                <Lock className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rate Limiting</h2>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>
                  To ensure fair usage, our API implements rate limiting:
                </p>
                <ul className="space-y-1.5 ml-4">
                  <li className="flex gap-2"><span>•</span><span><strong className="text-gray-900 dark:text-white">100 requests per minute</strong> per IP address</span></li>
                  <li className="flex gap-2"><span>•</span><span>Rate limit headers included in all responses</span></li>
                  <li className="flex gap-2"><span>•</span><span>HTTP 429 status code when limit exceeded</span></li>
                  <li className="flex gap-2"><span>•</span><span>Contact us for higher rate limits</span></li>
                </ul>
              </div>
            </div>

            {/* Support */}
            <div className="text-center mt-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Need Help?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Contact us if you have questions or need assistance integrating our API
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all text-sm"
              >
                <Code className="w-4 h-4" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
