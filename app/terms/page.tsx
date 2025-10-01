import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - AI Stem Splitter',
  description: 'Read our Terms of Service for AI Stem Splitter. Learn about user responsibilities, intellectual property rights, and service terms.',
  keywords: 'terms of service, user agreement, stem splitter terms, audio processing terms',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">By accessing or using AI Stem Splitter, you agree to be bound by these Terms of Service and our Privacy Policy.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-3">AI Stem Splitter provides AI-powered audio stem separation services, allowing users to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Upload audio files for processing</li>
                <li>Separate audio into individual stems (vocals, drums, bass, guitar, piano)</li>
                <li>Download processed results</li>
                <li>Access different service tiers based on subscription</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Acceptable Use</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use the service for lawful purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Do not upload copyrighted material without permission</li>
                <li>Maintain account security</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Prohibited Activities</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Upload malicious files or viruses</li>
                <li>Attempt to reverse engineer our AI models</li>
                <li>Use automated tools to abuse the service</li>
                <li>Share account credentials</li>
                <li>Violate any applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Intellectual Property</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Your Content</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You retain ownership of your uploaded audio files</li>
                <li>You grant us a limited license to process your files</li>
                <li>You are responsible for ensuring you have rights to uploaded content</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Our Service</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>AI Stem Splitter technology and algorithms are proprietary</li>
                <li>Website design and content are protected by copyright</li>
                <li>Trademarks and logos are our intellectual property</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Subscription and Payment</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Free Plan</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>5 files per month</li>
                <li>30 minutes total processing time</li>
                <li>24-hour file retention</li>
                <li>Standard quality output</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Paid Plans</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Monthly or annual billing</li>
                <li>Automatic renewal unless cancelled</li>
                <li>30-day money-back guarantee</li>
                <li>Price changes with 30-day notice</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Refunds</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>30-day money-back guarantee for paid plans</li>
                <li>No refunds for Free plan usage</li>
                <li>Refunds processed within 5-7 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Service Availability</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We strive for 99.9% uptime</li>
                <li>Scheduled maintenance with advance notice</li>
                <li>No guarantee of uninterrupted service</li>
                <li>Right to modify or discontinue features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-3">To the maximum extent permitted by law:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Service provided &quot;as is&quot; without warranties</li>
                <li>No liability for indirect or consequential damages</li>
                <li>Maximum liability limited to amount paid for service</li>
                <li>User assumes responsibility for backup of important files</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">By You</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Cancel subscription at any time</li>
                <li>Account remains active until end of billing period</li>
                <li>Data deleted according to retention policy</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">By Us</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Immediate termination for Terms violations</li>
                <li>30-day notice for service discontinuation</li>
                <li>Right to suspend accounts for abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Governing law: [Your Jurisdiction]</li>
                <li>Disputes resolved through binding arbitration</li>
                <li>Class action waiver</li>
                <li>30-day notice period before legal action</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>We may update these Terms with 30-day notice</li>
                <li>Continued use constitutes acceptance</li>
                <li>Material changes will be prominently displayed</li>
                <li>Previous versions available upon request</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 mb-3">For questions about these Terms:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email: motionjoy93@gmail.com</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
