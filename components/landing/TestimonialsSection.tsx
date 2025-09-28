'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Music Producer',
    company: 'BeatLab Studios',
    content: 'This tool has revolutionized my workflow. I can now separate stems in seconds instead of hours. The quality is incredible and it saves me so much time on remixes.',
    rating: 5,
    avatar: '/avatars/sarah-chen.jpg',
  },
  {
    name: 'Marcus Johnson',
    role: 'DJ & Content Creator',
    company: 'SoundWave Events',
    content: 'As a DJ, I need high-quality stems for my live sets. This AI tool delivers exactly what I need. The separation is clean and the processing is lightning fast.',
    rating: 5,
    avatar: '/avatars/marcus-johnson.jpg',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Audio Engineer',
    company: 'Studio Pro',
    content: 'I\'ve tried many stem separation tools, but this one stands out. The AI technology is advanced and the results are professional-grade. Highly recommended!',
    rating: 5,
    avatar: '/avatars/elena-rodriguez.jpg',
  },
  {
    name: 'David Kim',
    role: 'Music Teacher',
    company: 'Harmony Academy',
    content: 'Perfect for educational purposes. My students can now analyze individual instrument parts easily. The interface is intuitive and the results are accurate.',
    rating: 5,
    avatar: '/avatars/david-kim.jpg',
  },
  {
    name: 'Lisa Thompson',
    role: 'Podcast Producer',
    company: 'Audio Stories',
    content: 'I use this to clean up audio for my podcasts. Being able to separate vocals from background music has been a game-changer for my production quality.',
    rating: 5,
    avatar: '/avatars/lisa-thompson.jpg',
  },
  {
    name: 'Alex Rivera',
    role: 'Beatmaker',
    company: 'Rhythm Factory',
    content: 'The best stem separation tool I\'ve used. The AI is incredibly accurate and the processing speed is unmatched. It\'s become an essential part of my toolkit.',
    rating: 5,
    avatar: '/avatars/alex-rivera.jpg',
  },
]

export function TestimonialsSection() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Loved by music professionals worldwide
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              See what our users are saying about their experience with AI Stem Splitter.
            </p>
          </motion.div>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-gray-900 mb-6">
                <p className="text-base leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </blockquote>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-base font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">10,000+</div>
            <div className="text-sm text-gray-600">Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">500,000+</div>
            <div className="text-sm text-gray-600">Files Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
