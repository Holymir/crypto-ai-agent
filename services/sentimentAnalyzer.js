const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function analyzeSentiment(text) {
  const prompt = `
Анализирай следната новина и класифицирай настроението като: Bullish, Bearish или Neutral. 
Дай само една дума (на английски):

"${text}"
`;

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Ти си трейдър, който оценява новини като "Bullish", "Bearish" или "Neutral". Отговаряй само с една дума.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 10
    });

    return res.choices[0].message.content.trim();
  } catch (err) {
    console.error('OpenAI error:', err.message);
    return 'Error';
  }
};
