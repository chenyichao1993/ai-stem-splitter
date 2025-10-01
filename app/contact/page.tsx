'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Mail, MessageCircle, Clock, CheckCircle, Send, Phone, MapPin, Users } from 'lucide-react'

const contactMethods = [
  {
    title: 'Email Support',
    description: 'Get help with your stem separation and vocal remover questions',
    contact: 'motionjoy93@gmail.com',
    responseTime: 'Within 24 hours',
    icon: Mail,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team for immediate assistance',
    contact: 'Available 9 AM - 6 PM EST',
    responseTime: 'Instant response',
    icon: MessageCircle,
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Technical Support',
    description: 'Get help with audio separation by artificial intelligence issues',
    contact: 'support@aistemsplitter.com',
    responseTime: 'Within 4 hours',
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
  },
]

const supportTopics = [
  {
    category: 'Technical Issues',
    description: 'Problems with stem separation tool or vocal remover online functionality',
    examples: ['Audio processing errors', 'File upload issues', 'Quality concerns'],
  },
  {
    category: 'Account & Billing',
    description: 'Questions about your subscription, payments, or account settings',
    examples: ['Plan upgrades', 'Billing questions', 'Account access'],
  },
  {
    category: 'Feature Requests',
    description: 'Suggestions for improving our music separation technology',
    examples: ['New stem types', 'Export formats', 'API features'],
  },
  {
    category: 'Business Inquiries',
    description: 'Partnership opportunities, enterprise solutions, or media inquiries',
    examples: ['Enterprise plans', 'API licensing', 'Press inquiries'],
  },
]

const faqItems = [
  {
    question: 'How quickly will I receive a response?',
    answer: 'We typically respond to all inquiries within 24 hours. Technical support requests are prioritized and usually receive a response within 4 hours during business hours.',
  },
  {
    question: 'What information should I include in my message?',
    answer: 'Please include your account email, a detailed description of the issue, any error messages you\'ve seen, and the type of audio file you\'re trying to process with our stem separation tool.',
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Phone support is available for Enterprise customers. Pro and Free plan users can reach us via email and live chat for assistance with our vocal remover and music separation features.',
  },
  {
    question: 'Can you help with audio quality issues?',
    answer: 'Yes! Our support team can help troubleshoot audio quality issues with our instrumental separator and provide recommendations for optimal results.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Get in touch with our support team for help with <strong>stem separation</strong>, 
              <strong> vocal remover online</strong> technology, or any questions about our <strong>music separation</strong> services.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the best way to reach us for assistance with our <strong>audio separation by artificial intelligence</strong> technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-full ${method.color}`}>
                    <method.icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="text-primary-600 font-semibold mb-2">{method.contact}</p>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {method.responseTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Send us a Message</h2>
            <p className="mt-4 text-lg text-gray-600">
              Fill out the form below and we&apos;ll get back to you as soon as possible about your 
              <strong> voice separation</strong> or <strong>instrumental separator</strong> needs.
            </p>
          </div>

          {isSubmitted ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-600">
                Thank you for contacting us. We&apos;ll get back to you within 24 hours regarding your 
                <strong> music splitter</strong> inquiry.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a category</option>
                  <option value="technical">Technical Issues</option>
                  <option value="billing">Account & Billing</option>
                  <option value="feature">Feature Requests</option>
                  <option value="business">Business Inquiries</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Please provide detailed information about your inquiry, including any error messages, file types, or specific issues you're experiencing with our stem separation tool."
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Support Topics */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What We Can Help With</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our support team is experienced with all aspects of our <strong>video vocal remover</strong> and 
              <strong> audio separation</strong> technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {supportTopics.map((topic, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{topic.category}</h3>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Common examples:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                    {topic.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Quick answers to common questions about contacting our support team.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Try our <strong>stem separation tool</strong> and experience the power of 
              <strong> audio separation by artificial intelligence</strong>.
            </p>
            <div className="mt-8">
              <a
                href="/stem-splitter"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Try Stem Splitter
                <Send className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
