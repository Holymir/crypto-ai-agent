import { Code, Database, Zap, Lock, BookOpen, Copy, Check, ChevronDown, ChevronRight, FileText, TrendingUp, BarChart3, Hash } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

export const ApiDocs = () => {
  const [copiedEndpoint, setCopiedEndpoint] = useState(null);
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedCategories, setExpandedCategories] = useState({ sentiment: true });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
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
      const offset = 120;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Scroll to top on mount and reset active section
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Reset active section and allow intersection observer to work after a delay
    const timer = setTimeout(() => {
      setActiveSection('getting-started');
      setIsInitialLoad(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Toggle category expansion
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Intersection observer for active section highlighting
  useEffect(() => {
    // Don't set up observer during initial load
    if (isInitialLoad) return;

    const observers = [];
    const options = {
      root: null,
      rootMargin: '-120px 0px -60%',
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
  }, [isInitialLoad]);

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
      id: 'getting-started',
      label: 'Getting Started',
      icon: BookOpen,
    },
    {
      id: 'articles',
      label: 'Articles',
      icon: FileText,
      path: '/api/articles',
      method: 'GET',
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
            sentimentScore: 85,
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

      {/* Main Container with Fixed Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="flex gap-8">
          {/* Sticky Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="glass-strong rounded-2xl p-4 shadow-xl mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                    Navigation
                  </h3>
                </div>

                {/* Navigation Tree */}
                <nav className="space-y-1">
                  {apiTree.map((item) => (
                    <div key={item.id}>
                      {item.isCategory ? (
                        <>
                          <button
                            onClick={() => toggleCategory(item.id)}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-left group"
                          >
                            <div className="flex items-center gap-2">
                              {expandedCategories[item.id] ? (
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                              ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500" />
                              )}
                              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                {item.label}
                              </span>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedCategories[item.id] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-6 space-y-1 overflow-hidden"
                              >
                                {item.children.map((child) => {
                                  const Icon = getEndpointIcon(child.id);
                                  return (
                                    <button
                                      key={child.id}
                                      onClick={() => scrollToSection(child.id)}
                                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left text-sm ${
                                        activeSection === child.id
                                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                                          : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300'
                                      }`}
                                    >
                                      <Icon className="w-4 h-4" />
                                      {child.label}
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
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left text-sm ${
                            activeSection === item.id
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                              : 'hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          {item.label}
                        </button>
                      )}
                    </div>
                  ))}
                </nav>
              </div>

              {/* Quick Info */}
              <div className="glass-strong rounded-2xl p-4 shadow-xl">
                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">JSON REST API</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">No Auth Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">100 req/min</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Header */}
            <div ref={(el) => (sectionRefs.current['getting-started'] = el)} className="mb-12">
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

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                SentiFi{' '}
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  API
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Access real-time crypto sentiment data programmatically. Simple REST API with comprehensive documentation.
              </p>

              {/* Key Features */}
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

            {/* Base URL */}
            <div className="glass-strong rounded-2xl p-6 mb-8 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Base URL</h2>
              <div className="flex items-center justify-between glass rounded-xl p-4">
                <code className="text-sm font-mono text-primary-600 dark:text-primary-400">
                  {baseUrl}
                </code>
                <button
                  onClick={() => copyToClipboard(baseUrl, 'base-url')}
                  className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                >
                  {copiedEndpoint === 'base-url' ? (
                    <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Copy</>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Start */}
            <div className="glass-strong rounded-2xl p-6 mb-12 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Start</h2>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded">JS</span>
                      Node.js / JavaScript
                    </h3>
                    <button
                      onClick={() => copyToClipboard(quickStart, 'quickstart-js')}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-js' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                    {quickStart}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded">PY</span>
                      Python
                    </h3>
                    <button
                      onClick={() => copyToClipboard(pythonExample, 'quickstart-py')}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-py' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                    {pythonExample}
                  </pre>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-500 text-white text-xs font-bold rounded">cURL</span>
                      Command Line
                    </h3>
                    <button
                      onClick={() => copyToClipboard(curlExample, 'quickstart-curl')}
                      className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                    >
                      {copiedEndpoint === 'quickstart-curl' ? (
                        <><Check className="w-3.5 h-3.5 text-green-500" /> Copied!</>
                      ) : (
                        <><Copy className="w-3.5 h-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                    {curlExample}
                  </pre>
                </div>
              </div>
            </div>

            {/* API Endpoints */}
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              API Endpoints
            </h2>

            <div className="space-y-8">
              {endpoints.map((endpoint) => (
                <motion.div
                  key={endpoint.id}
                  ref={(el) => (sectionRefs.current[endpoint.id] = el)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass-strong rounded-2xl p-6 shadow-xl"
                >
                  {/* Endpoint Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-lg font-mono font-bold text-sm bg-blue-500 text-white">
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-900 dark:text-white">
                          {endpoint.path}
                        </code>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {endpoint.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {endpoint.description}
                      </p>
                    </div>
                    <a
                      href={endpoint.example}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      <Zap className="w-4 h-4" />
                      Try It Live
                    </a>
                  </div>

                  {/* Parameters */}
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Query Parameters</h4>
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
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white">Example Request</h4>
                      <button
                        onClick={() => copyToClipboard(endpoint.example, `example-${endpoint.id}`)}
                        className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                      >
                        {copiedEndpoint === `example-${endpoint.id}` ? (
                          <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 dark:bg-black text-green-400 p-4 rounded-xl overflow-x-auto text-sm font-mono">
                      {endpoint.example}
                    </pre>
                  </div>

                  {/* Example Response */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Example Response</h4>
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded">
                          200 OK
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(endpoint.response, null, 2), `response-${endpoint.id}`)}
                        className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors text-xs"
                      >
                        {copiedEndpoint === `response-${endpoint.id}` ? (
                          <><Check className="w-4 h-4 text-green-500" /> Copied!</>
                        ) : (
                          <><Copy className="w-4 h-4" /> Copy</>
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 dark:bg-black text-blue-400 p-4 rounded-xl overflow-x-auto text-sm font-mono max-h-96">
                      {JSON.stringify(endpoint.response, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rate Limiting */}
            <div className="glass-strong rounded-2xl p-6 mt-12 shadow-xl border-2 border-amber-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Rate Limiting</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
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

            {/* Support */}
            <div className="text-center mt-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Need Help?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Contact us if you have questions or need assistance integrating our API
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
              >
                <Code className="w-5 h-5" />
                Contact Support
              </a>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
