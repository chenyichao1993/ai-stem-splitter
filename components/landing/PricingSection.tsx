'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out our service',
    features: [
      '5 files per month',
      '50MB max file size',
      'Up to 30 minutes total',
      'Basic stem separation (vocals + instrumental only)',
      'Standard quality output',
      'Basic support',
      '24-hour file retention',
    ],
    limitations: [
      'Limited processing speed',
      'Watermark on output',
    ],
    cta: 'Start Free',
    href: '/stem-splitter',
    popular: false,
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For music producers and content creators',
    features: [
      'Up to 200 minutes total',
      '200MB max file size',
      'Multi-stem separation (vocals, drums, bass, guitar, piano)',
      'High quality output',
      'Priority processing',
      'Priority support',
      '7-day file retention',
      'Batch processing',
      'No watermarks',
      'Usage analytics',
    ],
    limitations: [],
    cta: 'Start Pro Trial',
    href: '/pricing?plan=pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 59,
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Up to 1000 minutes total',
      'Custom file size limits',
      'All stem types',
      'Lossless quality output',
      'API access',
      'Usage analytics',
      'Dedicated support',
      '30-day file retention',
      'Custom integrations',
      'SLA guarantee',
      'Team management',
    ],
    limitations: [],
    cta: 'Contact Sales',
    href: '/contact?plan=enterprise',
    popular: false,
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  const getAnnualPrice = (planName: string) => {
    if (planName === 'Pro') return 180
    if (planName === 'Enterprise') return 564
    return 0
  }

  const getMonthlyEquivalent = (planName: string) => {
    if (planName === 'Pro') return 15
    if (planName === 'Enterprise') return 47
    return 0
  }

  const getSavings = (plan: any) => {
    if (plan.price === 0) return 0
    const originalAnnualPrice = plan.price * 12
    const discountedAnnualPrice = getAnnualPrice(plan.name)
    return originalAnnualPrice - discountedAnnualPrice
  }

  return (
    <div className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Pricing
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Choose the perfect plan for your needs
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Start free and upgrade as you grow. All plans include our core AI separation technology.
            </p>
          </motion.div>
        </div>
        
        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center space-x-4">
            <span 
              onClick={() => setIsAnnual(false)}
              className={`text-sm font-medium cursor-pointer transition-colors ${!isAnnual ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span 
              onClick={() => setIsAnnual(true)}
              className={`text-sm font-medium cursor-pointer transition-colors ${isAnnual ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Annual
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Save 20%
            </span>
          </div>
        </motion.div>
        
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? 'border-primary-600 bg-white shadow-xl'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-primary-600 px-3 py-1 text-sm font-medium text-white">
                    <Star className="mr-1 h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                <p className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${isAnnual ? getAnnualPrice(plan.name) : plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                  {isAnnual && plan.price > 0 && (
                    <div className="mt-2 text-sm text-gray-600">
                      <div>(equivalent to ${getMonthlyEquivalent(plan.name)}/month)</div>
                      <div className="text-green-600">Save ${getSavings(plan)}/year</div>
                    </div>
                  )}
                </p>
              </div>
              
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start">
                    <span className="h-5 w-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0">×</span>
                    <span className="text-sm text-gray-500">{limitation}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <Link
                  href={plan.href}
                  className={`block w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* FAQ section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions about our pricing? We&apos;ve got answers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans anytime?
              </h4>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                What happens to my files?
              </h4>
              <p className="text-gray-600">
                All uploaded files are automatically deleted after processing. We never store your audio content.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer refunds?
              </h4>
              <p className="text-gray-600">
                We offer a 30-day money-back guarantee for all paid plans. No questions asked.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Is there an API available?
              </h4>
              <p className="text-gray-600">
                Yes, our API is available for Pro and Enterprise customers. Check our documentation for details.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}