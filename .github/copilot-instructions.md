# AI Agent Instructions for crypto-ai-agent

## Project Overview

This is a cryptocurrency news sentiment analysis system that automatically fetches, processes, and analyzes crypto news articles using AI. The system runs on a scheduled basis and maintains a history of processed articles to avoid duplicates.

## Key Components

### News Fetching (`services/newsFetcher.js`)

- Uses RSS feeds from major crypto news sources (CoinDesk and CoinTelegraph)
- Fetches latest 5 articles from each source
- Returns array of `{title, content}` objects

### Sentiment Analysis (`services/sentimentAnalyzer.js`)

- Uses OpenAI GPT-3.5-turbo for sentiment classification
- Classifies news as: `Bullish`, `Bearish`, or `Neutral`
- Requires `OPENAI_API_KEY` in `.env` file
- Temperature set to 0.3 for more consistent responses

### Scheduler (`scheduler/cronJob.js`)

- Runs every minute (configurable via cron expression `* * * * *`)
- Maintains processed articles history in `scheduler/processedNews.json`
- Uses `Set` data structure to track unique article titles
- Logs timestamp and sentiment for each new article

## Environment Setup

1. Create `.env` file with:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Key Patterns & Conventions

- Service modules use CommonJS `module.exports`
- Error handling includes fallbacks (e.g., 'Error' sentiment on API failure)
- Logging uses ISO timestamps and arrow notation for sentiment results
- File paths use Node.js `path.join()` for cross-platform compatibility

## Integration Points

1. RSS Feeds:
   - CoinDesk: `https://www.coindesk.com/arc/outboundfeeds/rss/`
   - CoinTelegraph: `https://cointelegraph.com/rss`
2. OpenAI API:
   - Model: gpt-3.5-turbo
   - Maximum response tokens: 10
   - System prompt template in `sentimentAnalyzer.js`

## Development Workflow

1. Start the service:
   ```
   npm start
   ```
2. Monitor logs for new articles and sentiment analysis
3. Check `processedNews.json` for history of processed articles

## Common Tasks

- To modify news sources: Edit `feedUrls` array in `newsFetcher.js`
- To adjust scheduling: Modify cron expression in `cronJob.js`
- To change sentiment analysis parameters: Update `temperature` and `max_tokens` in `sentimentAnalyzer.js`
