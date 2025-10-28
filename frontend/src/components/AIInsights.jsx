import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coins, Layers, Network, Tag, TrendingUp, TrendingDown, Minus, BarChart3, Info, HelpCircle } from 'lucide-react';
import { useAssetStats, useCategoryStats, useChainStats, useTrendingKeywords } from '../hooks/useArticles';
import { ScrollReveal } from './ScrollReveal';

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'BULLISH':
      return 'text-bullish-600 dark:text-bullish-400 bg-bullish-100 dark:bg-bullish-900/30';
    case 'BEARISH':
      return 'text-bearish-600 dark:text-bearish-400 bg-bearish-100 dark:bg-bearish-900/30';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
  }
};

const getSentimentIcon = (sentiment) => {
  switch (sentiment) {
    case 'BULLISH':
      return TrendingUp;
    case 'BEARISH':
      return TrendingDown;
    default:
      return Minus;
  }
};

// Scoring thresholds - more nuanced for better categorization
const getBullishColor = (value) => {
  if (value >= 61) return 'text-bullish-600 dark:text-bullish-400';
  if (value <= 40) return 'text-bearish-600 dark:text-bearish-400';
  return 'text-gray-600 dark:text-gray-400';
};

const getScoreLabel = (value) => {
  if (value >= 81) return 'Very Bullish';
  if (value >= 61) return 'Bullish';
  if (value >= 41) return 'Neutral';
  if (value >= 21) return 'Bearish';
  return 'Very Bearish';
};

