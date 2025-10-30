# Crypto AI Agent - Product Roadmap

**Last Updated**: 2025-10-30
**Version**: 2.1 (Updated)
**Status**: Active Development

---

## Table of Contents
1. [Current State](#current-state)
2. [Immediate Next Steps](#immediate-next-steps)
3. [Short-term Features (1-2 weeks)](#short-term-features-1-2-weeks)
4. [Medium-term Features (2-4 weeks)](#medium-term-features-2-4-weeks)
5. [Long-term Vision (1-3 months)](#long-term-vision-1-3-months)
6. [Technical Improvements](#technical-improvements)
7. [Monetization Strategy](#monetization-strategy)

---

## Current State

### ✅ Recently Completed (October 2025)
- [x] Dashboard with AI-powered sentiment analysis
- [x] Articles page with filtering and search
- [x] Real-time sentiment scoring (0-100 scale)
- [x] Asset, Category, Chain, and Keyword insights
- [x] Sentiment trend charts and gauges
- [x] Dark mode support (complete)
- [x] Responsive design optimized for mobile
- [x] Deployment workflow (Vercel + Railway)
- [x] Consistent glassmorphism UI/UX with hover effects
- [x] AI Insights expandable cards with article previews
- [x] Comprehensive deployment guide (DEPLOYMENT_GUIDE.md)
- [x] Code cleanup and optimization
- [x] Professional footer component with social links and navigation
- [x] Visual Currency Sentiments Dashboard with interactive cards

### 🎯 Current Features
- Full-stack app (React + Express)
- PostgreSQL database with Prisma ORM
- OpenAI GPT integration for sentiment analysis
- Automated news fetching from multiple sources
- Beautiful, responsive UI with Tailwind CSS
- Interactive charts (area charts, sentiment gauges)
- Advanced article search and filtering
- Infinite scroll pagination
- Background job scheduling

### 🔄 Known Issues
- [ ] Minor mobile UX tweaks needed
- [ ] Performance optimization for large datasets
- [ ] Some components could use skeleton loading states

---

## Immediate Next Steps

### 🎯 Recommended Order of Implementation

Based on your ideas and project maturity, here's my suggested priority:

## Priority 1: Visual Currency Sentiments (3-4 days) ⚡ NEXT
**Why**: High visual impact, uses existing data, no backend changes needed
**Status**: Ready to implement - all required APIs already available

## Priority 2: MFNS Backend (1-2 weeks)
**Why**: Major feature, requires time for API integrations and data pipeline
**Status**: Significant backend work required

## Priority 3: MFNS Frontend Dashboard (4-5 days)
**Why**: Depends on backend being ready, high user value
**Status**: Blocked by Priority 2 completion

---

## 1. ✅ Footer Component (COMPLETED)

**Estimated Time**: 2-3 hours
**Complexity**: ⭐ Low
**Impact**: ⭐⭐ Medium
**Priority**: 🔴 High
**Status**: ✅ Completed on 2025-10-30

### Requirements
- Company/project information
- Social media links (Twitter, Discord, Telegram, GitHub)
- Navigation links (Dashboard, Articles, About, Privacy, Terms)
- Newsletter signup (optional, can use Mailchimp/ConvertKit)
- "Powered by" tech stack credits
- Dark mode compatible
- Responsive design

### Design Suggestions
```
┌─────────────────────────────────────────────────────────────┐
│                       SENTIFI.XYZ                            │
│              AI-Powered Crypto Sentiment Analysis            │
├─────────────────────────────────────────────────────────────┤
│  Quick Links     │   Resources      │   Connect              │
│  • Dashboard     │   • API Docs     │   🐦 Twitter           │
│  • Articles      │   • Blog         │   💬 Discord           │
│  • About         │   • Roadmap      │   📱 Telegram          │
│  • Privacy       │   • Support      │   🔗 GitHub            │
│  • Terms         │   • Status       │                        │
├─────────────────────────────────────────────────────────────┤
│  Built with ❤️ using React, Node.js, OpenAI & PostgreSQL   │
│  © 2025 Sentifi. All rights reserved.                       │
└─────────────────────────────────────────────────────────────┘
```

### Implementation
**Files to Create**:
- `frontend/src/components/Footer.jsx`

**Files to Modify**:
- `frontend/src/App.jsx` - Add Footer to layout
- `frontend/src/components/Navigation.jsx` - Ensure consistent styling

**Styling**:
- Use `glass-strong` for glassmorphism
- Add subtle hover effects on links
- Include animated social icons
- Mobile-responsive (stack columns)

---

## 2. ✅ Visual Currency Sentiments Dashboard (COMPLETED)

**Estimated Time**: 3-4 days
**Complexity**: ⭐⭐ Medium
**Impact**: ⭐⭐⭐⭐ Very High
**Priority**: 🔴 High
**Status**: ✅ Completed on 2025-10-30

### Overview
Create a visual dashboard showing real-time sentiment for top cryptocurrencies with color-coded cards and sentiment trends.

### Features
- Grid layout with top 10-20 cryptocurrencies
- Real-time sentiment visualization:
  - 🟢 Green glow: Bullish (71-100)
  - 🟡 Yellow glow: Neutral (31-70)
  - 🔴 Red glow: Bearish (0-30)
- Micro sparkline charts (24h trend)
- Sentiment change indicators (↑↓ with %)
- Click to drill down to asset articles
- Sort by: Name, Sentiment Score, Change %
- Filter by sentiment category

### Visual Design
```
┌───────────────────────────────────────────────────────────┐
│  CRYPTOCURRENCY SENTIMENT HEATMAP                          │
│  Sort by: [Sentiment ▼] [Name] [Change]                  │
├───────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ BTC 🟢  │  │ ETH 🟢  │  │ SOL 🟡  │  │ ADA 🔴  │    │
│  │ ╔═══╗   │  │ ╔═══╗   │  │ ╔═══╗   │  │ ╔═══╗   │    │
│  │ ║ 78║   │  │ ║ 72║   │  │ ║ 55║   │  │ ║ 28║   │    │
│  │ ╚═══╝   │  │ ╚═══╝   │  │ ╚═══╝   │  │ ╚═══╝   │    │
│  │ ↑ +5.2% │  │ ↑ +2.1% │  │ ↓ -3.8% │  │ ↓ -8.4% │    │
│  │ ────▲─  │  │ ──▲───  │  │ ─▲────  │  │ ▼─────  │    │
│  │ 324 art │  │ 198 art │  │ 87 art  │  │ 45 art  │    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
│  [... more currencies ...]                                │
└───────────────────────────────────────────────────────────┘
```

### Implementation

**Backend** (No changes needed):
- Use existing `/api/sentiment/assets` endpoint
- Already returns: name, count, sentiment, avgBullishValue

**Frontend**:
- Create `CurrencySentimentGrid.jsx` component
- Create `CurrencyCard.jsx` component
- Add sparkline library (recharts mini or custom SVG)
- Implement sorting and filtering

**Data Structure**:
```javascript
{
  name: "BTC",
  sentiment: "BULLISH",
  score: 78,
  change: +5.2,        // % change from yesterday
  articleCount: 324,
  trend: [72, 74, 71, 75, 78], // Last 5 data points
  lastUpdated: "2025-10-29T10:30:00Z"
}
```

**Styling**:
- Use sentiment-based background glows
- Animate score changes
- Pulse effect on major changes
- Responsive grid (4 cols → 2 cols → 1 col)

**Location on Dashboard**:
Add new section after AI Insights or create dedicated page

---

## 3. 📰 Mainstream Finance News Sentiment (MFNS)

### Part A: Backend Implementation

**Estimated Time**: 1-2 weeks
**Complexity**: ⭐⭐⭐⭐ High
**Impact**: ⭐⭐⭐⭐⭐ Very High
**Priority**: 🟡 Medium-High

#### Data Sources

**Free/RSS Sources** (Start here):
1. **CNBC Finance** - RSS available
2. **Reuters Business** - RSS available
3. **MarketWatch** - RSS available
4. **Yahoo Finance** - RSS available
5. **Seeking Alpha** - RSS available

**Paid/API Sources** (Phase 2):
1. **Bloomberg Terminal API** (Enterprise)
2. **Financial Times API** (Paid)
3. **Wall Street Journal** (Scraping or API)

#### Database Schema

```sql
-- Create mainstream_articles table
CREATE TABLE mainstream_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Article data
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  url TEXT UNIQUE NOT NULL,
  source VARCHAR(100) NOT NULL, -- 'Bloomberg', 'CNBC', etc.
  author TEXT,
  image_url TEXT,
  published_at TIMESTAMP NOT NULL,

  -- AI Analysis
  sentiment VARCHAR(20) NOT NULL, -- 'BULLISH', 'BEARISH', 'NEUTRAL'
  bullish_value INTEGER NOT NULL CHECK (bullish_value >= 0 AND bullish_value <= 100),
  confidence_score DECIMAL(3,2), -- 0.00 to 1.00

  -- Crypto relevance
  crypto_relevance_score INTEGER, -- 0-100: How relevant to crypto
  mentions_crypto BOOLEAN DEFAULT false,
  mentioned_crypto_assets TEXT[], -- ['BTC', 'ETH', 'crypto', etc.]

  -- Topics/Categories
  topics TEXT[], -- ['inflation', 'fed-policy', 'recession', 'markets']
  category VARCHAR(50), -- 'macro', 'policy', 'markets', 'tech'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_mf_published_at ON mainstream_articles(published_at DESC);
CREATE INDEX idx_mf_source ON mainstream_articles(source);
CREATE INDEX idx_mf_sentiment ON mainstream_articles(sentiment);
CREATE INDEX idx_mf_crypto_relevance ON mainstream_articles(crypto_relevance_score DESC);
CREATE INDEX idx_mf_mentions_crypto ON mainstream_articles(mentions_crypto);

-- Correlation tracking table
CREATE TABLE sentiment_correlation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,

  -- Crypto sentiment
  crypto_sentiment_score INTEGER,
  crypto_bullish_pct DECIMAL(5,2),
  crypto_bearish_pct DECIMAL(5,2),
  crypto_article_count INTEGER,

  -- Mainstream sentiment
  mainstream_sentiment_score INTEGER,
  mainstream_bullish_pct DECIMAL(5,2),
  mainstream_bearish_pct DECIMAL(5,2),
  mainstream_article_count INTEGER,

  -- Correlation metrics
  correlation_coefficient DECIMAL(5,4), -- -1.00 to 1.00
  divergence_score INTEGER, -- 0-100: How different the sentiments are

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(date)
);
```

#### Backend Tasks

**1. Create Scrapers/Fetchers** (`backend/src/services/mainstream/`):
- `cnbcFetcher.js` - Fetch CNBC RSS
- `reutersFetcher.js` - Fetch Reuters RSS
- `yahooFinanceFetcher.js` - Fetch Yahoo Finance RSS
- `marketWatchFetcher.js` - Fetch MarketWatch RSS
- `mainstreamOrchestrator.js` - Coordinate all fetchers

**2. AI Analysis Enhancement** (`backend/src/services/ai/`):
- `cryptoRelevanceAnalyzer.js` - Detect crypto relevance
- `topicExtractor.js` - Extract topics/themes
- Update sentiment analyzer for finance context

**3. API Endpoints** (`backend/src/routes/mainstream.js`):
```javascript
GET /api/mainstream/articles
  - Query params: source, sentiment, cryptoRelevance, limit, offset, days
  - Returns: Paginated mainstream articles

GET /api/mainstream/stats
  - Query params: days
  - Returns: Overall sentiment statistics

GET /api/mainstream/trend
  - Query params: days, granularity
  - Returns: Sentiment over time

GET /api/mainstream/sources
  - Returns: Breakdown by source

GET /api/mainstream/topics
  - Returns: Trending topics

GET /api/mainstream/correlation
  - Query params: days
  - Returns: Crypto vs mainstream correlation data
```

**4. Background Jobs** (`backend/src/jobs/`):
- Schedule mainstream article fetching every 30 minutes
- Calculate daily correlation metrics
- Clean old articles (keep last 90 days)

#### Implementation Priority

**Week 1**:
1. Database schema and migrations
2. CNBC and Reuters fetchers (RSS)
3. Crypto relevance detection
4. Basic API endpoints

**Week 2**:
5. Yahoo Finance and MarketWatch fetchers
6. Topic extraction
7. Correlation calculation
8. Background job scheduler

---

### Part B: Frontend Dashboard Integration

**Estimated Time**: 4-5 days
**Complexity**: ⭐⭐⭐ Medium
**Impact**: ⭐⭐⭐⭐⭐ Very High
**Priority**: 🟡 Medium (Depends on backend)

#### Components to Create

**1. `MainstreamSentimentPanel.jsx`**
Main panel replacing "Coming Soon" placeholder

**2. `MainstreamArticleCard.jsx`**
Individual article display

**3. `SourceBreakdown.jsx`**
Pie chart or grid showing sentiment by source

**4. `MainstreamTrendChart.jsx`**
Line chart showing sentiment over time

**5. `TopicCloud.jsx`**
Trending topics visualization

**6. `CorrelationChart.jsx`**
Shows crypto vs mainstream correlation

**7. `MainstreamFilters.jsx`**
Filter by source, crypto relevance, topics

#### Dashboard Integration

**Layout**:
```
Dashboard Flow:
1. Header (Mood + Filter)
2. Crypto Sentiment Score (current)
3. Crypto Sentiment Trend (current)
4. AI Insights (current)
5. Quick Insights (current)
6. ╔════════════════════════════════════╗
   ║ MAINSTREAM FINANCE NEWS SENTIMENT  ║
   ║                                    ║
   ║ [Overall Sentiment Gauge]          ║
   ║                                    ║
   ║ ┌──────────┬─────────────────────┐ ║
   ║ │ Sources  │ 24h Trend           │ ║
   ║ │ Breakdown│ [Mini Chart]        │ ║
   ║ └──────────┴─────────────────────┘ ║
   ║                                    ║
   ║ [Trending Topics Cloud]            ║
   ║                                    ║
   ║ [Latest 5 Articles]                ║
   ║ • Article 1 (Source, Score)        ║
   ║ • Article 2 (Source, Score)        ║
   ║ ...                                ║
   ║                                    ║
   ║ [Show All Articles] →              ║
   ╚════════════════════════════════════╝
7. Crypto vs Mainstream Correlation Chart
8. Latest Crypto News (current)
```

#### Features
- **Toggle view**: Show crypto vs mainstream side-by-side
- **Source filter**: Filter by Bloomberg, CNBC, etc.
- **Crypto relevance filter**: Show only crypto-related news
- **Topic filter**: Filter by topics (inflation, fed-policy, etc.)
- **Comparison mode**: Compare sentiments in split view
- **Alert badge**: Show when sentiments diverge significantly

#### New Page: Mainstream Articles

Create `/mainstream-articles` page similar to `/articles`:
- Full article list with filtering
- Advanced search
- Source filtering
- Crypto relevance slider
- Topic filtering

---

## 4. Additional Feature Ideas

### 🎯 High-Value Additions

#### A. Sentiment Alerts & Notifications
**Time**: 1 week | **Impact**: High

- Email alerts on major sentiment shifts
- Browser push notifications
- Telegram bot integration
- Custom alert rules:
  - "Alert when BTC sentiment drops below 40"
  - "Alert when mainstream diverges from crypto by >30 points"
  - "Alert when specific keyword trends"

#### B. Portfolio Sentiment Tracker
**Time**: 1-2 weeks | **Impact**: Very High

- Users input their crypto portfolio
- Calculate weighted sentiment score
- "Your portfolio sentiment: 65/100"
- Alert on negative sentiment for holdings
- Compare your portfolio to market

#### C. Sentiment Heatmap Calendar
**Time**: 3-4 days | **Impact**: Medium-High

- GitHub-style contribution calendar
- Each day colored by sentiment
- Click to see articles from that day
- Identify patterns and cycles

#### D. News Impact Score
**Time**: 4-5 days | **Impact**: High

- Calculate impact score for each article:
  - Source authority (Bloomberg > small blog)
  - Recency (decay over time)
  - Engagement (if available)
  - Sentiment strength
- Show "High Impact" badge
- Sort by impact score

#### E. Social Sentiment Integration
**Time**: 2-3 weeks | **Impact**: Very High

- Twitter/X crypto mentions
- Reddit sentiment (r/cryptocurrency, r/bitcoin)
- Telegram groups
- Discord servers
- Combine news + social sentiment

#### F. Advanced Analytics Dashboard
**Time**: 1 week | **Impact**: Medium

- Historical correlation charts
- Sentiment volatility metrics
- Source reliability scores
- Prediction accuracy tracking
- Custom date range comparisons

#### G. AI Chat Assistant
**Time**: 2-3 weeks | **Impact**: Very High

- "What's the sentiment on BTC today?"
- "Show me bearish ETH news"
- "Compare SOL and ADA sentiment"
- RAG with article database
- Use OpenAI/Anthropic API

#### H. Public API & Developer Tools
**Time**: 1 week | **Impact**: Medium-High

- REST API for sentiment data
- API key management
- Rate limiting
- Documentation (Swagger/OpenAPI)
- Webhook support

---

## Medium-term Features (2-4 weeks)

### 5. Enhanced Search & Filtering
- Advanced search operators (AND, OR, NOT)
- Date range picker
- Multi-select filters
- Save search queries
- Export results (CSV/JSON)

### 6. User Accounts & Premium Features
- Free tier: Basic features
- Premium tier ($9.99/mo):
  - Alerts
  - Historical data
  - API access
  - Ad-free
- Enterprise tier ($99/mo):
  - Team accounts
  - Custom integrations
  - Priority support

### 7. Performance Optimization
- Redis caching layer
- Database query optimization
- Virtual scrolling
- Service worker / offline support
- Code splitting

---

## Long-term Vision (1-3 months)

### 8. Mobile App (React Native)
- iOS and Android
- Push notifications
- Offline reading
- Optimized mobile UX

### 9. Customizable Dashboard
- Drag-and-drop widgets
- Save layouts
- Multiple dashboard tabs
- Widget marketplace

### 10. White-Label Solution
- Sell to exchanges/platforms
- Custom branding
- Private deployment
- Licensing revenue

---

## Technical Improvements

### Testing
- [ ] Unit tests (Jest)
- [ ] Integration tests (Supertest)
- [ ] E2E tests (Playwright)
- [ ] Performance testing
- [ ] Load testing

### DevOps
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated deployments
- [ ] Error monitoring (Sentry)
- [ ] Analytics (PostHog/Mixpanel)
- [ ] Backup strategy

### Accessibility
- [ ] WCAG 2.1 AA compliance
- [ ] Keyboard navigation
- [ ] Screen reader optimization
- [ ] High contrast mode

---

## Monetization Strategy

### Revenue Streams

1. **Freemium Model**
   - Free: Basic features, 7-day data
   - Premium: $9.99/mo - Unlimited data, alerts, API
   - Enterprise: $99+/mo - Teams, white-label

2. **API Access**
   - Pay-per-request
   - Subscription tiers

3. **Affiliate Partnerships**
   - Crypto exchange referrals
   - Trading bot integrations

4. **Data Licensing**
   - Sell aggregated sentiment data
   - Research institutions
   - Hedge funds

5. **Advertising**
   - Non-intrusive (free tier only)
   - Sponsored content

---

## Recommended Implementation Order

### 🔴 Phase 1: Polish & Foundation (Week 1)
1. ✅ Footer component (Day 1)
2. 🟡 Visual currency sentiments (Days 2-4)
3. 🟡 Minor UX fixes (Day 5)

### 🟡 Phase 2: MFNS Core (Weeks 2-3)
4. 🔴 MFNS Backend (Week 2)
5. 🔴 MFNS Frontend (Week 3, Days 1-3)
6. 🟡 Testing & refinement (Week 3, Days 4-5)

### 🟢 Phase 3: Engagement (Weeks 4-5)
7. 🟡 Alerts & notifications (Week 4)
8. 🟡 News impact score (Week 4-5)
9. 🟡 Portfolio tracker (Week 5)

### 🟢 Phase 4: Growth (Weeks 6-8)
10. 🟡 User accounts
11. 🟡 Premium features
12. 🟡 Public API
13. 🟢 Advanced analytics

---

## Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Articles read per session
- Time on platform
- Return rate

### Product Performance
- Page load < 2s
- API response < 200ms
- Error rate < 0.1%
- Uptime > 99.9%

### Business
- User growth rate
- Premium conversion
- Revenue per user
- API adoption

---

## My Recommendation

**Current Status:** ✅ Footer & Visual Currency Sentiments completed!

**Next Steps:**
1. ⚡ **MFNS Backend Phase 1** (free RSS sources first, 1 week) - RECOMMENDED NEXT
2. **MFNS Frontend** (once backend ready, 4-5 days)
3. **User Alerts & Notifications** (1 week)

**Why MFNS Backend next?**
- Major differentiating feature that tracks mainstream finance news sentiment
- Provides unique value proposition (crypto + mainstream finance sentiment)
- RSS sources (CNBC, Reuters, Yahoo Finance) are free to integrate
- Can be built incrementally - start with free sources, add paid later
- Once complete, enables powerful correlation analysis

**What was just completed:**
✅ Visual Currency Sentiments Dashboard
- Color-coded sentiment cards for cryptocurrencies
- Real-time sentiment scores (0-100)
- Sorting by sentiment, name, or article count
- Filtering by bullish/bearish/neutral
- Click-to-drill-down to asset-specific articles
- Beautiful animations and hover effects

---

*Last Updated: 2025-10-30*
*Maintained by: Development Team*
*Next Review: 2025-11-12*
