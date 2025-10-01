import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Users, Zap, Globe, Heart, Award, Coffee, Laptop, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers - AI Stem Splitter | Join Our Team of Audio Technology Innovators',
  description: 'Join AI Stem Splitter and help revolutionize audio separation technology. Explore career opportunities in AI, machine learning, and music technology.',
  keywords: 'careers AI stem splitter, audio technology jobs, music separation careers, AI engineering jobs, stem separation technology careers',
}

const benefits = [
  {
    name: 'Competitive Salary',
    description: 'Above-market compensation with equity options',
    icon: Award,
  },
  {
    name: 'Flexible Work',
    description: 'Remote-first culture with flexible hours',
    icon: Globe,
  },
  {
    name: 'Health & Wellness',
    description: 'Comprehensive health, dental, and vision coverage',
    icon: Heart,
  },
  {
    name: 'Learning Budget',
    description: '$3,000 annual budget for courses and conferences',
    icon: Zap,
  },
  {
    name: 'Top Equipment',
    description: 'Latest MacBook Pro, monitors, and audio equipment',
    icon: Laptop,
  },
  {
    name: 'Team Events',
    description: 'Regular team building and company retreats',
    icon: Users,
  },
]

const openPositions = [
  {
    title: 'Senior AI Engineer - Audio Processing',
    department: 'Engineering',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead the development of our next-generation stem separation algorithms and vocal remover technology.',
    requirements: [
      'PhD or MS in Computer Science, Machine Learning, or related field',
      '5+ years experience with deep learning frameworks (PyTorch, TensorFlow)',
      'Strong background in audio signal processing and music information retrieval',
      'Experience with neural networks for audio separation and music splitter applications',
      'Proficiency in Python, C++, and audio processing libraries',
    ],
    responsibilities: [
      'Design and implement advanced AI models for audio separation by artificial intelligence',
      'Optimize performance of stem separation tool algorithms for real-time processing',
      'Collaborate with product team to improve vocal remover and isolation features',
      'Mentor junior engineers and contribute to technical architecture decisions',
    ],
  },
  {
    title: 'Frontend Developer - React/Next.js',
    department: 'Engineering',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build beautiful, responsive user interfaces for our stem separation platform and vocal remover online tools.',
    requirements: [
      '3+ years experience with React, Next.js, and TypeScript',
      'Strong understanding of modern CSS frameworks (Tailwind CSS)',
      'Experience with audio file handling and drag-and-drop interfaces',
      'Knowledge of web audio APIs and real-time audio processing',
      'Familiarity with testing frameworks (Jest, Cypress)',
    ],
    responsibilities: [
      'Develop responsive web applications for music separation and instrumental separator tools',
      'Implement intuitive user interfaces for audio file upload and processing',
      'Optimize performance for large audio file handling and real-time feedback',
      'Collaborate with design team to create seamless user experiences',
    ],
  },
  {
    title: 'Product Manager - Audio Technology',
    department: 'Product',
    location: 'Remote / London',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Drive product strategy for our audio separation platform and vocal remover technology.',
    requirements: [
      '4+ years product management experience in B2B or B2C SaaS',
      'Background in audio technology, music production, or related field',
      'Experience with AI/ML products and understanding of technical constraints',
      'Strong analytical skills and data-driven decision making',
      'Excellent communication skills for cross-functional collaboration',
    ],
    responsibilities: [
      'Define product roadmap for stem separation tool and music splitter features',
      'Conduct user research to understand needs of music producers and content creators',
      'Work with engineering team to prioritize voice separation and instrumental separator capabilities',
      'Analyze user feedback and usage data to improve product experience',
    ],
  },
  {
    title: 'DevOps Engineer - Cloud Infrastructure',
    department: 'Engineering',
    location: 'Remote / Berlin',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Scale our cloud infrastructure to handle millions of audio separation requests.',
    requirements: [
      '4+ years experience with AWS, GCP, or Azure cloud platforms',
      'Strong knowledge of containerization (Docker, Kubernetes)',
      'Experience with CI/CD pipelines and infrastructure as code',
      'Background in handling large-scale data processing workloads',
      'Knowledge of audio file storage and CDN optimization',
    ],
    responsibilities: [
      'Design and maintain scalable infrastructure for audio separation by artificial intelligence',
      'Optimize cloud costs while ensuring high availability and performance',
      'Implement monitoring and alerting for stem separation tool processing',
      'Ensure security and compliance for audio file handling and storage',
    ],
  },
]

