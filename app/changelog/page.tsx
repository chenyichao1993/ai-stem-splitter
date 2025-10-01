'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, Zap, Bug, Star, Shield, Users, Code, AlertCircle, CheckCircle, Plus, Minus } from 'lucide-react'

const changelogEntries = [
  {
    version: '2.1.0',
    date: '2025-01-15',
    type: 'major',
    title: 'Enhanced AI Models & New Stem Types',
    description: 'Major update with improved AI models and support for additional stem types.',
    changes: [
      {
        type: 'feature',
        title: 'New Piano Stem Separation',
        description: 'Added support for piano stem extraction in our stem separation tool, providing more granular control over musical elements.',
      },
      {
        type: 'feature',
        title: 'Improved Vocal Remover Accuracy',
        description: 'Enhanced our vocal remover online technology with 15% better accuracy for complex audio tracks.',
      },
      {
        type: 'feature',
        title: 'Batch Processing API',
        description: 'New API endpoint for processing multiple files simultaneously, perfect for music separation workflows.',
      },
      {
        type: 'improvement',
        title: 'Faster Processing Times',
        description: 'Reduced average processing time by 25% for our audio separation by artificial intelligence engine.',
      },
      {
        type: 'improvement',
        title: 'Better File Format Support',
        description: 'Enhanced support for high-resolution audio formats and improved compatibility with professional audio software.',
      },
    ],
  },
  {
    version: '2.0.5',
    date: '2025-01-08',
    type: 'patch',
    title: 'Bug Fixes & Performance Improvements',
    description: 'Stability improvements and bug fixes for our music separation platform.',
    changes: [
      {
        type: 'fix',
        title: 'Fixed File Upload Issues',
        description: 'Resolved intermittent file upload failures for large audio files in our instrumental separator.',
      },
      {
        type: 'fix',
        title: 'Improved Error Handling',
        description: 'Better error messages and handling for edge cases in voice separation processing.',
      },
      {
        type: 'improvement',
        title: 'Enhanced User Interface',
        description: 'Improved loading states and progress indicators for better user experience.',
      },
      {
        type: 'security',
        title: 'Security Updates',
        description: 'Updated dependencies and implemented additional security measures for file processing.',
      },
    ],
  },
  {
    version: '2.0.0',
    date: '2024-12-20',
    type: 'major',
    title: 'Complete Platform Redesign',
    description: 'Major platform overhaul with new features and improved user experience.',
    changes: [
      {
        type: 'feature',
        title: 'New Web Interface',
        description: 'Completely redesigned user interface for our stem separation tool with modern, intuitive design.',
      },
      {
        type: 'feature',
        title: 'Real-time Processing Status',
        description: 'Live updates on processing progress for better user experience with our music splitter.',
      },
      {
        type: 'feature',
        title: 'Advanced Quality Settings',
        description: 'New quality options including lossless output for professional audio separation by artificial intelligence.',
      },
      {
        type: 'feature',
        title: 'Team Collaboration Features',
        description: 'New team management and collaboration tools for enterprise users.',
      },
      {
        type: 'improvement',
        title: 'API v2 Release',
        description: 'Completely rewritten API with better performance and new endpoints for video vocal remover integration.',
      },
    ],
  },
  {
    version: '1.8.2',
    date: '2024-12-05',
    type: 'patch',
    title: 'Minor Updates & Fixes',
    description: 'Small improvements and bug fixes for better stability.',
    changes: [
      {
        type: 'fix',
        title: 'Fixed Download Issues',
        description: 'Resolved problems with file downloads for separated stems.',
      },
      {
        type: 'improvement',
        title: 'Better Mobile Experience',
        description: 'Improved mobile interface for our vocal remover and isolation tools.',
      },
      {
        type: 'fix',
        title: 'Memory Optimization',
        description: 'Reduced memory usage during processing for better performance.',
      },
    ],
  },
  {
    version: '1.8.0',
    date: '2024-11-28',
    type: 'minor',
    title: 'New Features & Enhancements',
    description: 'Added new capabilities and improved existing features.',
    changes: [
      {
        type: 'feature',
        title: 'Custom Stem Selection',
        description: 'Users can now choose which specific stems to extract (vocals, drums, bass, guitar) for more targeted music separation.',
      },
      {
        type: 'feature',
        title: 'Export Format Options',
        description: 'Added support for multiple export formats including FLAC, WAV, and MP3 for our instrumental separator.',
      },
      {
        type: 'improvement',
        title: 'Processing Speed Boost',
        description: '20% faster processing times for standard quality output.',
      },
      {
        type: 'feature',
        title: 'Usage Analytics Dashboard',
        description: 'New dashboard showing detailed usage statistics and processing history.',
      },
    ],
  },
  {
    version: '1.7.5',
    date: '2024-11-15',
    type: 'patch',
    title: 'Security & Stability Updates',
    description: 'Important security updates and stability improvements.',
    changes: [
      {
        type: 'security',
        title: 'Enhanced Data Protection',
        description: 'Improved encryption and data handling for better privacy protection.',
      },
      {
        type: 'fix',
        title: 'Fixed Authentication Issues',
        description: 'Resolved login problems for some users with special characters in passwords.',
      },
      {
        type: 'improvement',
        title: 'Better Error Recovery',
        description: 'Improved system recovery from processing errors.',
      },
    ],
  },
]

