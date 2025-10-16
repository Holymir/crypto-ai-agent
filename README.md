# 🤖 SentiFi AI

An advanced cryptocurrency intelligence platform that delivers real-time market insights through AI-powered sentiment analysis. Automatically aggregates and processes news from major crypto sources (CoinDesk, CoinTelegraph), leveraging OpenAI GPT-3.5 for deep sentiment analysis, and presents actionable insights through an intuitive interactive dashboard.

![Tech Stack](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

## ✨ Features

- 📰 **Automated News Fetching**: Pulls latest crypto news every 2 hours from RSS feeds
- 🧠 **AI Sentiment Analysis**: Classifies articles as Bullish, Bearish, or Neutral using OpenAI
- 📊 **Interactive Dashboard**: Real-time stats with charts and visualizations
- 🔍 **Advanced Filtering**: Search and filter articles by sentiment, source, and date
- 💾 **Database Storage**: Persistent storage with duplicate detection
- 🎨 **Modern UI**: Built with React, Tailwind CSS, and Recharts

## 🏗️ Architecture

```
crypto-ai-agent/
├── backend/
│   └── src/
│       ├── cron/          # Scheduled news analyzer
│       ├── models/        # Prisma client
│       ├── routes/        # API routes
│       ├── services/      # Business logic
│       ├── middleware/    # Express middleware
│       └── server.js      # Entry point
├── frontend/
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Dashboard, Articles
│       ├── hooks/         # React Query hooks
│       ├── lib/           # API client, utils
│       └── App.jsx        # Main app
├── prisma/
│   └── schema.prisma      # Database schema
└── scripts/
    └── seed.js            # Database seeder
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Holymir/crypto-ai-agent.git
   cd crypto-ai-agent
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (backend)
   npm install

   # Install frontend dependencies
   cd frontend && npm install && cd ..
   ```

3. **Configure environment variables**
   ```bash
   # Copy example env files
   cp .env.example .env
   cp frontend/.env.example frontend/.env

   # Edit .env and add your OpenAI API key
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate

   # (Optional) Seed with historical data
   npm run seed
   ```

5. **Start the application**

   **Option A: Run both backend and frontend separately**
   ```bash
   # Terminal 1 - Backend API + Cron Job
   npm start

   # Terminal 2 - Frontend Dev Server
   npm run client
   ```

   **Option B: Production build**
   ```bash
   # Build frontend
   cd frontend && npm run build

   # Serve with backend
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173 (dev) or http://localhost:3001 (production)
   - Backend API: http://localhost:3001/api

## 🔌 API Endpoints

### Health
- `GET /api/health` - Health check

### Articles
- `GET /api/articles` - Get all articles (with pagination & filters)
- `GET /api/articles/latest?limit=10` - Get latest articles
- `GET /api/articles/:id` - Get article by ID

### Stats
- `GET /api/stats/sentiment` - Get sentiment statistics
- `GET /api/stats/trend?days=7` - Get sentiment trend over time

## 🗄️ Database Schema

### Articles Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| title | String | Article title (unique) |
| content | String | Article content/snippet |
| source | String | News source (CoinDesk, CoinTelegraph) |
| sentiment | Enum | BULLISH, BEARISH, NEUTRAL, ERROR |
| url | String | Original article URL |
| publishedAt | DateTime | Publication date |
| analyzedAt | DateTime | Analysis timestamp |

### SentimentStats Table
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| date | Date | Stats date (unique) |
| bullishCount | Integer | Number of bullish articles |
| bearishCount | Integer | Number of bearish articles |
| neutralCount | Integer | Number of neutral articles |
| errorCount | Integer | Number of errors |
| totalCount | Integer | Total articles |

## 📦 Deployment

### Railway (Recommended)

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project** and add:
   - PostgreSQL database
   - Web service (from GitHub repo)

3. **Configure environment variables** in Railway dashboard:
   ```
   OPENAI_API_KEY=your_key_here
   DATABASE_URL=postgresql://... (auto-generated by Railway)
   PORT=3001
   NODE_ENV=production
   ```

4. **Add build command**:
   ```bash
   npm install && cd frontend && npm install && npm run build && cd .. && npx prisma generate && npx prisma migrate deploy
   ```

5. **Set start command**:
   ```bash
   npm start
   ```

6. **Deploy** - Railway will auto-deploy on git push

### Render

1. **Create account** at [render.com](https://render.com)
2. **Create PostgreSQL database**
3. **Create Web Service** from GitHub
4. **Set environment variables** (same as Railway)
5. **Build command**:
   ```bash
   npm install && cd frontend && npm install && npm run build && cd .. && npx prisma generate && npx prisma migrate deploy
   ```
6. **Start command**: `npm start`

### Vercel + Supabase

**Frontend (Vercel)**:
1. Import GitHub repo to Vercel
2. Set root directory to `frontend`
3. Add env var: `VITE_API_URL=your_backend_url`

**Backend (Render/Railway)**:
1. Deploy backend separately
2. Use Supabase for PostgreSQL database

## 🛠️ Development

### Available Scripts

```bash
npm start          # Start backend server with cron job
npm run dev        # Same as start (development mode)
npm run server     # Start only backend server
npm run client     # Start frontend dev server
npm run seed       # Seed database with historical data
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
```

### Adding New RSS Sources

Edit `backend/src/services/newsFetcher.js`:

```javascript
const FEED_SOURCES = [
  { name: 'CoinDesk', url: 'https://www.coindesk.com/arc/outboundfeeds/rss/' },
  { name: 'CoinTelegraph', url: 'https://cointelegraph.com/rss' },
  { name: 'YourSource', url: 'https://example.com/rss' },  // Add here
];
```

### Changing Cron Schedule

Edit `backend/src/cron/newsAnalyzer.js`:

```javascript
// Current: Every 2 hours
cron.schedule('0 */2 * * *', processNews);

// Daily at midnight
cron.schedule('0 0 * * *', processNews);

// Every hour
cron.schedule('0 * * * *', processNews);
```

## 🔐 Security Notes

- ⚠️ **Never commit `.env` files** - Added to `.gitignore` by default
- 🔑 **Rotate API keys** if accidentally exposed
- 🌐 **Use environment variables** for all sensitive data
- 🔒 **Enable CORS** only for trusted origins in production

## 🐛 Troubleshooting

**Database connection errors**:
- Verify `DATABASE_URL` in `.env`
- Run `npm run prisma:generate` after schema changes

**Frontend can't reach API**:
- Check `VITE_API_URL` in `frontend/.env`
- Ensure backend is running on port 3001

**OpenAI API errors**:
- Verify API key is valid and has credits
- Check rate limits

**Cron job not running**:
- Check server logs
- Verify cron expression syntax

## 📝 License

ISC

## 🤝 Contributing

Contributions welcome! Feel free to open issues or PRs.

## 📧 Contact

For questions or support, open an issue on GitHub.

---

Built with ❤️ using Node.js, React, Prisma, and OpenAI
