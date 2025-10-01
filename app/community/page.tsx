'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Users, MessageCircle, Star, Heart, Share2, ThumbsUp, Award, Music, Video, Mic, Headphones } from 'lucide-react'

const communityStats = [
  {
    name: 'Active Members',
    value: '25,847',
    change: '+12.5%',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    name: 'Projects Shared',
    value: '8,392',
    change: '+18.3%',
    icon: Music,
    color: 'bg-green-100 text-green-600',
  },
  {
    name: 'Tutorials Created',
    value: '1,247',
    change: '+8.7%',
    icon: Video,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    name: 'Success Stories',
    value: '3,156',
    change: '+15.2%',
    icon: Award,
    color: 'bg-orange-100 text-orange-600',
  },
]

const featuredProjects = [
  {
    id: 1,
    title: 'Epic Orchestral Remix Using Stem Separation',
    author: 'Sarah Chen',
    authorAvatar: 'SC',
    category: 'Music Production',
    description: 'I used AI Stem Splitter to separate a classical piece and created an epic orchestral remix. The vocal remover online feature worked perfectly for isolating the instruments.',
    image: '/projects/orchestral-remix.jpg',
    likes: 247,
    comments: 23,
    tags: ['orchestral', 'classical', 'remix', 'stem separation'],
    featured: true,
  },
  {
    id: 2,
    title: 'Creating Perfect Karaoke Tracks',
    author: 'Marcus Rodriguez',
    authorAvatar: 'MR',
    category: 'Content Creation',
    description: 'Step-by-step guide on using our instrumental separator to create professional karaoke tracks for my YouTube channel.',
    image: '/projects/karaoke-guide.jpg',
    likes: 189,
    comments: 31,
    tags: ['karaoke', 'youtube', 'tutorial', 'vocal remover'],
    featured: true,
  },
  {
    id: 3,
    title: 'Jazz Fusion Experiment',
    author: 'Alex Kim',
    authorAvatar: 'AK',
    category: 'Music Production',
    description: 'Experimenting with our music splitter to create unique jazz fusion arrangements. The audio separation by artificial intelligence is incredible!',
    image: '/projects/jazz-fusion.jpg',
    likes: 156,
    comments: 18,
    tags: ['jazz', 'fusion', 'experimental', 'music separation'],
    featured: false,
  },
  {
    id: 4,
    title: 'Podcast Intro Music Creation',
    author: 'Emma Wilson',
    authorAvatar: 'EW',
    category: 'Content Creation',
    description: 'Used our voice separation technology to create custom intro music for my podcast. The results exceeded my expectations!',
    image: '/projects/podcast-intro.jpg',
    likes: 134,
    comments: 12,
    tags: ['podcast', 'intro', 'voice separation', 'content'],
    featured: false,
  },
]

const successStories = [
  {
    name: 'DJ Mike Thompson',
    role: 'Professional DJ',
    story: 'AI Stem Splitter revolutionized my DJ sets. I can now create custom remixes on the fly using their stem separation tool. The quality is studio-grade!',
    avatar: 'MT',
    verified: true,
  },
  {
    name: 'Luna Martinez',
    role: 'Music Producer',
    story: 'As a music producer, I need clean stems for my projects. The vocal remover online feature gives me perfect isolation every time. Game changer!',
    avatar: 'LM',
    verified: true,
  },
  {
    name: 'David Park',
    role: 'Content Creator',
    story: 'Creating YouTube content became so much easier with their instrumental separator. I can now make custom backing tracks for any song.',
    avatar: 'DP',
    verified: false,
  },
  {
    name: 'Sophie Chen',
    role: 'Music Teacher',
    story: 'I use the music splitter to create educational content for my students. Being able to isolate individual instruments helps them understand music better.',
    avatar: 'SC',
    verified: true,
  },
]

const communityGuidelines = [
  {
    title: 'Be Respectful',
    description: 'Treat all community members with respect and kindness. We\'re all here to learn and share our passion for music.',
    icon: Heart,
  },
  {
    title: 'Share Quality Content',
    description: 'Post meaningful projects, tutorials, and discussions that add value to our stem separation community.',
    icon: Star,
  },
  {
    title: 'Give Credit',
    description: 'Always credit original artists when sharing remixes or covers created with our vocal remover technology.',
    icon: Award,
  },
  {
    title: 'Help Others',
    description: 'Share your knowledge and help fellow creators learn about audio separation by artificial intelligence.',
    icon: Users,
  },
]

const recentDiscussions = [
  {
    title: 'Best practices for vocal isolation in hip-hop tracks',
    author: 'BeatMaker_Pro',
    replies: 24,
    lastActivity: '2 hours ago',
    category: 'Techniques',
  },
  {
    title: 'Creating custom stems for live performances',
    author: 'LiveMusic_DJ',
    replies: 18,
    lastActivity: '4 hours ago',
    category: 'Live Performance',
  },
  {
    title: 'Troubleshooting audio quality issues',
    author: 'AudioEngineer_2025',
    replies: 12,
    lastActivity: '6 hours ago',
    category: 'Technical Support',
  },
  {
    title: 'Showcase: My latest orchestral remix',
    author: 'ClassicalRemixer',
    replies: 31,
    lastActivity: '8 hours ago',
    category: 'Showcase',
  },
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'Music Production', 'Content Creation', 'Live Performance', 'Education', 'Showcase']

  const filteredProjects = selectedCategory === 'All' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Community
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Join thousands of creators using our <strong>stem separation</strong> and 
              <strong> vocal remover online</strong> technology. Share your projects, learn from others, and be part of the future of <strong>music separation</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Community by the Numbers</h2>
            <p className="mt-4 text-lg text-gray-600">
              Our growing community of creators using <strong>audio separation by artificial intelligence</strong> technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                  <div className="text-sm text-green-600 mt-1">{stat.change} this month</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Projects</h2>
            <p className="mt-4 text-lg text-gray-600">
              Amazing creations from our community using <strong>voice separation</strong> and <strong>instrumental separator</strong> technology.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === selectedCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                  <div className="text-center">
                    <Music className="h-12 w-12 text-primary-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Project Preview</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-white text-sm font-semibold">
                        {project.authorAvatar}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{project.author}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {project.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {project.comments}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Success Stories</h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from creators who are using our <strong>music splitter</strong> and <strong>video vocal remover</strong> technology to achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white text-lg font-semibold">
                      {story.avatar}
                    </div>
                    {story.verified && (
                      <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                        <Award className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{story.name}</h3>
                <p className="text-sm text-primary-600 font-medium mb-4">{story.role}</p>
                <p className="text-gray-600 text-sm italic">&quot;{story.story}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Community Guidelines</h2>
            <p className="mt-4 text-lg text-gray-600">
              Help us maintain a positive and supportive environment for all <strong>stem separation</strong> enthusiasts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {communityGuidelines.map((guideline, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <guideline.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{guideline.title}</h3>
                <p className="text-gray-600 text-sm">{guideline.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Discussions */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Recent Discussions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join the conversation about <strong>audio separation</strong> techniques and <strong>music production</strong>.
            </p>
          </div>
          
          <div className="space-y-4">
            {recentDiscussions.map((discussion, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{discussion.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.replies} replies</span>
                      <span>•</span>
                      <span>{discussion.lastActivity}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800">
                      {discussion.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Community CTA */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Connect with fellow creators, share your projects, and learn from the best in 
              <strong> stem separation</strong> and <strong>vocal remover and isolation</strong> technology.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/stem-splitter"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <Music className="mr-2 h-5 w-5" />
                Start Creating
              </a>
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