const values = [
  {
    title: 'Innovation First',
    description: 'We push the boundaries of what\'s possible in audio separation technology, constantly exploring new approaches to stem separation and vocal remover applications.',
    icon: Zap,
  },
  {
    title: 'User-Centric',
    description: 'Every decision we make is guided by how it improves the experience for musicians, producers, and content creators using our music separation tools.',
    icon: Users,
  },
  {
    title: 'Collaborative',
    description: 'We believe the best solutions come from diverse teams working together to solve complex challenges in audio processing and AI technology.',
    icon: Heart,
  },
  {
    title: 'Quality',
    description: 'We maintain the highest standards in everything we do, from the accuracy of our instrumental separator algorithms to the user experience of our platform.',
    icon: Award,
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Join Our Mission
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
              Help us revolutionize <strong>audio separation by artificial intelligence</strong> and make professional-grade 
              <strong> stem separation tool</strong> technology accessible to creators worldwide.
            </p>
            <div className="mt-8">
              <a
                href="#open-positions"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                View Open Positions
                <Zap className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Join AI Stem Splitter?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Be part of the team that&apos;s shaping the future of <strong>music separation</strong> and <strong>vocal remover online</strong> technology.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <value.icon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Benefits & Perks</h2>
            <p className="mt-4 text-lg text-gray-600">
              We invest in our team because they&apos;re the driving force behind our <strong>stem separation</strong> innovation.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                    <benefit.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.name}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div id="open-positions" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Open Positions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our team and help build the next generation of <strong>instrumental separator</strong> and <strong>voice separation</strong> technology.
            </p>
          </div>
          
          <div className="mt-16 space-y-8">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900">{position.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {position.department}
                      </span>
                      <span className="flex items-center">
                        <Globe className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Coffee className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {position.experience}
                      </span>
                    </div>
                    <p className="mt-4 text-gray-700">{position.description}</p>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Responsibilities:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        {position.responsibilities.map((responsibility, idx) => (
                          <li key={idx}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Requirements:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-gray-700">
                        {position.requirements.map((requirement, idx) => (
                          <li key={idx}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <a
                      href={`mailto:motionjoy93@gmail.com?subject=Application for ${position.title}`}
                      className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Culture</h2>
              <p className="mt-6 text-lg text-gray-600">
                At AI Stem Splitter, we&apos;re more than just a company building <strong>music splitter</strong> technology. 
                We&apos;re a community of passionate individuals who believe in the power of <strong>audio separation by artificial intelligence</strong> 
                to democratize music production and content creation.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Remote-First</h3>
                    <p className="text-gray-600">Work from anywhere in the world with flexible hours that fit your lifestyle.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Continuous Learning</h3>
                    <p className="text-gray-600">We encourage experimentation and provide resources for professional development.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mt-1">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">Impact-Driven</h3>
                    <p className="text-gray-600">Every feature we build directly impacts millions of creators using our <strong>vocal remover and isolation</strong> tools.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">Join Our Growing Team</h3>
                  <p className="mt-2 text-gray-600">
                    We&apos;re looking for talented individuals who share our passion for advancing 
                    <strong> stem separation tool</strong> technology and making it accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Don&apos;t See Your Role?
            </h2>
            <p className="mt-4 text-xl text-primary-100">
              We&apos;re always looking for exceptional talent to join our mission of revolutionizing 
              <strong> video vocal remover</strong> and <strong>instrumental separator</strong> technology.
            </p>
            <div className="mt-8">
              <a
                href="mailto:motionjoy93@gmail.com?subject=General Career Inquiry"
                className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
