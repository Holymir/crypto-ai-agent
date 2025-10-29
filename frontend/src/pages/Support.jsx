import { HelpCircle, Book, MessageCircle, Mail, Github, Twitter, FileText, Bug, Lightbulb, Search } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'What is sentiment analysis?',
      answer: 'Sentiment analysis uses AI to analyze the tone and emotion in text. We use GPT-4 to read crypto news articles and determine if they are bullish (positive), bearish (negative), or neutral about different cryptocurrencies.'
    },
    {
      question: 'How accurate is the sentiment scoring?',
      answer: 'Our AI achieves approximately 95% accuracy in sentiment classification. The bullish value (0-100 scale) provides nuanced scoring beyond simple positive/negative labels. However, sentiment should be one of many factors in your analysis.'
    },
    {
      question: 'How often is data updated?',
      answer: 'We fetch and analyze new articles 12 times per day (every 2 hours). Our dashboard and API reflect the latest sentiment data in real-time.'
    },
    {
      question: 'Is the API free to use?',
      answer: 'Yes! Our API is currently public and free to use with a rate limit of 100 requests per minute. We may introduce premium tiers in the future for higher limits and advanced features.'
    },
    {
      question: 'What news sources do you track?',
      answer: 'We aggregate from 50+ crypto news sources including CoinDesk, Cointelegraph, Decrypt, The Block, CoinTelegraph, and many more. We continuously add new sources to improve coverage.'
    },
    {
      question: 'Can I use this for trading decisions?',
      answer: 'SentiFi is an informational tool only and NOT financial advice. While sentiment can be a useful indicator, you should always do your own research and never invest more than you can afford to lose. We are not responsible for trading losses.'
    },
    {
      question: 'Do you offer alerts or notifications?',
      answer: 'Not yet, but it\'s on our roadmap! We plan to add email, Discord, and Telegram alerts for major sentiment shifts in the coming months.'
    },
    {
      question: 'How can I report a bug or request a feature?',
      answer: 'Please open an issue on our GitHub repository or contact us via email at support@sentifi.xyz. We appreciate all feedback and actively incorporate community suggestions into our roadmap.'
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Yes! We collect minimal user data (only what you provide through contact forms). We use HTTPS/TLS encryption for all connections and don\'t sell or share your information with third parties.'
    },
    {
      question: 'Can I integrate SentiFi into my own app?',
      answer: 'Absolutely! Check out our API Documentation page for detailed endpoint information and code examples. Our REST API makes it easy to integrate sentiment data into your applications.'
    }
  ];

  const supportChannels = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help from our team',
      link: 'mailto:support@sentifi.xyz',
      linkText: 'support@sentifi.xyz',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Github,
      title: 'GitHub Issues',
      description: 'Report bugs and request features',
      link: 'https://github.com/Holymir/crypto-ai-agent/issues',
      linkText: 'Open an Issue',
      color: 'text-gray-900 dark:text-white',
      bgColor: 'bg-gray-500/10'
    },
    {
      icon: Twitter,
      title: 'Twitter / X',
      description: 'Follow us for updates',
      link: 'https://twitter.com/sentifixyz',
      linkText: '@sentifixyz',
      color: 'text-sky-500',
      bgColor: 'bg-sky-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Discord Community',
      description: 'Chat with the community',
      link: 'https://discord.gg/sentifixyz',
      linkText: 'Join Discord',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  const resources = [
    {
      icon: Book,
      title: 'API Documentation',
      description: 'Learn how to integrate our API',
      link: '/api-docs',
      color: 'text-purple-500'
    },
    {
      icon: FileText,
      title: 'Product Roadmap',
      description: 'See what we\'re building next',
      link: '/roadmap',
      color: 'text-green-500'
    },
    {
      icon: Bug,
      title: 'Report a Bug',
      description: 'Help us improve by reporting issues',
      link: 'https://github.com/Holymir/crypto-ai-agent/issues/new?labels=bug',
      color: 'text-red-500'
    },
    {
      icon: Lightbulb,
      title: 'Feature Requests',
      description: 'Suggest new features and improvements',
      link: 'https://github.com/Holymir/crypto-ai-agent/issues/new?labels=enhancement',
      color: 'text-amber-500'
    }
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Support & Help Center"
        description="Get help with SentiFi. Find answers to frequently asked questions, contact our support team, and access resources."
        keywords="support, help center, FAQ, contact support, customer service, help"
      />

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Support Center
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              How Can We{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
              Find answers to common questions or reach out to our team for assistance.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 glass-strong rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Support Channels */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => (
                <motion.a
                  key={channel.title}
                  href={channel.link}
                  target={channel.link.startsWith('http') ? '_blank' : undefined}
                  rel={channel.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-2xl p-6 hover-lift text-center group"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl ${channel.bgColor} flex items-center justify-center`}>
                    <channel.icon className={`w-8 h-8 ${channel.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {channel.description}
                  </p>
                  <span className={`font-semibold ${channel.color} group-hover:underline`}>
                    {channel.linkText}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Resources */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Helpful Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.a
                  key={resource.title}
                  href={resource.link}
                  target={resource.link.startsWith('http') ? '_blank' : undefined}
                  rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-strong rounded-2xl p-6 hover-lift group"
                >
                  <resource.icon className={`w-10 h-10 mb-4 ${resource.color}`} />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQ Section */}
        <ScrollReveal>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {filteredFaqs.length === 0 ? (
              <div className="glass-strong rounded-2xl p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No results found for "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.details
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-strong rounded-2xl overflow-hidden group hover-lift"
                  >
                    <summary className="cursor-pointer p-6 font-bold text-lg text-gray-900 dark:text-white list-none flex items-center justify-between">
                      <span>{faq.question}</span>
                      <HelpCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                      {faq.answer}
                    </div>
                  </motion.details>
                ))}
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-16 glass-strong rounded-2xl p-8 sm:p-12 text-center">
            <MessageCircle className="w-16 h-16 mx-auto mb-6 text-primary-600 dark:text-primary-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help.
              Reach out and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all hover-lift"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
};
