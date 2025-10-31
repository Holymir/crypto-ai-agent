const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Analyze cryptocurrency news article with comprehensive AI analysis
 * Returns structured data including sentiment score (0-100), asset, category, chain, and keywords
 *
 * @param {string} text - Article text to analyze
 * @returns {Promise<Object>} Analysis result with sentimentScore (0-100), asset, category, chain, keywords
 */
module.exports = async function analyzeSentiment(text) {
  const systemPrompt = `You are an expert cryptocurrency market analyst. Analyze the provided news article and return a comprehensive analysis in JSON format.

Your analysis must include:

1. **sentimentScore**: Rate from 0-100 (integer only) - This is the ONLY sentiment indicator
   - 0-10: Extremely bearish (major crashes, bans, significant negative events, catastrophic failures)
   - 11-25: Very bearish (severe price drops, major negative news, serious concerns)
   - 26-40: Moderately bearish (price drops, negative news, warnings, declining adoption)
   - 41-59: Neutral (mixed signals, factual reporting, unclear market impact, balanced news)
   - 60-74: Moderately bullish (price gains, positive developments, growing adoption)
   - 75-89: Very bullish (major positive news, significant gains, strong adoption signals)
   - 90-100: Extremely bullish (groundbreaking adoption, massive positive events, revolutionary developments)

2. **asset**: Primary cryptocurrency mentioned (if any)
   - Use ticker symbols: "BTC", "ETH", "SOL", "BNB", "XRP", "ADA", "DOGE", "MATIC", "DOT", "AVAX", "USDC", "USDT", etc.
   - Use "GENERAL" if no specific cryptocurrency is the focus or if article covers several cryptocurrencies equally
   - Use "OTHER" for lesser-known altcoins not in major exchanges

3. **category**: Main topic category
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

4. **chain**: Blockchain ecosystem mentioned
   - "Bitcoin", "Ethereum", "Solana", "BNB Chain", "Cardano", "Polygon", "Avalanche", "Polkadot", "Arbitrum", "Optimism", "Base", etc.
   - Use "GENERAL" if no specific blockchain is the focus or article discusses several chains

5. **keywords**: Extract 1-3 most important crypto-related keywords/phrases from the article
   - Focus on: specific protocols, technologies, events, or concepts mentioned
   - Format as comma-separated string (e.g., "ETF approval, spot trading, institutional adoption")
   - Be specific and relevant to crypto/blockchain (not generic news terms)
   - Examples: "Layer 2", "ETF", "DeFi protocol", "smart contracts", "halving", "airdrop"

Return ONLY valid JSON in this exact format:
{
  "sentimentScore": <0-100>,
  "asset": "<TICKER or GENERAL or OTHER>",
  "category": "<category from list above>",
  "chain": "<blockchain name or GENERAL>",
  "keywords": "<keyword1, keyword2, keyword3>"
}`;

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Analyze this cryptocurrency news article:\n\n${text}`,
        },
      ],
      max_completion_tokens: 800, // Increased to allow for reasoning tokens + response
      response_format: { type: "json_object" },
    });

    const rawResponse = res.choices[0]?.message?.content?.trim();

    // Validate response exists and is not empty
    if (!rawResponse) {
      console.error("[ERROR] Empty OpenAI response - finish_reason:", res.choices?.[0]?.finish_reason);
      throw new Error("Empty response from OpenAI API");
    }

    // Log raw response for debugging
    console.log("[AI Raw Response]", rawResponse);

    const analysis = JSON.parse(rawResponse);

    // Validate and normalize the response
    const result = {
      sentimentScore: parseInt(analysis.sentimentScore) || 50,
      asset: (analysis.asset || "GENERAL").toUpperCase().trim(),
      category: (analysis.category || "General").trim(),
      chain: (analysis.chain || "GENERAL").trim(),
      keywords: (analysis.keywords || "").trim(),
    };

    console.log("[AI Analysis]", {
      sentimentScore: result.sentimentScore,
      asset: result.asset,
      category: result.category,
      chain: result.chain,
      keywords: result.keywords,
    });

    return result;
  } catch (err) {
    console.error("[ERROR] OpenAI sentiment analysis:", err.message);
    // Return error fallback with default neutral value
    return {
      sentimentScore: 50,
      asset: "GENERAL",
      category: "General",
      chain: "GENERAL",
      keywords: "",
    };
  }
};
