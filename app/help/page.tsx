'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Search, ChevronDown, ChevronRight, BookOpen, Video, MessageCircle, Zap, Users, Clock, CheckCircle } from 'lucide-react'

const faqCategories = [
  {
    name: 'Getting Started',
    icon: BookOpen,
    questions: [
      {
        question: 'How do I use the stem separation tool?',
        answer: 'Simply upload your audio file (MP3, MP4, WAV, FLAC, M4A, or AAC) to our stem splitter, and our AI will automatically separate it into individual stems including vocals, drums, bass, guitar, and piano. The process typically takes 30-60 seconds depending on file size.',
      },
      {
        question: 'What audio formats are supported?',
        answer: 'We support MP3, MP4, WAV, FLAC, M4A, and AAC files. For best results with our vocal remover online technology, we recommend using uncompressed formats like WAV or FLAC.',
      },
      {
        question: 'Is there a file size limit?',
        answer: 'Yes, our free plan supports files up to 50MB, Pro plan supports up to 200MB, and Enterprise plan supports custom file size limits. This ensures optimal processing speed for our music separation technology.',
      },
    ],
  },
  {
    name: 'Technical Issues',
    icon: Zap,
    questions: [
      {
        question: 'Why is my audio separation taking so long?',
        answer: 'Processing time depends on file size and complexity. Our audio separation by artificial intelligence typically takes 30-60 seconds for most files. Large files or complex audio may take longer. Pro users get priority processing.',
      },
      {
        question: 'The separated stems sound distorted. What can I do?',
        answer: 'Try uploading a higher quality source file. Our instrumental separator works best with clear, uncompressed audio. If issues persist, contact our support team for assistance.',
      },
      {
        question: 'Can I use the vocal remover for commercial projects?',
        answer: 'Yes! Our Pro and Enterprise plans allow commercial use of separated stems. Free plan users should check our Terms of Service for usage limitations.',
      },
    ],
  },
  {
    name: 'Account & Billing',
    icon: Users,
    questions: [
      {
        question: 'How do I upgrade my plan?',
        answer: 'Go to your account settings and click "Upgrade Plan". You can choose between Pro ($19/month) or Enterprise ($59/month) plans. Annual plans offer 20% savings.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time. You\'ll retain access to Pro features until the end of your billing period. We also offer a 30-day money-back guarantee.',
      },
      {
        question: 'What happens to my files after processing?',
        answer: 'Files are automatically deleted after the retention period: Free (24 hours), Pro (7 days), or Enterprise (30 days). We never store your audio content permanently for privacy protection.',
      },
    ],
  },
]

const tutorials = [
  {
    title: 'Complete Guide to Stem Separation',
    description: 'Learn the fundamentals of using our stem separation tool for music production.',
    duration: '8 min',
    type: 'Article',
    category: 'Getting Started',
  },
  {
    title: 'Advanced Vocal Remover Techniques',
    description: 'Master professional vocal remover and isolation techniques for clean results.',
    duration: '12 min',
    type: 'Video',
    category: 'Advanced',
  },
  {
    title: 'Music Splitter for Content Creators',
    description: 'How to use our music splitter technology for YouTube and social media content.',
    duration: '6 min',
    type: 'Video',
    category: 'Content Creation',
  },
  {
    title: 'Instrumental Separator Best Practices',
    description: 'Tips for creating perfect backing tracks with our instrumental separator.',
    duration: '10 min',
    type: 'Article',
    category: 'Music Production',
  },
]

const quickActions = [
  {
    title: 'Upload Audio File',
    description: 'Start separating your audio with our AI-powered stem splitter',
    icon: Zap,
    href: '/stem-splitter',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    title: 'View Pricing Plans',
    description: 'Compare our Pro and Enterprise plans for advanced features',
    icon: Users,
    href: '/pricing',
    color: 'bg-green-100 text-green-600',
  },
  {
    title: 'Contact Support',
    description: 'Get help from our technical support team',
    icon: MessageCircle,
    href: '/contact',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Check Service Status',
    description: 'Monitor our system status and uptime',
    icon: CheckCircle,
    href: '/status',
    color: 'bg-purple-100 text-purple-600',
  },
]

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map((q, index) => ({ ...q, category: category.name, id: `${category.name}-${index}` }))
  )

  const filteredQuestions = searchQuery 
    ? allQuestions.filter(q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedCategory === 'All' 
      ? allQuestions 
      : allQuestions.filter(q => q.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Help Center
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Find answers to common questions about our <strong>stem separation tool</strong>, 
              <strong> vocal remover online</strong> technology, and <strong>music separation</strong> features.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 text-lg"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Quick Actions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get started quickly with our most popular <strong>audio separation by artificial intelligence</strong> tools.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="flex items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Common questions about our <strong>voice separation</strong> technology and <strong>instrumental separator</strong> features.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
              }`}
            >
              All Categories
            </button>
            {faqCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredQuestions.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                >
                  <div className="flex items-center">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800 mr-3">
                      {item.category}
                    </span>
                    <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  </div>
                  {expandedFAQ === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No questions found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tutorials Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Tutorials & Guides</h2>
            <p className="mt-4 text-lg text-gray-600">
              Learn how to master our <strong>music splitter</strong> and <strong>video vocal remover</strong> technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tutorials.map((tutorial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  {tutorial.type === 'Video' ? (
                    <Video className="h-8 w-8 text-red-600" />
                  ) : (
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-500">{tutorial.type}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{tutorial.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                    {tutorial.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {tutorial.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Support CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Still Need Help?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help with your 
              <strong> stem separation</strong> and <strong>vocal remover online</strong> questions.
            </p>
            <div className="mt-8">
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
