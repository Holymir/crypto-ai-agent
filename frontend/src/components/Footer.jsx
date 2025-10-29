import { Link } from 'react-router-dom';
import { Github, Twitter, MessageCircle, Send, Heart, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Articles', path: '/articles' },
    { name: 'About', path: '/about' },
  ];

  const resources = [
    { name: 'API Docs', path: '/api-docs', external: false },
    { name: 'Roadmap', path: '/roadmap', external: false },
    { name: 'Support', path: '/support', external: false },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Holymir/crypto-ai-agent',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/',
      color: 'hover:text-blue-500 dark:hover:text-blue-400'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/',
      color: 'hover:text-indigo-500 dark:hover:text-indigo-400'
    },
    {
      name: 'Telegram',
      icon: Send,
      url: 'https://t.me/',
      color: 'hover:text-blue-500 dark:hover:text-blue-400'
    },
  ];

  const techStack = [
    { name: 'React', color: 'text-blue-500' },
    { name: 'Node.js', color: 'text-green-600' },
    { name: 'OpenAI', color: 'text-emerald-500' },
    { name: 'PostgreSQL', color: 'text-blue-600' },
    { name: 'Tailwind CSS', color: 'text-cyan-500' },
  ];

  return (
    <footer className="relative mt-16 sm:mt-20 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-secondary-50/30 dark:from-transparent dark:via-primary-900/5 dark:to-secondary-900/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  SENTIFI.XYZ
                </span>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                AI-Powered Crypto Sentiment Analysis. Track real-time market sentiment from top news sources with advanced AI technology.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-500 fill-current" />
                <span>for the crypto community</span>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-500 group-hover:w-4 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-4 uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary-500 group-hover:w-4 transition-all" />
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-primary-500 group-hover:w-4 transition-all" />
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-4 uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 glass rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all hover:shadow-lg group`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              Join our community for updates and discussions
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {currentYear} Sentifi. All rights reserved.
            </div>

            {/* Tech Stack */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="text-xs text-gray-500 dark:text-gray-500">Built with</span>
              {techStack.map((tech, index) => (
                <span key={tech.name} className="flex items-center gap-2">
                  <span className={`text-xs font-semibold ${tech.color}`}>
                    {tech.name}
                  </span>
                  {index < techStack.length - 1 && (
                    <span className="text-gray-400 dark:text-gray-600">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-500">
            <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Contact
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
