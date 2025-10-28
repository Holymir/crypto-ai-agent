const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Normalize sentiment output to match database enum
 */
function normalizeSentiment(rawSentiment) {
  const normalized = rawSentiment.toUpperCase().trim();

  if (normalized.includes('BULL')) return 'BULLISH';
  if (normalized.includes('BEAR')) return 'BEARISH';
  if (normalized.includes('NEUTRAL')) return 'NEUTRAL';

  return 'ERROR';
}

/**
 * Analyze cryptocurrency news article with comprehensive AI analysis
 * Returns structured data including sentiment, bullish value, asset, category, chain, and keywords
 *
 * @param {string} text - Article text to analyze
 * @returns {Promise<Object>} Analysis result with sentiment, bullishValue, asset, category, chain, keywords
 */
module.exports = async function analyzeSentiment(text) {
  const systemPrompt = `You are an expert cryptocurrency market analyst. Analyze the provided news article and return a comprehensive analysis in JSON format.

Your analysis must include:

1. **sentiment**: Classify as "BULLISH", "BEARISH", or "NEUTRAL"
   - BULLISH: Positive news, price increases, adoption, positive regulations, technological advances
   - BEARISH: Negative news, price drops, bans, hacks, security issues, negative regulations
   - NEUTRAL: Factual reporting, mixed signals, or unclear market impact

2. **bullishValue**: Rate from 1-100 (integer only)
   - 1-20: Extremely bearish (major crashes, bans, significant negative events)
   - 21-40: Moderately bearish (price drops, negative news, concerns)
   - 41-60: Neutral (mixed signals, factual reporting, unclear impact)
   - 61-80: Moderately bullish (price gains, positive developments, adoption)
   - 81-100: Extremely bullish (major adoption, significant positive events, breakthrough developments)

3. **asset**: Primary cryptocurrency mentioned (if any)
   - Use ticker symbols: "BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "MATIC", "DOT", "AVAX", etc.
   - Use "MULTIPLE" if article covers several cryptocurrencies equally
   - Use "GENERAL" if no specific cryptocurrency is the focus
   - Use "OTHER" for lesser-known altcoins not in major exchanges

4. **category**: Main topic category
   - "Price Movement": Price analysis, technical analysis, market trends
   - "Regulation": Government policies, legal issues, compliance
   - "Technology": Protocol upgrades, technical developments, innovations
   - "DeFi": Decentralized finance, lending, yield farming, DEX
   - "NFT": Non-fungible tokens, digital art, collectibles
   - "Adoption": Institutional adoption, merchant acceptance, mainstream integration
   - "Security": Hacks, exploits, security vulnerabilities
   - "Mining": PoW mining, hashrate, mining economics
   - "Staking": PoS staking, validators, staking rewards
   - "Meme": Meme coins, social media driven tokens
   - "Gaming": Blockchain gaming, play-to-earn, GameFi
   - "AI": AI and crypto integration, AI tokens
   - "RWA": Real-world assets, tokenization
   - "Infrastructure": Wallets, exchanges, custody solutions
   - "Metaverse": Virtual worlds, metaverse projects
   - "General": Broad crypto news not fitting other categories

5. **chain**: Blockchain ecosystem mentioned
   - "Bitcoin", "Ethereum", "Solana", "BNB Chain", "Cardano", "Polygon", "Avalanche", "Polkadot", "Arbitrum", "Optimism", "Base", etc.
   - Use "MULTIPLE" if article discusses several chains
   - Use "GENERAL" if no specific blockchain is the focus

6. **keywords**: Extract 1-3 most important crypto-related keywords/phrases from the article
   - Focus on: specific protocols, technologies, events, or concepts mentioned
   - Format as comma-separated string (e.g., "ETF approval, spot trading, institutional adoption")
   - Be specific and relevant to crypto/blockchain (not generic news terms)
   - Examples: "Layer 2", "ETF", "DeFi protocol", "smart contracts", "halving", "airdrop"

Return ONLY valid JSON in this exact format:
{
  "sentiment": "BULLISH" | "BEARISH" | "NEUTRAL",
  "bullishValue": <1-100>,
  "asset": "<TICKER or MULTIPLE or GENERAL or OTHER>",
  "category": "<category from list above>",
  "chain": "<blockchain name or MULTIPLE or GENERAL>",
  "keywords": "<keyword1, keyword2, keyword3>"
}`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Analyze this cryptocurrency news article:\n\n${text}`
        }
      ],
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: 'json_object' }
    });

    const rawResponse = res.choices[0].message.content.trim();
    const analysis = JSON.parse(rawResponse);

    // Validate and normalize the response
    const result = {
      sentiment: normalizeSentiment(analysis.sentiment || 'NEUTRAL'),
      bullishValue: Math.max(1, Math.min(100, parseInt(analysis.bullishValue) || 50)),
      asset: (analysis.asset || 'GENERAL').toUpperCase().trim(),
      category: (analysis.category || 'General').trim(),
      chain: (analysis.chain || 'GENERAL').trim(),
      keywords: (analysis.keywords || '').trim()
    };

    console.log('[AI Analysis]', {
      sentiment: result.sentiment,
      bullishValue: result.bullishValue,
      asset: result.asset,
      category: result.category,
      chain: result.chain,
      keywords: result.keywords
    });

    return result;
  } catch (err) {
    console.error('[ERROR] OpenAI sentiment analysis:', err.message);
    // Return error fallback with default values
    return {
      sentiment: 'ERROR',
      bullishValue: 50,
      asset: 'GENERAL',
      category: 'General',
      chain: 'GENERAL',
      keywords: ''
    };
  }
};
