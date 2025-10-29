import { FileText, AlertCircle, CheckCircle, XCircle, Scale, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';

export const Terms = () => {
  const lastUpdated = 'October 29, 2025';

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-dark-bg dark:via-neutral-900 dark:to-dark-bg transition-colors duration-300">
      <SEO
        title="Terms of Service"
        description="SentiFi Terms of Service - Read our terms and conditions for using the crypto sentiment analysis platform."
        keywords="terms of service, terms and conditions, user agreement, legal"
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
              <FileText className="w-4 h-4 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Terms of Service
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
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
              Welcome to <strong className="text-gray-900 dark:text-white">SentiFi</strong>. These Terms of Service ("Terms")
              govern your access to and use of our crypto sentiment analysis platform and services.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using SentiFi, you agree to be bound by these Terms. If you disagree with any part of
              these Terms, you may not access our service.
            </p>
          </div>
        </ScrollReveal>

        {/* Acceptance of Terms */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                1. Acceptance of Terms
              </h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>By using SentiFi, you confirm that:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span>You are at least 18 years old or have parental consent</span></li>
                <li className="flex gap-2"><span>•</span><span>You have the legal capacity to enter into these Terms</span></li>
                <li className="flex gap-2"><span>•</span><span>You will comply with all applicable laws and regulations</span></li>
                <li className="flex gap-2"><span>•</span><span>You will use the service for lawful purposes only</span></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Description of Service */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                2. Description of Service
              </h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>SentiFi provides AI-powered sentiment analysis of cryptocurrency news and media coverage. Our service includes:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span>Real-time sentiment analysis of crypto news articles</span></li>
                <li className="flex gap-2"><span>•</span><span>Sentiment trends and analytics dashboards</span></li>
                <li className="flex gap-2"><span>•</span><span>Keyword and topic tracking</span></li>
                <li className="flex gap-2"><span>•</span><span>Historical sentiment data and charts</span></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* User Obligations */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                3. User Obligations
              </h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>You agree not to:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span>Use the service for illegal activities or fraud</span></li>
                <li className="flex gap-2"><span>•</span><span>Attempt to gain unauthorized access to our systems</span></li>
                <li className="flex gap-2"><span>•</span><span>Scrape, copy, or redistribute our data without permission</span></li>
                <li className="flex gap-2"><span>•</span><span>Interfere with or disrupt the service's operation</span></li>
                <li className="flex gap-2"><span>•</span><span>Impersonate others or provide false information</span></li>
                <li className="flex gap-2"><span>•</span><span>Use automated systems to access the service excessively</span></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift border-2 border-amber-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                4. Investment Disclaimer
              </h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p className="font-semibold text-amber-600 dark:text-amber-400">
                IMPORTANT: SentiFi provides information and analysis tools only. We are NOT financial advisors.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span>Our sentiment analysis is for informational purposes only</span></li>
                <li className="flex gap-2"><span>•</span><span>Do NOT treat our data as investment advice or recommendations</span></li>
                <li className="flex gap-2"><span>•</span><span>Cryptocurrency trading involves substantial risk of loss</span></li>
                <li className="flex gap-2"><span>•</span><span>Past performance does not guarantee future results</span></li>
                <li className="flex gap-2"><span>•</span><span>Always conduct your own research and consult financial professionals</span></li>
                <li className="flex gap-2"><span>•</span><span>We are not responsible for any financial losses incurred</span></li>
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Accuracy and Availability */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg">
                <XCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                5. Accuracy and Availability
              </h2>
            </div>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>While we strive for accuracy, we make no warranties regarding:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex gap-2"><span>•</span><span>The accuracy, completeness, or reliability of sentiment data</span></li>
                <li className="flex gap-2"><span>•</span><span>Continuous availability or uninterrupted access to the service</span></li>
                <li className="flex gap-2"><span>•</span><span>Freedom from errors, bugs, or technical issues</span></li>
                <li className="flex gap-2"><span>•</span><span>Compatibility with all devices and browsers</span></li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Intellectual Property */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              6. Intellectual Property
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                All content, features, and functionality of SentiFi are owned by us and are protected by copyright,
                trademark, and other intellectual property laws.
              </p>
              <p>
                You may not copy, modify, distribute, or create derivative works from our content without explicit
                written permission.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Limitation of Liability */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              7. Limitation of Liability
            </h2>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, SENTIFI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
              </p>
              <p>
                This includes but is not limited to: trading losses, missed opportunities, data loss, or service
                interruptions.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Changes to Terms */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              8. Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of significant changes
              by updating the "Last updated" date. Continued use of the service after changes constitutes acceptance
              of the new Terms.
            </p>
          </div>
        </ScrollReveal>

        {/* Termination */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-6 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              9. Termination
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We may terminate or suspend your access to the service immediately, without prior notice, for any
              reason, including breach of these Terms. Upon termination, your right to use the service will cease
              immediately.
            </p>
          </div>
        </ScrollReveal>

        {/* Governing Law */}
        <ScrollReveal>
          <div className="glass-strong rounded-2xl p-8 mb-8 shadow-xl hover-lift">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              10. Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to
              conflict of law provisions. Any disputes arising from these Terms or use of the service shall be
              resolved through binding arbitration.
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
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-primary-500">•</span>
                <span>Email: legal@sentifi.xyz</span>
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
