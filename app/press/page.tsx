import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, ExternalLink, Download, Mail, Users, Award, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press - AI Stem Splitter | Media Resources & Company News',
  description: 'Latest news, press releases, and media resources about AI Stem Splitter. Learn about our innovations in stem separation and vocal remover technology.',
  keywords: 'AI stem splitter press, audio separation news, music technology press release, vocal remover media, stem separation company news',
}

const pressReleases = [
  {
    title: 'AI Stem Splitter Raises $10M Series A to Accelerate Audio Separation Technology Development',
    date: '2025-01-15',
    summary: 'Funding will be used to expand AI research team and enhance stem separation tool capabilities for professional music production.',
    category: 'Funding',
    featured: true,
  },
  {
    title: 'Revolutionary Vocal Remover Technology Achieves 99.2% Accuracy in Independent Testing',
    date: '2025-01-10',
    summary: 'Independent audio engineering lab confirms AI Stem Splitter\'s vocal remover online technology outperforms industry standards.',
    category: 'Technology',
    featured: true,
  },
  {
    title: 'AI Stem Splitter Partners with Major Music Streaming Platforms for Content Creation Tools',
    date: '2025-01-05',
    summary: 'Strategic partnerships will integrate stem separation technology into popular music streaming and creation platforms.',
    category: 'Partnership',
    featured: false,
  },
  {
    title: 'New Music Splitter Feature Enables Real-Time Audio Separation for Live Performances',
    date: '2024-12-28',
    summary: 'Breakthrough technology allows musicians to separate audio stems in real-time during live performances and streaming.',
    category: 'Product',
    featured: false,
  },
  {
    title: 'AI Stem Splitter Expands Global Reach with Support for 50+ Languages',
    date: '2024-12-20',
    summary: 'Platform now supports audio separation by artificial intelligence in over 50 languages, serving creators worldwide.',
    category: 'Expansion',
    featured: false,
  },
]

const mediaCoverage = [
  {
    outlet: 'TechCrunch',
    title: 'AI Stem Splitter is Democratizing Professional Audio Separation',
    date: '2025-01-12',
    url: '#',
    type: 'Article',
  },
  {
    outlet: 'MusicTech',
    title: 'How AI is Revolutionizing Music Production with Stem Separation',
    date: '2025-01-08',
    url: '#',
    type: 'Feature',
  },
  {
    outlet: 'The Verge',
    title: 'This AI Tool Can Separate Vocals from Any Song in Seconds',
    date: '2025-01-05',
    url: '#',
    type: 'Review',
  },
  {
    outlet: 'Forbes',
    title: 'The Future of Music Creation: AI-Powered Audio Separation',
    date: '2024-12-30',
    url: '#',
    type: 'Opinion',
  },
  {
    outlet: 'Wired',
    title: 'Inside the Technology That\'s Changing How We Make Music',
    date: '2024-12-25',
    url: '#',
    type: 'Deep Dive',
  },
  {
    outlet: 'Pitchfork',
    title: 'How Producers Are Using AI to Remix and Reimagine Classic Tracks',
    date: '2024-12-20',
    url: '#',
    type: 'Feature',
  },
]

const awards = [
  {
    title: 'Best AI Innovation in Music Technology',
    organization: 'Music Industry Awards 2024',
    date: '2024-12-15',
    description: 'Recognized for breakthrough stem separation tool technology and vocal remover online capabilities.',
  },
  {
    title: 'Top 10 AI Startups to Watch',
    organization: 'TechCrunch Disrupt 2024',
    date: '2024-11-20',
    description: 'Selected for innovative approach to audio separation by artificial intelligence.',
  },
  {
    title: 'Innovation in Audio Processing',
    organization: 'Audio Engineering Society',
    date: '2024-10-30',
    description: 'Awarded for excellence in music separation technology and instrumental separator development.',
  },
]

const stats = [
  { label: 'Media Mentions', value: '500+', icon: TrendingUp },
  { label: 'Countries Covered', value: '45+', icon: Users },
  { label: 'Awards Won', value: '12', icon: Award },
  { label: 'Press Releases', value: '25+', icon: Calendar },
]

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Press & Media
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Stay updated with the latest news about <strong>AI Stem Splitter</strong> and our innovations in 
              <strong> stem separation</strong> and <strong>vocal remover</strong> technology.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <stat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Latest Press Releases</h2>
            <p className="mt-4 text-lg text-gray-600">
              Official announcements about our <strong>music separation</strong> technology and <strong>instrumental separator</strong> innovations.
            </p>
          </div>
          
          <div className="mt-16 space-y-8">
            {pressReleases.map((release, index) => (
              <div key={index} className={`rounded-2xl p-8 ${release.featured ? 'bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200' : 'bg-white shadow-lg'}`}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                        release.category === 'Funding' ? 'bg-green-100 text-green-800' :
                        release.category === 'Technology' ? 'bg-blue-100 text-blue-800' :
                        release.category === 'Partnership' ? 'bg-purple-100 text-purple-800' :
                        release.category === 'Product' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {release.category}
                      </span>
                      {release.featured && (
                        <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{release.title}</h3>
                    <p className="text-gray-700 mb-4">{release.summary}</p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(release.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors">
                      <Download className="mr-2 h-4 w-4" />
                      Read Full Release
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Coverage */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Media Coverage</h2>
            <p className="mt-4 text-lg text-gray-600">
              Leading publications covering our <strong>voice separation</strong> technology and <strong>music splitter</strong> innovations.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mediaCoverage.map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-primary-600">{article.outlet}</span>
                  <span className="text-xs text-gray-500">{article.type}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(article.date).toLocaleDateString()}
                  </div>
                  
                  <a
                    href={article.url}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Read Article
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Awards & Recognition</h2>
            <p className="mt-4 text-lg text-gray-600">
              Industry recognition for our <strong>video vocal remover</strong> technology and <strong>audio separation by artificial intelligence</strong> innovations.
            </p>
          </div>
          
          <div className="mt-16 space-y-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-start">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <Award className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="ml-6 flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{award.title}</h3>
                    <p className="text-primary-600 font-medium">{award.organization}</p>
                    <p className="mt-2 text-gray-700">{award.description}</p>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(award.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Media Kit */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Media Resources</h2>
            <p className="mt-4 text-lg text-gray-600">
              Download our media kit, logos, and press materials for your coverage of <strong>stem separation tool</strong> technology.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Download className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Media Kit</h3>
              <p className="mt-2 text-sm text-gray-600">Complete press package with company information, logos, and high-resolution images.</p>
              <button className="mt-4 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Company Logos</h3>
              <p className="mt-2 text-sm text-gray-600">High-resolution logos and brand assets in various formats and sizes.</p>
              <button className="mt-4 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
                <Download className="mr-2 h-4 w-4" />
                Download
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Press Contact</h3>
              <p className="mt-2 text-sm text-gray-600">Get in touch with our press team for interviews, quotes, and exclusive content.</p>
              <a
                href="mailto:motionjoy93@gmail.com?subject=Press Inquiry"
                className="mt-4 inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay Updated
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Subscribe to our press mailing list for the latest news about <strong>vocal remover and isolation</strong> technology.
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