// Info tooltip component with improved UX
const InfoTooltip = ({ content, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.button
        onHoverStart={() => setIsVisible(true)}
        onHoverEnd={() => setIsVisible(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
        className="p-1 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        aria-label="More information"
      >
        <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop overlay for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
              onClick={() => setIsVisible(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute z-50 w-72 sm:w-80 p-4 mt-2 right-0 sm:right-auto glass-strong rounded-xl shadow-2xl border border-primary-200 dark:border-primary-800"
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
            >
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {content}
              </div>
              {/* Arrow pointer */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-l border-t border-primary-200 dark:border-primary-800 transform rotate-45"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const StatItem = ({ item, icon: Icon, showBullishValue = true, index }) => {
  const SentimentIcon = getSentimentIcon(item.sentiment);
  const isGeneralOrMultiple = item.name === 'GENERAL' || item.name === 'MULTIPLE';

  const getTooltipContent = (name) => {
    if (name === 'GENERAL') {
      return (
        <div>
          <p className="font-bold mb-2 text-primary-600 dark:text-primary-400">General Coverage</p>
          <p>Articles that discuss cryptocurrency broadly without focusing on a specific asset, category, or blockchain. These include market overviews, industry news, and general crypto topics.</p>
        </div>
      );
    }
    if (name === 'MULTIPLE') {
      return (
        <div>
          <p className="font-bold mb-2 text-primary-600 dark:text-primary-400">Multiple Coverage</p>
          <p>Articles that cover several cryptocurrencies, categories, or blockchains equally. No single focus is dominant enough to categorize separately.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="relative overflow-hidden p-4 rounded-xl glass hover:shadow-xl smooth-transition group cursor-pointer border border-transparent hover:border-primary-200 dark:hover:border-primary-800"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          <motion.div
            className="flex-shrink-0 p-2.5 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 rounded-xl group-hover:from-primary-500/20 group-hover:to-secondary-500/20 smooth-transition"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base text-gray-900 dark:text-dark-text truncate">
                {item.name}
              </span>

              {/* Info icon for GENERAL and MULTIPLE */}
              {isGeneralOrMultiple && (
                <InfoTooltip content={getTooltipContent(item.name)} />
              )}

              <motion.span
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${getSentimentColor(item.sentiment)}`}
                whileHover={{ scale: 1.1 }}
              >
                <SentimentIcon className="w-3.5 h-3.5" />
                {item.sentiment}
              </motion.span>
            </div>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {/* Article Count */}
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary-500"></div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {item.count} {item.count === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {/* Bullish Score with label */}
              {showBullishValue && (
                <>
                  <span className="text-xs text-gray-300 dark:text-gray-600">|</span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${getBullishColor(item.avgBullishValue).replace('text-', 'bg-')}`}></div>
                    <span className={`text-xs font-bold ${getBullishColor(item.avgBullishValue)}`}>
                      {item.avgBullishValue}/100
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({getScoreLabel(item.avgBullishValue)})
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visual indicator bar */}
        {showBullishValue && (
          <div className="flex-shrink-0 ml-3">
            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getBullishColor(item.avgBullishValue).replace('text-', 'bg-')}`}
                initial={{ width: 0 }}
                animate={{ width: `${item.avgBullishValue}%` }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Rank badge */}
      <motion.div
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-xs font-bold text-primary-600 dark:text-primary-400"
        whileHover={{ scale: 1.2, rotate: 360 }}
        transition={{ duration: 0.4 }}
      >
        {index + 1}
      </motion.div>
    </motion.div>
  );
};

const KeywordCloud = ({ keywords }) => {
  const maxCount = Math.max(...keywords.map(k => k.count), 1);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {keywords.map((keyword, index) => {
        const relativeSize = keyword.count / maxCount;
        const isTopKeyword = index < 3;

        return (
          <motion.div
            key={keyword.keyword}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className={`
              relative overflow-hidden p-4 rounded-xl cursor-pointer
              ${isTopKeyword
                ? 'bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border-2 border-primary-300 dark:border-primary-700'
                : 'glass border border-primary-200/50 dark:border-primary-800/50'
              }
              hover:shadow-lg smooth-transition group
            `}
          >
            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <div className="relative z-10">
              {/* Rank badge for top keywords */}
              {isTopKeyword && (
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xs font-bold text-white">
                    {index + 1}
                  </span>
                </motion.div>
              )}

              {/* Keyword text */}
              <div className="flex flex-col items-center text-center">
                <motion.span
                  className="font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2"
                  style={{ fontSize: `${14 + relativeSize * 6}px` }}
                  whileHover={{ scale: 1.1 }}
                >
                  {keyword.keyword}
                </motion.span>

                {/* Count with animated progress bar */}
                <div className="w-full space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">Mentions</span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      {keyword.count}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(keyword.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.03 }}
                    />
                  </div>
                </div>
              </div>

              {/* Trending indicator for high count */}
              {keyword.count >= maxCount * 0.7 && (
                <motion.div
                  className="absolute top-2 left-2"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <TrendingUp className="w-4 h-4 text-bullish-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export const AIInsights = ({ period = 7, className = '' }) => {
  const [activeTab, setActiveTab] = useState('assets');

  const { data: assetData, isLoading: assetsLoading } = useAssetStats(period, 10);
  const { data: categoryData, isLoading: categoriesLoading } = useCategoryStats(period, 10);
  const { data: chainData, isLoading: chainsLoading } = useChainStats(period, 10);
  const { data: keywordsData, isLoading: keywordsLoading } = useTrendingKeywords(period, 20);

  const assets = assetData?.assets || [];
  const categories = categoryData?.categories || [];
  const chains = chainData?.chains || [];
  const keywords = keywordsData?.keywords || [];

  const tabs = [
    {
      id: 'assets',
      label: 'Cryptocurrencies',
      icon: Coins,
      count: assets.length,
      color: 'from-yellow-500 to-orange-500',
      hoverColor: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
      activeColor: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Layers,
      count: categories.length,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
      activeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    },
    {
      id: 'chains',
      label: 'Blockchains',
      icon: Network,
      count: chains.length,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:bg-purple-50 dark:hover:bg-purple-900/20',
      activeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      id: 'keywords',
      label: 'Keywords',
      icon: Tag,
      count: keywords.length,
      color: 'from-green-500 to-emerald-500',
      hoverColor: 'hover:bg-green-50 dark:hover:bg-green-900/20',
      activeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);
  const isLoading = assetsLoading || categoriesLoading || chainsLoading || keywordsLoading;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      );
    }

    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          staggerChildren: 0.05,
        },
      },
      exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    };

    switch (activeTab) {
      case 'assets':
        return (
          <motion.div
            key="assets"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-3"
          >
            {assets.length > 0 ? (
              assets.map((asset, index) => (
                <StatItem key={asset.name} item={asset} icon={Coins} index={index} />
              ))
            ) : (
              <EmptyState message="No cryptocurrency data available for this period" />
            )}
          </motion.div>
        );

      case 'categories':
        return (
          <motion.div
            key="categories"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-3"
          >
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <StatItem key={category.name} item={category} icon={Layers} index={index} />
              ))
            ) : (
              <EmptyState message="No category data available for this period" />
            )}
          </motion.div>
        );

      case 'chains':
        return (
          <motion.div
            key="chains"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-3"
          >
            {chains.length > 0 ? (
              chains.map((chain, index) => (
                <StatItem key={chain.name} item={chain} icon={Network} index={index} />
              ))
            ) : (
              <EmptyState message="No blockchain data available for this period" />
            )}
          </motion.div>
        );

      case 'keywords':
        return (
          <motion.div
            key="keywords"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {keywords.length > 0 ? (
              <KeywordCloud keywords={keywords} />
            ) : (
              <EmptyState message="No keyword data available for this period" />
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollReveal>
      <div className={`glass-strong rounded-2xl p-4 sm:p-6 shadow-2xl hover-glow ${className}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2.5 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  AI-Powered Insights
                </h2>
                <InfoTooltip
                  content={
                    <div className="space-y-3">
                      <div>
                        <p className="font-bold mb-2 text-primary-600 dark:text-primary-400">About AI Analysis</p>
                        <p className="text-xs mb-2">Our AI analyzes each article and provides a comprehensive breakdown including sentiment classification and a detailed numerical score.</p>
                      </div>
                      <div>
                        <p className="font-bold mb-2 text-primary-600 dark:text-primary-400">Sentiment vs Score</p>
                        <p className="text-xs mb-2"><strong>Sentiment:</strong> Overall AI classification (BULLISH/BEARISH/NEUTRAL)</p>
                        <p className="text-xs"><strong>Score (1-100):</strong> Granular measurement of market sentiment</p>
                      </div>
                      <div>
                        <p className="font-bold mb-2 text-primary-600 dark:text-primary-400">Score Ranges</p>
                        <ul className="text-xs space-y-1">
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bullish-600"></span>
                            <span><strong>81-100:</strong> Very Bullish</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bullish-500"></span>
                            <span><strong>61-80:</strong> Bullish</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                            <span><strong>41-60:</strong> Neutral</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bearish-500"></span>
                            <span><strong>21-40:</strong> Bearish</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-bearish-600"></span>
                            <span><strong>1-20:</strong> Very Bearish</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  }
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Comprehensive analysis powered by advanced AI
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="px-3 py-2 rounded-lg bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-800">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  Total Insights
                </span>
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {assets.length + categories.length + chains.length + keywords.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring Legend - Compact with animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <HelpCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </motion.div>
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Score Guide:</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {[
                { color: 'bg-bullish-600', range: '81-100', label: 'Very Bullish' },
                { color: 'bg-bullish-500', range: '61-80', label: 'Bullish' },
                { color: 'bg-gray-500', range: '41-60', label: 'Neutral' },
                { color: 'bg-bearish-500', range: '21-40', label: 'Bearish' },
                { color: 'bg-bearish-600', range: '1-20', label: 'Very Bearish' },
              ].map((item, index) => (
                <motion.div
                  key={item.range}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1.5 group cursor-help"
                  title={item.label}
                >
                  <div className={`w-2 h-2 rounded-full ${item.color} group-hover:ring-2 group-hover:ring-offset-2 group-hover:ring-${item.color.split('-')[1]}-300 transition-all`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{item.range}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 p-2 glass rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm
                  transition-all duration-300 relative overflow-hidden
                  ${isActive
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:scale-105'
                  }
                  ${!isActive && tab.hoverColor}
                `}
                whileHover={{ scale: isActive ? 1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 ${tab.activeColor}`}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count > 0 && (
                    <span className={`
                      px-2 py-0.5 rounded-full text-xs font-bold
                      ${isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }
                    `}>
                      {tab.count}
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </ScrollReveal>
  );
};

const EmptyState = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center py-12 px-4"
  >
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-4">
      <BarChart3 className="w-8 h-8 text-gray-400 dark:text-gray-600" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
      {message}
    </p>
  </motion.div>
);
