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

module.exports = async function analyzeSentiment(text) {
  const prompt = `Analyze the following cryptocurrency news article and classify the sentiment as EXACTLY one word: Bullish, Bearish, or Neutral.

Only respond with one of these three words, nothing else.`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: prompt
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 10
    });

    const rawSentiment = res.choices[0].message.content.trim();
    return normalizeSentiment(rawSentiment);
  } catch (err) {
    console.error('[ERROR] OpenAI sentiment analysis:', err.message);
    return 'ERROR';
  }
};
