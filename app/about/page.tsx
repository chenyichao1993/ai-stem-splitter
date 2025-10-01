import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Zap, Users, Award, Shield, Clock, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - AI Stem Splitter | Leading Audio Separation Technology',
  description: 'Learn about AI Stem Splitter, the leading provider of AI-powered stem separation tools. Discover our mission to revolutionize music separation and vocal remover technology.',
  keywords: 'about AI stem splitter, audio separation company, music separation technology, vocal remover team, stem separation innovation',
}

const stats = [
  { name: 'Files Processed', value: '2M+', icon: Zap },
  { name: 'Happy Users', value: '500K+', icon: Users },
  { name: 'Countries Served', value: '150+', icon: Globe },
  { name: 'Processing Speed', value: '10x Faster', icon: Clock },
]

const team = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Chief Technology Officer',
    bio: 'Former Google AI researcher with 10+ years in machine learning and audio processing.',
    image: '/team/sarah.jpg',
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Head of Product',
    bio: 'Music industry veteran with expertise in audio engineering and user experience design.',
    image: '/team/marcus.jpg',
  },
  {
    name: 'Dr. Alex Kim',
    role: 'Lead AI Engineer',
    bio: 'PhD in Computer Science, specializing in neural networks for audio separation.',
    image: '/team/alex.jpg',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Revolutionizing Audio Separation
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              We&apos;re the team behind the world&apos;s most advanced <strong>stem separation tool</strong> and <strong>vocal remover online</strong> technology, 
              empowering musicians, producers, and creators worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Mission</h2>
            <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
              To democratize professional-grade <strong>audio separation by artificial intelligence</strong>, making advanced 
              <strong> music separation</strong> and <strong>instrumental separator</strong> technology accessible to everyone. 
              We believe that every creator should have access to the same powerful tools used by industry professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <stat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-500">{stat.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Cutting-Edge AI Technology</h2>
              <p className="mt-6 text-lg text-gray-600">
                Our proprietary <strong>stem splitter</strong> technology uses state-of-the-art machine learning algorithms 
                to deliver unprecedented accuracy in <strong>voice separation</strong> and <strong>music splitter</strong> applications. 
                Unlike traditional methods, our AI can distinguish between subtle audio elements with remarkable precision.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Advanced Neural Networks</h3>
                    <p className="text-gray-600">Deep learning models trained on millions of audio samples for superior separation quality.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Real-Time Processing</h3>
                    <p className="text-gray-600">Lightning-fast <strong>vocal remover and isolation</strong> that works in seconds, not hours.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Privacy-First Design</h3>
                    <p className="text-gray-600">Your audio files are processed securely and automatically deleted after processing.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">Industry-Leading Performance</h3>
                  <p className="mt-2 text-gray-600">
                    Our <strong>instrumental remover online</strong> technology delivers professional-grade results 
                    that rival expensive studio equipment, all accessible through your web browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              The brilliant minds behind the world&apos;s most advanced <strong>video vocal remover</strong> and 
              <strong> audio separation</strong> technology.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{person.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{person.name}</h3>
                <p className="text-primary-600 font-medium">{person.role}</p>
                <p className="mt-2 text-sm text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">
              The principles that guide everything we do in advancing <strong>music separation</strong> technology.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Excellence</h3>
              <p className="mt-2 text-gray-600">
                We strive for the highest quality in every aspect of our <strong>stem separation tool</strong> technology.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              <p className="mt-2 text-gray-600">
                Making professional <strong>vocal remover online</strong> tools accessible to creators of all levels.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Privacy</h3>
              <p className="mt-2 text-gray-600">
                Protecting your creative work with industry-leading security and privacy measures.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Experience the Future of Audio Separation?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              Join thousands of creators who trust our <strong>instrumental separator</strong> technology.
            </p>
            <div className="mt-8">
              <a
                href="/stem-splitter"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                Try Our Stem Splitter
                <Zap className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
