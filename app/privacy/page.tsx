import { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - AI Stem Splitter',
  description: 'Learn how AI Stem Splitter protects your privacy and handles your personal data. Our comprehensive privacy policy covers data collection, usage, and your rights.',
  keywords: 'privacy policy, data protection, GDPR, audio privacy, stem splitter privacy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Email address (for account creation and notifications)</li>
                <li>Name (optional, for personalized experience)</li>
                <li>Payment information (processed securely through third-party providers)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Audio Files</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Temporary Processing</strong>: Audio files are uploaded for AI processing only</li>
                <li><strong>Automatic Deletion</strong>: Files are automatically deleted after processing (24 hours for Free, 7 days for Pro, 30 days for Enterprise)</li>
                <li><strong>No Storage</strong>: We do not permanently store your audio content</li>
                <li><strong>Privacy First</strong>: Your audio files are never shared or used for training</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage analytics (anonymized)</li>
                <li>Error logs for service improvement</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Service Delivery</strong>: Process your audio files and provide separation results</li>
                <li><strong>Account Management</strong>: Maintain your account and subscription</li>
                <li><strong>Service Improvement</strong>: Analyze usage patterns to enhance our AI algorithms</li>
                <li><strong>Communication</strong>: Send important service updates and notifications</li>
                <li><strong>Legal Compliance</strong>: Meet regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Security</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Encryption</strong>: All data transmission uses HTTPS encryption</li>
                <li><strong>Secure Processing</strong>: Audio files are processed in secure, isolated environments</li>
                <li><strong>Access Control</strong>: Limited access to authorized personnel only</li>
                <li><strong>Regular Audits</strong>: Security measures are regularly reviewed and updated</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access</strong>: Request a copy of your personal data</li>
                <li><strong>Correction</strong>: Update or correct your information</li>
                <li><strong>Deletion</strong>: Request deletion of your account and data</li>
                <li><strong>Portability</strong>: Export your data in a standard format</li>
                <li><strong>Objection</strong>: Opt-out of certain data processing activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Services</h2>
              <p className="text-gray-700 mb-3">We use trusted third-party services for:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment processing (Stripe, PayPal)</li>
                <li>Analytics (Google Analytics - anonymized)</li>
                <li>Email services (SendGrid)</li>
                <li>Cloud storage (AWS, Cloudflare)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. International Transfers</h2>
              <p className="text-gray-700 mb-3">Your data may be processed in countries outside your residence. We ensure adequate protection through:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Standard Contractual Clauses</li>
                <li>Adequacy decisions</li>
                <li>Appropriate safeguards</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700">Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-3">For privacy-related questions or requests:</p>
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
