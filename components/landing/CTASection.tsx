'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Upload, Zap, ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to separate your audio?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
              Join thousands of music professionals who trust AI Stem Splitter for their audio separation needs. 
              Start your free trial today and experience the difference.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <Link
              href="/stem-splitter"
              className="flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              <Upload className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/pricing"
              className="text-base font-semibold leading-6 text-white hover:text-primary-100 transition-colors"
            >
              View Pricing <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
          >
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Lightning Fast</h3>
              <p className="mt-2 text-sm text-primary-100">
                Process your audio files in seconds with our optimized AI algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">Easy to Use</h3>
              <p className="mt-2 text-sm text-primary-100">
                Simply drag and drop your audio file and get professional results
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Zap className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">High Quality</h3>
              <p className="mt-2 text-sm text-primary-100">
                Get professional-grade separation with minimal artifacts and noise
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <p className="text-sm text-primary-100">
              No credit card required • 5 free files per month • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
