import { Mail, MessageSquare, Github, Twitter, Send as TelegramIcon, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'For general inquiries and support',
      contact: 'hello@sentifi.xyz',
      action: 'mailto:hello@sentifi.xyz',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Report bugs or contribute',
      contact: '@Holymir/crypto-ai-agent',
      action: 'https://github.com/Holymir/crypto-ai-agent',
      color: 'from-gray-700 to-gray-900'
    },
    {
      icon: Twitter,
      title: 'Twitter',
      description: 'Follow us for updates',
      contact: '@sentifixyz',
      action: 'https://twitter.com/',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Discord',
      description: 'Join our community',
      contact: 'discord.gg/sentifixyz',
      action: 'https://discord.gg/',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const faqCategories = [
    {
      title: 'General Questions',
      email: 'hello@sentifi.xyz'
    },
    {
      title: 'Technical Support',
      email: 'support@sentifi.xyz'
    },
    {
      title: 'Business Inquiries',
      email: 'business@sentifi.xyz'
    },
    {
      title: 'Privacy & Legal',
      email: 'legal@sentifi.xyz'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Contact Us"
        description="Get in touch with SentiFi. Contact us for support, partnerships, or general inquiries about our crypto sentiment analysis platform."
        keywords="contact, support, help, customer service, get in touch"
      />

      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Get in Touch
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              We'd Love to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Hear From You
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? Choose your preferred way to reach us.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Methods Grid */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.a
                  key={method.title}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="glass-strong rounded-2xl p-8 shadow-xl hover-lift hover-glow group cursor-pointer"
                >
                  <div className={`inline-flex p-4 bg-gradient-to-br ${method.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {method.description}
                  </p>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold">
                    {method.contact}
                  </p>
                </motion.a>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Contact by Category */}
        <ScrollReveal>
          <div className="glass-strong rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Contact by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover-lift"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <a
                    href={`mailto:${category.email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {category.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Tips */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-16 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Before You Reach Out
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Check the Docs</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Visit our documentation for common questions and guides
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🐛</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Found a Bug?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Report it on GitHub for faster resolution
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Feature Request?</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We'd love to hear your ideas on Discord
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Response Time Notice */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 shadow-xl border-2 border-primary-200 dark:border-primary-800 text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Response Time
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We typically respond within <strong className="text-primary-600 dark:text-primary-400">24-48 hours</strong>.
              For urgent matters, please reach out on Discord for fastest response.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              All inquiries are handled in the order they are received.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
};
