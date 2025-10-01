import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog - AI Stem Splitter | Audio Separation Tips & Technology Insights',
  description: 'Discover the latest insights on stem separation, vocal remover technology, and music production tips. Learn how to use AI for audio separation and music splitting.',
  keywords: 'stem separation blog, vocal remover tips, music separation guide, audio separation tutorial, stem splitter technology, music production blog',
}

const blogPosts = [
  {
    id: 1,
    title: 'The Complete Guide to Stem Separation: From Basics to Advanced Techniques',
    excerpt: 'Learn everything about stem separation technology, from understanding the fundamentals to mastering advanced vocal remover and instrumental separator techniques.',
    content: 'Stem separation has revolutionized music production, allowing creators to isolate individual elements from mixed audio tracks. Our comprehensive guide covers the evolution from traditional methods to modern AI-powered stem splitter tools...',
    author: 'Dr. Sarah Chen',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    slug: 'complete-guide-stem-separation',
    featured: true,
    tags: ['stem separation', 'vocal remover', 'music production', 'tutorial'],
  },
  {
    id: 2,
    title: 'How AI is Revolutionizing Music Separation Technology',
    excerpt: 'Explore how artificial intelligence is transforming the music separation industry, making professional-grade vocal remover and instrumental separator tools accessible to everyone.',
    content: 'The music industry has witnessed a paradigm shift with the introduction of AI-powered audio separation by artificial intelligence. This technology has democratized access to professional music separation tools...',
    author: 'Marcus Rodriguez',
    date: '2025-01-12',
    readTime: '6 min read',
    category: 'Technology',
    slug: 'ai-revolutionizing-music-separation',
    featured: true,
    tags: ['AI technology', 'music separation', 'artificial intelligence', 'innovation'],
  },
  {
    id: 3,
    title: 'Top 10 Vocal Remover Online Tools: A Comprehensive Comparison',
    excerpt: 'Compare the best vocal remover online tools available today, including our advanced stem separation technology and how it stacks up against competitors.',
    content: 'Finding the right vocal remover online can be challenging with so many options available. We\'ve tested and compared the top 10 vocal remover and isolation tools to help you make an informed decision...',
    author: 'Dr. Alex Kim',
    date: '2025-01-10',
    readTime: '10 min read',
    category: 'Review',
    slug: 'top-10-vocal-remover-tools',
    featured: false,
    tags: ['vocal remover', 'comparison', 'review', 'tools'],
  },
  {
    id: 4,
    title: 'Music Splitter vs Traditional Audio Editing: Which is Better?',
    excerpt: 'Discover the advantages of modern music splitter technology over traditional audio editing methods, and when to use each approach for optimal results.',
    content: 'The debate between music splitter technology and traditional audio editing has been ongoing in the music production community. While both approaches have their merits, understanding their differences is crucial...',
    author: 'Sarah Chen',
    date: '2025-01-08',
    readTime: '7 min read',
    category: 'Comparison',
    slug: 'music-splitter-vs-traditional-editing',
    featured: false,
    tags: ['music splitter', 'audio editing', 'comparison', 'production'],
  },
  {
    id: 5,
    title: 'Voice Separation Techniques: From Karaoke to Professional Production',
    excerpt: 'Learn about different voice separation techniques, from simple karaoke applications to professional-grade voice separation used in music production.',
    content: 'Voice separation has evolved significantly from its early karaoke applications to sophisticated professional tools. Today\'s voice separation technology can isolate vocals with remarkable precision...',
    author: 'Marcus Rodriguez',
    date: '2025-01-05',
    readTime: '9 min read',
    category: 'Technique',
    slug: 'voice-separation-techniques',
    featured: false,
    tags: ['voice separation', 'karaoke', 'production', 'techniques'],
  },
  {
    id: 6,
    title: 'Instrumental Separator: Creating Perfect Backing Tracks',
    excerpt: 'Master the art of creating perfect backing tracks using instrumental separator technology. Learn tips and tricks for professional-quality instrumental isolation.',
    content: 'Creating high-quality backing tracks is essential for musicians, singers, and content creators. Modern instrumental separator technology has made this process more accessible and efficient than ever...',
    author: 'Dr. Alex Kim',
    date: '2025-01-03',
    readTime: '6 min read',
    category: 'Tutorial',
    slug: 'instrumental-separator-backing-tracks',
    featured: false,
    tags: ['instrumental separator', 'backing tracks', 'tutorial', 'music production'],
  },
  {
    id: 7,
    title: 'Video Vocal Remover: Enhancing Your Content Creation Workflow',
    excerpt: 'Discover how video vocal remover technology can streamline your content creation process, from YouTube videos to social media content.',
    content: 'Content creators are increasingly turning to video vocal remover technology to enhance their workflow. This powerful tool allows you to isolate or remove vocals from video content...',
    author: 'Sarah Chen',
    date: '2025-01-01',
    readTime: '5 min read',
    category: 'Content Creation',
    slug: 'video-vocal-remover-content-creation',
    featured: false,
    tags: ['video vocal remover', 'content creation', 'YouTube', 'social media'],
  },
  {
    id: 8,
    title: 'The Science Behind Audio Separation by Artificial Intelligence',
    excerpt: 'Dive deep into the technical aspects of audio separation by artificial intelligence, understanding the neural networks and algorithms that power modern stem separation tools.',
    content: 'Audio separation by artificial intelligence represents one of the most significant advances in music technology. Understanding the science behind this technology helps users make better decisions...',
    author: 'Dr. Alex Kim',
    date: '2024-12-28',
    readTime: '12 min read',
    category: 'Science',
    slug: 'science-behind-ai-audio-separation',
    featured: false,
    tags: ['artificial intelligence', 'neural networks', 'science', 'technology'],
  },
]

const categories = ['All', 'Tutorial', 'Technology', 'Review', 'Comparison', 'Technique', 'Content Creation', 'Science']

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              AI Stem Splitter Blog
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Discover the latest insights on <strong>stem separation</strong>, <strong>vocal remover</strong> technology, 
              and <strong>music separation</strong> techniques. Learn how to master <strong>audio separation by artificial intelligence</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Articles</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our most popular guides on <strong>stem separation tool</strong> technology and <strong>vocal remover online</strong> techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {featuredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                      Featured
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* All Posts */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">All Articles</h2>
            <p className="mt-4 text-lg text-gray-600">
              Explore our complete library of <strong>music separation</strong> guides and <strong>instrumental separator</strong> tutorials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-800">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-primary-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Stay Updated with Stem Separation News
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Get the latest insights on <strong>vocal remover and isolation</strong> technology and <strong>music splitter</strong> innovations.
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