const upcomingFeatures = [
  {
    title: 'AI Model v3.0',
    description: 'Next-generation AI models with even better accuracy for stem separation and vocal remover technology.',
    status: 'in-development',
    estimatedRelease: 'Q2 2025',
  },
  {
    title: 'Live Audio Processing',
    description: 'Real-time audio separation for live streaming and performance applications.',
    status: 'planned',
    estimatedRelease: 'Q3 2025',
  },
  {
    title: 'Mobile App',
    description: 'Native mobile applications for iOS and Android with full stem separation capabilities.',
    status: 'planned',
    estimatedRelease: 'Q4 2025',
  },
  {
    title: 'Advanced Audio Analysis',
    description: 'New features for analyzing audio characteristics and providing detailed insights.',
    status: 'research',
    estimatedRelease: 'TBD',
  },
]

const getChangeIcon = (type: string) => {
  switch (type) {
    case 'feature':
      return <Plus className="h-4 w-4 text-green-600" />
    case 'improvement':
      return <Star className="h-4 w-4 text-blue-600" />
    case 'fix':
      return <Bug className="h-4 w-4 text-orange-600" />
    case 'security':
      return <Shield className="h-4 w-4 text-purple-600" />
    default:
      return <Code className="h-4 w-4 text-gray-600" />
  }
}

const getChangeColor = (type: string) => {
  switch (type) {
    case 'feature':
      return 'bg-green-100 text-green-800'
    case 'improvement':
      return 'bg-blue-100 text-blue-800'
    case 'fix':
      return 'bg-orange-100 text-orange-800'
    case 'security':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getVersionTypeColor = (type: string) => {
  switch (type) {
    case 'major':
      return 'bg-red-100 text-red-800'
    case 'minor':
      return 'bg-yellow-100 text-yellow-800'
    case 'patch':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Changelog
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Stay updated with the latest improvements to our <strong>stem separation</strong> and 
              <strong> vocal remover online</strong> technology. Track new features, bug fixes, and enhancements.
            </p>
          </div>
        </div>
      </div>

      {/* Version History */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Version History</h2>
            <p className="mt-4 text-lg text-gray-600">
              Complete history of updates to our <strong>audio separation by artificial intelligence</strong> platform.
            </p>
          </div>
          
          <div className="space-y-8">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">v{entry.version}</span>
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${getVersionTypeColor(entry.type)}`}>
                          {entry.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{entry.title}</h3>
                  <p className="text-gray-600 mb-6">{entry.description}</p>
                  
                  <div className="space-y-4">
                    {entry.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">
                          {getChangeIcon(change.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getChangeColor(change.type)}`}>
                              {change.type}
                            </span>
                            <h4 className="text-sm font-semibold text-gray-900">{change.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{change.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Features */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What&apos;s Coming Next</h2>
            <p className="mt-4 text-lg text-gray-600">
              Exciting new features and improvements planned for our <strong>music separation</strong> and 
              <strong> instrumental separator</strong> technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                    feature.status === 'in-development' ? 'bg-blue-100 text-blue-800' :
                    feature.status === 'planned' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {feature.status.replace('-', ' ')}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{feature.description}</p>
                
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Estimated release: {feature.estimatedRelease}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Release Notes */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Release Notes</h2>
            <p className="mt-4 text-lg text-gray-600">
              Detailed information about each release of our <strong>voice separation</strong> and 
              <strong> music splitter</strong> technology.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How to Read Our Changelog</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Plus className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">New Features</h4>
                    <p className="text-gray-600">Brand new capabilities added to our stem separation tool and vocal remover online platform.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Improvements</h4>
                    <p className="text-gray-600">Enhancements to existing features, better performance, and improved user experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Bug className="h-5 w-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Bug Fixes</h4>
                    <p className="text-gray-600">Resolved issues and problems reported by our users in our audio separation by artificial intelligence system.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Security Updates</h4>
                    <p className="text-gray-600">Important security improvements and vulnerability fixes to protect user data and privacy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Get notified about new releases and updates to our <strong>video vocal remover</strong> and 
              <strong> stem separation</strong> technology.
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-primary-500"
                />
                <button className="rounded-lg bg-white px-6 py-3 text-primary-600 font-semibold hover:bg-primary-50 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
