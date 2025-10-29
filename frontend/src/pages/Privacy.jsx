import { Shield, Lock, Eye, Database, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const Privacy = () => {
  const lastUpdated = 'October 29, 2025';

  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'We collect minimal information necessary to provide our services. This includes anonymous usage data to improve our platform, such as pages visited and features used.',
        'We do not collect personal information unless you voluntarily provide it (e.g., for newsletter subscription or contact forms).',
        'IP addresses and browser information may be logged for security and analytics purposes.'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our sentiment analysis services',
        'To analyze usage patterns and optimize user experience',
        'To send important updates about our service (if you\'ve subscribed)',
        'To respond to your inquiries and provide customer support',
        'To detect and prevent fraud or abuse of our platform'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or destruction.',
        'All data transmission is encrypted using HTTPS/TLS protocols.',
        'We regularly review and update our security practices to ensure the highest level of protection.',
        'In the event of a data breach, we will notify affected users promptly as required by law.'
      ]
    },
    {
      icon: Users,
      title: 'Third-Party Services',
      content: [
        'We use third-party services for analytics (e.g., Google Analytics) and hosting (Vercel, Railway).',
        'These services may collect anonymous usage data according to their own privacy policies.',
        'We do not sell, trade, or transfer your information to third parties for marketing purposes.',
        'Links to external websites are not covered by this privacy policy.'
      ]
    },
    {
      icon: FileText,
      title: 'Cookies and Tracking',
      content: [
        'We use cookies to remember your preferences (e.g., dark mode setting) and improve your experience.',
        'Analytics cookies help us understand how users interact with our platform.',
        'You can disable cookies in your browser settings, but this may affect functionality.',
        'We do not use tracking cookies for advertising or marketing purposes.'
      ]
    },
    {
      icon: Shield,
      title: 'Your Rights',
      content: [
        'You have the right to access any personal information we hold about you.',
        'You can request deletion of your personal data at any time.',
        'You can opt out of non-essential cookies and analytics tracking.',
        'You can update or correct your information by contacting us.',
        'You can unsubscribe from our communications at any time.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Privacy Policy"
        description="SentiFi Privacy Policy - Learn how we collect, use, and protect your data. Your privacy and security are our top priorities."
        keywords="privacy policy, data protection, GDPR, user privacy, data security"
      />

      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 glass-strong rounded-full mb-6"
            >
              <Shield className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Privacy Policy
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Your Privacy Matters
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>
        </ScrollReveal>

        {/* Introduction */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-8 shadow-xl">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              At <strong className="text-gray-900 dark:text-white">SentiFi</strong>, we take your privacy seriously.
              This Privacy Policy explains how we collect, use, protect, and handle your information when you use our
              crypto sentiment analysis platform.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By using SentiFi, you agree to the collection and use of information in accordance with this policy.
              If you have any questions or concerns, please contact us.
            </p>
          </div>
        </ScrollReveal>

        {/* Sections */}
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <ScrollReveal key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-gray-600 dark:text-gray-400">
                      <span className="text-primary-500 mt-1.5">•</span>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </ScrollReveal>
          );
        })}

        {/* Data Retention */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-8 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Retention
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We retain your information only for as long as necessary to provide our services and fulfill the
              purposes outlined in this privacy policy. Anonymous analytics data may be retained indefinitely
              for statistical purposes.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you request deletion of your data, we will promptly remove all personal information from our
              systems, except where retention is required by law.
            </p>
          </div>
        </ScrollReveal>

        {/* Children's Privacy */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-8 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our service is not directed to individuals under the age of 18. We do not knowingly collect
              personal information from children. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us immediately.
            </p>
          </div>
        </ScrollReveal>

        {/* Changes to Policy */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-8 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this
              Privacy Policy are effective when they are posted on this page.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 shadow-xl border-2 border-primary-200 dark:border-primary-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-primary-500">•</span>
                <span>Email: privacy@sentifi.xyz</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary-500">•</span>
                <span>Website: https://sentifi.xyz/contact</span>
              </li>
            </ul>
          </div>
        </ScrollReveal>
      </div>

      <Footer />
    </div>
  );
};
