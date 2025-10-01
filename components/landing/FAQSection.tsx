'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How accurate is the AI separation?',
    answer: 'Our AI technology achieves 95%+ accuracy in most cases, with particularly strong results on vocals, drums, and bass. The quality depends on the original audio mix and complexity.',
  },
  {
    question: 'What audio formats do you support?',
    answer: 'We support MP3, MP4, WAV, FLAC, M4A, and AAC files. For best results, we recommend using uncompressed formats like WAV or FLAC.',
  },
  {
    question: 'How long does processing take?',
    answer: 'Most files are processed in under 30 seconds. Processing time depends on file length and complexity, but typically ranges from 10-60 seconds.',
  },
  {
    question: 'Is my audio data secure?',
    answer: 'Yes, we take privacy seriously. All uploaded files are automatically deleted after processing, and we never store or share your audio content.',
  },
  {
    question: 'Can I process copyrighted music?',
    answer: 'You can upload any audio file, but you are responsible for ensuring you have the rights to use the content. We recommend using royalty-free music or your own compositions.',
  },
  {
    question: 'What\'s the difference between quality levels?',
    answer: 'Standard quality is optimized for speed, High quality balances speed and accuracy, and Lossless quality provides the best separation but takes longer to process.',
  },
  {
    question: 'Do you offer API access?',
    answer: 'Yes, API access is available for Pro and Enterprise customers. Check our API documentation for integration details and rate limits.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have access to paid features until the end of your billing period.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact our support team for a full refund.',
  },
  {
    question: 'Is there a mobile app?',
    answer: 'Our web application is fully responsive and works great on mobile devices. We\'re also developing native mobile apps for iOS and Android.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              FAQ
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find answers to common questions about our AI stem separation service.
            </p>
          </motion.div>
        </div>
        
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                >
                  <span className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Contact support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/help"
                className="btn-secondary"
              >
                Visit Help Center
              </a>
              <a
                href="/contact"
                className="btn-primary"
              >
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
